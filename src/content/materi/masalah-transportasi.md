---
judul: "Masalah Transportasi: Mengirim Barang dengan Ongkos Terkecil"
deskripsi: "Menyusun jadwal pengiriman dari beberapa gudang ke banyak toko agar total ongkosnya paling murah — dari tabel sederhana sampai uji optimalitas."
tanggal: 2026-09-13
kategori: "Riset Operasi"
jenjang: "SMA — Kuliah"
tag: ["masalah transportasi", "VAM", "MODI", "program linear"]
video: "masalah-transportasi"
urutan: 1
---

Sebuah perusahaan air minum punya tiga gudang dan empat toko langganan.
Setiap gudang punya persediaan terbatas, setiap toko punya pesanan yang
harus dipenuhi, dan ongkos kirim dari gudang mana ke toko mana berbeda-beda
karena jaraknya tidak sama. Pertanyaannya cuma satu: **berapa banyak barang
yang dikirim dari tiap gudang ke tiap toko supaya total ongkosnya paling
murah?**

Kalau dikira-kira saja, kita bisa saja mengirim dari gudang yang paling
dekat lebih dulu. Sayangnya itu sering meleset — gudang terdekat bisa
kehabisan stok, dan toko sisanya terpaksa dilayani gudang yang jauh sekali.
Untung ada cara yang lebih rapi, dan namanya **masalah transportasi**.

## Bentuk masalahnya

Bayangkan tabel. Barisnya gudang, kolomnya toko, dan angka di dalam kotak
adalah ongkos kirim per ton:

| Ongkos (ribu Rp/ton) | Toko 1 | Toko 2 | Toko 3 | Toko 4 | **Persediaan** |
|:--|:--:|:--:|:--:|:--:|:--:|
| **Gudang 1** | 8 | 6 | 10 | 9 | 30 ton |
| **Gudang 2** | 9 | 12 | 13 | 7 | 40 ton |
| **Gudang 3** | 14 | 9 | 16 | 5 | 30 ton |
| **Permintaan** | 20 | 30 | 25 | 25 | 100 ton |

Yang dicari adalah isi kotak-kotak itu: berapa ton dikirim lewat tiap jalur.

## Model matematisnya

Misalkan ada $m$ gudang dan $n$ toko. Tulis

$$
x_{ij} = \text{banyak barang yang dikirim dari gudang } i \text{ ke toko } j .
$$

Notasi lain yang dipakai:

| Lambang | Arti |
|:--|:--|
| $c_{ij}$ | ongkos kirim satu satuan barang dari gudang $i$ ke toko $j$ |
| $s_i$ | persediaan di gudang $i$ |
| $d_j$ | permintaan toko $j$ |

Total ongkos yang ingin ditekan adalah jumlah dari (banyak barang $\times$
ongkos per satuan) untuk semua jalur:

$$
\min \; z = \sum_{i=1}^{m} \sum_{j=1}^{n} c_{ij}\, x_{ij}
$$

dengan tiga kelompok syarat:

$$
\begin{aligned}
\sum_{j=1}^{n} x_{ij} &= s_i, && i = 1, 2, \dots, m \quad \text{(isi gudang habis terkirim)} \\
\sum_{i=1}^{m} x_{ij} &= d_j, && j = 1, 2, \dots, n \quad \text{(pesanan tiap toko terpenuhi)} \\
x_{ij} &\ge 0, && \text{untuk semua } i, j \quad \text{(tidak ada kiriman negatif)}
\end{aligned}
$$

Baris pertama dibaca: seluruh isi gudang $i$, kalau dijumlahkan ke semua
toko, harus habis. Baris kedua: seluruh kiriman yang masuk ke toko $j$,
dari semua gudang, harus pas sebanyak pesanannya.

> **Syarat keseimbangan.** Model di atas hanya punya penyelesaian bila
> $$\sum_{i=1}^{m} s_i = \sum_{j=1}^{n} d_j .$$
> Pada contoh kita $30 + 40 + 30 = 100$ dan $20 + 30 + 25 + 25 = 100$,
> jadi sudah seimbang. Kalau timpang, tambahkan gudang atau toko *semu*
> berongkos nol untuk menampung selisihnya — caranya dibahas di
> bagian akhir.

Masalah transportasi sebenarnya adalah program linear biasa. Yang membuatnya
istimewa: strukturnya begitu teratur sehingga tidak perlu metode simpleks
penuh, cukup tabel. Dan ada satu bonus penting — **kalau semua $s_i$ dan
$d_j$ bilangan bulat, penyelesaian optimalnya pasti bilangan bulat juga**,
jadi tidak akan muncul jawaban "kirim 12,5 ton" [4].

## Cara mengerjakannya: dua tahap

Pengerjaannya selalu dua tahap:

1. **Susun penyelesaian awal** yang layak — sudah memenuhi semua persediaan
   dan permintaan, walau belum tentu termurah.
2. **Uji dan perbaiki** sampai tidak ada lagi jalur yang bisa menurunkan
   ongkos.

### Tahap 1a — Metode Sudut Barat Laut

Cara paling cepat sekaligus paling naif: mulai dari kotak kiri atas (sudut
"barat laut"), isi sebanyak-banyaknya, lalu bergeser ke kanan atau ke bawah
mengikuti sisa yang belum habis. Ongkos sama sekali tidak dilihat.

| | Toko 1 | Toko 2 | Toko 3 | Toko 4 |
|:--|:--:|:--:|:--:|:--:|
| **Gudang 1** | **20** | **10** | – | – |
| **Gudang 2** | – | **20** | **20** | – |
| **Gudang 3** | – | – | **5** | **25** |

$$
z = 20(8) + 10(6) + 20(12) + 20(13) + 5(16) + 25(5) = 925 .
$$

Rp925.000. Cepat, tapi jelas boros — jalur termahal $(3,3)$ dengan ongkos
$16$ malah terpakai.

### Tahap 1b — Metode Biaya Terkecil

Lebih masuk akal: cari kotak dengan ongkos **paling murah** di seluruh
tabel, isi sebanyak mungkin, coret baris atau kolom yang sudah habis, lalu
ulangi.

Urutan pengisiannya: $(3,4)$ dengan ongkos $5$, lalu $(1,2)$ dengan ongkos
$6$, lalu $(2,1)$ dengan ongkos $9$, dan seterusnya.

| | Toko 1 | Toko 2 | Toko 3 | Toko 4 |
|:--|:--:|:--:|:--:|:--:|
| **Gudang 1** | – | **30** | – | – |
| **Gudang 2** | **20** | – | **20** | – |
| **Gudang 3** | – | – | **5** | **25** |

$$
z = 30(6) + 20(9) + 20(13) + 5(16) + 25(5) = 825 .
$$

Turun jadi Rp825.000. Lumayan, tapi masih ada yang lebih baik.

### Tahap 1c — Metode Aproksimasi Vogel (VAM)

Ini metode yang paling sering dipakai, dan idenya cerdas. Untuk setiap
baris dan kolom, hitung **penalti**: selisih antara ongkos termurah dan
ongkos termurah kedua di baris/kolom itu.

$$
\text{penalti} = (\text{ongkos termurah kedua}) - (\text{ongkos termurah}) .
$$

Penalti besar artinya: *"kalau jalur termurah di baris ini sampai tidak
kebagian, ruginya besar."* Karena itu baris atau kolom dengan penalti
terbesar dilayani lebih dulu.

Langkah lengkapnya pada contoh kita:

| Langkah | Penalti terbesar | Kotak terpilih | Alokasi | Yang habis |
|:--:|:--|:--:|:--:|:--|
| 1 | Gudang 3, penalti $9 - 5 = 4$ | $(3,4)$, ongkos 5 | 25 ton | Toko 4 |
| 2 | Gudang 3, penalti $14 - 9 = 5$ | $(3,2)$, ongkos 9 | 5 ton | Gudang 3 |
| 3 | Toko 2, penalti $12 - 6 = 6$ | $(1,2)$, ongkos 6 | 25 ton | Toko 2 |
| 4 | Gudang 2, penalti $13 - 9 = 4$ | $(2,1)$, ongkos 9 | 20 ton | Toko 1 |
| 5 | Gudang 2, sisa satu kolom | $(2,3)$, ongkos 13 | 20 ton | Gudang 2 |
| 6 | tinggal satu kotak | $(1,3)$, ongkos 10 | 5 ton | selesai |

Hasilnya:

| | Toko 1 | Toko 2 | Toko 3 | Toko 4 | Persediaan |
|:--|:--:|:--:|:--:|:--:|:--:|
| **Gudang 1** | – | **25** | **5** | – | 30 ✓ |
| **Gudang 2** | **20** | – | **20** | – | 40 ✓ |
| **Gudang 3** | – | **5** | – | **25** | 30 ✓ |
| Permintaan | 20 ✓ | 30 ✓ | 25 ✓ | 25 ✓ | |

$$
z = 25(6) + 5(10) + 20(9) + 20(13) + 5(9) + 25(5) = 810 .
$$

Rp810.000 — lebih murah lagi. Ringkasan ketiganya:

| Metode | Total ongkos |
|:--|:--:|
| Sudut Barat Laut | Rp925.000 |
| Biaya Terkecil | Rp825.000 |
| **Vogel (VAM)** | **Rp810.000** |

## Tahap 2 — Menguji apakah sudah paling murah

VAM sering memberi hasil optimal, tapi "sering" bukan "pasti". Ujinya
memakai **metode MODI**, yang juga dikenal sebagai
metode potensial [2].

Caranya: beri setiap gudang sebuah angka $u_i$ dan setiap toko sebuah angka
$v_j$, sedemikian sehingga untuk setiap **kotak terisi** berlaku

$$
u_i + v_j = c_{ij} .
$$

Angka-angka itu bisa dibayangkan sebagai "harga bayangan": $u_i$ nilai
barang saat masih di gudang $i$, $v_j$ nilainya begitu sampai di toko $j$.
Karena jumlah persamaannya satu lebih sedikit daripada jumlah angka yang
dicari, satu di antaranya boleh ditetapkan bebas — biasanya $u_1 = 0$.

Untuk penyelesaian VAM di atas, kotak terisinya adalah $(1,2)$, $(1,3)$,
$(2,1)$, $(2,3)$, $(3,2)$, dan $(3,4)$. Dengan $u_1 = 0$:

$$
\begin{aligned}
u_1 + v_2 &= 6 &&\Rightarrow\; v_2 = 6 \\
u_1 + v_3 &= 10 &&\Rightarrow\; v_3 = 10 \\
u_2 + v_3 &= 13 &&\Rightarrow\; u_2 = 3 \\
u_2 + v_1 &= 9 &&\Rightarrow\; v_1 = 6 \\
u_3 + v_2 &= 9 &&\Rightarrow\; u_3 = 3 \\
u_3 + v_4 &= 5 &&\Rightarrow\; v_4 = 2
\end{aligned}
$$

Sekarang periksa setiap **kotak kosong** dengan besaran

$$
\bar{c}_{ij} = c_{ij} - (u_i + v_j),
$$

yang artinya: seberapa berubah total ongkos kalau jalur itu mulai dipakai.

| Kotak kosong | $c_{ij}$ | $u_i + v_j$ | $\bar{c}_{ij}$ |
|:--:|:--:|:--:|:--:|
| $(1,1)$ | 8 | $0 + 6 = 6$ | $+2$ |
| $(1,4)$ | 9 | $0 + 2 = 2$ | $+7$ |
| $(2,2)$ | 12 | $3 + 6 = 9$ | $+3$ |
| $(2,4)$ | 7 | $3 + 2 = 5$ | $+2$ |
| $(3,1)$ | 14 | $3 + 6 = 9$ | $+5$ |
| $(3,3)$ | 16 | $3 + 10 = 13$ | $+3$ |

Semuanya positif. Tidak ada satu pun jalur baru yang bisa menurunkan
ongkos, sehingga

> **Jawaban.** Penyelesaian VAM sudah optimal. Jadwal pengiriman termurah
> adalah Gudang 1 → Toko 2 sebanyak 25 ton dan → Toko 3 sebanyak 5 ton;
> Gudang 2 → Toko 1 sebanyak 20 ton dan → Toko 3 sebanyak 20 ton; Gudang 3
> → Toko 2 sebanyak 5 ton dan → Toko 4 sebanyak 25 ton. Total ongkos
> **Rp810.000**.

Kalau ada $\bar{c}_{ij}$ yang negatif, jalur dengan nilai paling negatif
dimasukkan, lalu dibuat lintasan tertutup melalui kotak-kotak
terisi untuk menggeser muatan — prosedur itu disebut *stepping stone*, dan
diulang sampai semua $\bar{c}_{ij} \ge 0$ [1].

> **Catatan.** Banyaknya kotak terisi pada penyelesaian yang sah selalu
> $m + n - 1$. Di sini $3 + 4 - 1 = 6$, dan memang ada enam kotak terisi.
> Kalau jumlahnya kurang, keadaannya disebut *degenerate* dan perlu
> disisipkan alokasi nol sebagai penambal agar MODI tetap bisa dijalankan.

## Kalau persediaan dan permintaan tidak seimbang

Dua keadaan yang lumrah terjadi:

- **Persediaan berlebih**, $\sum s_i > \sum d_j$. Tambahkan satu **toko
  semu** dengan permintaan sebesar selisihnya dan ongkos kirim $0$ ke semua
  gudang. Barang yang "dikirim" ke toko semu artinya tetap tinggal di
  gudang.
- **Permintaan berlebih**, $\sum s_i < \sum d_j$. Tambahkan satu **gudang
  semu** berongkos $0$; toko yang dilayani gudang semu adalah toko yang
  pesanannya tidak terpenuhi. Kalau ada denda keterlambatan, ongkos semu
  itu bisa diisi besaran dendanya.

Setelah ditambal, tabelnya kembali seimbang dan dikerjakan seperti biasa.

## Latihan

1. Kerjakan ulang contoh di atas dengan ongkos $(2,2)$ diubah dari $12$
   menjadi $4$. Apakah jadwal pengirimannya berubah? Uji dengan MODI.
2. Persediaan Gudang 2 berkurang menjadi $30$ ton karena satu tangki bocor.
   Tabelnya jadi tidak seimbang — tambahkan gudang semu, lalu tentukan toko
   mana yang pesanannya paling layak dikurangi.
3. Buktikan bahwa masalah transportasi yang seimbang selalu punya
   penyelesaian layak, dengan menunjukkan bahwa
   $x_{ij} = s_i d_j / \sum_k s_k$ memenuhi seluruh kendala.
4. Jelaskan mengapa metode Sudut Barat Laut tidak pernah memperhatikan
   ongkos, namun tetap menghasilkan penyelesaian yang sah.

## Lanjut ke mana

Masalah transportasi menjawab "berapa banyak dikirim ke mana", tapi belum
menjawab "lewat jalan mana dan urutannya bagaimana". Begitu satu kendaraan
harus menyinggahi beberapa toko sekaligus dalam satu perjalanan,
persoalannya naik tingkat menjadi
[Vehicle Routing Problem](/materi/vehicle-routing-problem). Kalau yang
ingin ditentukan justru *seberapa banyak sekali pesan*, jawabannya ada di
[Economic Order Quantity](/materi/economic-order-quantity).

## Referensi

1. Hillier, F. S., & Lieberman, G. J. (2015). *Introduction to Operations
   Research* (10th ed., Bab 9: The Transportation and Assignment Problems).
   New York: McGraw-Hill Education.
2. Taha, H. A. (2017). *Operations Research: An Introduction* (10th ed.,
   Bab 5: Transportation Model and Its Variants). Boston: Pearson.
3. Hitchcock, F. L. (1941). The distribution of a product from several
   sources to numerous localities. *Journal of Mathematics and Physics*,
   20(1–4), 224–230.
   [doi:10.1002/sapm1941201224](https://doi.org/10.1002/sapm1941201224)
4. Dantzig, G. B. (1951). Application of the simplex method to a
   transportation problem. Dalam T. C. Koopmans (Ed.), *Activity Analysis
   of Production and Allocation* (hlm. 359–373). New York: Wiley.
5. Reinfeld, N. V., & Vogel, W. R. (1958). *Mathematical Programming*.
   Englewood Cliffs, NJ: Prentice-Hall. — sumber asli metode aproksimasi
   Vogel.
6. Winston, W. L. (2004). *Operations Research: Applications and
   Algorithms* (4th ed., Bab 7). Belmont, CA: Brooks/Cole.
