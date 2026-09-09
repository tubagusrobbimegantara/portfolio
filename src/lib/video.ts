/*  Pembantu untuk kartu video: ambil ID YouTube dari berbagai bentuk tautan,
    lalu susun thumbnail dan daftar platform yang tersedia.  */

export type DataVideo = {
	youtube?: string;
	tiktok?: string;
	instagram?: string;
	thumbnail?: string;
};

/** Mendukung youtu.be/ID, /watch?v=ID, /shorts/ID, dan /embed/ID. */
export function idYouTube(url = ""): string {
	if (!url) return "";
	const pola = [
		/youtu\.be\/([\w-]{11})/,
		/[?&]v=([\w-]{11})/,
		/\/shorts\/([\w-]{11})/,
		/\/embed\/([\w-]{11})/,
	];
	for (const p of pola) {
		const cocok = url.match(p);
		if (cocok) return cocok[1];
	}
	return "";
}

/** Thumbnail manual lebih diutamakan; kalau kosong, pakai milik YouTube. */
export function thumbnailVideo(d: DataVideo): string {
	if (d.thumbnail) return d.thumbnail;
	const id = idYouTube(d.youtube);
	return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
}

export type Platform = { nama: "YouTube" | "TikTok" | "Instagram"; kode: "yt" | "tt" | "ig"; url: string };

export function platformVideo(d: DataVideo): Platform[] {
	const daftar: Platform[] = [
		{ nama: "YouTube", kode: "yt", url: d.youtube ?? "" },
		{ nama: "TikTok", kode: "tt", url: d.tiktok ?? "" },
		{ nama: "Instagram", kode: "ig", url: d.instagram ?? "" },
	];
	return daftar.filter((p) => p.url.trim() !== "");
}

/** Tautan utama kartu: YouTube dulu, lalu TikTok, lalu Instagram. */
export function tautanUtama(d: DataVideo): string {
	return platformVideo(d)[0]?.url ?? "";
}
