import type { APIRoute } from "astro";
import { CSRF_COOKIE, ambilEnv, balasanPopup, polaDomain, tentukanScope } from "../../lib/oauth";

export const prerender = false;

/**
 * Langkah pertama: CMS membuka /oauth di popup, lalu kita lempar ke halaman
 * izin GitHub sambil menitipkan token CSRF di cookie.
 */
export const GET: APIRoute = async ({ locals, url }) => {
	const env = ambilEnv(locals);
	const pola = polaDomain(env, url.hostname);

	if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
		return balasanPopup({
			pola,
			error: "Client ID atau client secret GitHub belum diatur di server.",
			errorCode: "MISCONFIGURED_CLIENT",
		});
	}

	// `site_id` dikirim CMS. Cocokkan dengan daftar host yang diizinkan.
	const pemanggil = url.searchParams.get("site_id") ?? "";

	if (!pola.some((p) => new RegExp(p).test(pemanggil))) {
		return balasanPopup({
			pola,
			error: "Domain ini tidak diizinkan memakai relai OAuth Mathantara.",
			errorCode: "UNSUPPORTED_DOMAIN",
		});
	}

	const csrf = crypto.randomUUID().replaceAll("-", "");

	const params = new URLSearchParams({
		client_id: env.GITHUB_CLIENT_ID,
		redirect_uri: `${url.origin}/oauth/callback`,
		scope: tentukanScope(url.searchParams.get("scope")),
		state: csrf,
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
			// Berlaku 10 menit. `SameSite=Lax` supaya cookie tetap terkirim
			// saat GitHub memanggil balik lewat pengalihan.
			"Set-Cookie": `${CSRF_COOKIE}=${csrf}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax; Secure`,
			"Cache-Control": "no-store",
		},
	});
};
