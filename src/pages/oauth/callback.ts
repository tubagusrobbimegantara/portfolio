import type { APIRoute } from "astro";
import { CSRF_COOKIE, ambilEnv, balasanPopup, polaDomain } from "../../lib/oauth";

export const prerender = false;

/**
 * Langkah kedua: GitHub memanggil balik dengan kode izin. Kode itu ditukar
 * jadi access token, lalu diserahkan ke jendela CMS lewat postMessage.
 */
export const GET: APIRoute = async ({ locals, request, url }) => {
	const env = ambilEnv(locals);
	const pola = polaDomain(env, url.hostname);

	if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
		return balasanPopup({
			pola,
			error: "Client ID atau client secret GitHub belum diatur di server.",
			errorCode: "MISCONFIGURED_CLIENT",
		});
	}

	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	if (!code || !state) {
		return balasanPopup({
			pola,
			error: "Kode izin dari GitHub tidak diterima. Coba masuk lagi.",
			errorCode: "AUTH_CODE_REQUEST_FAILED",
		});
	}

	const csrf = request.headers
		.get("Cookie")
		?.match(new RegExp(`\\b${CSRF_COOKIE}=([0-9a-f]{32})\\b`))?.[1];

	if (!csrf || csrf !== state) {
		return balasanPopup({
			pola,
			error: "Permintaan tidak cocok dengan sesi yang tersimpan. Proses masuk dihentikan.",
			errorCode: "CSRF_DETECTED",
		});
	}

	let jawaban: Response;

	try {
		jawaban = await fetch("https://github.com/login/oauth/access_token", {
			method: "POST",
			headers: { Accept: "application/json", "Content-Type": "application/json" },
			body: JSON.stringify({
				code,
				client_id: env.GITHUB_CLIENT_ID,
				client_secret: env.GITHUB_CLIENT_SECRET,
				redirect_uri: `${url.origin}/oauth/callback`,
			}),
		});
	} catch {
		return balasanPopup({
			pola,
			error: "Gagal menghubungi GitHub untuk menukar token. Coba lagi nanti.",
			errorCode: "TOKEN_REQUEST_FAILED",
		});
	}

	let token: string | undefined;
	let error: string | undefined;

	try {
		({ access_token: token, error } = (await jawaban.json()) as {
			access_token?: string;
			error?: string;
		});
	} catch {
		return balasanPopup({
			pola,
			error: "Jawaban dari GitHub tidak bisa dibaca. Coba masuk lagi.",
			errorCode: "MALFORMED_RESPONSE",
		});
	}

	if (!token) {
		return balasanPopup({
			pola,
			error: error || "GitHub tidak memberikan token akses.",
			errorCode: "TOKEN_REQUEST_FAILED",
		});
	}

	return balasanPopup({ pola, token });
};
