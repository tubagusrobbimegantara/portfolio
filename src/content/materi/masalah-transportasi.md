---
judul: "Masalah Transportasi: Mengirim Barang dengan Ongkos Terkecil"
deskripsi: "Menyusun jadwal pengiriman dari beberapa gudang ke banyak toko agar total ongkosnya paling murah — dibedah langkah demi langkah, dari cara membaca tabelnya sampai membuktikan hasilnya sudah optimal."
tanggal: 2026-09-13
kategori: "Riset Operasi"
jenjang: "SMA — Kuliah"
tag: ["masalah transportasi", "VAM", "MODI", "stepping stone", "program linear"]
video: "masalah-transportasi"
urutan: 1
---

Sebuah perusahaan air minum punya tiga gudang dan empat toko langganan.
Setiap gudang punya persediaan terbatas, setiap toko punya pesanan yang harus
dipenuhi, dan ongkos kirim dari gudang mana ke toko mana berbeda-beda karena
jaraknya tidak sama. Pertanyaannya cuma satu:

> **Berapa ton barang yang dikirim dari tiap gudang ke tiap toko, supaya total
> ongkos kirimnya paling murah?**

Materi ini menyelesaikan pertanyaan itu sampai tuntas. Tidak ada langkah yang
dilewati: setiap angka dihitung terbuka, setiap keputusan dijelaskan alasannya.
Kalau Anda belum pernah bertemu notasi matematika seperti $\sum$ atau $x_{ij}$,
mulailah dari bagian pertama — semuanya diperkenalkan dari nol.

## Kenapa menebak biasanya meleset

Naluri pertama kita biasanya: *kirim dari gudang terdekat lebih dulu.* Terdengar
masuk akal. Masalahnya, gudang terdekat punya stok terbatas. Begitu stoknya
habis, toko yang belum kebagian terpaksa dilayani gudang yang jauh sekali — dan
ongkos yang "dihemat" di awal terbayar mahal di akhir.

Nanti kita akan lihat angkanya sendiri. Cara asal-asalan menghabiskan
**Rp925.000**, sedangkan cara yang benar cukup **Rp810.000**. Selisih
Rp115.000 untuk satu kali kirim; kalau pengirimannya harian, setahun selisihnya
lebih dari Rp40 juta.

## Bekal notasi

Bagian ini untuk pembaca yang belum akrab dengan lambang matematika. Kalau Anda
sudah terbiasa, lompat saja ke bagian berikutnya.

### Indeks: cara memberi nomor

Daripada menulis "banyak barang dari gudang 2 ke toko 3" berulang-ulang, kita
singkat menjadi

$$
x_{23}.
$$

Huruf $x$ artinya "banyak barang yang dikirim". Angka kecil di bawahnya disebut
**indeks**. Angka pertama menunjuk **gudang**, angka kedua menunjuk **toko**.
Jadi:

- $x_{11}$ = barang dari gudang 1 ke toko 1,
- $x_{23}$ = barang dari gudang 2 ke toko 3,
- $x_{34}$ = barang dari gudang 3 ke toko 4.

Kalau nomornya belum ditentukan, dipakai huruf: $x_{ij}$ berarti "dari gudang
ke-$i$ ke toko ke-$j$", dengan $i$ dan $j$ bisa diganti angka berapa pun yang
berlaku.

### Lambang sigma: cara menyingkat penjumlahan

Lambang $\sum$ (huruf Yunani *sigma*) artinya "jumlahkan". Tulisan

$$
\sum_{j=1}^{4} x_{2j}
$$

dibaca: "jumlahkan $x_{2j}$ untuk $j$ mulai dari 1 sampai 4", yaitu

$$
\sum_{j=1}^{4} x_{2j} = x_{21} + x_{22} + x_{23} + x_{24}.
$$

Karena indeks pertamanya tetap 2, kalimat itu berarti **seluruh barang yang
keluar dari gudang 2**. Begitu juga

$$
\sum_{i=1}^{3} x_{i3} = x_{13} + x_{23} + x_{33}
$$

berarti **seluruh barang yang masuk ke toko 3**, dari ketiga gudang.

Sigma hanyalah singkatan. Tidak ada yang rumit di baliknya.

## Membaca tabel transportasi

Seluruh data soal muat dalam satu tabel. Barisnya gudang, kolomnya toko, dan
angka di dalam kotak adalah **ongkos kirim per ton** (dalam ribu rupiah):

| | Toko 1 | Toko 2 | Toko 3 | Toko 4 | **Persediaan** |
|:--|:--:|:--:|:--:|:--:|:--:|
| **Gudang 1** | 8 | 6 | 10 | 9 | **30 ton** |
| **Gudang 2** | 9 | 12 | 13 | 7 | **40 ton** |
| **Gudang 3** | 14 | 9 | 16 | 5 | **30 ton** |
| **Permintaan** | **20** | **30** | **25** | **25** | 100 ton |

Cara membacanya:

- Angka $12$ pada baris Gudang 2, kolom Toko 2 berarti: mengirim **satu ton**
  dari Gudang 2 ke Toko 2 menghabiskan Rp12.000. Mengirim 5 ton berarti
  $5 \times 12 = 60$, yaitu Rp60.000.
- Kolom paling kanan: Gudang 1 hanya punya 30 ton, Gudang 2 punya 40 ton,
  Gudang 3 punya 30 ton.
- Baris paling bawah: Toko 1 memesan 20 ton, Toko 2 memesan 30 ton, dan
  seterusnya.

Yang belum diketahui adalah **isi 12 kotak itu** — berapa ton lewat tiap jalur.
Itulah yang akan kita cari.

## Menyusun modelnya

### Langkah 1 — Tentukan yang dicari

Ada $3 \times 4 = 12$ jalur pengiriman yang mungkin, jadi ada 12 bilangan yang
harus ditentukan:

$$
x_{ij} = \text{banyak ton yang dikirim dari gudang } i \text{ ke toko } j,
$$

dengan $i = 1, 2, 3$ dan $j = 1, 2, 3, 4$. Bilangan-bilangan inilah yang
disebut **peubah keputusan**.

Notasi lain yang dipakai seterusnya:

| Lambang | Arti | Contoh dari soal |
|:--:|:--|:--|
| $c_{ij}$ | ongkos kirim satu ton dari gudang $i$ ke toko $j$ | $c_{22} = 12$ |
| $s_i$ | persediaan gudang $i$ | $s_2 = 40$ |
| $d_j$ | permintaan toko $j$ | $d_3 = 25$ |
| $m$ | banyak gudang | $m = 3$ |
| $n$ | banyak toko | $n = 4$ |

### Langkah 2 — Tulis ongkos totalnya

Ongkos satu jalur = banyak ton $\times$ ongkos per ton, yaitu $c_{ij}\,x_{ij}$.
Ongkos seluruhnya tinggal menjumlahkan kedua belas jalur:

$$
z = c_{11}x_{11} + c_{12}x_{12} + \dots + c_{34}x_{34}
  = \sum_{i=1}^{m} \sum_{j=1}^{n} c_{ij}\, x_{ij}.
$$

Dua sigma bertumpuk hanya berarti "jumlahkan seluruh baris, dan di dalam tiap
baris jumlahkan seluruh kolom". Nilai $z$ inilah yang ingin dibuat sekecil
mungkin, sehingga ditulis $\min z$.

### Langkah 3 — Tulis syarat-syaratnya

**Syarat gudang.** Seluruh isi tiap gudang harus terkirim habis. Untuk
Gudang 1:

$$
x_{11} + x_{12} + x_{13} + x_{14} = 30.
$$

Untuk semua gudang sekaligus:

$$
\sum_{j=1}^{n} x_{ij} = s_i, \qquad i = 1, 2, \dots, m.
$$

**Syarat toko.** Pesanan tiap toko harus terpenuhi pas, tidak kurang dan tidak
lebih. Untuk Toko 3:

$$
x_{13} + x_{23} + x_{33} = 25.
$$

Untuk semua toko sekaligus:

$$
\sum_{i=1}^{m} x_{ij} = d_j, \qquad j = 1, 2, \dots, n.
$$

**Syarat kewajaran.** Tidak ada pengiriman bernilai negatif:

$$
x_{ij} \ge 0 \quad \text{untuk semua } i, j.
$$

### Model lengkapnya

$$
\begin{aligned}
\text{minimumkan} \quad & z = \sum_{i=1}^{m} \sum_{j=1}^{n} c_{ij}\, x_{ij} \\[4pt]
\text{dengan} \quad & \sum_{j=1}^{n} x_{ij} = s_i, && i = 1, \dots, m \\
& \sum_{i=1}^{m} x_{ij} = d_j, && j = 1, \dots, n \\
& x_{ij} \ge 0, && \text{untuk semua } i, j
\end{aligned}
$$

### Syarat keseimbangan

Model di atas hanya masuk akal bila jumlah barang yang tersedia sama dengan
jumlah yang dipesan:

$$
\sum_{i=1}^{m} s_i = \sum_{j=1}^{n} d_j .
$$

Pada soal kita:

$$
30 + 40 + 30 = 100 \qquad \text{dan} \qquad 20 + 30 + 25 + 25 = 100 . \;\checkmark
$$

Cocok, jadi soalnya **seimbang** dan bisa langsung dikerjakan. Kalau timpang,
ada cara menambalnya — dibahas di bagian akhir.

> **Dua sifat yang membuat masalah ini istimewa.**
>
> 1. Masalah transportasi sebenarnya program linear biasa, tetapi strukturnya
>    begitu teratur sehingga tidak perlu metode simpleks penuh — cukup
>    dikerjakan di atas tabel.
> 2. Kalau semua $s_i$ dan $d_j$ bilangan bulat, penyelesaian optimalnya pasti
>    bilangan bulat juga. Jadi tidak akan muncul jawaban ganjil semacam "kirim
>    12,5 ton" [4].

## Peta jalan pengerjaan

Pengerjaannya selalu dua tahap:

<div class="langkah">

**Tahap 1 — Susun penyelesaian awal.** Isi tabelnya sedemikian rupa sehingga
semua persediaan habis dan semua pesanan terpenuhi. Belum tentu termurah, yang
penting **sah**. Ada tiga cara yang lazim: Sudut Barat Laut, Biaya Terkecil,
dan Vogel.

**Tahap 2 — Uji dan perbaiki.** Periksa apakah masih ada jalur yang bisa
menurunkan ongkos. Kalau ada, geser muatannya; kalau tidak ada, berarti sudah
optimal. Alat ujinya bernama MODI.

</div>

Kita kerjakan ketiga cara Tahap 1 supaya kelihatan bedanya, lalu Tahap 2 kita
pakai dua kali: untuk membuktikan hasil Vogel sudah optimal, dan untuk
memperbaiki hasil Sudut Barat Laut yang belum optimal.

## Tahap 1a — Metode Sudut Barat Laut

Cara paling sederhana sekaligus paling naif. Aturannya cuma satu: **mulai dari
kotak kiri atas** (sudut "barat laut" peta), isi sebanyak-banyaknya, lalu
bergeser ke kanan bila kolomnya sudah penuh atau ke bawah bila barisnya sudah
habis. Ongkos sama sekali tidak dilihat.

"Sebanyak-banyaknya" berarti mengambil yang **lebih kecil** antara sisa
persediaan barisnya dan sisa permintaan kolomnya.

<div class="langkah">

**Langkah 1 — kotak (1,1).** Sisa Gudang 1 = 30 ton, sisa Toko 1 = 20 ton.
Ambil $\min(30, 20) = 20$. Isi 20.
Sisa Gudang 1 tinggal $30 - 20 = 10$; Toko 1 sudah **penuh** → geser ke kanan.

**Langkah 2 — kotak (1,2).** Sisa Gudang 1 = 10, sisa Toko 2 = 30.
Ambil $\min(10, 30) = 10$. Isi 10.
Gudang 1 **habis**; Toko 2 masih kurang $30 - 10 = 20$ → geser ke bawah.

**Langkah 3 — kotak (2,2).** Sisa Gudang 2 = 40, sisa Toko 2 = 20.
Ambil $\min(40, 20) = 20$. Isi 20.
Toko 2 **penuh**; Gudang 2 sisa $40 - 20 = 20$ → geser ke kanan.

**Langkah 4 — kotak (2,3).** Sisa Gudang 2 = 20, sisa Toko 3 = 25.
Ambil $\min(20, 25) = 20$. Isi 20.
Gudang 2 **habis**; Toko 3 sisa 5 → geser ke bawah.

**Langkah 5 — kotak (3,3).** Sisa Gudang 3 = 30, sisa Toko 3 = 5.
Ambil $\min(30, 5) = 5$. Isi 5.
Toko 3 **penuh**; Gudang 3 sisa 25 → geser ke kanan.

**Langkah 6 — kotak (3,4).** Sisa Gudang 3 = 25, sisa Toko 4 = 25.
Ambil $\min(25, 25) = 25$. Isi 25. Semuanya habis, selesai.

</div>

Hasilnya:

| | Toko 1 | Toko 2 | Toko 3 | Toko 4 | Terkirim |
|:--|:--:|:--:|:--:|:--:|:--:|
| **Gudang 1** | **20** | **10** | – | – | 30 ✓ |
| **Gudang 2** | – | **20** | **20** | – | 40 ✓ |
| **Gudang 3** | – | – | **5** | **25** | 30 ✓ |
| Diterima | 20 ✓ | 30 ✓ | 25 ✓ | 25 ✓ | |

Ongkosnya, dihitung kotak per kotak:

$$
\begin{aligned}
z &= 20(8) + 10(6) + 20(12) + 20(13) + 5(16) + 25(5) \\
  &= 160 + 60 + 240 + 260 + 80 + 125 \\
  &= 925 \quad \text{(ribu rupiah)}.
\end{aligned}
$$

**Rp925.000.** Cepat didapat, tapi jelas boros — jalur termahal di seluruh
tabel, yaitu kotak (3,3) dengan ongkos 16, malah terpakai. Wajar: metode ini
memang tidak pernah melirik ongkos.

## Tahap 1b — Metode Biaya Terkecil

Lebih masuk akal: **cari kotak dengan ongkos paling murah di seluruh tabel**,
isi sebanyak mungkin, coret baris atau kolom yang sudah habis, lalu ulangi
pada sisa tabel.

Urutkan dulu keduabelas ongkosnya dari yang termurah:

$$
5,\; 6,\; 7,\; 8,\; 9,\; 9,\; 9,\; 10,\; 12,\; 13,\; 14,\; 16.
$$

Sekarang telusuri satu per satu:

| Urutan | Ongkos | Kotak | Keputusan |
|:--:|:--:|:--:|:--|
| 1 | 5 | (3,4) | isi $\min(30, 25) = 25$ → Toko 4 penuh, Gudang 3 sisa 5 |
| 2 | 6 | (1,2) | isi $\min(30, 30) = 30$ → Gudang 1 habis **dan** Toko 2 penuh |
| 3 | 7 | (2,4) | lewati — Toko 4 sudah penuh |
| 4 | 8 | (1,1) | lewati — Gudang 1 sudah habis |
| 5 | 9 | (1,4) | lewati — keduanya sudah selesai |
| 6 | 9 | (2,1) | isi $\min(40, 20) = 20$ → Toko 1 penuh, Gudang 2 sisa 20 |
| 7 | 9 | (3,2) | lewati — Toko 2 sudah penuh |
| 8 | 10 | (1,3) | lewati — Gudang 1 sudah habis |
| 9 | 12 | (2,2) | lewati — Toko 2 sudah penuh |
| 10 | 13 | (2,3) | isi $\min(20, 25) = 20$ → Gudang 2 habis, Toko 3 sisa 5 |
| 11 | 14 | (3,1) | lewati — Toko 1 sudah penuh |
| 12 | 16 | (3,3) | isi $\min(5, 5) = 5$ → selesai |

Hasilnya:

| | Toko 1 | Toko 2 | Toko 3 | Toko 4 | Terkirim |
|:--|:--:|:--:|:--:|:--:|:--:|
| **Gudang 1** | – | **30** | – | – | 30 ✓ |
| **Gudang 2** | **20** | – | **20** | – | 40 ✓ |
| **Gudang 3** | – | – | **5** | **25** | 30 ✓ |
| Diterima | 20 ✓ | 30 ✓ | 25 ✓ | 25 ✓ | |

$$
\begin{aligned}
z &= 30(6) + 20(9) + 20(13) + 5(16) + 25(5) \\
  &= 180 + 180 + 260 + 80 + 125 \\
  &= 825 .
\end{aligned}
$$

**Rp825.000** — turun Rp100.000 dari cara sebelumnya. Tetapi kotak termahal
(3,3) masih terpakai juga, karena di akhir tidak ada pilihan lain. Ini
kelemahan khas metode biaya terkecil: ia rakus di awal dan menyesal di akhir.

> **Perhatikan.** Penyelesaian ini hanya memakai **5 kotak**, padahal
> seharusnya $m + n - 1 = 3 + 4 - 1 = 6$. Keadaan ini disebut *degenerate* dan
> perlu ditambal sebelum diuji dengan MODI — caranya dijelaskan di bagian
> "Dua keadaan khusus".

## Tahap 1c — Metode Aproksimasi Vogel

Ini metode yang paling sering dipakai, dan idenya cerdas. Alih-alih melihat
ongkos termurah, ia melihat **kerugian kalau ongkos termurah sampai tidak
kebagian**.

Untuk setiap baris dan setiap kolom, hitung **penalti**:

$$
\text{penalti} = (\text{ongkos termurah kedua}) - (\text{ongkos termurah}).
$$

Penalti besar berarti: *"di baris ini ada satu jalur murah, dan jalur
berikutnya jauh lebih mahal. Kalau yang murah ini keburu diambil orang lain,
ruginya besar."* Karena itu baris atau kolom berpenalti terbesar dilayani
lebih dulu.

Aturannya per iterasi: hitung semua penalti → ambil penalti terbesar → di
baris/kolom itu, isi kotak yang **ongkosnya termurah** sebanyak mungkin →
coret yang sudah habis → ulangi.

### Iterasi 1

Sisa persediaan $(30, 40, 30)$, sisa permintaan $(20, 30, 25, 25)$.

| Baris/kolom | Ongkos yang tersedia (urut) | Penalti |
|:--|:--|:--:|
| Gudang 1 | 6, 8, 9, 10 | $8 - 6 = 2$ |
| Gudang 2 | 7, 9, 12, 13 | $9 - 7 = 2$ |
| Gudang 3 | 5, 9, 14, 16 | $9 - 5 = \mathbf{4}$ |
| Toko 1 | 8, 9, 14 | $9 - 8 = 1$ |
| Toko 2 | 6, 9, 12 | $9 - 6 = 3$ |
| Toko 3 | 10, 13, 16 | $13 - 10 = 3$ |
| Toko 4 | 5, 7, 9 | $7 - 5 = 2$ |

Penalti terbesar **4** di Gudang 3. Ongkos termurah pada baris itu adalah
$c_{34} = 5$. Isi $\min(30, 25) = 25$ ton di kotak (3,4).
→ Toko 4 **penuh, dicoret**. Gudang 3 sisa 5 ton.

### Iterasi 2

Sisa persediaan $(30, 40, 5)$, sisa permintaan $(20, 30, 25)$ — kolom Toko 4
sudah tidak ikut.

| Baris/kolom | Ongkos tersisa | Penalti |
|:--|:--|:--:|
| Gudang 1 | 6, 8, 10 | $8 - 6 = 2$ |
| Gudang 2 | 9, 12, 13 | $12 - 9 = 3$ |
| Gudang 3 | 9, 14, 16 | $14 - 9 = \mathbf{5}$ |
| Toko 1 | 8, 9, 14 | $9 - 8 = 1$ |
| Toko 2 | 6, 9, 12 | $9 - 6 = 3$ |
| Toko 3 | 10, 13, 16 | $13 - 10 = 3$ |

Penalti terbesar **5** di Gudang 3. Ongkos termurah yang tersisa di baris itu
adalah $c_{32} = 9$. Isi $\min(5, 30) = 5$ ton di kotak (3,2).
→ Gudang 3 **habis, dicoret**. Toko 2 sisa 25 ton.

### Iterasi 3

Sisa persediaan $(30, 40)$, sisa permintaan $(20, 25, 25)$.

| Baris/kolom | Ongkos tersisa | Penalti |
|:--|:--|:--:|
| Gudang 1 | 6, 8, 10 | $8 - 6 = 2$ |
| Gudang 2 | 9, 12, 13 | $12 - 9 = 3$ |
| Toko 1 | 8, 9 | $9 - 8 = 1$ |
| Toko 2 | 6, 12 | $12 - 6 = \mathbf{6}$ |
| Toko 3 | 10, 13 | $13 - 10 = 3$ |

Penalti terbesar **6** di Toko 2 — masuk akal, sebab selisih 6 dan 12 memang
lebar. Ongkos termurah pada kolom itu $c_{12} = 6$. Isi $\min(30, 25) = 25$ ton
di kotak (1,2).
→ Toko 2 **penuh, dicoret**. Gudang 1 sisa 5 ton.

### Iterasi 4

Sisa persediaan $(5, 40)$, sisa permintaan $(20, 25)$.

| Baris/kolom | Ongkos tersisa | Penalti |
|:--|:--|:--:|
| Gudang 1 | 8, 10 | $10 - 8 = 2$ |
| Gudang 2 | 9, 13 | $13 - 9 = \mathbf{4}$ |
| Toko 1 | 8, 9 | $9 - 8 = 1$ |
| Toko 3 | 10, 13 | $13 - 10 = 3$ |

Penalti terbesar **4** di Gudang 2, ongkos termurahnya $c_{21} = 9$.
Isi $\min(40, 20) = 20$ ton di kotak (2,1).
→ Toko 1 **penuh, dicoret**. Gudang 2 sisa 20 ton.

### Iterasi 5

Tinggal kolom Toko 3 (sisa 25) dengan Gudang 1 (sisa 5) dan Gudang 2 (sisa 20).
Ketika sebuah baris hanya punya satu ongkos tersisa, penaltinya diambil sama
dengan ongkos itu sendiri.

| Baris/kolom | Ongkos tersisa | Penalti |
|:--|:--|:--:|
| Gudang 1 | 10 | 10 |
| Gudang 2 | 13 | $\mathbf{13}$ |
| Toko 3 | 10, 13 | $13 - 10 = 3$ |

Penalti terbesar **13** di Gudang 2. Isi $\min(20, 25) = 20$ ton di kotak (2,3).
→ Gudang 2 **habis**. Toko 3 sisa 5 ton.

### Iterasi 6

Tersisa satu kotak: (1,3). Isi $\min(5, 5) = 5$ ton. Selesai.

### Hasil metode Vogel

| | Toko 1 | Toko 2 | Toko 3 | Toko 4 | Terkirim |
|:--|:--:|:--:|:--:|:--:|:--:|
| **Gudang 1** | – | **25** | **5** | – | 30 ✓ |
| **Gudang 2** | **20** | – | **20** | – | 40 ✓ |
| **Gudang 3** | – | **5** | – | **25** | 30 ✓ |
| Diterima | 20 ✓ | 30 ✓ | 25 ✓ | 25 ✓ | |

$$
\begin{aligned}
z &= 25(6) + 5(10) + 20(9) + 20(13) + 5(9) + 25(5) \\
  &= 150 + 50 + 180 + 260 + 45 + 125 \\
  &= 810 .
\end{aligned}
$$

Kali ini kotak termahal (3,3) tidak terpakai sama sekali. Ringkasan ketiga
metode:

| Metode | Total ongkos | Kotak terisi |
|:--|:--:|:--:|
| Sudut Barat Laut | Rp925.000 | 6 |
| Biaya Terkecil | Rp825.000 | 5 (*degenerate*) |
| **Vogel (VAM)** | **Rp810.000** | 6 |

Tapi "paling murah di antara ketiganya" belum tentu "paling murah yang
mungkin". Itu harus dibuktikan.

## Tahap 2 — Menguji dengan metode MODI

### Gagasannya

Bayangkan kita memberi harga pada barang di setiap titik: nilai $u_i$ saat
barang masih di gudang $i$, dan nilai $v_j$ setelah sampai di toko $j$. Wajar
kalau selisih kedua nilai itu sama dengan ongkos angkutnya — setidaknya untuk
jalur yang **benar-benar dipakai**:

$$
u_i + v_j = c_{ij} \qquad \text{untuk setiap kotak terisi}.
$$

Angka $u_i$ dan $v_j$ ini disebut **harga bayangan** atau *potensial*. Setelah
semuanya ketahuan, kita bisa menaksir jalur yang **belum** dipakai: kalau
ongkos sebenarnya $c_{ij}$ ternyata **lebih murah** daripada $u_i + v_j$, jalur
itu layak dicoba dan ongkos total masih bisa turun.

Besaran yang diperiksa disebut **biaya tereduksi**:

$$
\bar{c}_{ij} = c_{ij} - (u_i + v_j).
$$

- $\bar{c}_{ij} > 0$ → memakai jalur ini justru menaikkan ongkos.
- $\bar{c}_{ij} = 0$ → tidak berpengaruh; ada penyelesaian optimal lain.
- $\bar{c}_{ij} < 0$ → **ongkos masih bisa turun**, jalur ini harus dipakai.

Penyelesaian dinyatakan **optimal** bila semua $\bar{c}_{ij} \ge 0$.

### Kenapa boleh menetapkan $u_1 = 0$

Kotak terisi ada $m + n - 1 = 6$, sehingga ada 6 persamaan. Sementara yang
dicari ada $m + n = 3 + 4 = 7$ angka ($u_1, u_2, u_3, v_1, \dots, v_4$).
Persamaannya kurang satu, jadi salah satu angka boleh dipilih bebas. Yang
lazim: $u_1 = 0$. Pilihan lain hanya menggeser semua $u$ dan $v$ sebesar
konstanta yang sama, sedangkan $\bar{c}_{ij}$ sama sekali tidak berubah.

### Menghitung $u$ dan $v$ untuk hasil Vogel

Kotak terisinya: (1,2), (1,3), (2,1), (2,3), (3,2), (3,4). Mulai dari
$u_1 = 0$, lalu setiap persamaan diselesaikan berurutan — selalu ada satu yang
tinggal punya satu bilangan tak diketahui.

$$
\begin{aligned}
(1,2):\quad u_1 + v_2 &= 6 &&\Rightarrow\; 0 + v_2 = 6 &&\Rightarrow\; v_2 = 6 \\
(1,3):\quad u_1 + v_3 &= 10 &&\Rightarrow\; 0 + v_3 = 10 &&\Rightarrow\; v_3 = 10 \\
(2,3):\quad u_2 + v_3 &= 13 &&\Rightarrow\; u_2 + 10 = 13 &&\Rightarrow\; u_2 = 3 \\
(2,1):\quad u_2 + v_1 &= 9 &&\Rightarrow\; 3 + v_1 = 9 &&\Rightarrow\; v_1 = 6 \\
(3,2):\quad u_3 + v_2 &= 9 &&\Rightarrow\; u_3 + 6 = 9 &&\Rightarrow\; u_3 = 3 \\
(3,4):\quad u_3 + v_4 &= 5 &&\Rightarrow\; 3 + v_4 = 5 &&\Rightarrow\; v_4 = 2
\end{aligned}
$$

Jadi $u = (0, 3, 3)$ dan $v = (6, 6, 10, 2)$.

### Memeriksa kotak kosong

| Kotak kosong | $c_{ij}$ | $u_i + v_j$ | $\bar{c}_{ij}$ | Arti |
|:--:|:--:|:--:|:--:|:--|
| (1,1) | 8 | $0 + 6 = 6$ | $+2$ | lebih mahal |
| (1,4) | 9 | $0 + 2 = 2$ | $+7$ | lebih mahal |
| (2,2) | 12 | $3 + 6 = 9$ | $+3$ | lebih mahal |
| (2,4) | 7 | $3 + 2 = 5$ | $+2$ | lebih mahal |
| (3,1) | 14 | $3 + 6 = 9$ | $+5$ | lebih mahal |
| (3,3) | 16 | $3 + 10 = 13$ | $+3$ | lebih mahal |

Semuanya positif — tidak ada satu pun jalur baru yang bisa menurunkan ongkos.

> **Jawaban.** Penyelesaian Vogel sudah **optimal**. Jadwal termurahnya:
> Gudang 1 → Toko 2 sebanyak 25 ton dan → Toko 3 sebanyak 5 ton; Gudang 2 →
> Toko 1 sebanyak 20 ton dan → Toko 3 sebanyak 20 ton; Gudang 3 → Toko 2
> sebanyak 5 ton dan → Toko 4 sebanyak 25 ton. Total **Rp810.000**.

<figure class="gambar">
	<img src="/gambar/transport-diagram.svg" alt="Diagram tiga gudang di kiri terhubung ke empat toko di kanan oleh enam garis, masing-masing berlabel jumlah ton dan ongkos per ton" width="600" height="380" loading="lazy" />
	<figcaption><b>Gambar 1.</b> Jadwal pengiriman optimal. Tebal garis sebanding dengan banyaknya muatan; label menunjukkan jumlah ton dan ongkos per ton. Hanya enam dari dua belas jalur yang terpakai.</figcaption>
</figure>

## Kalau hasilnya belum optimal: metode batu loncatan

Bagaimana kalau ada $\bar{c}_{ij}$ yang negatif? Kita perbaiki dengan
**metode batu loncatan** (*stepping stone*): masukkan jalur baru itu,
lalu geser muatan sepanjang sebuah lintasan tertutup agar semua persediaan dan
permintaan tetap terpenuhi.

Mari kita coba pada hasil Sudut Barat Laut yang tadi menghabiskan Rp925.000,
supaya prosedurnya terlihat penuh.

### Perbaikan 1: dari 925 ke 895

Kotak terisi: (1,1)=20, (1,2)=10, (2,2)=20, (2,3)=20, (3,3)=5, (3,4)=25.
Dengan $u_1 = 0$:

$$
\begin{aligned}
(1,1)&: v_1 = 8 &\quad (1,2)&: v_2 = 6 &\quad (2,2)&: u_2 = 12 - 6 = 6 \\
(2,3)&: v_3 = 13 - 6 = 7 &\quad (3,3)&: u_3 = 16 - 7 = 9 &\quad (3,4)&: v_4 = 5 - 9 = -4
\end{aligned}
$$

Biaya tereduksi kotak kosong:

| Kotak | $c_{ij}$ | $u_i + v_j$ | $\bar{c}_{ij}$ |
|:--:|:--:|:--:|:--:|
| (1,3) | 10 | $0 + 7$ | $+3$ |
| (1,4) | 9 | $0 - 4$ | $+13$ |
| (2,1) | 9 | $6 + 8$ | $-5$ |
| (2,4) | 7 | $6 - 4$ | $+5$ |
| (3,1) | 14 | $9 + 8$ | $-3$ |
| (3,2) | 9 | $9 + 6$ | $\mathbf{-6}$ |

Ada tiga yang negatif. Ambil yang **paling negatif**, yaitu kotak (3,2) dengan
$-6$: setiap ton yang dialihkan ke jalur itu menghemat Rp6.000.

**Membuat lintasan tertutup.** Mulai dari kotak masuk (3,2), lompati hanya
kotak-kotak terisi, bergantian arah mendatar dan menegak, sampai kembali ke
titik awal:

$$
(3,2)^{+} \;\to\; (3,3)^{-} \;\to\; (2,3)^{+} \;\to\; (2,2)^{-} \;\to\; \text{kembali ke } (3,2).
$$

Tanda $+$ dan $-$ berselang-seling. Artinya: kalau kita menaruh $\theta$ ton di
(3,2), maka (3,3) harus berkurang $\theta$, (2,3) bertambah $\theta$, dan (2,2)
berkurang $\theta$ — dengan begitu jumlah tiap baris dan tiap kolom tidak
berubah sama sekali.

<figure class="gambar">
	<img src="/gambar/transport-loop.svg" alt="Tabel tiga baris empat kolom dengan lintasan putus-putus melalui empat kotak, dua bertanda tambah dan dua bertanda kurang" width="600" height="330" loading="lazy" />
	<figcaption><b>Gambar 2.</b> Lintasan tertutupnya. Kotak bertanda + bertambah <i>θ</i> ton, kotak bertanda − berkurang <i>θ</i> ton. Karena setiap baris dan setiap kolom yang tersentuh memuat tepat satu + dan satu −, seluruh persediaan dan permintaan tetap terpenuhi.</figcaption>
</figure>

**Menentukan $\theta$.** Ambil isi terkecil di antara kotak bertanda $-$:

$$
\theta = \min\bigl(x_{33},\, x_{22}\bigr) = \min(5,\, 20) = 5 .
$$

Kotak (3,3) yang menjadi nol, jadi ia keluar dari daftar kotak terisi.

**Hasil pergeseran:** $(3,2) = 5$, $(3,3) = 0$, $(2,3) = 25$, $(2,2) = 15$.

$$
z_{\text{baru}} = 925 + 5 \times (-6) = 925 - 30 = 895 .
$$

Diperiksa langsung pun cocok:
$20(8) + 10(6) + 15(12) + 25(13) + 5(9) + 25(5) = 160 + 60 + 180 + 325 + 45 + 125 = 895$.

### Perbaikan 2: dari 895 ke 820

Kotak terisi kini (1,1)=20, (1,2)=10, (2,2)=15, (2,3)=25, (3,2)=5, (3,4)=25,
sehingga $u = (0, 6, 3)$ dan $v = (8, 6, 7, 2)$.

Biaya tereduksi: $(1,3) = +3$, $(1,4) = +7$, $(2,1) = \mathbf{-5}$,
$(2,4) = -1$, $(3,1) = +3$, $(3,3) = +6$.

Kotak masuk (2,1). Lintasannya

$$
(2,1)^{+} \to (2,2)^{-} \to (1,2)^{+} \to (1,1)^{-},
$$

dengan $\theta = \min(x_{22}, x_{11}) = \min(15, 20) = 15$; kotak (2,2) keluar.

$$
z_{\text{baru}} = 895 + 15 \times (-5) = 895 - 75 = 820 .
$$

### Perbaikan 3: dari 820 ke 810

Sekarang $u = (0, 1, 3)$ dan $v = (8, 6, 12, 2)$, dan yang masih negatif hanya
$(1,3) = -2$. Lintasannya

$$
(1,3)^{+} \to (1,1)^{-} \to (2,1)^{+} \to (2,3)^{-},
$$

dengan $\theta = \min(x_{11}, x_{23}) = \min(5, 25) = 5$; kotak (1,1) keluar.

$$
z_{\text{baru}} = 820 + 5 \times (-2) = 810 .
$$

### Pemeriksaan akhir

Kotak terisi menjadi (1,2)=25, (1,3)=5, (2,1)=20, (2,3)=20, (3,2)=5, (3,4)=25
— **persis sama dengan hasil metode Vogel.** Biaya tereduksinya semua positif,
jadi Rp810.000 memang ongkos terkecil yang mungkin.

| Perbaikan | Kotak masuk | $\bar{c}$ | $\theta$ | Ongkos |
|:--:|:--:|:--:|:--:|:--:|
| awal (Sudut Barat Laut) | — | — | — | 925 |
| 1 | (3,2) | $-6$ | 5 | 895 |
| 2 | (2,1) | $-5$ | 15 | 820 |
| 3 | (1,3) | $-2$ | 5 | **810** |

Inilah pelajaran pentingnya: **penyelesaian awal boleh sembarang**, asal
Tahap 2 dikerjakan sampai tuntas, hasil akhirnya tetap sama. Metode Vogel
sekadar memangkas jumlah perbaikan yang harus dilakukan — dalam kasus ini dari
tiga kali menjadi nol.

## Dua keadaan khusus

### Ketika kotak terisi kurang dari $m + n - 1$

Penyelesaian metode Biaya Terkecil tadi hanya memakai 5 kotak, padahal
seharusnya 6. Keadaan ini disebut **degenerate**, dan akibatnya sistem
persamaan $u_i + v_j = c_{ij}$ tidak cukup untuk menentukan semua $u$ dan $v$.

Penambalnya sederhana: pilih satu kotak kosong berongkos rendah yang tidak
membentuk lintasan tertutup dengan kotak-kotak terisi, lalu **isi dengan nol**.
Kotak bernilai nol itu dihitung sebagai "terisi" hanya untuk keperluan MODI,
dan tidak mengubah ongkos sama sekali.

### Ketika persediaan dan permintaan tidak seimbang

**Persediaan berlebih**, $\sum s_i > \sum d_j$. Tambahkan satu **toko semu**
dengan permintaan sebesar selisihnya dan ongkos kirim $0$ dari semua gudang.
Barang yang "dikirim" ke toko semu artinya tetap tinggal di gudang.

Contoh: bila Gudang 2 hanya punya 30 ton (total 90) sementara permintaan tetap
100 ton, berarti permintaan yang berlebih. Maka yang ditambahkan adalah
**gudang semu** berkapasitas $100 - 90 = 10$ ton dengan ongkos $0$ ke semua
toko. Toko yang dilayani gudang semu itulah toko yang pesanannya tidak
terpenuhi.

Kalau ada denda keterlambatan, ongkos pada baris/kolom semu diisi besaran
dendanya, bukan nol — dengan begitu model akan memilih toko mana yang paling
murah untuk dikecewakan.

Setelah ditambal, tabelnya kembali seimbang dan dikerjakan seperti biasa.

## Ringkasan langkah

<div class="langkah">

1. Susun tabel: baris = sumber, kolom = tujuan, isi kotak = ongkos satuan.
2. Periksa keseimbangan $\sum s_i = \sum d_j$; kalau timpang, tambahkan
   baris/kolom semu berongkos nol.
3. Buat penyelesaian awal — Vogel biasanya paling dekat ke optimal.
4. Hitung banyak kotak terisi. Kalau kurang dari $m + n - 1$, tambal dengan
   alokasi nol.
5. Hitung $u_i$ dan $v_j$ dari kotak terisi, mulai dengan $u_1 = 0$.
6. Hitung $\bar{c}_{ij} = c_{ij} - (u_i + v_j)$ untuk semua kotak kosong.
7. Kalau semuanya $\ge 0$ → **selesai, sudah optimal**. Kalau ada yang negatif,
   ambil yang paling negatif, buat lintasan tertutup, geser sebanyak $\theta$,
   lalu ulangi dari langkah 4.

</div>

## Latihan

1. Kerjakan ulang seluruh soal di atas dengan ongkos kotak (2,2) diubah dari
   $12$ menjadi $4$. Susun penyelesaian awal dengan Vogel, lalu uji dengan
   MODI. Apakah jadwalnya berubah?
2. Persediaan Gudang 2 berkurang menjadi $30$ ton karena satu tangki bocor.
   Tabelnya jadi timpang — tambahkan gudang semu, kerjakan, lalu tentukan toko
   mana yang pesanannya paling layak dikurangi dan jelaskan alasannya.
3. Tambal penyelesaian metode Biaya Terkecil yang *degenerate* dengan satu
   alokasi nol, lalu jalankan MODI sampai optimal. Berapa kali perbaikan yang
   dibutuhkan?
4. Buktikan bahwa masalah transportasi yang seimbang selalu punya penyelesaian
   layak, dengan menunjukkan bahwa
   $$x_{ij} = \frac{s_i\, d_j}{\sum_{k} s_k}$$
   memenuhi seluruh kendala.
5. Jelaskan mengapa pilihan $u_1 = 0$ tidak memengaruhi nilai $\bar{c}_{ij}$.
   Petunjuk: misalkan semua $u_i$ ditambah $t$ dan semua $v_j$ dikurangi $t$.
6. Metode Sudut Barat Laut tidak pernah melihat ongkos, tetapi selalu
   menghasilkan penyelesaian yang sah. Jelaskan mengapa demikian, dan mengapa
   banyak kotak terisinya selalu tepat $m + n - 1$ pada kasus tak-degenerate.

## Lanjut ke mana

Masalah transportasi menjawab "berapa banyak dikirim dari mana ke mana", tetapi
belum menjawab "lewat jalan mana dan urutan singgahnya bagaimana". Begitu satu
kendaraan harus menyinggahi beberapa toko dalam satu perjalanan, persoalannya
naik tingkat menjadi
[Vehicle Routing Problem](/materi/vehicle-routing-problem). Kalau yang ingin
ditentukan justru *seberapa banyak sekali pesan*, jawabannya ada di
[Economic Order Quantity](/materi/economic-order-quantity).

## Referensi

1. Hillier, F. S., & Lieberman, G. J. (2015). *Introduction to Operations
   Research* (10th ed., Bab 9: The Transportation and Assignment Problems).
   New York: McGraw-Hill Education.
2. Taha, H. A. (2017). *Operations Research: An Introduction* (10th ed.,
   Bab 5: Transportation Model and Its Variants). Boston: Pearson.
3. Hitchcock, F. L. (1941). The distribution of a product from several sources
   to numerous localities. *Journal of Mathematics and Physics*, 20(1–4),
   224–230.
   [doi:10.1002/sapm1941201224](https://doi.org/10.1002/sapm1941201224)
4. Dantzig, G. B. (1951). Application of the simplex method to a transportation
   problem. Dalam T. C. Koopmans (Ed.), *Activity Analysis of Production and
   Allocation* (hlm. 359–373). New York: Wiley.
5. Reinfeld, N. V., & Vogel, W. R. (1958). *Mathematical Programming*.
   Englewood Cliffs, NJ: Prentice-Hall. — sumber asli metode aproksimasi Vogel.
6. Winston, W. L. (2004). *Operations Research: Applications and Algorithms*
   (4th ed., Bab 7). Belmont, CA: Brooks/Cole.
7. Bazaraa, M. S., Jarvis, J. J., & Sherali, H. D. (2010). *Linear Programming
   and Network Flows* (4th ed., Bab 10). Hoboken, NJ: Wiley.
