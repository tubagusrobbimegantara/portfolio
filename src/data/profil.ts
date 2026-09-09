/*  Data halaman Profil.
    Semua isi halaman /profil diambil dari berkas ini — ubah di sini saja.  */

export const identitas = {
	nama: "Tubagus Robbi Megantara",
	sapaan: "Megantara, T. R.",
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
	{ angka: "8", label: "Publikasi terindeks Scopus" },
	{ angka: "21+", label: "Sitasi Scopus sejak 2022" },
	{ angka: "4", label: "Bidang penelitian" },
];

export const pendidikan = [
	{
		tahun: "2022 — sekarang",
		gelar: "Program Doktor (Ph.D.) Matematika",
		tempat: "Universitas Padjadjaran · FMIPA · Sumedang",
		catatan:
			"Penelitian doktoral tentang model optimisasi fuzzy untuk penugasan dan penyeimbangan kendaraan ride-hailing dalam kondisi ketidakpastian. Didanai Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (hibah no. 3018/UN6.3.1/PT.00/2023).",
		berjalan: true,
	},
	{
		tahun: "2020 — 2022",
		gelar: "Magister Sains (M.Si.) Matematika",
		tempat: "Universitas Padjadjaran · FMIPA · Sumedang",
		catatan:
			"Tesis magister tentang pemrograman linear fuzzy untuk penugasan dan penyeimbangan ride-hailing dalam kondisi ketidakpastian. Didanai Program Penelitian Tesis Magister, DRPM UNPAD (hibah no. 1318/UN6.3.1/PT.00/2022).",
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
	tahun: string;
	judul: string;
	jurnal: string;
	detail: string;
	penulis: string;
	doi?: string;
	tema: "optimisasi" | "fuzzy" | "ml";
	label?: string[];
};

export const temaPublikasi = [
	{ id: "optimisasi", nama: "Optimisasi Ride-Hailing" },
	{ id: "fuzzy", nama: "Pemrograman Fuzzy" },
	{ id: "ml", nama: "ML & Keberlanjutan" },
] as const;

export const publikasi: Publikasi[] = [
	{
		tahun: "2026",
		judul:
			"Machine Learning-Based Forecasting of Waste Generation Proxies Under Data-Limited Conditions for Supporting Adaptive and Sustainable Citarum River Management",
		jurnal: "Sustainability",
		detail: "18(10), art. no. 5076",
		penulis:
			"Supian S., Sukono, Riaman, Juahir H., Megantara T.R., Indra, Azahra A.S., Pirdaus D.I., Saputra M.P.A.",
		doi: "10.3390/su18105076",
		tema: "ml",
		label: ["Akses Terbuka"],
	},
	{
		tahun: "2025",
		judul:
			"Mathematical Modeling of Ride-Hailing Matching Considering Uncertain User and Driver Preferences: Interval-Valued Fuzzy Approach",
		jurnal: "Mathematics",
		detail: "13(3), art. no. 371",
		penulis:
			"Supian S., Subiyanto S., Sylviani S., Megantara T.R., Bon A.T., Preda V.",
		doi: "10.3390/math13030371",
		tema: "fuzzy",
		label: ["Akses Terbuka"],
	},
	{
		tahun: "2024",
		judul:
			"The Application of the Piecewise Linear Method for Non-Linear Programming Problems in Ride-Hailing Assignment Based on Service Level, Driver Workload, and Fuel Consumption",
		jurnal: "Mathematics",
		detail: "12(14), art. no. 2290",
		penulis: "Megantara T.R., Supian S., Chaerani D., Bon A.T.",
		doi: "10.3390/math12142290",
		tema: "optimisasi",
		label: ["Akses Terbuka", "2 sitasi"],
	},
	{
		tahun: "2024",
		judul:
			"Ride-Hailing Matching with Uncertain Travel Time: A Novel Interval-Valued Fuzzy Multi-Objective Linear Programming Approach",
		jurnal: "Mathematics",
		detail: "12(9), art. no. 1355",
		penulis: "Supian S., Subiyanto, Megantara T.R., Bon A.T.",
		doi: "10.3390/math12091355",
		tema: "fuzzy",
		label: ["Akses Terbuka", "4 sitasi"],
	},
	{
		tahun: "2024",
		judul:
			"Mathematical Modeling on Integrated Vehicle Assignment and Rebalancing in Ride-hailing System with Uncertainty Using Fuzzy Linear Programming",
		jurnal:
			"Journal of Advanced Research in Applied Sciences and Engineering Technology",
		detail: "42(2), hlm. 133–144",
		penulis: "Megantara T.R., Supian S., Chaerani D.",
		doi: "10.37934/araset.42.2.133144",
		tema: "optimisasi",
		label: ["Akses Terbuka", "8 sitasi"],
	},
	{
		tahun: "2024",
		judul: "Mathematical Modeling for Vehicle Assignment Problem in Online Transportation",
		jurnal: "AIP Conference Proceedings",
		detail: "3132(1), art. no. 020021 · ICON-SMART 2022",
		penulis: "Supian S., Megantara T.R.",
		doi: "10.1063/5.0211564",
		tema: "optimisasi",
		label: ["Prosiding", "1 sitasi"],
	},
	{
		tahun: "2023",
		judul:
			"Ride-Hailing Assignment Problem under Waiting Time Uncertainty using Interval-Valued Fuzzy Quadratic",
		jurnal: "International Journal of Global Optimization and Its Applications",
		detail: "Vol. 2, hlm. 209–220",
		penulis: "Supian S., Subiyanto S., Megantara T.R., Bon A.T.",
		tema: "fuzzy",
	},
	{
		tahun: "2022",
		judul:
			"Strategies to Reduce Ride-Hailing Fuel Consumption Caused by Pick-Up Trips: A Mathematical Model under Uncertainty",
		jurnal: "Sustainability",
		detail: "14(17), art. no. 10648",
		penulis: "Megantara T.R., Supian S., Chaerani D.",
		doi: "10.3390/su141710648",
		tema: "optimisasi",
		label: ["Akses Terbuka", "6 sitasi"],
	},
];

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
