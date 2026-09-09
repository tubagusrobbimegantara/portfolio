import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/*  ────────────────────────────────────────────────────────────────
    Dua koleksi konten, satu berkas Markdown = satu entri.

      src/content/video/<slug>.md   → satu video animasi
      src/content/materi/<slug>.md  → satu materi matematika (LaTeX)

    Berkas yang namanya diawali garis bawah (mis. _template.md)
    diabaikan, jadi aman dipakai sebagai contoh isian.
    ──────────────────────────────────────────────────────────────── */

const POLA = "**/[^_]*.md";

const video = defineCollection({
	loader: glob({ base: "./src/content/video", pattern: POLA }),
	schema: z.object({
		judul: z.string(),
		/** Caption singkat yang tampil di bawah thumbnail. */
		caption: z.string(),
		tanggal: z.coerce.date(),
		/** Tautan platform — isi yang ada saja. Selama semuanya kosong,
		 *  kartunya otomatis ditandai "Segera hadir". */
		youtube: z.string().default(""),
		tiktok: z.string().default(""),
		instagram: z.string().default(""),
		/** Gambar di /public/thumbnail/. Kosongkan bila memakai YouTube
		 *  (thumbnail diambil otomatis dari ID videonya). */
		thumbnail: z.string().default(""),
		/** Slug materi terkait, mis. "vehicle-routing-problem". */
		materi: z.string().default(""),
		durasi: z.string().default(""),
		topik: z.string().default(""),
		unggulan: z.boolean().default(false),
	}),
});

const materi = defineCollection({
	loader: glob({ base: "./src/content/materi", pattern: POLA }),
	schema: z.object({
		judul: z.string(),
		deskripsi: z.string(),
		tanggal: z.coerce.date(),
		/** Dipakai sebagai filter di halaman Materi Matematika. */
		kategori: z.string(),
		jenjang: z.string().default("Umum"),
		tag: z.array(z.string()).default([]),
		/** Slug video terkait, mis. "vrp-distribusi-bantuan-bencana". */
		video: z.string().default(""),
		urutan: z.number().default(0),
	}),
});

export const collections = { video, materi };
