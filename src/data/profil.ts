/*  Data halaman Profil.
    Biodata, pendidikan, peran, dan tautan diubah langsung di berkas ini.
    Daftar publikasinya ditarik otomatis — lihat bagian "Publikasi" di bawah.  */

import otomatis from "./publikasi-otomatis.json";
import {
	temaPublikasi,
	temaPerDoi,
	sembunyikan,
	tambahan,
	type Tema,
} from "./publikasi-manual";

export { temaPublikasi };
export type { Tema };

export const identitas = {
	nama: "Tubagus Robbi Megantara",
	gelar: "S.Mat., M.Mat.",
	peranSingkat: "Dosen · Peneliti · Kandidat Doktor Matematika",
	lokasi: "Bandung — Sumedang, Jawa Barat",
	email: "tubagusrobbimegantara@gmail.com",
	ringkas:
		"Matematikawan terapan yang bekerja di persimpangan optimisasi, pemrograman fuzzy, dan sistem transportasi cerdas — mengubah ketidakpastian dunia nyata menjadi model yang bisa diselesaikan.",
	bio: [
		"Tubagus Robbi Megantara adalah dosen dan peneliti matematika terapan. Karyanya berada di persimpangan optimisasi matematika, transportasi cerdas, dan keberlanjutan berbasis data.",
		"Saat ini ia menempuh program doktor di Departemen Matematika, Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA), Universitas Padjadjaran, Bandung. Penelitian doktoralnya mengembangkan model optimisasi fuzzy untuk penugasan dan penyeimbangan kendaraan ride-hailing dalam kondisi ketidakpastian.",
		"Di samping studinya, ia menjabat sebagai Kepala Unit Penjaminan Mutu di FMIPA, Universitas Kebangsaan Republik Indonesia, tempat ia juga mengajar matematika.",
		"Mathantara lahir dari kebiasaan yang sama yang ia pakai dalam penelitian: mengambil persoalan nyata, menyusunnya menjadi model, lalu menjelaskannya sampai masuk akal — kali ini untuk penonton yang jauh lebih luas daripada pembaca jurnal.",
	],
};

export const statistik = [
	{ angka: String(otomatis.ringkasan.jumlahKarya), label: "Karya terpublikasi" },
	{ angka: String(otomatis.ringkasan.totalSitasi), label: "Sitasi terindeks OpenAlex" },
	{ angka: "4", label: "Bidang penelitian" },
];

export const pendidikan = [
	{
		tahun: "2022 — sekarang",
		gelar: "Program Doktor (Ph.D.) Matematika",
		tempat: "Departemen Matematika · FMIPA · Universitas Padjadjaran",
		catatan:
			"Penelitian doktoral tentang model optimisasi fuzzy untuk penugasan dan penyeimbangan kendaraan ride-hailing dalam kondisi ketidakpastian. Didanai Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (hibah no. 3018/UN6.3.1/PT.00/2023).",
		berjalan: true,
	},
	{
		tahun: "2021 — 2022",
		gelar: "Magister Matematika (M.Mat.)",
		tempat: "Departemen Matematika · FMIPA · Universitas Padjadjaran",
		catatan:
			"Tesis magister tentang pemrograman linear fuzzy untuk penugasan dan penyeimbangan ride-hailing dalam kondisi ketidakpastian. Didanai Program Penelitian Tesis Magister, DRPM UNPAD (hibah no. 1318/UN6.3.1/PT.00/2022).",
		berjalan: false,
	},
	{
		tahun: "2017 — 2021",
		gelar: "Sarjana Matematika (S.Mat.)",
		tempat: "Departemen Matematika · FMIPA · Universitas Padjadjaran",
		catatan:
			"Pendidikan sarjana pada Program Studi Matematika, Fakultas Matematika dan Ilmu Pengetahuan Alam, Universitas Padjadjaran.",
		berjalan: false,
	},
];

export const peran = [
	{
		label: "Struktural",
		judul: "Kepala Unit Penjaminan Mutu",
		tempat: "FMIPA, Universitas Kebangsaan Republik Indonesia",
	},
	{
		label: "Pengajaran",
		judul: "Dosen Matematika",
		tempat: "FMIPA, Universitas Kebangsaan Republik Indonesia",
	},
	{
		label: "Kanal edukasi",
		judul: "Pendiri & penyusun materi Mathantara",
		tempat: "Video animasi matematika dan materi daring",
	},
];

export const bidangPenelitian = [
	{
		nomor: "01",
		judul: "Optimisasi Matematika",
		isi: "Pemrograman linear, non-linear, dan piecewise-linear untuk masalah penugasan, penjadwalan, dan alokasi sumber daya pada jaringan transportasi.",
		tag: ["LP", "NLP", "MILP", "MOLP", "Piecewise Linear"],
	},
	{
		nomor: "02",
		judul: "Pemrograman Fuzzy & Interval-Valued",
		isi: "Memodelkan ketidakpastian parameter transportasi memakai bilangan fuzzy, himpunan fuzzy interval-valued, dan formulasi multi-objektif.",
		tag: ["Fuzzy LP", "IVF-MOLP", "Ketidakpastian"],
	},
	{
		nomor: "03",
		judul: "Sistem Transportasi Cerdas",
		isi: "Model penugasan kendaraan dan penyeimbangan pengemudi untuk platform ride-hailing: menekan konsumsi bahan bakar, waktu tunggu, emisi, dan ketimpangan beban kerja.",
		tag: ["Ride-hailing", "Penugasan", "Rebalancing", "Matching"],
	},
	{
		nomor: "04",
		judul: "Machine Learning & Keberlanjutan",
		isi: "Penerapan SVR, XGBoost, LSTM, dan Random Forest untuk prediksi lingkungan dan pemodelan keberlanjutan dengan data terbatas pada pengelolaan daerah aliran sungai.",
		tag: ["SVR", "XGBoost", "LSTM", "Random Forest"],
	},
];

export type Publikasi = {
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
};

/*  Daftar publikasi digabung dari dua sumber:
      - publikasi-otomatis.json  ditarik harian dari OpenAlex + ORCID
      - publikasi-manual.ts      koreksi tema, entri tersembunyi, tambahan
    Lihat scripts/perbarui-publikasi.mjs.  */

const disembunyikan = new Set(sembunyikan.map((d) => d.toLowerCase()));

const dariOtomatis = (otomatis.karya as Publikasi[])
	.filter((k) => !(k.doi && disembunyikan.has(k.doi)))
	.map((k) => ({
		...k,
		tema: (k.doi && temaPerDoi[k.doi]) || k.tema,
	}));

export const publikasi: Publikasi[] = [...dariOtomatis, ...(tambahan as Publikasi[])].sort(
	(a, b) => Number(b.tahun) - Number(a.tahun) || b.sitasi - a.sitasi,
);

/** Tema yang benar-benar terpakai, untuk tombol penyaring di halaman profil. */
export const temaTerpakai = temaPublikasi.filter((t) =>
	publikasi.some((p) => p.tema === t.id),
);

export const publikasiDiperbarui = otomatis.diperbarui;
export const sumberPublikasi = otomatis.sumber;

/*  Tautan akademik dan media sosial pribadi.
    Tambahkan atau hapus baris sesuai kebutuhan.  */
export const tautan = [
	{
		nama: "Email",
		nilai: "tubagusrobbimegantara@gmail.com",
		url: "mailto:tubagusrobbimegantara@gmail.com",
		jenis: "kontak",
	},
	{
		nama: "LinkedIn",
		nilai: "in/tubagusrobbimegantara",
		url: "https://www.linkedin.com/in/tubagusrobbimegantara/",
		jenis: "sosial",
	},
	{
		nama: "Google Scholar",
		nilai: "Tubagus Robbi Megantara",
		url: "https://scholar.google.com/citations?user=Tf4cRjcAAAAJ&hl=en&oi=ao",
		jenis: "akademik",
	},
	{
		nama: "Scopus",
		nilai: "Author ID 57888526400",
		url: "https://www.scopus.com/authid/detail.uri?authorId=57888526400",
		jenis: "akademik",
	},
	{
		nama: "ORCID",
		nilai: "0000-0002-8888-5565",
		url: "https://orcid.org/0000-0002-8888-5565",
		jenis: "akademik",
	},
	{
		nama: "GitHub",
		nilai: "tubagusrobbimegantara",
		url: "https://github.com/tubagusrobbimegantara",
		jenis: "sosial",
	},
];
