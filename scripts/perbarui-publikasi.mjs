/*  Memperbarui daftar publikasi dari sumber terbuka.
    ────────────────────────────────────────────────────────────────
    Dijalankan otomatis setiap hari lewat GitHub Actions, atau manual:

        node scripts/perbarui-publikasi.mjs

    Sumber yang dipakai:
      • OpenAlex  — daftar karya, metadata, dan jumlah sitasi (gratis,
                    tanpa kunci API)
      • ORCID     — pemeriksa silang; DOI yang ada di ORCID tetapi tidak
                    ditemukan di OpenAlex akan dilaporkan (gratis, tanpa
                    kunci API)

    Hasilnya ditulis ke src/data/publikasi-otomatis.json. Berkas itu
    dibangkitkan mesin — jangan disunting tangan. Untuk mengoreksi tema,
    menyembunyikan entri, atau menambah karya yang tidak terindeks di mana
    pun, pakai src/data/publikasi-manual.ts.

    Catatan: Scopus dan Google Scholar sengaja tidak dipakai. Scopus
    memerlukan kunci API Elsevier berikut entitlement langganan institusi,
    sedangkan Google Scholar tidak menyediakan API resmi dan melarang
    pengambilan otomatis.
    ──────────────────────────────────────────────────────────────── */

import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ORCID = "0000-0002-8888-5565";
const SUREL = "tubagusrobbimegantara@gmail.com"; // dipakai OpenAlex untuk antrean sopan
const NAMA_PENULIS = "Megantara";

const akar = join(dirname(fileURLToPath(import.meta.url)), "..");
const BERKAS = join(akar, "src", "data", "publikasi-otomatis.json");

/* ── Pengambilan data ──────────────────────────────────────────── */

async function ambil(url, opsi = {}, percobaan = 3) {
	for (let i = 1; i <= percobaan; i++) {
		try {
			const jawab = await fetch(url, {
				...opsi,
				headers: {
					"User-Agent": `Mathantara/1.0 (mailto:${SUREL})`,
					...(opsi.headers ?? {}),
				},
			});
			if (!jawab.ok) throw new Error(`HTTP ${jawab.status}`);
			return await jawab.json();
		} catch (galat) {
			if (i === percobaan) throw galat;
			await new Promise((r) => setTimeout(r, 1500 * i));
		}
	}
}

async function karyaOpenAlex() {
	const hasil = [];
	let kursor = "*";
	while (kursor) {
		const url =
			`https://api.openalex.org/works` +
			`?filter=author.orcid:${ORCID}` +
			`&per-page=200&cursor=${encodeURIComponent(kursor)}&mailto=${SUREL}`;
		const data = await ambil(url);
		hasil.push(...data.results);
		kursor = data.results.length ? data.meta.next_cursor : null;
	}
	return hasil;
}

async function doiOrcid() {
	const data = await ambil(`https://pub.orcid.org/v3.0/${ORCID}/works`, {
		headers: { Accept: "application/json" },
	});
	const doi = new Set();
	for (const grup of data.group ?? []) {
		for (const id of grup["external-ids"]?.["external-id"] ?? []) {
			if (id["external-id-type"] === "doi") {
				doi.add(String(id["external-id-value"]).toLowerCase());
			}
		}
	}
	return doi;
}

/* ── Pengolahan ────────────────────────────────────────────────── */

/** Menebak tema dari judul dan nama jurnal. Bisa ditimpa lewat publikasi-manual.ts. */
function tebakTema(judul, jurnal) {
	const t = `${judul} ${jurnal}`.toLowerCase();
	if (/(pembelajaran|mathematics learning|interactive|education|school|student|teaching|instruction|spreadsheet|literacy)/.test(t))
		return "pendidikan";
	if (/(fuzzy|interval-valued|uncertain|uncertainty)/.test(t)) return "fuzzy";
	if (/(machine learning|forecast|prediction|regression|markov|distribution function|covid|waste|sustainab)/.test(t))
		return "ml";
	if (/(routing|assignment|rebalanc|ride-hailing|vehicle|optimi|linear programming|matching)/.test(t))
		return "optimisasi";
	return "lainnya";
}

function rapikanJudul(judul = "") {
	// Beberapa entri OpenAlex tertulis huruf besar semua.
	if (judul === judul.toUpperCase() && judul.length > 12) {
		return judul
			.toLowerCase()
			.replace(/(^|[.:!?]\s+)([a-z])/g, (_, a, b) => a + b.toUpperCase());
	}
	return judul;
}

function susunDetail(biblio = {}) {
	const bagian = [];
	if (biblio.volume) bagian.push(`Vol. ${biblio.volume}`);
	if (biblio.issue) bagian.push(`No. ${biblio.issue}`);
	if (biblio.first_page) {
		bagian.push(
			biblio.last_page && biblio.last_page !== biblio.first_page
				? `hlm. ${biblio.first_page}–${biblio.last_page}`
				: `art. no. ${biblio.first_page}`,
		);
	}
	return bagian.join(", ");
}

function ubah(karya) {
	const sumber = karya.primary_location?.source ?? {};
	const judul = rapikanJudul(karya.title ?? karya.display_name ?? "");
	const jurnal = sumber.display_name ?? "";
	const penulis = (karya.authorships ?? [])
		.map((a) => a.author?.display_name)
		.filter(Boolean);

	const label = [];
	if (karya.open_access?.is_oa) label.push("Akses Terbuka");
	if (karya.type === "conference-paper" || karya.type === "proceedings-article")
		label.push("Prosiding");
	if (karya.cited_by_count > 0) label.push(`${karya.cited_by_count} sitasi`);

	return {
		doi: (karya.doi ?? "").replace("https://doi.org/", "").toLowerCase() || null,
		judul,
		jurnal,
		detail: susunDetail(karya.biblio),
		tahun: String(karya.publication_year ?? ""),
		penulis,
		sitasi: karya.cited_by_count ?? 0,
		aksesTerbuka: Boolean(karya.open_access?.is_oa),
		jenis: karya.type ?? "",
		tema: tebakTema(judul, jurnal),
		label,
	};
}

/* ── Jalankan ──────────────────────────────────────────────────── */

async function utama() {
	console.log(`Mengambil karya untuk ORCID ${ORCID} …`);

	const [mentah, doiDiOrcid] = await Promise.all([
		karyaOpenAlex(),
		doiOrcid().catch((e) => {
			console.warn(`  ! ORCID tidak terbaca (${e.message}), pemeriksaan silang dilewati.`);
			return new Set();
		}),
	]);

	if (!mentah.length) {
		throw new Error("OpenAlex tidak mengembalikan satu karya pun — dihentikan agar berkas lama tidak tertimpa.");
	}

	const karya = mentah
		.map(ubah)
		.sort((a, b) => Number(b.tahun) - Number(a.tahun) || b.sitasi - a.sitasi);

	const doiDiOpenAlex = new Set(karya.map((k) => k.doi).filter(Boolean));
	const hanyaDiOrcid = [...doiDiOrcid].filter((d) => !doiDiOpenAlex.has(d));

	const keluaran = {
		_catatan:
			"Berkas ini dibangkitkan otomatis oleh scripts/perbarui-publikasi.mjs. Jangan disunting tangan — pakai src/data/publikasi-manual.ts untuk koreksi.",
		diperbarui: new Date().toISOString(),
		orcid: ORCID,
		sumber: "OpenAlex (api.openalex.org), diperiksa silang dengan ORCID",
		ringkasan: {
			jumlahKarya: karya.length,
			totalSitasi: karya.reduce((n, k) => n + k.sitasi, 0),
			tahunTerawal: karya.length ? karya[karya.length - 1].tahun : "",
			hanyaAdaDiOrcid: hanyaDiOrcid,
		},
		karya,
	};

	let lama = null;
	try {
		lama = JSON.parse(await readFile(BERKAS, "utf8"));
	} catch {
		/* berkas belum ada */
	}

	const samaSaja =
		lama && JSON.stringify(lama.karya) === JSON.stringify(keluaran.karya);
	if (samaSaja) {
		console.log("Tidak ada perubahan data. Berkas dibiarkan apa adanya.");
		return;
	}

	await writeFile(BERKAS, JSON.stringify(keluaran, null, "\t") + "\n", "utf8");

	console.log(`Tersimpan: ${karya.length} karya, ${keluaran.ringkasan.totalSitasi} sitasi.`);
	const denganNama = karya.filter((k) =>
		k.penulis.some((p) => p.includes(NAMA_PENULIS)),
	).length;
	console.log(`  ${denganNama} di antaranya mencantumkan nama "${NAMA_PENULIS}".`);
	if (hanyaDiOrcid.length) {
		console.log(`  Ada di ORCID tetapi belum di OpenAlex: ${hanyaDiOrcid.join(", ")}`);
	}
}

utama().catch((galat) => {
	console.error("Gagal memperbarui publikasi:", galat.message);
	process.exit(1);
});
