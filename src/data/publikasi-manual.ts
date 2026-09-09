/*  Koreksi manual atas daftar publikasi yang diambil otomatis.
    ────────────────────────────────────────────────────────────────
    Berkas inilah yang boleh disunting tangan. Isinya tidak pernah
    ditimpa oleh skrip pemutakhir harian.

    Sementara src/data/publikasi-otomatis.json dibangkitkan mesin dari
    OpenAlex + ORCID, berkas ini dipakai untuk tiga hal:

      1. membetulkan pengelompokan tema yang tebakannya kurang pas,
      2. menyembunyikan entri yang tidak ingin ditampilkan,
      3. menambahkan karya yang tidak terindeks di mana pun.
    ──────────────────────────────────────────────────────────────── */

export type Tema = "optimisasi" | "fuzzy" | "ml" | "pendidikan" | "lainnya";

export const temaPublikasi: { id: Tema; nama: string }[] = [
	{ id: "optimisasi", nama: "Optimisasi & Ride-Hailing" },
	{ id: "fuzzy", nama: "Pemrograman Fuzzy" },
	{ id: "ml", nama: "Pemodelan Data & ML" },
	{ id: "pendidikan", nama: "Pendidikan Matematika" },
	{ id: "lainnya", nama: "Lainnya" },
];

/*  Membetulkan tema. Kuncinya DOI (huruf kecil, tanpa "https://doi.org/").
    Tebakan otomatis memakai kata kunci pada judul, jadi makalah yang
    memakai pendekatan fuzzy untuk masalah optimisasi kadang tergolong
    ke tema yang kurang tepat.  */
export const temaPerDoi: Record<string, Tema> = {
	"10.37934/araset.42.2.133144": "optimisasi",
	"10.3390/su141710648": "optimisasi",
	"10.56225/ijgoia.v2i4.262": "fuzzy",
};

/*  DOI yang tidak ingin ditampilkan di halaman profil.  */
export const sembunyikan: string[] = [];

/*  Karya yang tidak ada di OpenAlex maupun ORCID — misalnya prosiding
    lokal atau bab buku. Isikan lengkap seperti contoh yang dikomentari.  */
export const tambahan: {
	doi: string | null;
	judul: string;
	jurnal: string;
	detail: string;
	tahun: string;
	penulis: string[];
	sitasi: number;
	aksesTerbuka: boolean;
	jenis: string;
	tema: Tema;
	label: string[];
}[] = [
	// {
	// 	doi: null,
	// 	judul: "Judul makalah",
	// 	jurnal: "Nama jurnal atau prosiding",
	// 	detail: "Vol. 1, hlm. 1–10",
	// 	tahun: "2026",
	// 	penulis: ["Megantara T.R."],
	// 	sitasi: 0,
	// 	aksesTerbuka: false,
	// 	jenis: "article",
	// 	tema: "lainnya",
	// 	label: [],
	// },
];
