# Mathantara — Dari Masalah Menuju Wawasan

Situs Mathantara: video animasi matematika, materi bernotasi LaTeX, dan profil
Tubagus Robbi Megantara. Dibangun dengan Astro 5 dan dijalankan di Cloudflare
Workers.

Bahasa situs: **Indonesia**.

---

## Mengelola lewat CMS

Ada penyunting berbasis web di **<https://mathantara.com/admin>**. Masuk dengan
akun GitHub, lalu tambah atau ubah video dan materi lewat formulir — tanpa
membuka editor kode. Setiap kali disimpan, CMS membuat satu commit ke
repositori ini dan situs dibangun ulang seperti biasa.

Formulir materi sudah membawa kerangka isi (persoalan → model → contoh →
latihan) sebagai isian awal, jadi tidak perlu menyalin `_template.md` lagi.
Kerangka itu hanya titik mulai; isinya bebas ditimpa.

Kolom di CMS mengikuti skema di `src/content.config.ts`. Kalau ada kolom baru
di sana, tambahkan juga di `public/admin/config.yml` agar keduanya sejalan.

### Menyiapkan CMS (sekali saja)

Tombol "Sign in with GitHub" perlu satu OAuth App milik sendiri. Relainya sudah
ada di dalam situs ini (`src/pages/oauth/`), jadi tidak perlu layanan lain.

1. Buka GitHub → **Settings** → **Developer settings** → **OAuth Apps** →
   **New OAuth App**, lalu isi:

   | Kolom | Nilai |
   | :-- | :-- |
   | Application name | `Mathantara CMS` |
   | Homepage URL | `https://mathantara.com` |
   | Authorization callback URL | `https://mathantara.com/oauth/callback` |

2. Salin **Client ID**, lalu tekan **Generate a new client secret** dan salin
   nilainya. Simpan keduanya sebagai rahasia Worker:

   ```sh
   npx wrangler secret put GITHUB_CLIENT_ID
   npx wrangler secret put GITHUB_CLIENT_SECRET
   ```

3. Terbitkan ulang dengan `npm run deploy`, lalu buka `/admin`.

Rahasianya hanya tersimpan di Cloudflare — tidak pernah masuk ke repositori.
Relai hanya melayani permintaan dari host situs ini sendiri; untuk mengizinkan
host lain (mis. alamat `*.workers.dev`), tambahkan rahasia opsional
`ALLOWED_DOMAINS` berisi daftar host dipisah koma.

Untuk mencoba di komputer sendiri, salin `.dev.vars.example` menjadi `.dev.vars`
dan isi kedua nilai tadi. Bila alamat situs berubah dari `mathantara.com`,
sesuaikan `base_url` di `public/admin/config.yml` dan *callback URL* di GitHub.

Berkas CMS-nya dikunci ke satu versi dan diperiksa dengan `integrity`. Saat
menaikkan versinya di `public/admin/index.html`, perbarui juga nilai
`integrity`-nya:

```sh
curl -sL https://unpkg.com/@sveltia/cms@<versi>/dist/sveltia-cms.js \
  | openssl dgst -sha256 -binary | openssl base64 -A
```

---

## Menambah konten lewat berkas

Cara ini tetap berlaku dan setara dengan CMS — keduanya menulis berkas yang
sama. Seluruh isi situs berupa berkas. Tambah konten = tambah satu berkas
Markdown, lalu simpan. Tidak perlu menyentuh kode.

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
| `/` | Beranda — pengantar, perbandingan rute pengiriman interaktif, dan satu sorotan persoalan |
| `/video` | Video Animasi — kartu berisi thumbnail, tautan platform, caption, dan tautan materi |
| `/materi` | Materi Matematika — pencarian judul, deskripsi, dan tag; filter kategori; estimasi waktu baca |
| `/materi/<slug>` | Isi materi lengkap dengan LaTeX, daftar isi, dan tautan videonya |
| `/profil` | Profil Tubagus Robbi Megantara — pendidikan, penelitian, publikasi, tautan |

## Struktur berkas

```
scripts/
  perbarui-publikasi.mjs   penarik data publikasi harian
src/
  components/      BaseHead, BrandLogo, Header, Footer, VideoCard, MateriCard, PixelIcon, RouteExplorer, TopicArt
  content/         video/ dan materi/  ← tempat menulis konten
  content.config.ts  aturan kolom untuk kedua koleksi
  data/            profil.ts, publikasi-manual.ts, publikasi-otomatis.json
  layouts/         Layout.astro
  lib/video.ts     pembantu thumbnail & tautan platform
  lib/oauth.ts     relai OAuth GitHub untuk CMS
  pages/           index, video/, materi/, profil, 404
  pages/oauth/     titik masuk & callback OAuth (dijalankan di server)
  styles/global.css   token warna, tipografi, dan tata letak responsif
  styles/reading.css  tipografi artikel, rumus, tabel, dan profil
public/
  admin/           CMS: index.html dan config.yml
  brand/           logo, lambang, avatar, gambar pratinjau
  gambar/          ilustrasi SVG untuk materi
  thumbnail/       gambar thumbnail video
  favicon-*.png    ikon asli Mathantara
  fonts/           Fredoka (Latin, 300-700), WOFF2 dan lisensi OFL
  site.js          menu layar kecil, pencarian & filter, daftar isi
```

## Warna dan huruf

Tata letaknya minimalis: satu warna aksen, garis rambut setebal 1 px, dan ruang
kosong sebagai pemisah — tanpa bayangan, bingkai ganda, atau latar bermotif.
Seluruh nilai di bawah tersimpan sebagai token CSS di `src/styles/global.css`,
jadi cukup diubah di satu tempat.

| Peran | Token | Nilai |
| :-- | :-- | :-- |
| Aksen (maroon logo) | `--accent` | `#5D2021` |
| Aksen gelap | `--accent-d` | `#421517` |
| Latar halaman | `--bg` | `#FCFBF8` |
| Latar lembut | `--bg-soft` | `#F4F1EA` |
| Teks utama | `--ink` | `#221E1C` |
| Teks sekunder | `--ink-2` | `#605953` |
| Teks tersier & label | `--ink-3` | `#8B837B` |
| Garis | `--line` | `#E8E3DA` |
| Emas (aksen ilustrasi) | `--gold` | `#A88454` |

Semua teks memakai **Fredoka** (300–700) yang disajikan lokal dari satu berkas
variabel, tanpa permintaan ke layanan font pihak ketiga. Judul memakai bobot 600
agar tegas tanpa berteriak; kode dan nomor DOI memakai huruf monospace bawaan
sistem.

Logo asli di `public/brand/wordmark.png` digunakan bersama oleh header dan footer
melalui `BrandLogo.astro`; warna, bentuk, dan proporsinya dipertahankan.
Ilustrasi kartu dan ikon antarmuka dibuat sebagai SVG di komponen Astro —
diagram bergaris tanpa teks, karena judul dan ringkasannya sudah ada tepat di
bawahnya. Teks panjang
dan rumus tetap menggunakan tipografi baca, dengan tabel dan rumus lebar yang
bisa digeser. Animasi menghormati `prefers-reduced-motion`. Seluruh konten tetap
terlihat tanpa JavaScript; pencarian dan filter bekerja lokal tanpa layanan eksternal.
Menu ponsel mendukung Escape, klik di luar menu, dan navigasi keyboard.
Tanpa JavaScript, navigasi tetap terlihat dan kontrol pencarian yang tidak aktif
disembunyikan. Daftar isi mendahului artikel dalam urutan baca dan dapat dilipat;
di ponsel, daftar isi dilipat saat halaman dibuka. Label jenjang tidak ditampilkan.

Peta beranda adalah contoh ilustratif dengan panjang satu ruas = 1 km.
Tiga urutan kunjungan menghasilkan 26, 20, dan 24 km; setiap rute kembali ke gudang.
Jarak dihitung dari ruas horizontal dan vertikal saat build. Tanpa JavaScript,
rute pertama tetap terlihat. Ilustrasi kartu mengikuti topik persediaan,
transportasi, atau rute kendaraan.

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
- Halaman `/admin` dan dua rute `/oauth` ikut terbit bersama situs. Rute OAuth
  berjalan di sisi server (`prerender = false`), sedangkan sisa halaman tetap
  dibangun sebagai HTML statis seperti sebelumnya.
- Selama `GITHUB_CLIENT_ID` dan `GITHUB_CLIENT_SECRET` belum diisi, `/admin`
  tetap terbuka tetapi proses masuknya berhenti dengan pesan bahwa server
  belum diatur — tidak ada akses tulis yang bocor.
