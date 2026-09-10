/*  ────────────────────────────────────────────────────────────────
    Relai OAuth GitHub untuk Sveltia CMS (/admin).

    CMS membuka popup ke /oauth, popup itu dilempar ke halaman izin
    GitHub, lalu GitHub memanggil balik /oauth/callback. Token yang
    didapat dikirim ke jendela CMS lewat postMessage.

    Protokol pesannya mengikuti sveltia-cms-auth (MIT) supaya cocok
    dengan Sveltia maupun Decap CMS.
    ──────────────────────────────────────────────────────────────── */

export const PROVIDER = "github";

/** Nama cookie penyimpan token CSRF selama perjalanan ke GitHub. */
export const CSRF_COOKIE = "mathantara-oauth-csrf";

/** Izin yang diminta bila CMS tidak menyebutkan `auth_scope`. */
const SCOPE_DEFAULT = "repo,user";

/** Hanya izin di daftar ini yang boleh diminta dari luar. */
const SCOPE_ALLOWED = ["repo", "public_repo", "user", "read:user", "user:email"];

/** Variabel lingkungan yang dipakai relai ini. */
export interface OAuthEnv {
	GITHUB_CLIENT_ID?: string;
	GITHUB_CLIENT_SECRET?: string;
	/** Daftar host pemanggil yang diizinkan, dipisah koma, boleh pakai `*`.
	 *  Bila kosong, host situs ini sendiri yang dipakai. */
	ALLOWED_DOMAINS?: string;
}

/**
 * Ambil variabel lingkungan Worker. Saat `astro dev`, nilainya datang dari
 * berkas `.dev.vars`; saat tayang, dari `wrangler secret`.
 */
export function ambilEnv(locals: App.Locals): OAuthEnv {
	return (locals.runtime?.env ?? {}) as OAuthEnv;
}

/**
 * Tentukan izin yang diminta ke GitHub. Permintaan yang tidak dikenal
 * dikembalikan ke nilai bawaan, bukan ditolak, supaya CMS tetap bisa masuk.
 */
export function tentukanScope(diminta?: string | null): string {
	const scopes = (diminta ?? "").split(/[\s,]+/).filter(Boolean);
	if (!scopes.length) return SCOPE_DEFAULT;
	return scopes.every((s) => SCOPE_ALLOWED.includes(s)) ? scopes.join(",") : SCOPE_DEFAULT;
}

const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Ubah daftar host jadi pola regex. Dipakai di server maupun di skrip popup,
 * supaya aturannya persis sama di kedua sisi.
 */
export function polaDomain(env: OAuthEnv, hostSendiri: string): string[] {
	const daftar = (env.ALLOWED_DOMAINS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
	// Tanpa pengaturan, hanya situs ini sendiri yang boleh memakai relai.
	const sumber = daftar.length ? daftar : [hostSendiri];
	return sumber.map((s) => `^${escapeRegExp(s).replaceAll("\\*", ".+")}$`);
}

/** Serialisasi nilai agar aman ditempel di dalam blok <script>. */
const serialize = (value: unknown) => JSON.stringify(value ?? null).replaceAll("<", "\\u003c");

interface HasilPopup {
	token?: string;
	error?: string;
	errorCode?: string;
	pola: string[];
}

/**
 * Halaman popup yang menyerahkan token ke jendela CMS.
 *
 * Asal (origin) pesan ditetapkan browser dan tidak bisa dipalsukan pengirim,
 * jadi itulah satu-satunya penanda tepercaya soal siapa yang membuka popup.
 * Pesan galat tetap diteruskan tanpa pemeriksaan karena tidak memuat rahasia.
 */
export function balasanPopup({ token, error, errorCode, pola }: HasilPopup): Response {
	const status = error ? "error" : "success";
	const isi = error ? { provider: PROVIDER, error, errorCode } : { provider: PROVIDER, token };
	const pesan = `authorization:${PROVIDER}:${status}:${JSON.stringify(isi)}`;

	const html = `<!doctype html>
<html lang="id">
<head><meta charset="utf-8" /><title>Masuk ke Mathantara CMS</title></head>
<body>
<p>Menyelesaikan proses masuk…</p>
<script>
(() => {
  const pola = ${serialize(pola)};
  const adaToken = ${serialize(!!token)};
  const pesan = ${serialize(pesan)};

  const tepercaya = (origin) => {
    try {
      const { hostname } = new URL(origin);
      return pola.some((p) => new RegExp(p).test(hostname));
    } catch {
      return false;
    }
  };

  window.addEventListener('message', ({ data, origin }) => {
    if (data !== 'authorizing:${PROVIDER}') return;
    if (adaToken && pola.length && !tepercaya(origin)) return;
    window.opener?.postMessage(pesan, origin);
  });

  window.opener?.postMessage('authorizing:${PROVIDER}', '*');
})();
</script>
</body>
</html>`;

	return new Response(html, {
		headers: {
			"Content-Type": "text/html;charset=UTF-8",
			"Cache-Control": "no-store",
			// Perjalanan selesai — hapus token CSRF.
			"Set-Cookie": `${CSRF_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure`,
		},
	});
}
