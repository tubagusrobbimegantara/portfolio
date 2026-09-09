---
# ── Salin berkas ini, ganti namanya jadi <slug>.md, lalu isi kolom di bawah.
#    Nama berkas = alamat halaman (/materi/<slug>) sekaligus penanda yang
#    dipakai kolom `materi:` pada berkas video.
#    Berkas yang diawali "_" tidak ikut dipublikasikan.

judul: "Judul materi"
deskripsi: "Ringkasan satu kalimat untuk kartu dan hasil pencarian."
tanggal: 2026-01-01
kategori: "Optimisasi"          # dipakai sebagai filter di halaman Materi
jenjang: "SMA"                  # SMA / Kuliah / Umum
tag: ["contoh", "tag"]
video: ""                       # slug video terkait, mis. "program-linear-metode-grafik"
urutan: 0                       # angka kecil tampil lebih dulu
---

## Menulis rumus

Rumus dalam baris ditulis di antara satu tanda dolar: $a^2 + b^2 = c^2$.

Rumus satu baris penuh ditulis di antara dua tanda dolar:

$$
\int_0^1 x^2 \,dx = \frac{1}{3}
$$

Sistem persamaan memakai lingkungan `aligned`:

$$
\begin{aligned}
2x + y &\le 80 \
x + 2y &\le 70
\end{aligned}
$$

## Struktur yang dipakai di situs ini

Gunakan `##` untuk bab, `###` untuk sub-bab. Judul `##` otomatis masuk
daftar isi di sisi kanan halaman.

> Kutipan dipakai untuk menandai definisi atau catatan penting.

Untuk contoh soal, awali dengan `### Contoh 1 — Judul singkat`, lalu tulis
soalnya, dan pisahkan penyelesaiannya dengan sub-bab `**Penyelesaian.**`.
