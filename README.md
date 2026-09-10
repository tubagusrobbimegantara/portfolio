# Mathantara — Dari Masalah Menuju Wawasan

Situs Mathantara: video animasi matematika, materi bernotasi LaTeX, dan profil
Tubagus Robbi Megantara. Dibangun dengan Astro 5 dan dijalankan di Cloudflare
Workers.

Bahasa situs: **Indonesia**.

---

## Menambah konten

Seluruh isi situs berupa berkas. Tambah konten = tambah satu berkas Markdown,
lalu simpan. Tidak perlu menyentuh kode.

```
src/content/
  video/      ← satu berkas .md = satu video animasi
  materi/     ← satu berkas .md = satu materi matematika
public/
  thumbnail/  ← gambar thumbnail buatan sendiri (opsional)
```

Berkas yang namanya diawali garis bawah (`_template.md`) **tidak** ikut
dipublikasikan, jadi aman dipakai sebagai contoh isian.

### 1. Menambah video animasi

Salin `src/content/video/_template.md`, ganti namanya menjadi
`<nama-slug>.md`, lalu isi:

```yaml
---
judul: "Judul video"
caption: "Satu-dua kalimat yang tampil di bawah thumbnail."
tanggal: 2026-10-15

youtube: "https://youtu.be/XXXXXXXXXXX"
tiktok: ""
instagram: ""

thumbnail: ""                    # kosongkan bila ada tautan YouTube
materi: "economic-order-quantity" # slug materi terkait
durasi: "1:47"
topik: "Manajemen Persediaan"     # dipakai sebagai filter di halaman Video
unggulan: false
---

Paragraf keterangan tambahan (opsional).
```

Catatan:

- **Selama `youtube`, `tiktok`, dan `instagram` kosong**, kartunya otomatis
  bertanda "Segera hadir". Begitu salah satunya diisi, kartunya langsung aktif.
- **Thumbnail otomatis.** Kalau ada tautan YouTube, gambarnya diambil sendiri
  dari YouTube. Untuk TikTok/Instagram, simpan gambar di `public/thumbnail/`
  lalu tulis `thumbnail: "/thumbnail/namafile.jpg"`.
- Kolom `materi` diisi **nama berkas materi tanpa `.md`**. Tautan
  "Materi: …" muncul otomatis di kartunya, dua arah.

### 2. Menambah materi matematika

Salin `src/content/materi/_template.md`, ganti namanya menjadi
`<nama-slug>.md`. Nama berkas menjadi alamat halamannya
(`/materi/<nama-slug>`).

```yaml
---
judul: "Judul materi"
deskripsi: "Ringkasan satu kalimat untuk kartu dan hasil pencarian."
tanggal: 2026-10-15
kategori: "Riset Operasi"   # dipakai sebagai filter di halaman Materi
jenjang: "SMA — Kuliah"
tag: ["kata kunci", "kata kunci"]
video: "slug-video-terkait"
urutan: 4                   # angka kecil tampil lebih dulu
---
```

Isi badannya ditulis dengan Markdown biasa:

| Ingin menulis | Cara menulis |
| :-- | :-- |
| Rumus dalam kalimat | `$a^2 + b^2 = c^2$` |
| Rumus satu baris penuh | `$$ \int_0^1 x^2\,dx = \tfrac13 $$` |
| Sistem persamaan | `$$\begin{aligned} 2x + y &\le 80 \\ x + 2y &\le 70 \end{aligned}$$` |
| Bab | `## Judul bab` (otomatis masuk daftar isi) |
| Sub-bab | `### Judul sub-bab` |
| Kotak catatan/definisi | `> **Definisi.** …` |
| Tabel | tabel Markdown biasa (otomatis bisa digeser di layar kecil) |

Rumus dirender dengan **KaTeX saat build**, jadi halamannya tetap ringan dan
tidak memerlukan JavaScript tambahan di sisi pembaca.

Susunan yang dipakai ketiga materi yang ada: pengantar cerita → model
matematis → langkah pengerjaan → contoh soal terselesaikan → latihan →
**referensi**.

### 3. Mengubah profil

Biodata, pendidikan, peran, bidang penelitian, dan tautan media sosial ada di
`src/data/profil.ts`.

**Daftar publikasinya ditarik otomatis setiap hari**, jadi tidak perlu
diketik manual:

| Berkas | Sifat |
| :-- | :-- |
| `src/data/publikasi-otomatis.json` | dibangkitkan mesin — **jangan disunting** |
| `src/data/publikasi-manual.ts` | koreksi tangan — tidak pernah ditimpa |
| `scripts/perbarui-publikasi.mjs` | skrip penariknya |
| `.github/workflows/perbarui-publikasi.yml` | penjadwal harian, 04.17 WIB |

Sumber datanya **OpenAlex** (daftar karya, metadata, jumlah sitasi) dan
**ORCID** (pemeriksa silang). Keduanya gratis dan tidak memerlukan kunci API.
Setiap hari skrip berjalan; kalau ada karya atau sitasi baru, hasilnya
di-commit sendiri dan Cloudflare membangun ulang situsnya.

Untuk menjalankannya sendiri kapan saja:

```bash
node scripts/perbarui-publikasi.mjs
```

Kalau perlu mengoreksi hasilnya, buka `src/data/publikasi-manual.ts`:

- **`temaPerDoi`** — membetulkan pengelompokan tema, kuncinya DOI;
- **`sembunyikan`** — daftar DOI yang tidak ingin ditampilkan;
- **`tambahan`** — karya yang tidak terindeks di OpenAlex maupun ORCID.

> **Soal Scopus dan Google Scholar.** Scopus punya API resmi, tetapi
> memerlukan kunci Elsevier berikut entitlement langganan institusi — bisa
> ditambahkan kalau kuncinya tersedia. Google Scholar tidak menyediakan API
> resmi dan melarang pengambilan otomatis, sehingga angka sitasi versi
> Scholar tetap harus dicatat manual. Jumlah sitasi yang tampil di situs
> karena itu diberi label **OpenAlex**, bukan Scopus.

### 4. Menambah ilustrasi ke materi

Simpan gambarnya di `public/gambar/` (SVG paling bagus karena tajam di layar
mana pun; PNG/JPG juga bisa), lalu sisipkan di berkas materi:

```html
<figure class="gambar">
	<img src="/gambar/namafile.svg" alt="Keterangan gambar untuk pembaca layar" width="600" height="350" loading="lazy" />
	<figcaption><b>Gambar 1.</b> Penjelasan singkat isi gambarnya.</figcaption>
</figure>
```

Dua hal yang perlu diingat:

- Berkas SVG **wajib** memuat `xmlns="http://www.w3.org/2000/svg"` pada tag
  `<svg>`, kalau tidak gambarnya tidak akan tampil.
- Di dalam `<figcaption>`, rumus `$...$` **tidak** dirender. Pakai HTML biasa
  seperti `<i>Q</i>/2` untuk lambang di dalam keterangan gambar.

Ada juga kotak langkah bernomor untuk prosedur:

```html
<div class="langkah">

**Langkah 1.** Isi langkahnya.

</div>
```

### 5. Mengisi akun media sosial

Buka `src/consts.ts`, isi bagian `KANAL`:

```ts
export const KANAL = {
	youtube: "https://www.youtube.com/@mathantara",
	tiktok: "",
	instagram: "",
};
```

Yang kosong otomatis disembunyikan dari kaki halaman dan halaman Video.

---

## Halaman

| Alamat | Isi |
| :-- | :-- |
| `/` | Beranda — dunia pixel art, tiga jalur eksplorasi, materi & video, pengantar penyusun |
| `/video` | Video Animasi — kartu berisi thumbnail, tautan platform, caption, dan tautan materi |
| `/materi` | Materi Matematika — pencarian judul, deskripsi, dan tag; filter kategori; estimasi waktu baca |
| `/materi/<slug>` | Isi materi lengkap dengan LaTeX, daftar isi, dan tautan videonya |
| `/profil` | Profil Tubagus Robbi Megantara — pendidikan, penelitian, publikasi, tautan |

## Struktur berkas

```
scripts/
  perbarui-publikasi.mjs   penarik data publikasi harian
src/
  components/      BaseHead, BrandLogo, Header, Footer, VideoCard, MateriCard, PixelIcon, PixelWorld
  content/         video/ dan materi/  ← tempat menulis konten
  content.config.ts  aturan kolom untuk kedua koleksi
  data/            profil.ts, publikasi-manual.ts, publikasi-otomatis.json
  layouts/         Layout.astro
  lib/video.ts     pembantu thumbnail & tautan platform
  pages/           index, video/, materi/, profil, 404
  styles/global.css   sistem visual pixel art dan tata letak responsif
  styles/reading.css  tipografi artikel, rumus, tabel, dan profil
public/
  brand/           logo, lambang, avatar, gambar pratinjau
  gambar/          ilustrasi SVG untuk materi
  thumbnail/       gambar thumbnail video
  favicon-*.png    ikon asli Mathantara
  site.js          menu layar kecil, pencarian & filter, daftar isi
```

## Warna dan huruf

| Peran | Nilai |
| :-- | :-- |
| Hijau hutan | `#284E39` |
| Jingga tanah | `#BC5932` |
| Krem | `#F7F6ED` |
| Judul | Space Grotesk |
| Teks | DM Sans |
| Aksen pixel | Pixelify Sans |

Logo asli di `public/brand/wordmark.png` digunakan bersama oleh header dan footer
melalui `BrandLogo.astro`; warna, bentuk, dan proporsinya dipertahankan.
Ilustrasi pixel art dan ikon antarmuka dibuat sebagai SVG di komponen Astro. Teks panjang
dan rumus tetap menggunakan tipografi baca, dengan tabel dan rumus lebar yang
bisa digeser. Animasi menghormati `prefers-reduced-motion`. Seluruh konten tetap
terlihat tanpa JavaScript; pencarian dan filter bekerja lokal tanpa layanan eksternal.
Menu ponsel mendukung Escape, klik di luar menu, dan navigasi keyboard.

## Perintah

| Perintah | Kegunaan |
| :-- | :-- |
| `npm install` | Pasang dependensi |
| `npm run dev` | Jalankan di `localhost:4321` untuk melihat hasilnya |
| `npm run build` | Bangun ke `./dist/` |
| `npm run preview` | Bangun lalu jalankan seperti di Cloudflare |
| `npm run deploy` | Terbitkan ke Cloudflare Workers |
| `npm run publikasi` | Tarik ulang daftar publikasi dari OpenAlex + ORCID |

## Catatan penerapan

- Nama Worker pada `wrangler.json` masih `portfolio`, sehingga alamat lama
  `portfolio.tubagusrobbimegantara.workers.dev` langsung menayangkan situs
  baru ini.
- Untuk memakai **mathantara.com**, tambahkan *custom domain* pada Worker
  tersebut lewat dasbor Cloudflare (Workers → portfolio → Settings → Domains
  & Routes). Alamat kanonis di `astro.config.mjs` sudah disetel ke
  `https://mathantara.com`.
- Berkas logo beresolusi penuh disimpan di luar repositori (folder
  `mathantara/`); versi siap pakainya ada di `public/brand/`.
