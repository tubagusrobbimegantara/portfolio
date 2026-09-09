---
judul: "Vehicle Routing Problem: Menyusun Rute Distribusi Bantuan"
deskripsi: "Model matematis penugasan kendaraan berkapasitas terbatas, dan penyelesaian lengkap satu kasus enam posko dengan algoritma penghematan Clarke–Wright."
tanggal: 2026-09-06
kategori: "Optimisasi"
jenjang: "Kuliah"
tag: ["riset operasi", "CVRP", "clarke-wright", "heuristik", "MTZ"]
video: "vrp-distribusi-bantuan-bencana"
urutan: 3
---

Gempa mengguncang pukul tiga pagi. Enam titik pengungsian membutuhkan
makanan, air, dan obat, sementara di gudang hanya ada tiga truk. Truk mana
ke posko mana, lewat jalan yang mana? Pertanyaan yang terdengar sepele itu
punya nama resmi dalam riset operasi: **Vehicle Routing Problem** (VRP),
diperkenalkan Dantzig dan Ramser pada 1959 dengan nama asli *the truck
dispatching problem* [1].

Sederhananya, VRP menjawab dua hal sekaligus: **posko mana masuk jatah truk
yang mana**, dan **urutan singgahnya bagaimana** — dengan syarat muatan
tiap truk tidak melebihi kapasitasnya, dan setiap posko dilayani tepat
sekali. Yang ditekan adalah total jarak semua truk digabung.

## Kenapa tidak bisa dicoba satu per satu

Untuk satu kendaraan yang harus mengunjungi enam posko, banyaknya urutan
kunjungan adalah

$$
6! = 720 .
$$

Sepuluh posko sudah melonjak menjadi

$$
10! = 3\,628\,800 ,
$$

dan lima belas posko menghasilkan angka lebih dari satu triliun. Pola
$n!$ tumbuh jauh lebih cepat daripada pertambahan kemampuan komputer, jadi
mencoba semua kemungkinan bukan strategi yang bisa diandalkan. Belum lagi
kenyataan di lapangan: muatan truk terbatas dan sebagian jalan tertutup
longsor.

## Model matematis

Peta diubah menjadi graf lengkap $G = (V, E)$ dengan

$$
V = \{0, 1, 2, \dots, n\},
$$

di mana simpul $0$ adalah gudang dan simpul $1$ sampai $n$
adalah posko. Setiap sisi $(i,j)$ punya biaya $c_{ij}$ — biasanya jarak
tempuh terpendek antara kedua titik, yang dihitung lebih dulu dengan
algoritma lintasan terpendek seperti algoritma Dijkstra [6] di atas
jaringan jalan yang sebenarnya. Ruas jalan yang tertutup cukup dibuang
dari jaringan sebelum $c_{ij}$ dihitung.

Notasi yang dipakai:

| Lambang | Arti |
|:--|:--|
| $q_i$ | permintaan posko $i$, dengan $q_0 = 0$ |
| $Q$ | kapasitas satu kendaraan |
| $K$ | banyak kendaraan yang tersedia |
| $c_{ij}$ | jarak tempuh dari $i$ ke $j$ |
| $x_{ij}$ | bernilai $1$ bila ada kendaraan melintas langsung dari $i$ ke $j$, dan $0$ bila tidak |
| $u_i$ | muatan kumulatif setibanya di posko $i$ |

Bentuk dua indeks dari **Capacitated VRP** dengan eliminasi upa-tur
Miller–Tucker–Zemlin adalah

$$
\min \; z = \sum_{i \in V} \sum_{\substack{j \in V \\ j \neq i}} c_{ij}\, x_{ij}
$$

dengan kendala

$$
\begin{aligned}
\sum_{\substack{i \in V \\ i \neq j}} x_{ij} &= 1, && \forall\, j \in V \setminus \{0\} \\
\sum_{\substack{j \in V \\ j \neq i}} x_{ij} &= 1, && \forall\, i \in V \setminus \{0\} \\
\sum_{j = 1}^{n} x_{0j} &= K, \qquad \sum_{i = 1}^{n} x_{i0} = K \\
u_j &\ge u_i + q_j - Q\,(1 - x_{ij}), && \forall\, i \neq j \in V \setminus \{0\} \\
q_i &\le u_i \le Q, && \forall\, i \in V \setminus \{0\} \\
x_{ij} &\in \{0, 1\}, && \forall\, i \neq j \in V
\end{aligned}
$$

Baca satu per satu, kendalanya masuk akal semua:

- **Dua baris pertama** memastikan setiap posko dimasuki tepat sekali dan
  ditinggalkan tepat sekali — tidak ada posko yang terlewat, tidak ada
  yang dilayani dua kali.
- **Baris ketiga** menetapkan bahwa tepat $K$ kendaraan berangkat dari
  gudang dan $K$ kendaraan kembali.
- **Baris keempat dan kelima** adalah kendala MTZ. Bila $x_{ij} = 1$, ia
  memaksa $u_j \ge u_i + q_j$, sehingga muatan kumulatif selalu bertambah
  di sepanjang rute. Akibatnya rute tertutup yang tidak menyentuh gudang
  mustahil terbentuk, sekaligus muatan tidak pernah melampaui $Q$. Bila
  $x_{ij} = 0$, suku $-Q(1 - x_{ij})$ membuat pertidaksamaannya longgar
  dan tidak mengikat apa pun.

Model ini termasuk **program linear bilangan bulat campuran** dan bersifat
NP-hard. Untuk kasus kecil, solver seperti CPLEX atau Gurobi sanggup
menemukan solusi optimum; untuk kasus besar dan mendesak, dipakai
heuristik.

## Algoritma penghematan Clarke–Wright

Titik berangkatnya adalah solusi paling boros yang bisa dibayangkan:
setiap posko dilayani satu truk sendiri, pulang-pergi dari gudang. Biaya
totalnya

$$
z_{0} = \sum_{i=1}^{n} 2\,c_{0i}.
$$

Sekarang bayangkan dua posko $i$ dan $j$ digabung ke dalam satu rute.
Perjalanan $0 \to i \to 0$ dan $0 \to j \to 0$ berubah menjadi
$0 \to i \to j \to 0$. Selisih biayanya adalah **penghematan**
(*penghematan*):

$$
s_{ij} = \bigl(2c_{0i} + 2c_{0j}\bigr) - \bigl(c_{0i} + c_{ij} + c_{j0}\bigr)
       = c_{0i} + c_{0j} - c_{ij}.
$$

Semakin besar $s_{ij}$, semakin menguntungkan penggabungan itu. Dari sini
algoritmanya tinggal tiga langkah:

1. Hitung $s_{ij}$ untuk semua pasangan posko, lalu urutkan menurun.
2. Telusuri daftar dari penghematan terbesar. Gabungkan rute yang memuat
   $i$ dan rute yang memuat $j$ **bila** ketiga syarat ini terpenuhi:
   $i$ dan $j$ masih berada di rute yang berbeda, keduanya masih menjadi
   ujung rutenya masing-masing, dan total muatan gabungannya tidak
   melampaui $Q$.
3. Berhenti ketika daftar habis atau tidak ada lagi penggabungan yang
   sah.

> **Catatan.** Clarke–Wright adalah heuristik: ia cepat dan hasilnya
> biasanya bagus, tetapi tidak menjamin optimum. Solusinya lazim dipakai
> sebagai solusi awal yang kemudian diperbaiki dengan pencarian lokal
> seperti 2-opt atau *or-opt*.

### Contoh — Enam posko, tiga truk

Gudang $G$ melayani enam posko $A$ sampai $F$. Setiap truk berkapasitas
$30$ ton dan tersedia tiga truk. Permintaan tiap posko:

| Posko | $A$ | $B$ | $C$ | $D$ | $E$ | $F$ |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|
| Permintaan (ton) | 12 | 10 | 8 | 14 | 11 | 9 |

Total permintaan $64$ ton, sehingga diperlukan sedikitnya
$\lceil 64/30 \rceil = 3$ truk. Jarak antar-titik (km):

| | $G$ | $A$ | $B$ | $C$ | $D$ | $E$ | $F$ |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| $G$ | 0 | 22 | 33 | 32 | 26 | 26 | 31 |
| $A$ | 22 | 0 | 13 | 14 | 32 | 30 | 48 |
| $B$ | 33 | 13 | 0 | 2 | 45 | 43 | 54 |
| $C$ | 32 | 14 | 2 | 0 | 46 | 44 | 53 |
| $D$ | 26 | 32 | 45 | 46 | 0 | 4 | 53 |
| $E$ | 26 | 30 | 43 | 44 | 4 | 0 | 55 |
| $F$ | 31 | 48 | 54 | 53 | 53 | 55 | 0 |

**Langkah 1 — solusi awal.** Melayani satu per satu pulang-pergi
menghabiskan

$$
z_0 = 2\,(22 + 33 + 32 + 26 + 26 + 31) = 2 \times 170 = 340 \text{ km}.
$$

**Langkah 2 — tabel penghematan.** Dengan
$s_{ij} = c_{Gi} + c_{Gj} - c_{ij}$:

| Pasangan | Perhitungan | $s_{ij}$ |
|:--|:--|:--:|
| $B,C$ | $33 + 32 - 2$ | **63** |
| $D,E$ | $26 + 26 - 4$ | **48** |
| $A,B$ | $22 + 33 - 13$ | **42** |
| $A,C$ | $22 + 32 - 14$ | 40 |
| $A,E$ | $22 + 26 - 30$ | 18 |
| $A,D$ | $22 + 26 - 32$ | 16 |
| $B,E$ | $33 + 26 - 43$ | 16 |
| $C,E$ | $32 + 26 - 44$ | 14 |
| $B,D$ | $33 + 26 - 45$ | 14 |
| $C,D$ | $32 + 26 - 46$ | 12 |
| $B,F$ | $33 + 31 - 54$ | 10 |
| $C,F$ | $32 + 31 - 53$ | 10 |
| $A,F$ | $22 + 31 - 48$ | 5 |
| $D,F$ | $26 + 31 - 53$ | 4 |
| $E,F$ | $26 + 31 - 55$ | 2 |

**Langkah 3 — penggabungan berurutan.**

| Urutan | Pasangan | $s_{ij}$ | Keputusan | Rute setelahnya | Muatan |
|:--:|:--:|:--:|:--|:--|:--:|
| 1 | $B,C$ | 63 | gabung | $B - C$ | 18 t |
| 2 | $D,E$ | 48 | gabung | $D - E$ | 25 t |
| 3 | $A,B$ | 42 | gabung | $A - B - C$ | 30 t |
| 4 | $A,C$ | 40 | tolak — sudah satu rute | — | — |
| 5 | $A,E$ | 18 | tolak — $30 + 25 > 30$ | — | — |
| 6 | $A,D$ | 16 | tolak — kapasitas | — | — |
| 7 | $B,E$ | 16 | tolak — $B$ bukan ujung rute | — | — |
| … | sisanya | $\le 14$ | semua tertolak karena kapasitas | — | — |

Posko $F$ tidak pernah bisa digabung: pasangan termurahnya adalah $D,F$
dengan muatan gabungan $25 + 9 = 34 > 30$ ton.

**Langkah 4 — hasil akhir.**

| Truk | Rute | Perhitungan jarak | Jarak | Muatan |
|:--|:--|:--|:--:|:--:|
| 1 | $G \to A \to B \to C \to G$ | $22 + 13 + 2 + 32$ | 69 km | 30 t |
| 2 | $G \to D \to E \to G$ | $26 + 4 + 26$ | 56 km | 25 t |
| 3 | $G \to F \to G$ | $31 + 31$ | 62 km | 9 t |
| | | **Total** | **187 km** | 64 t |

> **Jawaban.** Ketiga truk menempuh total $187$ km, dibandingkan $340$ km
> pada pelayanan satu per satu. Penghematannya
> $340 - 187 = 153$ km, atau
> $$\frac{153}{340} \times 100\% = 45\% .$$

Dengan kecepatan rata-rata dan waktu bongkar yang sama, pemangkasan jarak
sebesar itu berarti selisih beberapa jam — dan pada situasi bencana,
selisih jam menentukan apakah bantuan tiba pada hari yang sama.

Perhatikan juga bahwa truk 1 terisi tepat $30$ ton, pas di batas
kapasitas. Kendala yang aktif seperti ini menandakan kapasitas adalah
faktor pengikat: menambah kapasitas truk sedikit saja kemungkinan besar
akan memperbaiki solusi, sedangkan menambah jumlah truk belum tentu.

## Ragam VRP yang lain

Model dasar di atas biasa diperluas sesuai keadaan lapangan:

- **VRPTW** — VRP dengan jendela waktu: setiap posko hanya boleh dilayani pada
  rentang waktu tertentu.
- **VRPPD** — VRP ambil-antar: kendaraan mengambil dan mengantar
  dalam satu perjalanan.
- **Multi-depot VRP** — gudangnya lebih dari satu.
- **Stochastic / Fuzzy VRP** — permintaan atau waktu tempuh tidak pasti,
  dan dimodelkan sebagai peubah acak atau bilangan kabur. Pendekatan
  terakhir inilah yang dipakai pada penelitian
  [ride-hailing di halaman profil](/profil).

## Latihan

1. Hitung ulang contoh di atas dengan kapasitas truk $40$ ton. Berapa truk
   yang terpakai dan berapa total jaraknya?
2. Tunjukkan bahwa $s_{ij} \le 2\min(c_{0i}, c_{0j})$ dan jelaskan artinya:
   pasangan seperti apa yang tidak pernah layak digabung.
3. Ruas $D - E$ tertutup sehingga jaraknya berubah dari $4$ km menjadi
   $38$ km lewat jalan memutar. Susun ulang tabel penghematan dan tentukan
   rute barunya.
4. Jelaskan mengapa kendala MTZ dengan $x_{ij} = 0$ tidak mengikat, lalu
   buktikan bahwa kendala itu benar-benar mencegah terbentuknya upa-tur.

## Lanjut ke mana

VRP menentukan rute dan urutan singgah. Dua pertanyaan tetangganya dijawab
di materi lain: *berapa banyak barang dikirim dari gudang mana ke tujuan
mana* dibahas di [Masalah Transportasi](/materi/masalah-transportasi), dan
*berapa banyak sekali pesan supaya ongkosnya paling hemat* dibahas di
[Economic Order Quantity](/materi/economic-order-quantity).

## Referensi

1. Dantzig, G. B., & Ramser, J. H. (1959). The truck dispatching problem.
   *Management Science*, 6(1), 80–91.
   [doi:10.1287/mnsc.6.1.80](https://doi.org/10.1287/mnsc.6.1.80)
2. Clarke, G., & Wright, J. W. (1964). Scheduling of vehicles from a
   central depot to a number of delivery points. *Operations Research*,
   12(4), 568–581.
   [doi:10.1287/opre.12.4.568](https://doi.org/10.1287/opre.12.4.568)
3. Toth, P., & Vigo, D. (Eds.). (2014). *Vehicle Routing: Problems,
   Methods, and Applications* (2nd ed.). Philadelphia: SIAM.
4. Miller, C. E., Tucker, A. W., & Zemlin, R. A. (1960). Integer
   programming formulation of traveling salesman problems. *Journal of the
   ACM*, 7(4), 326–329.
   [doi:10.1145/321043.321046](https://doi.org/10.1145/321043.321046)
5. Laporte, G. (1992). The vehicle routing problem: An overview of exact
   and approximate algorithms. *European Journal of Operational Research*,
   59(3), 345–358.
   [doi:10.1016/0377-2217(92)90192-C](https://doi.org/10.1016/0377-2217(92)90192-C)
6. Dijkstra, E. W. (1959). A note on two problems in connexion with graphs.
   *Numerische Mathematik*, 1, 269–271.
   [doi:10.1007/BF01386390](https://doi.org/10.1007/BF01386390)
7. Megantara, T. R., Supian, S., & Chaerani, D. (2024). Mathematical
   modeling on integrated vehicle assignment and rebalancing in ride-hailing
   system with uncertainty using fuzzy linear programming. *Journal of
   Advanced Research in Applied Sciences and Engineering Technology*, 42(2),
   133–144.
   [doi:10.37934/araset.42.2.133144](https://doi.org/10.37934/araset.42.2.133144)
8. Megantara, T. R., Supian, S., & Chaerani, D. (2022). Strategies to reduce
   ride-hailing fuel consumption caused by pick-up trips: A mathematical
   model under uncertainty. *Sustainability*, 14(17), 10648.
   [doi:10.3390/su141710648](https://doi.org/10.3390/su141710648)
