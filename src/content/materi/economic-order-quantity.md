---
judul: "Economic Order Quantity: Sekali Pesan Sebaiknya Berapa Banyak?"
deskripsi: "Menyeimbangkan ongkos pemesanan dan ongkos penyimpanan untuk menemukan ukuran pesanan paling hemat, lengkap dengan penurunan rumus dan contoh terhitung."
tanggal: 2026-09-27
kategori: "Manajemen Persediaan"
jenjang: "SMA — Kuliah"
tag: ["EOQ", "persediaan", "titik pesan ulang", "turunan"]
video: "economic-order-quantity"
urutan: 2
---

Pemilik toko bangunan menghadapi pilihan yang terasa sepele tapi berulang
setiap bulan: **sekali pesan semen, sebaiknya berapa sak?**

Kalau memesan sedikit-sedikit tapi sering, gudangnya lega dan uang tidak
menumpuk jadi barang — tapi ongkos administrasi, telepon, dan ongkos kirim
per pesanan terus keluar. Kalau memesan banyak sekaligus, ongkos pesan
jarang muncul — tapi gudang penuh, modal tertahan, dan sebagian barang bisa
rusak atau kedaluwarsa.

Dua ongkos ini bergerak berlawanan. Yang satu turun saat yang lain naik.
Di antara keduanya pasti ada titik paling hemat, dan titik itulah yang
dicari **Economic Order Quantity** (EOQ) — model persediaan tertua yang
masih dipakai sampai sekarang, dirumuskan Ford W. Harris pada 1913 [3].

## Yang diketahui dan yang dicari

| Lambang | Arti | Satuan |
|:--:|:--|:--|
| $D$ | permintaan selama setahun | unit/tahun |
| $S$ | ongkos sekali memesan, berapa pun jumlahnya | rupiah/pesanan |
| $H$ | ongkos menyimpan satu unit selama setahun | rupiah/unit/tahun |
| $Q$ | banyak unit sekali pesan — **inilah yang dicari** | unit |

Ongkos pesan $S$ tidak bergantung pada besar pesanan: mengurus satu truk
semen dan satu sak semen sama-sama perlu surat jalan dan telepon.
Sementara ongkos simpan $H$ biasanya dihitung sebagai persentase dari harga
barang,

$$
H = i \cdot C,
$$

dengan $C$ harga beli per unit dan $i$ tingkat ongkos simpan per tahun —
mencakup bunga modal, sewa gudang, asuransi, dan risiko kerusakan.

### Anggapan yang dipakai

Model dasar EOQ berdiri di atas beberapa penyederhanaan [1]:

- permintaan tetap dan diketahui pasti,
- barang datang sekaligus, tepat saat persediaan habis,
- tidak ada kehabisan stok,
- ongkos pesan dan ongkos simpan tidak berubah,
- tidak ada potongan harga untuk pembelian banyak.

Anggapannya memang ketat. Tapi hasilnya ternyata tahan banting — bagian
akhir materi ini menunjukkan mengapa meleset sedikit pun tidak apa-apa.

## Menyusun rumus ongkos total

Karena barang datang sebanyak $Q$ lalu terpakai perlahan sampai habis, grafik
persediaannya berbentuk gigi gergaji: naik ke $Q$, turun ke $0$, naik lagi.
Maka **rata-rata persediaan** yang tersimpan di gudang adalah

$$
\bar{I} = \frac{Q + 0}{2} = \frac{Q}{2}.
$$

Sementara itu, kalau setahun butuh $D$ unit dan sekali pesan $Q$ unit, maka
banyaknya pesanan dalam setahun adalah $D/Q$ kali. Total ongkos setahun
menjadi

$$
TC(Q) \;=\; \underbrace{\frac{D}{Q}\,S}_{\text{ongkos pesan}} \;+\; \underbrace{\frac{Q}{2}\,H}_{\text{ongkos simpan}} .
$$

Perhatikan bentuk kedua sukunya. Suku pertama mengecil saat $Q$ membesar;
suku kedua justru membesar. Jumlahnya membentuk kurva berbentuk U — dan
titik terendah kurva itu yang ingin kita temukan.

## Menemukan titik terendah

Turunkan $TC$ terhadap $Q$, lalu samakan dengan nol:

$$
\frac{d\,TC}{dQ} = -\frac{DS}{Q^{2}} + \frac{H}{2} = 0
\;\Longrightarrow\;
\frac{DS}{Q^{2}} = \frac{H}{2}
\;\Longrightarrow\;
Q^{2} = \frac{2DS}{H}.
$$

Sehingga

$$
\boxed{\;Q^{*} = \sqrt{\frac{2DS}{H}}\;}
$$

Titik ini benar-benar minimum, bukan maksimum, karena turunan keduanya
selalu positif untuk $Q > 0$:

$$
\frac{d^{2}\,TC}{dQ^{2}} = \frac{2DS}{Q^{3}} > 0 .
$$

Masukkan $Q^{*}$ kembali ke $TC$, dan muncul bentuk yang rapi:

$$
TC(Q^{*}) = \sqrt{2DSH} .
$$

> **Yang menarik.** Pada $Q = Q^{*}$, ongkos pesan dan ongkos simpan
> besarnya **persis sama**:
> $$\frac{D}{Q^{*}}S = \frac{Q^{*}}{2}H = \frac{1}{2}\sqrt{2DSH}.$$
> Jadi ukuran pesanan paling hemat adalah ukuran yang membuat kedua ongkos
> itu seimbang — bukan yang menekan salah satunya sampai sekecil mungkin.

Dua besaran turunan yang biasa ikut dihitung:

$$
\text{banyak pesanan per tahun } = \frac{D}{Q^{*}}, \qquad
\text{jarak antar pesanan } T = \frac{Q^{*}}{D}.
$$

### Contoh 1 — Toko bahan bangunan

Sebuah toko menjual $14.400$ sak semen per tahun dengan permintaan yang
rata. Sekali memesan ke pabrik, ongkos administrasi dan pengirimannya
Rp200.000, berapa pun jumlah yang dipesan. Ongkos menyimpan satu sak selama
setahun ditaksir Rp4.000. Tentukan ukuran pesanan paling hemat, berapa kali
harus memesan setahun, dan berapa total ongkosnya.

**Penyelesaian.**

Diketahui $D = 14.400$ sak/tahun, $S = \text{Rp}200.000$ per pesanan, dan
$H = \text{Rp}4.000$ per sak per tahun.

$$
Q^{*} = \sqrt{\frac{2DS}{H}}
      = \sqrt{\frac{2 \times 14.400 \times 200.000}{4.000}}
      = \sqrt{1.440.000}
      = 1.200 \text{ sak}.
$$

Banyaknya pesanan per tahun:

$$
\frac{D}{Q^{*}} = \frac{14.400}{1.200} = 12 \text{ kali},
$$

artinya memesan sekali setiap bulan. Jarak antar pesanan:

$$
T = \frac{Q^{*}}{D} = \frac{1.200}{14.400} = \frac{1}{12} \text{ tahun} = 30 \text{ hari}.
$$

Total ongkosnya:

$$
\begin{aligned}
TC(1.200) &= \frac{14.400}{1.200}(200.000) + \frac{1.200}{2}(4.000) \\
          &= 2.400.000 + 2.400.000 \\
          &= \text{Rp}4.800.000 \text{ per tahun}.
\end{aligned}
$$

Cocok dengan rumus ringkasnya:
$\sqrt{2DSH} = \sqrt{2(14.400)(200.000)(4.000)} = \text{Rp}4.800.000$.

> **Jawaban.** Pesan $1.200$ sak sekali kirim, sebanyak $12$ kali setahun
> atau sebulan sekali, dengan total ongkos persediaan Rp4.800.000 per tahun.
> Perhatikan ongkos pesan dan ongkos simpan sama besar, masing-masing
> Rp2.400.000 — tanda perhitungannya benar.

### Contoh 2 — Kapan harus memesan lagi

Barang dari pabrik baru sampai $5$ hari setelah dipesan. Toko buka $360$
hari setahun. Pada persediaan tinggal berapa sak, pesanan berikutnya harus
dikirim?

**Penyelesaian.**

Permintaan per hari:

$$
d = \frac{D}{360} = \frac{14.400}{360} = 40 \text{ sak/hari}.
$$

Selama menunggu $L = 5$ hari, toko masih melayani pembeli, jadi persediaan
harus cukup untuk masa tunggu itu. **Titik pesan ulang**:

$$
ROP = d \times L = 40 \times 5 = 200 \text{ sak}.
$$

> **Jawaban.** Begitu persediaan menyentuh $200$ sak, pesanan berikutnya
> harus segera dikirim. Ketika barang datang, stok lama pas habis.

Kalau permintaan hariannya tidak selalu tetap, ditambahkan **persediaan
pengaman** $SS$, sehingga $ROP = dL + SS$. Besarnya $SS$
ditentukan dari sebaran permintaan dan tingkat layanan yang diinginkan [4].

### Contoh 3 — Kalau pesanannya tidak pas EOQ

Pemasok hanya melayani kelipatan $500$ sak, sehingga toko terpaksa memesan
$1.500$ sak. Seberapa rugi?

**Penyelesaian.**

$$
TC(1.500) = \frac{14.400}{1.500}(200.000) + \frac{1.500}{2}(4.000)
          = 1.920.000 + 3.000.000 = \text{Rp}4.920.000 .
$$

Selisihnya hanya Rp120.000, atau

$$
\frac{4.920.000}{4.800.000} = 1{,}025 \;\Rightarrow\; 2{,}5\% \text{ lebih mahal}.
$$

Padahal pesanannya melenceng $25\%$ dari nilai optimal.

> **Sifat penting.** Untuk sembarang ukuran pesanan $Q$,
> $$\frac{TC(Q)}{TC(Q^{*})} = \frac{1}{2}\left( \frac{Q}{Q^{*}} + \frac{Q^{*}}{Q} \right).$$
> Kurva ongkosnya sangat landai di sekitar titik minimum: meleset $25\%$
> hanya menaikkan ongkos $2{,}5\%$, dan meleset $100\%$ — memesan dua kali
> lipat — pun cuma menaikkan $25\%$. Inilah alasan EOQ tetap berguna
> walaupun $D$, $S$, dan $H$ di dunia nyata hanya berupa taksiran [4].

## Perluasan yang sering dipakai

- **EPQ** — ukuran produksi ekonomis. Barang tidak datang sekaligus,
  melainkan diproduksi bertahap dengan laju $p > d$. Rumusnya menjadi
  $$Q^{*} = \sqrt{\frac{2DS}{H\left(1 - \dfrac{d}{p}\right)}} .$$
- **Potongan harga pembelian banyak.** Harga per unit turun
  bila memesan lebih banyak. Ongkos pembelian $DC$ ikut masuk hitungan, dan
  setiap tingkat harga diperiksa satu per satu.
- **Boleh kehabisan sementara.** Kehabisan stok
  diperbolehkan dengan denda tertentu, sehingga ukuran pesanannya membesar.
- **Permintaan tak pasti.** $D$ diperlakukan sebagai peubah acak, dan
  keputusannya bergeser ke model $(Q, r)$ atau model periodik [4].

## Latihan

1. Sebuah apotek menjual $3.600$ botol sirup per tahun. Ongkos sekali pesan
   Rp50.000 dan ongkos simpan Rp1.000 per botol per tahun. Tentukan $Q^{*}$,
   banyak pesanan setahun, dan total ongkosnya.
2. Tunjukkan bahwa bila $D$ naik empat kali lipat, $Q^{*}$ hanya naik dua
   kali lipat. Jelaskan artinya bagi toko yang penjualannya melonjak.
3. Harga semen naik sehingga $H$ berubah dari Rp4.000 menjadi Rp6.250 per
   sak per tahun. Hitung $Q^{*}$ yang baru dan bandingkan total ongkosnya
   dengan Contoh 1.
4. Buktikan sifat pada Contoh 3, yaitu
   $TC(Q)/TC(Q^{*}) = \tfrac{1}{2}\left(Q/Q^{*} + Q^{*}/Q\right)$, dengan
   memakai $TC(Q^{*}) = \sqrt{2DSH}$.
5. Sebuah pabrik memproduksi sendiri komponennya dengan laju $200$ unit/hari
   sementara pemakaiannya $50$ unit/hari. Dengan $D = 12.000$ unit/tahun,
   $S = \text{Rp}400.000$, dan $H = \text{Rp}5.000$, tentukan ukuran
   produksi ekonomisnya memakai rumus EPQ.

## Lanjut ke mana

EOQ menjawab *berapa banyak* sekali pesan. Pertanyaan berikutnya biasanya
*dari gudang mana barang itu dikirim* — yang dijawab
[Masalah Transportasi](/materi/masalah-transportasi) — dan *lewat rute apa
kendaraannya berjalan*, yang dibahas di
[Vehicle Routing Problem](/materi/vehicle-routing-problem).

## Referensi

1. Silver, E. A., Pyke, D. F., & Thomas, D. J. (2016). *Inventory and
   Production Management in Supply Chains* (4th ed.). Boca Raton, FL: CRC
   Press.
2. Hillier, F. S., & Lieberman, G. J. (2015). *Introduction to Operations
   Research* (10th ed., Bab 18: Inventory Theory). New York: McGraw-Hill
   Education.
3. Harris, F. W. (1913). How many parts to make at once. *Factory, The
   Magazine of Management*, 10(2), 135–136, 152. Dicetak ulang dalam
   *Operations Research*, 38(6), 947–950 (1990).
   [doi:10.1287/opre.38.6.947](https://doi.org/10.1287/opre.38.6.947)
4. Nahmias, S., & Olsen, T. L. (2015). *Production and Operations Analysis*
   (7th ed., Bab 4–5). Long Grove, IL: Waveland Press.
5. Wilson, R. H. (1934). A scientific routine for stock control. *Harvard
   Business Review*, 13(1), 116–128.
6. Chopra, S., & Meindl, P. (2016). *Supply Chain Management: Strategy,
   Planning, and Operation* (6th ed., Bab 11). Boston: Pearson.
