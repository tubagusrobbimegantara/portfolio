---
judul: "Economic Order Quantity: Sekali Pesan Sebaiknya Berapa Banyak?"
deskripsi: "Menyeimbangkan ongkos pemesanan dan ongkos penyimpanan untuk menemukan ukuran pesanan paling hemat — diturunkan dua cara, dengan dan tanpa kalkulus, lengkap dengan contoh terhitung."
tanggal: 2026-09-27
kategori: "Manajemen Persediaan"
jenjang: "SMA — Kuliah"
tag: ["EOQ", "persediaan", "titik pesan ulang", "EPQ", "diskon kuantitas"]
video: "economic-order-quantity"
urutan: 2
---

Pemilik toko bangunan menghadapi pilihan yang terasa sepele tapi berulang
setiap bulan:

> **Sekali pesan semen, sebaiknya berapa sak?**

Materi ini menjawabnya sampai ke akar-akarnya. Rumusnya diturunkan dua kali —
sekali **tanpa kalkulus** untuk pembaca yang belum belajar turunan, dan sekali
**dengan turunan** untuk yang sudah. Setiap contoh dihitung sampai angkanya
kelihatan, termasuk cara menarik akar tanpa kalkulator.

## Dua ongkos yang saling berlawanan

Kalau memesan **sedikit-sedikit tapi sering**, gudang lega dan uang tidak
menumpuk jadi barang. Tapi setiap kali memesan ada ongkosnya: telepon ke
pemasok, surat jalan, ongkos kirim, waktu pegawai memeriksa barang datang.
Semakin sering memesan, semakin sering ongkos itu keluar.

Kalau memesan **banyak sekaligus**, ongkos pesan jarang muncul. Tapi gudang
penuh, modal tertahan dalam bentuk tumpukan semen yang belum laku, dan
sebagian barang bisa rusak, lembap, atau kedaluwarsa.

Jadi ada dua ongkos yang bergerak berlawanan arah:

| Kalau pesanan diperbesar | Ongkos pesan setahun | Ongkos simpan setahun |
|:--|:--|:--|
| lebih banyak sekali pesan | **turun** (jarang memesan) | **naik** (stok menumpuk) |
| lebih sedikit sekali pesan | **naik** (sering memesan) | **turun** (gudang lega) |

Kalau yang satu turun ketika yang lain naik, pasti ada titik di tengah tempat
jumlah keduanya paling kecil. Titik itulah yang dicari **Economic Order
Quantity** (EOQ) — model persediaan tertua yang masih dipakai sampai sekarang,
dirumuskan Ford W. Harris pada 1913 [3].

## Yang diketahui dan yang dicari

Empat besaran saja, tidak lebih:

| Lambang | Arti | Satuan | Contoh |
|:--:|:--|:--|:--|
| $D$ | permintaan selama setahun | unit/tahun | 14.400 sak |
| $S$ | ongkos **sekali** memesan, berapa pun jumlahnya | rupiah/pesanan | Rp200.000 |
| $H$ | ongkos menyimpan **satu unit** selama setahun | rupiah/unit/tahun | Rp4.000 |
| $Q$ | banyak unit sekali pesan — **inilah yang dicari** | unit | ? |

Dua hal yang sering salah dipahami:

- **$S$ tidak bergantung pada besar pesanan.** Mengurus satu truk semen dan
  satu sak semen sama-sama perlu surat jalan dan telepon. Ongkos yang naik
  seiring jumlah barang — misalnya harga beli semennya sendiri — tidak masuk
  ke $S$.
- **$H$ dihitung per unit per tahun.** Biasanya ditaksir sebagai persentase
  dari harga barang:

$$
H = i \cdot C,
$$

dengan $C$ harga beli per unit dan $i$ tingkat ongkos simpan per tahun.
Nilai $i$ mencakup bunga modal yang tertahan, sewa gudang, asuransi, dan
risiko kerusakan; di banyak perusahaan angkanya 15–30% per tahun. Contoh:
semen seharga Rp50.000/sak dengan $i = 8\%$ memberi
$H = 0{,}08 \times 50.000 = \text{Rp}4.000$ per sak per tahun.

### Anggapan yang dipakai

Model dasar EOQ berdiri di atas beberapa penyederhanaan [1]:

1. permintaan tetap dan diketahui pasti — $D$ unit setahun, mengalir merata;
2. barang datang **sekaligus**, tepat pada saat persediaan habis;
3. tidak pernah terjadi kehabisan stok;
4. ongkos pesan dan ongkos simpan tidak berubah sepanjang tahun;
5. harga per unit tetap, tidak ada potongan untuk pembelian banyak.

Anggapannya memang ketat, dan di dunia nyata tidak ada yang persis begitu.
Tapi bagian "Kalau pesanannya tidak pas EOQ" nanti menunjukkan alasan model
ini tetap berguna: hasilnya sangat pemaaf terhadap taksiran yang meleset.

## Membaca grafik persediaan

Bayangkan barang datang sebanyak $Q$ sak, lalu terjual perlahan sampai habis,
lalu datang lagi sebanyak $Q$, dan seterusnya. Grafik persediaannya berbentuk
gigi gergaji:

<figure class="gambar">
	<img src="/gambar/eoq-gergaji.svg" alt="Grafik persediaan berbentuk gigi gergaji: naik tegak ke Q lalu turun miring ke nol, berulang tiga kali" width="600" height="300" loading="lazy" />
	<figcaption><b>Gambar 1.</b> Persediaan melonjak ke <i>Q</i> saat barang datang, lalu turun merata sampai nol. Garis putus-putus di tengah adalah rata-ratanya, yaitu <i>Q</i>/2.</figcaption>
</figure>

Dari gambar itu terbaca dua hal yang kita butuhkan.

**Pertama, rata-rata persediaan.** Karena turunnya merata dari $Q$ sampai $0$,
rata-ratanya persis di tengah:

$$
\bar{I} = \frac{Q + 0}{2} = \frac{Q}{2}.
$$

Inilah banyaknya barang yang "dititipkan" di gudang sepanjang tahun, jadi
ongkos simpan setahun adalah $\dfrac{Q}{2} \cdot H$.

**Kedua, banyaknya pesanan.** Kalau setahun butuh $D$ unit dan sekali pesan
$Q$ unit, maka dalam setahun harus memesan

$$
\frac{D}{Q} \quad \text{kali},
$$

sehingga ongkos pesan setahun adalah $\dfrac{D}{Q} \cdot S$.

## Rumus ongkos total

Menjumlahkan keduanya:

$$
TC(Q) \;=\; \underbrace{\frac{D}{Q}\,S}_{\text{ongkos pesan}} \;+\; \underbrace{\frac{Q}{2}\,H}_{\text{ongkos simpan}} .
$$

Sebelum menyelesaikannya secara aljabar, mari coba beberapa nilai $Q$ dengan
angka dari contoh kita ($D = 14.400$, $S = 200.000$, $H = 4.000$). Semua dalam
rupiah:

| $Q$ | Pesanan/tahun $D/Q$ | Ongkos pesan | Ongkos simpan | **Total** |
|:--:|:--:|--:|--:|--:|
| 300 | 48 | 9.600.000 | 600.000 | 10.200.000 |
| 600 | 24 | 4.800.000 | 1.200.000 | 6.000.000 |
| 900 | 16 | 3.200.000 | 1.800.000 | 5.000.000 |
| **1.200** | **12** | **2.400.000** | **2.400.000** | **4.800.000** |
| 1.500 | 9,6 | 1.920.000 | 3.000.000 | 4.920.000 |
| 1.800 | 8 | 1.600.000 | 3.600.000 | 5.200.000 |
| 2.400 | 6 | 1.200.000 | 4.800.000 | 6.000.000 |
| 3.600 | 4 | 800.000 | 7.200.000 | 8.000.000 |

Tiga hal langsung terlihat:

1. Kolom "ongkos pesan" terus **turun**, kolom "ongkos simpan" terus **naik**.
2. Kolom total turun dulu, mencapai dasar di $Q = 1.200$, lalu naik lagi —
   berbentuk huruf U.
3. Tepat di dasar itu, **ongkos pesan dan ongkos simpan sama besar**, dua-duanya
   Rp2.400.000. Ini bukan kebetulan, dan sebentar lagi kita buktikan.

<figure class="gambar">
	<img src="/gambar/eoq-kurva.svg" alt="Kurva ongkos berbentuk U dengan dua kurva penyusunnya, titik terendah ditandai pada Q sama dengan 1200" width="600" height="350" loading="lazy" />
	<figcaption><b>Gambar 2.</b> Ongkos pesan menurun seperti kurva 1/<i>Q</i>, ongkos simpan menaik lurus. Jumlahnya membentuk kurva U dengan dasar di <i>Q</i>* = 1.200 sak. Perhatikan dasarnya sangat landai — sifat ini akan dipakai nanti.</figcaption>
</figure>

## Menemukan titik terendah — cara tanpa kalkulus

Perhatikan satu hal yang menarik. Kalikan kedua ongkos itu:

$$
\left(\frac{D}{Q}S\right) \times \left(\frac{Q}{2}H\right)
= \frac{D \cdot S \cdot Q \cdot H}{Q \cdot 2}
= \frac{DSH}{2}.
$$

Huruf $Q$ **saling menghapus**. Artinya: berapa pun ukuran pesanan yang
dipilih, hasil kali kedua ongkos itu selalu bernilai sama. Pada contoh kita:

$$
9.600.000 \times 600.000 = 4.800.000 \times 1.200.000 = 2.400.000 \times 2.400.000 = 5{,}76 \times 10^{12}. \;\checkmark
$$

Sekarang kita pakai sifat bilangan yang sederhana:

> **Sifat.** Bila dua bilangan positif hasil kalinya tetap, maka **jumlahnya
> paling kecil ketika kedua bilangan itu sama besar.**

Buktinya bisa dilihat dengan mencoba. Ambil dua bilangan yang hasil kalinya
selalu 36:

| Pasangan | $1, 36$ | $2, 18$ | $3, 12$ | $4, 9$ | $6, 6$ | $9, 4$ | $12, 3$ |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Jumlah | 37 | 20 | 15 | 13 | **12** | 13 | 15 |

Paling kecil memang saat keduanya sama, yaitu $6 + 6 = 12$. Secara umum, untuk
$a, b > 0$ berlaku ketaksamaan rata-rata:

$$
a + b \ge 2\sqrt{ab},
$$

dan tanda samadengan hanya tercapai bila $a = b$. (Buktinya satu baris: karena
$(\sqrt{a} - \sqrt{b})^2 \ge 0$, maka $a - 2\sqrt{ab} + b \ge 0$.)

Terapkan pada ongkos kita, dengan $a = \dfrac{D}{Q}S$ dan $b = \dfrac{Q}{2}H$:

$$
TC(Q) \;=\; a + b \;\ge\; 2\sqrt{ab} \;=\; 2\sqrt{\frac{DSH}{2}} \;=\; \sqrt{4 \cdot \frac{DSH}{2}} \;=\; \sqrt{2DSH}.
$$

Jadi ongkos total **tidak mungkin** lebih kecil daripada $\sqrt{2DSH}$, dan
nilai terkecil itu tercapai tepat ketika kedua ongkos sama besar:

$$
\frac{D}{Q}S = \frac{Q}{2}H .
$$

Tinggal diselesaikan. Kalikan silang:

$$
2DS = Q^{2}H \quad\Longrightarrow\quad Q^{2} = \frac{2DS}{H} \quad\Longrightarrow\quad Q = \sqrt{\frac{2DS}{H}} .
$$

$$
\boxed{\;Q^{*} = \sqrt{\frac{2DS}{H}}, \qquad TC(Q^{*}) = \sqrt{2DSH}\;}
$$

Tidak satu pun turunan dipakai.

## Menemukan titik terendah — cara dengan turunan

Bagi yang sudah belajar kalkulus, hasil yang sama diperoleh lebih cepat.
Tulis ulang ongkos totalnya memakai pangkat negatif supaya mudah diturunkan:

$$
TC(Q) = DS\,Q^{-1} + \frac{H}{2}\,Q .
$$

Turunkan terhadap $Q$, ingat bahwa turunan $Q^{-1}$ adalah $-Q^{-2}$:

$$
\frac{d\,TC}{dQ} = -DS\,Q^{-2} + \frac{H}{2} = -\frac{DS}{Q^{2}} + \frac{H}{2}.
$$

Di titik terendah, kemiringan kurva mendatar, jadi turunannya nol:

$$
-\frac{DS}{Q^{2}} + \frac{H}{2} = 0
\;\Longrightarrow\;
\frac{DS}{Q^{2}} = \frac{H}{2}
\;\Longrightarrow\;
Q^{2} = \frac{2DS}{H}
\;\Longrightarrow\;
Q^{*} = \sqrt{\frac{2DS}{H}} .
$$

Sama persis dengan hasil sebelumnya.

**Memastikan itu titik terendah, bukan tertinggi.** Turunkan sekali lagi:

$$
\frac{d^{2}\,TC}{dQ^{2}} = \frac{2DS}{Q^{3}} .
$$

Karena $D$, $S$, dan $Q$ semuanya positif, hasilnya selalu positif. Kurva
selalu melengkung ke atas, jadi titik yang kita temukan pasti minimum.

**Nilai ongkos di titik itu.** Substitusikan $Q^{*}$ ke $TC$:

$$
\begin{aligned}
TC(Q^{*}) &= \frac{D}{Q^{*}}S + \frac{Q^{*}}{2}H \\[4pt]
&= \frac{DS}{\sqrt{2DS/H}} + \frac{H}{2}\sqrt{\frac{2DS}{H}} \\[4pt]
&= \sqrt{\frac{DSH}{2}} + \sqrt{\frac{DSH}{2}} \;=\; 2\sqrt{\frac{DSH}{2}} \;=\; \sqrt{2DSH}.
\end{aligned}
$$

> **Kesimpulan yang layak diingat.** Ukuran pesanan paling hemat adalah ukuran
> yang membuat **ongkos pesan dan ongkos simpan sama besar** — bukan yang
> menekan salah satunya sampai sekecil mungkin. Kalau dalam mengerjakan soal
> kedua ongkos itu tidak sama, hampir pasti ada salah hitung.

Dua besaran turunan yang biasa ikut diminta:

$$
\text{banyak pesanan setahun } = \frac{D}{Q^{*}}, \qquad
\text{jarak antar pesanan } T = \frac{Q^{*}}{D}.
$$

## Contoh 1 — Toko bahan bangunan

Sebuah toko menjual $14.400$ sak semen per tahun dengan permintaan yang rata.
Sekali memesan ke pabrik, ongkos administrasi dan pengirimannya Rp200.000,
berapa pun jumlah yang dipesan. Ongkos menyimpan satu sak selama setahun
ditaksir Rp4.000. Tentukan ukuran pesanan paling hemat, berapa kali harus
memesan setahun, jarak antar pesanan, dan total ongkosnya.

**Penyelesaian.**

<div class="langkah">

**Langkah 1 — Catat yang diketahui.**

$$
D = 14.400 \text{ sak/tahun}, \qquad S = \text{Rp}200.000, \qquad H = \text{Rp}4.000 .
$$

**Langkah 2 — Masukkan ke rumus.**

$$
Q^{*} = \sqrt{\frac{2DS}{H}} = \sqrt{\frac{2 \times 14.400 \times 200.000}{4.000}} .
$$

Kerjakan pembilangnya dulu:

$$
2 \times 14.400 = 28.800, \qquad 28.800 \times 200.000 = 5.760.000.000 .
$$

Lalu bagi dengan $H$:

$$
\frac{5.760.000.000}{4.000} = 1.440.000 .
$$

**Langkah 3 — Tarik akarnya.** Tanpa kalkulator pun bisa, dengan memecah
bilangannya:

$$
\sqrt{1.440.000} = \sqrt{1{,}44 \times 10^{6}} = \sqrt{1{,}44} \times \sqrt{10^{6}} = 1{,}2 \times 1.000 = 1.200 .
$$

Jadi $Q^{*} = 1.200$ sak.

**Langkah 4 — Hitung besaran turunannya.**

$$
\frac{D}{Q^{*}} = \frac{14.400}{1.200} = 12 \text{ kali setahun},
$$

$$
T = \frac{Q^{*}}{D} = \frac{1.200}{14.400} = \frac{1}{12} \text{ tahun} = \frac{360}{12} = 30 \text{ hari}.
$$

**Langkah 5 — Hitung ongkosnya.**

$$
\begin{aligned}
\text{ongkos pesan} &= \frac{14.400}{1.200} \times 200.000 = 12 \times 200.000 = 2.400.000 \\
\text{ongkos simpan} &= \frac{1.200}{2} \times 4.000 = 600 \times 4.000 = 2.400.000 \\[4pt]
TC &= 2.400.000 + 2.400.000 = 4.800.000
\end{aligned}
$$

**Langkah 6 — Periksa dengan rumus ringkas.**

$$
\sqrt{2DSH} = \sqrt{2 \times 14.400 \times 200.000 \times 4.000} = \sqrt{2{,}304 \times 10^{13}} = 4.800.000 . \;\checkmark
$$

</div>

> **Jawaban.** Pesan **1.200 sak** sekali kirim, **12 kali setahun** atau
> sebulan sekali, dengan total ongkos persediaan **Rp4.800.000 per tahun**.
> Ongkos pesan dan ongkos simpan sama besar, masing-masing Rp2.400.000 —
> tanda perhitungannya benar.

## Contoh 2 — Kapan harus memesan lagi

Barang dari pabrik baru sampai $5$ hari setelah dipesan. Toko buka $360$ hari
setahun. Pada saat persediaan tinggal berapa sak, pesanan berikutnya harus
dikirim?

**Penyelesaian.**

Yang jadi soal di sini bukan *berapa banyak*, melainkan *kapan*. Selama
menunggu barang datang, toko tetap melayani pembeli, sehingga stok yang ada
harus cukup untuk menutupi masa tunggu itu.

<div class="langkah">

**Langkah 1 — Hitung permintaan harian.**

$$
d = \frac{D}{360} = \frac{14.400}{360} = 40 \text{ sak/hari}.
$$

**Langkah 2 — Kalikan dengan masa tunggu.** Dengan masa tunggu
$L = 5$ hari, kebutuhan selama menunggu adalah

$$
ROP = d \times L = 40 \times 5 = 200 \text{ sak}.
$$

</div>

<figure class="gambar">
	<img src="/gambar/eoq-rop.svg" alt="Grafik gigi gergaji dengan garis mendatar pada tinggi 200 menandai titik pesan ulang, dan penanda masa tunggu lima hari" width="600" height="300" loading="lazy" />
	<figcaption><b>Gambar 3.</b> Pesanan dikirim ketika stok menyentuh 200 sak. Selama lima hari menunggu, sisa stok itu habis terpakai persis saat barang baru datang.</figcaption>
</figure>

> **Jawaban.** Begitu persediaan menyentuh **200 sak**, pesanan berikutnya harus
> segera dikirim. Ketika barang datang, stok lama pas habis.

**Kalau masa tunggunya lebih panjang dari satu siklus.** Bila $L$ lebih besar
daripada jarak antar pesanan, rumusnya perlu dikurangi barang yang sudah
dalam perjalanan. Misalnya untuk $L = 40$ hari sementara siklusnya 30 hari,
kebutuhan selama menunggu $40 \times 40 = 1.600$ sak, sedangkan sudah ada satu
pesanan 1.200 sak dalam perjalanan, sehingga titik pesan ulangnya
$1.600 - 1.200 = 400$ sak.

**Kalau permintaan hariannya tidak selalu tetap.** Ditambahkan **persediaan
pengaman** $SS$ sebagai bantalan:

$$
ROP = d\,L + SS .
$$

Besarnya $SS$ ditentukan dari sebaran permintaan dan tingkat layanan yang
diinginkan; untuk permintaan yang berdistribusi normal dipakai
$SS = z_{\alpha}\,\sigma_{L}$, dengan $\sigma_L$ simpangan baku permintaan
selama masa tunggu dan $z_\alpha$ nilai baku untuk tingkat layanan yang
dipilih [4].

## Contoh 3 — Kalau pesanannya tidak pas EOQ

Pemasok hanya melayani kelipatan $500$ sak, sehingga toko terpaksa memesan
$1.500$ sak, bukan 1.200. Seberapa rugi?

**Penyelesaian.**

$$
\begin{aligned}
TC(1.500) &= \frac{14.400}{1.500}(200.000) + \frac{1.500}{2}(4.000) \\
          &= 9{,}6 \times 200.000 + 750 \times 4.000 \\
          &= 1.920.000 + 3.000.000 \;=\; \text{Rp}4.920.000 .
\end{aligned}
$$

Bandingkan dengan yang optimal:

$$
\frac{4.920.000}{4.800.000} = 1{,}025 \quad\Longrightarrow\quad \text{hanya } 2{,}5\% \text{ lebih mahal},
$$

padahal ukuran pesanannya melenceng $25\%$ dari nilai terbaik.

### Kenapa begitu pemaaf

Sifat ini berlaku umum. Tulis $r = Q/Q^{*}$, yaitu berapa kali lipat pesanan
kita dibanding yang optimal. Maka

$$
\begin{aligned}
\frac{TC(Q)}{TC(Q^{*})}
&= \frac{\dfrac{DS}{Q} + \dfrac{QH}{2}}{\sqrt{2DSH}} \\[6pt]
&= \frac{1}{2}\left( \frac{Q^{*}}{Q} + \frac{Q}{Q^{*}} \right)
\;=\; \frac{1}{2}\left( \frac{1}{r} + r \right).
\end{aligned}
$$

Masukkan beberapa nilai:

| Meleset sebesar | $r$ | Ongkos jadi | Kelebihan |
|:--|:--:|:--:|:--:|
| $-50\%$ (setengahnya) | 0,5 | $1{,}250 \times$ | +25% |
| $-25\%$ | 0,75 | $1{,}042 \times$ | +4,2% |
| $-10\%$ | 0,9 | $1{,}006 \times$ | +0,6% |
| tepat | 1 | $1{,}000 \times$ | 0 |
| $+25\%$ | 1,25 | $1{,}025 \times$ | +2,5% |
| $+100\%$ (dua kali lipat) | 2 | $1{,}250 \times$ | +25% |

> **Sifat penting.** Meleset $10\%$ hanya menaikkan ongkos $0{,}6\%$; bahkan
> memesan dua kali lipat pun cuma menaikkan $25\%$. Inilah alasan EOQ tetap
> berguna walaupun $D$, $S$, dan $H$ di lapangan hanya berupa taksiran
> kasar [4]. Jangan habiskan waktu menaksir $S$ sampai rupiah terakhir —
> ketelitian sebesar itu tidak terbayar.

## Perluasan yang sering dipakai

### EPQ — barang diproduksi sendiri, tidak datang sekaligus

Kalau perusahaan membuat sendiri komponennya, barang tidak muncul serentak
melainkan bertambah sedikit demi sedikit dengan laju produksi $p$ per hari,
sementara terus dipakai dengan laju $d$ per hari (dengan $p > d$).

Selama produksi berjalan, persediaan bertambah dengan laju $p - d$. Produksi
sebanyak $Q$ unit memakan waktu $Q/p$ hari, sehingga persediaan tertinggi yang
pernah tercapai bukan $Q$, melainkan

$$
I_{\max} = (p - d)\cdot\frac{Q}{p} = Q\left(1 - \frac{d}{p}\right),
$$

dan rata-ratanya separuh dari itu. Ongkos totalnya menjadi

$$
TC(Q) = \frac{D}{Q}S + \frac{Q}{2}\left(1 - \frac{d}{p}\right)H,
$$

sehingga dengan cara yang sama diperoleh

$$
Q^{*}_{\text{EPQ}} = \sqrt{\frac{2DS}{H\left(1 - \dfrac{d}{p}\right)}} .
$$

Perhatikan: karena $1 - d/p < 1$, penyebutnya mengecil dan $Q^{*}$ **membesar**
dibanding EOQ biasa. Masuk akal — barang yang menetes masuk tidak pernah
menumpuk setinggi barang yang datang sekaligus.

### Diskon untuk pembelian banyak

Kalau harga per unit turun bila memesan lebih banyak, ongkos pembelian
$D \cdot C$ ikut masuk hitungan:

$$
TC(Q) = D\,C + \frac{D}{Q}S + \frac{Q}{2}H, \qquad H = i \cdot C .
$$

Prosedurnya: hitung $Q^{*}$ pada setiap tingkat harga, buang yang tidak
memenuhi syarat jumlah minimalnya, naikkan ke batas terdekat bila perlu, lalu
bandingkan ongkos totalnya.

**Contoh.** Harga semen Rp50.000/sak, tetapi turun menjadi Rp47.500/sak bila
sekali pesan minimal 2.000 sak. Ongkos simpan $i = 8\%$ per tahun dari harga,
$D = 14.400$, $S = \text{Rp}200.000$.

*Tingkat 1 — harga Rp50.000, $H = 0{,}08 \times 50.000 = 4.000$.*

$Q^{*} = 1.200$ sak (sudah dihitung di Contoh 1), dan syaratnya $Q < 2.000$,
jadi **layak**.

$$
TC = \underbrace{14.400 \times 50.000}_{720.000.000} + 2.400.000 + 2.400.000 = \text{Rp}724.800.000 .
$$

*Tingkat 2 — harga Rp47.500, $H = 0{,}08 \times 47.500 = 3.800$.*

$$
Q^{*} = \sqrt{\frac{2 \times 14.400 \times 200.000}{3.800}} = \sqrt{1.515.789} \approx 1.231 \text{ sak}.
$$

Tapi syaratnya minimal 2.000 sak, sehingga 1.231 **tidak layak**. Karena kurva
ongkos menaik di sebelah kanan $Q^{*}$, pilihan terbaik pada tingkat ini adalah
batas terdekatnya, yaitu $Q = 2.000$:

$$
\begin{aligned}
TC &= \underbrace{14.400 \times 47.500}_{684.000.000} + \frac{14.400}{2.000}(200.000) + \frac{2.000}{2}(3.800) \\
   &= 684.000.000 + 1.440.000 + 3.800.000 \;=\; \text{Rp}689.240.000 .
\end{aligned}
$$

> **Jawaban.** Ambil diskonnya: pesan **2.000 sak** sekali kirim. Ongkos
> tahunannya Rp689.240.000, lebih hemat
> $724.800.000 - 689.240.000 = \text{Rp}35.560.000$ per tahun. Perhatikan
> ongkos persediaannya sendiri justru naik (dari 4,8 juta jadi 5,24 juta),
> tetapi penghematan harga beli jauh lebih besar.

### Perluasan lain

- **Boleh kehabisan sementara.** Kehabisan stok diperbolehkan dengan denda
  tertentu per unit per satuan waktu; ukuran pesanan optimalnya membesar.
- **Permintaan tidak pasti.** $D$ diperlakukan sebagai peubah acak, dan
  keputusannya bergeser ke model $(Q, r)$ untuk pemantauan terus-menerus atau
  model periodik untuk pemeriksaan berkala [4].
- **Beberapa jenis barang sekaligus** dengan batas anggaran atau luas gudang
  bersama, diselesaikan dengan pengali Lagrange.

## Kesalahan yang sering muncul

- **Satuan waktunya tidak seragam.** Kalau $D$ dinyatakan per tahun, maka $H$
  juga harus per tahun. Mencampur $D$ tahunan dengan $H$ bulanan menghasilkan
  $Q^{*}$ yang meleset $\sqrt{12} \approx 3{,}5$ kali lipat.
- **Memasukkan harga beli ke dalam $S$.** Harga beli sebanding dengan jumlah
  barang, sehingga tidak memengaruhi $Q^{*}$ sama sekali — kecuali kalau ada
  diskon jumlah.
- **Lupa memeriksa kesamaan dua ongkos.** Ini pemeriksaan tercepat: kalau
  ongkos pesan tidak sama dengan ongkos simpan pada $Q^{*}$, ada yang salah.
- **Membulatkan tanpa memeriksa.** Kalau pemasok hanya melayani kelipatan
  tertentu, periksa kedua kelipatan yang mengapit $Q^{*}$ dan pilih yang
  ongkosnya lebih kecil.

## Ringkasan langkah

<div class="langkah">

1. Kumpulkan $D$, $S$, dan $H$ — pastikan satuan waktunya seragam.
2. Hitung $Q^{*} = \sqrt{2DS/H}$.
3. Hitung $D/Q^{*}$ (banyak pesanan setahun) dan $T = Q^{*}/D$ (jarak antar
   pesanan).
4. Hitung $TC = \dfrac{D}{Q^{*}}S + \dfrac{Q^{*}}{2}H$, lalu periksa kedua suku
   itu sama besar.
5. Kalau ditanya kapan memesan: $ROP = d\,L$, dengan $d$ permintaan harian dan
   $L$ masa tunggu; tambahkan $SS$ bila permintaannya tidak pasti.
6. Kalau ada diskon jumlah atau batas kelipatan, ulangi untuk setiap tingkat
   harga lalu bandingkan ongkos totalnya.

</div>

## Latihan

1. Sebuah apotek menjual $3.600$ botol sirup per tahun. Ongkos sekali pesan
   Rp50.000 dan ongkos simpan Rp1.000 per botol per tahun. Tentukan $Q^{*}$,
   banyak pesanan setahun, dan total ongkosnya. *(Petunjuk: angkanya bulat.)*
2. Tunjukkan bahwa bila permintaan $D$ naik empat kali lipat, $Q^{*}$ hanya
   naik dua kali lipat. Apa artinya bagi toko yang penjualannya melonjak —
   apakah frekuensi memesan naik atau turun?
3. Harga semen naik sehingga $H$ berubah dari Rp4.000 menjadi Rp6.250 per sak
   per tahun. Hitung $Q^{*}$ dan $TC$ yang baru, lalu bandingkan dengan
   Contoh 1.
4. Buktikan sifat pada Contoh 3, yaitu
   $TC(Q)/TC(Q^{*}) = \tfrac{1}{2}\left(r + 1/r\right)$ dengan $r = Q/Q^{*}$,
   memakai $TC(Q^{*}) = \sqrt{2DSH}$.
5. Sebuah pabrik memproduksi sendiri komponennya dengan laju $200$ unit/hari
   sementara pemakaiannya $50$ unit/hari. Dengan $D = 12.000$ unit/tahun,
   $S = \text{Rp}400.000$, dan $H = \text{Rp}5.000$, tentukan ukuran produksi
   ekonomisnya. *(Jawaban: 1.600 unit.)*
6. Pada contoh diskon di atas, sampai harga tingkat kedua berapa rupiah diskon
   itu **tidak lagi** menguntungkan? Susun pertidaksamaannya lalu selesaikan.
7. Jelaskan mengapa hasil kali ongkos pesan dan ongkos simpan tidak bergantung
   pada $Q$, dan mengapa sifat itu langsung memberi rumus EOQ tanpa kalkulus.

## Lanjut ke mana

EOQ menjawab *berapa banyak* sekali pesan. Pertanyaan berikutnya biasanya
*dari gudang mana barang itu dikirim* — dijawab di
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
3. Harris, F. W. (1913). How many parts to make at once. *Factory, The Magazine
   of Management*, 10(2), 135–136, 152. Dicetak ulang dalam *Operations
   Research*, 38(6), 947–950 (1990).
   [doi:10.1287/opre.38.6.947](https://doi.org/10.1287/opre.38.6.947)
4. Nahmias, S., & Olsen, T. L. (2015). *Production and Operations Analysis*
   (7th ed., Bab 4–5). Long Grove, IL: Waveland Press.
5. Wilson, R. H. (1934). A scientific routine for stock control. *Harvard
   Business Review*, 13(1), 116–128.
6. Chopra, S., & Meindl, P. (2016). *Supply Chain Management: Strategy,
   Planning, and Operation* (6th ed., Bab 11). Boston: Pearson.
7. Zipkin, P. H. (2000). *Foundations of Inventory Management*. Boston:
   McGraw-Hill.
