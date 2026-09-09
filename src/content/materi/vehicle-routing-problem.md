---
judul: "Vehicle Routing Problem: Menyusun Rute Distribusi Bantuan"
deskripsi: "Membagi posko ke beberapa truk berkapasitas terbatas dan menyusun urutan singgahnya — dari hitungan penghematan satu per satu sampai model matematis lengkapnya."
tanggal: 2026-09-06
kategori: "Optimisasi"
jenjang: "SMA — Kuliah"
tag: ["riset operasi", "CVRP", "clarke-wright", "heuristik", "MTZ"]
video: "vrp-distribusi-bantuan-bencana"
urutan: 3
---

Gempa mengguncang pukul tiga pagi. Enam titik pengungsian membutuhkan makanan,
air, dan obat, sementara di gudang hanya ada tiga truk. Pertanyaannya:

> **Truk mana melayani posko mana, dan dengan urutan singgah bagaimana, supaya
> total jarak tempuhnya sekecil mungkin?**

Persoalan yang terdengar sepele itu punya nama resmi dalam riset operasi:
**Vehicle Routing Problem** (VRP), diperkenalkan Dantzig dan Ramser pada 1959
dengan nama asli *the truck dispatching problem* [1].

Materi ini menyelesaikannya sampai tuntas dengan angka nyata. Bagian awal bisa
diikuti siapa pun yang bisa menjumlahkan; model matematis formalnya ditaruh di
bagian akhir untuk pembaca yang menginginkannya.

## Apa persisnya yang dicari

VRP menjawab **dua pertanyaan sekaligus**:

1. **Pembagian** — posko mana masuk jatah truk yang mana?
2. **Urutan** — setelah dibagi, truk itu singgah ke posko-poskonya dengan
   urutan apa?

Dengan tiga syarat yang tidak boleh dilanggar:

- setiap posko dilayani **tepat sekali**,
- muatan tiap truk **tidak melebihi kapasitasnya**,
- setiap truk **berangkat dari gudang dan kembali ke gudang**.

Yang ditekan adalah **total jarak semua truk digabung**, bukan jarak
masing-masing.

## Kenapa tidak bisa dicoba satu per satu

Naluri pertama: "coba saja semua kemungkinan, lalu ambil yang terpendek."
Untuk soal sekecil ini pun, mari kita hitung dulu berapa banyak
kemungkinannya.

Bayangkan **satu** truk harus mengunjungi enam posko. Posko pertama yang
disinggahi bisa dipilih dari 6 posko. Setelah itu tersisa 5 pilihan untuk
posko kedua, lalu 4, lalu 3, lalu 2, lalu 1. Jadi banyaknya urutan adalah

$$
6 \times 5 \times 4 \times 3 \times 2 \times 1 = 720 ,
$$

yang ditulis singkat sebagai $6!$ dan dibaca "enam faktorial". Sepuluh posko
sudah melonjak menjadi

$$
10! = 3.628.800 ,
$$

dan lima belas posko menghasilkan

$$
15! = 1.307.674.368.000 ,
$$

lebih dari satu triliun kemungkinan — untuk **satu** truk saja, belum
memperhitungkan pembagian ke beberapa truk. Pola $n!$ tumbuh jauh lebih cepat
daripada pertambahan kemampuan komputer, jadi "coba semua" bukan strategi yang
bisa diandalkan.

Karena itu dipakai **algoritma**: prosedur yang menyusun jawaban baik secara
langsung, tanpa memeriksa seluruh kemungkinan.

## Peta diubah menjadi titik dan garis

Komputer tidak bisa "melihat" jalan. Peta harus diterjemahkan dulu menjadi:

- **titik** (disebut *simpul*) — gudang dan posko-posko;
- **garis** (disebut *sisi*) yang menghubungkan titik-titik itu, masing-masing
  diberi angka: jarak tempuh terpendeknya.

Jarak antar-titik ini bukan jarak lurus di peta, melainkan **jarak terpendek
lewat jalan yang benar-benar ada**, dihitung lebih dulu dengan algoritma
lintasan terpendek seperti algoritma Dijkstra [6]. Ruas jalan yang tertutup
longsor cukup dibuang dari jaringan sebelum jaraknya dihitung, sehingga
otomatis tidak akan terpakai.

Hasilnya disusun dalam **matriks jarak**: tabel bujur sangkar yang barisnya dan
kolomnya sama-sama daftar titik.

### Data soal

Gudang $G$ melayani enam posko $A$ sampai $F$. Tersedia tiga truk,
masing-masing berkapasitas $30$ ton.

**Permintaan tiap posko (ton):**

| Posko | $A$ | $B$ | $C$ | $D$ | $E$ | $F$ | Total |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Permintaan | 12 | 10 | 8 | 14 | 11 | 9 | **64** |

Karena total permintaan 64 ton dan satu truk hanya memuat 30 ton, jumlah truk
paling sedikit yang dibutuhkan adalah

$$
\left\lceil \frac{64}{30} \right\rceil = \lceil 2{,}13 \rceil = 3 \text{ truk}.
$$

Lambang $\lceil\;\rceil$ berarti "bulatkan ke atas" — dua truk jelas tidak
cukup, jadi harus tiga.

**Matriks jarak (km):**

| | $G$ | $A$ | $B$ | $C$ | $D$ | $E$ | $F$ |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| $G$ | 0 | 22 | 33 | 32 | 26 | 26 | 31 |
| $A$ | 22 | 0 | 13 | 14 | 32 | 30 | 48 |
| $B$ | 33 | 13 | 0 | 2 | 45 | 43 | 54 |
| $C$ | 32 | 14 | 2 | 0 | 46 | 44 | 53 |
| $D$ | 26 | 32 | 45 | 46 | 0 | 4 | 53 |
| $E$ | 26 | 30 | 43 | 44 | 4 | 0 | 55 |
| $F$ | 31 | 48 | 54 | 53 | 53 | 55 | 0 |

Cara membacanya: angka pada baris $B$ kolom $C$ adalah $2$, artinya jarak dari
posko $B$ ke posko $C$ hanya 2 km — keduanya bertetangga. Sementara baris $B$
kolom $D$ bernilai $45$: keduanya berada di sisi kota yang berlawanan.

Perhatikan matriksnya **simetris** (angka baris $B$ kolom $C$ sama dengan baris
$C$ kolom $B$) dan diagonalnya nol (jarak sebuah titik ke dirinya sendiri).

## Cara naif dan ongkosnya

Cara paling sederhana yang bisa dibayangkan: **setiap posko dilayani satu
perjalanan pulang-pergi tersendiri**. Truk berangkat dari gudang, mengantar ke
satu posko, lalu langsung pulang.

<figure class="gambar">
	<img src="/gambar/vrp-naif.svg" alt="Peta dengan enam garis putus-putus terpisah dari gudang ke masing-masing posko" width="600" height="400" loading="lazy" />
	<figcaption><b>Gambar 1.</b> Cara naif: enam perjalanan pulang-pergi yang saling terpisah. Setiap ruas dilewati dua kali — sekali berangkat, sekali pulang. Letak titik pada peta ini bersifat skematis; jarak yang dipakai dalam perhitungan selalu diambil dari matriks jarak.</figcaption>
</figure>

Karena tiap ruas dilewati dua kali, total jaraknya adalah

$$
\begin{aligned}
z_0 &= 2\,(c_{GA} + c_{GB} + c_{GC} + c_{GD} + c_{GE} + c_{GF}) \\
    &= 2\,(22 + 33 + 32 + 26 + 26 + 31) \\
    &= 2 \times 170 \;=\; 340 \text{ km}.
\end{aligned}
$$

Angka **340 km** ini menjadi patokan. Berapa pun yang bisa kita hemat dihitung
dari sini.

## Gagasan penghematan Clarke–Wright

Sekarang pertanyaannya: kapan menggabungkan dua perjalanan menjadi satu itu
menguntungkan, dan seberapa besar untungnya?

<figure class="gambar">
	<img src="/gambar/vrp-savings.svg" alt="Dua panel bersebelahan: kiri dua perjalanan pulang-pergi terpisah dari gudang, kanan satu rute gabungan melewati kedua posko" width="600" height="260" loading="lazy" />
	<figcaption><b>Gambar 2.</b> Menggabungkan dua perjalanan. Ruas pulang dari <i>i</i> dan ruas berangkat ke <i>j</i> hilang, digantikan satu ruas langsung <i>i</i> → <i>j</i>. Selisihnya itulah penghematannya.</figcaption>
</figure>

Ambil dua posko $i$ dan $j$, dengan gudang diberi nomor $0$.

**Sebelum digabung** — dua perjalanan terpisah:

$$
0 \to i \to 0 \quad \text{dan} \quad 0 \to j \to 0,
$$

dengan total jarak

$$
c_{0i} + c_{i0} + c_{0j} + c_{j0} = 2c_{0i} + 2c_{0j} .
$$

**Sesudah digabung** — satu rute yang menyinggahi keduanya:

$$
0 \to i \to j \to 0,
$$

dengan total jarak

$$
c_{0i} + c_{ij} + c_{j0} .
$$

**Selisihnya** — inilah **penghematan**:

$$
\begin{aligned}
s_{ij} &= \bigl(2c_{0i} + 2c_{0j}\bigr) - \bigl(c_{0i} + c_{ij} + c_{j0}\bigr) \\
       &= 2c_{0i} + 2c_{0j} - c_{0i} - c_{ij} - c_{0j} \\
       &= c_{0i} + c_{0j} - c_{ij} .
\end{aligned}
$$

$$
\boxed{\;s_{ij} = c_{0i} + c_{0j} - c_{ij}\;}
$$

Rumus ini punya arti yang gamblang: **semakin dekat $i$ dan $j$ satu sama lain
dibanding jaraknya ke gudang, semakin besar untungnya kalau keduanya disatukan
dalam satu rute.**

> **Catatan.** Penghematan tidak pernah negatif pada peta yang wajar, sebab
> pertidaksamaan segitiga menjamin $c_{ij} \le c_{0i} + c_{0j}$. Yang bisa
> terjadi adalah penghematannya kecil — misalnya untuk dua posko yang
> berjauhan di arah berlawanan.

## Algoritma Clarke–Wright

<div class="langkah">

**Langkah 1.** Mulai dari solusi paling boros: setiap posko punya rutenya
sendiri, pulang-pergi dari gudang.

**Langkah 2.** Hitung $s_{ij} = c_{0i} + c_{0j} - c_{ij}$ untuk **setiap
pasangan** posko, lalu urutkan dari yang terbesar.

**Langkah 3.** Telusuri daftar itu dari atas. Gabungkan rute yang memuat $i$
dengan rute yang memuat $j$ **hanya bila ketiga syarat ini terpenuhi**:

  a. $i$ dan $j$ masih berada di **rute yang berbeda** — kalau sudah satu rute,
     tidak ada lagi yang bisa digabung;

  b. keduanya masih menjadi **ujung** rutenya masing-masing — posko yang sudah
     terjepit di tengah rute tidak bisa disambung tanpa membongkar urutannya;

  c. total muatan gabungannya **tidak melampaui kapasitas** $Q$.

**Langkah 4.** Berhenti ketika daftar habis atau tidak ada lagi penggabungan
yang sah. Rute-rute yang tersisa itulah jawabannya.

</div>

Banyaknya pasangan yang harus dihitung untuk $n$ posko adalah

$$
\binom{n}{2} = \frac{n(n-1)}{2},
$$

jadi untuk enam posko ada $\dfrac{6 \times 5}{2} = 15$ pasangan. Bandingkan
dengan 720 kemungkinan urutan tadi — jauh lebih ringan.

## Mengerjakan contohnya

### Langkah 2 — Menghitung ke-15 penghematan

Setiap baris memakai rumus $s_{ij} = c_{Gi} + c_{Gj} - c_{ij}$, dengan angka
diambil langsung dari matriks jarak.

| Pasangan | $c_{Gi}$ | $c_{Gj}$ | $c_{ij}$ | Perhitungan | $s_{ij}$ |
|:--:|:--:|:--:|:--:|:--|:--:|
| $B, C$ | 33 | 32 | 2 | $33 + 32 - 2$ | **63** |
| $D, E$ | 26 | 26 | 4 | $26 + 26 - 4$ | **48** |
| $A, B$ | 22 | 33 | 13 | $22 + 33 - 13$ | **42** |
| $A, C$ | 22 | 32 | 14 | $22 + 32 - 14$ | 40 |
| $A, E$ | 22 | 26 | 30 | $22 + 26 - 30$ | 18 |
| $A, D$ | 22 | 26 | 32 | $22 + 26 - 32$ | 16 |
| $B, E$ | 33 | 26 | 43 | $33 + 26 - 43$ | 16 |
| $C, E$ | 32 | 26 | 44 | $32 + 26 - 44$ | 14 |
| $B, D$ | 33 | 26 | 45 | $33 + 26 - 45$ | 14 |
| $C, D$ | 32 | 26 | 46 | $32 + 26 - 46$ | 12 |
| $B, F$ | 33 | 31 | 54 | $33 + 31 - 54$ | 10 |
| $C, F$ | 32 | 31 | 53 | $32 + 31 - 53$ | 10 |
| $A, F$ | 22 | 31 | 48 | $22 + 31 - 48$ | 5 |
| $D, F$ | 26 | 31 | 53 | $26 + 31 - 53$ | 4 |
| $E, F$ | 26 | 31 | 55 | $26 + 31 - 55$ | 2 |

Sudah terurut dari yang terbesar. Pola geografisnya langsung terbaca dari
angka-angka ini: $B$ dan $C$ berdekatan (penghematan 63), begitu pula $D$ dan
$E$ (48), sementara $F$ menyendiri di selatan sehingga semua pasangannya
berpenghematan kecil.

### Langkah 3 — Menggabungkan satu per satu

Keadaan awal: enam rute terpisah, masing-masing berisi satu posko.

<div class="langkah">

**Penghematan 1 — pasangan $(B, C)$, nilai 63.**
$B$ dan $C$ masih di rute masing-masing, keduanya ujung (rute berisi satu posko
selalu ujung), dan muatan gabungannya $10 + 8 = 18 \le 30$. **Digabung.**
→ Rute baru: $B - C$ dengan muatan 18 ton.

**Penghematan 2 — pasangan $(D, E)$, nilai 48.**
Keduanya masih sendiri, muatan $14 + 11 = 25 \le 30$. **Digabung.**
→ Rute baru: $D - E$ dengan muatan 25 ton.

**Penghematan 3 — pasangan $(A, B)$, nilai 42.**
$A$ masih sendiri; $B$ berada di rute $B - C$ dan masih menjadi **ujung** rute
itu. Muatan gabungan $12 + 18 = 30 \le 30$ — pas di batas. **Digabung.**
→ Rute baru: $A - B - C$ dengan muatan 30 ton.

**Penghematan 4 — pasangan $(A, C)$, nilai 40.**
$A$ dan $C$ kini sudah berada di **rute yang sama**. Syarat (a) gagal.
**Ditolak.**

**Penghematan 5 — pasangan $(A, E)$, nilai 18.**
$A$ ujung rute $A - B - C$ (muatan 30), $E$ ujung rute $D - E$ (muatan 25).
Muatan gabungan $30 + 25 = 55 > 30$. Syarat (c) gagal. **Ditolak.**

**Penghematan 6 — pasangan $(A, D)$, nilai 16.**
Alasan sama: $30 + 25 = 55 > 30$. **Ditolak.**

**Penghematan 7 — pasangan $(B, E)$, nilai 16.**
$B$ sekarang terjepit di tengah rute $A - B - C$, bukan lagi ujung.
Syarat (b) gagal. **Ditolak.**

**Penghematan 8–10 — pasangan $(C,E)$, $(B,D)$, $(C,D)$.**
Semuanya berusaha menyatukan rute bermuatan 30 dengan rute bermuatan 25.
**Ditolak** karena kapasitas.

**Penghematan 11–15 — semua pasangan yang melibatkan $F$.**
Posko $F$ bermuatan 9 ton. Menggabungkannya dengan $A - B - C$ memberi
$30 + 9 = 39 > 30$; dengan $D - E$ memberi $25 + 9 = 34 > 30$. Keduanya
melampaui kapasitas. **Ditolak semua.**

</div>

Daftar habis. $F$ tetap sendirian.

### Langkah 4 — Menghitung jarak tiap rute

Untuk setiap rute, jumlahkan jarak dari gudang ke posko pertama, antar-posko,
lalu kembali ke gudang.

**Truk 1: $G \to A \to B \to C \to G$**

$$
c_{GA} + c_{AB} + c_{BC} + c_{CG} = 22 + 13 + 2 + 32 = 69 \text{ km}
$$

Muatan: $12 + 10 + 8 = 30$ ton, tepat sama dengan kapasitas.

**Truk 2: $G \to D \to E \to G$**

$$
c_{GD} + c_{DE} + c_{EG} = 26 + 4 + 26 = 56 \text{ km}
$$

Muatan: $14 + 11 = 25$ ton, masih di bawah 30.

**Truk 3: $G \to F \to G$**

$$
c_{GF} + c_{FG} = 31 + 31 = 62 \text{ km}
$$

Muatan: $9$ ton.

**Total:**

$$
69 + 56 + 62 = 187 \text{ km}
$$

<figure class="gambar">
	<img src="/gambar/vrp-peta.svg" alt="Peta gudang dan enam posko dengan tiga rute berwarna berbeda, masing-masing berangkat dan kembali ke gudang" width="600" height="420" loading="lazy" />
	<figcaption><b>Gambar 3.</b> Ketiga rute hasil algoritma. Angka di atas tiap posko adalah permintaannya dalam ton. Truk 1 melayani gugus timur laut, truk 2 gugus barat laut, truk 3 pergi sendiri ke selatan.</figcaption>
</figure>

### Hasil akhir

| Truk | Rute | Perhitungan jarak | Jarak | Muatan |
|:--|:--|:--|:--:|:--:|
| 1 | $G \to A \to B \to C \to G$ | $22 + 13 + 2 + 32$ | 69 km | 30 t |
| 2 | $G \to D \to E \to G$ | $26 + 4 + 26$ | 56 km | 25 t |
| 3 | $G \to F \to G$ | $31 + 31$ | 62 km | 9 t |
| | | **Total** | **187 km** | **64 t** |

> **Jawaban.** Ketiga truk menempuh total **187 km**, dibandingkan **340 km**
> pada pelayanan satu per satu. Penghematannya
> $$340 - 187 = 153 \text{ km}, \qquad \frac{153}{340} \times 100\% = 45\% .$$

Dengan kecepatan rata-rata dan waktu bongkar yang sama, pemangkasan jarak
sebesar itu berarti selisih beberapa jam — dan pada situasi bencana, selisih
jam menentukan apakah bantuan tiba pada hari yang sama.

### Membaca hasilnya

Beberapa hal yang layak diperhatikan dari jawaban di atas:

- **Truk 1 terisi tepat 30 ton**, pas di batas kapasitas. Kendala yang aktif
  seperti ini menandakan kapasitas adalah faktor pengikat: menambah kapasitas
  truk sedikit saja kemungkinan besar memperbaiki solusi, sedangkan menambah
  *jumlah* truk tidak akan menolong.
- **Truk 3 hanya membawa 9 ton** dan menempuh 62 km untuk satu posko. Terlihat
  boros, tapi tidak ada pilihan lain: $F$ terlalu jauh dari posko mana pun —
  tetangga terdekatnya, $A$, masih berjarak 48 km — sementara kedua rute lain
  sudah penuh.
- **Urutan singgah ikut menentukan.** Rute $G \to A \to B \to C \to G$
  panjangnya 69 km. Kalau urutannya diacak menjadi
  $G \to B \to A \to C \to G$, jaraknya menjadi
  $33 + 13 + 14 + 32 = 92$ km — 23 km lebih boros untuk posko yang sama persis.
  Algoritma menjaga urutan tetap rapi karena penggabungan selalu dilakukan di
  ujung rute.

## Model matematis formalnya

Bagian ini untuk pembaca yang ingin melihat VRP sebagai model program
matematika utuh, misalnya untuk diselesaikan dengan solver. Bagian sebelumnya
sudah lengkap tanpa ini.

Peta dinyatakan sebagai graf lengkap $G = (V, E)$ dengan himpunan simpul

$$
V = \{0, 1, 2, \dots, n\},
$$

di mana simpul $0$ adalah gudang dan simpul $1$ sampai $n$ adalah posko.

### Notasi

| Lambang | Arti |
|:--|:--|
| $q_i$ | permintaan posko $i$, dengan $q_0 = 0$ |
| $Q$ | kapasitas satu kendaraan |
| $K$ | banyak kendaraan yang dipakai |
| $c_{ij}$ | jarak tempuh dari $i$ ke $j$ |
| $x_{ij}$ | bernilai $1$ bila ada kendaraan melintas **langsung** dari $i$ ke $j$, dan $0$ bila tidak |
| $u_i$ | muatan kumulatif yang sudah diantar setibanya di posko $i$ |

Peubah $x_{ij}$ disebut **peubah biner**: ia hanya boleh bernilai 0 atau 1,
seperti saklar yang mati atau menyala. Pada jawaban kita tadi, misalnya,
$x_{AB} = 1$ karena truk 1 memang melintas langsung dari $A$ ke $B$, sedangkan
$x_{AD} = 0$.

### Rumusannya

$$
\min \; z = \sum_{i \in V} \sum_{\substack{j \in V \\ j \neq i}} c_{ij}\, x_{ij}
$$

dengan kendala

$$
\begin{aligned}
&\text{(1)} & \sum_{\substack{i \in V \\ i \neq j}} x_{ij} &= 1, && \forall\, j \in V \setminus \{0\} \\
&\text{(2)} & \sum_{\substack{j \in V \\ j \neq i}} x_{ij} &= 1, && \forall\, i \in V \setminus \{0\} \\
&\text{(3)} & \sum_{j = 1}^{n} x_{0j} &= K, \qquad \sum_{i = 1}^{n} x_{i0} = K \\
&\text{(4)} & u_j &\ge u_i + q_j - Q\,(1 - x_{ij}), && \forall\, i \neq j \in V \setminus \{0\} \\
&\text{(5)} & q_i &\le u_i \le Q, && \forall\, i \in V \setminus \{0\} \\
&\text{(6)} & x_{ij} &\in \{0, 1\}, && \forall\, i \neq j \in V
\end{aligned}
$$

### Membaca kendalanya satu per satu

**(1) Setiap posko dimasuki tepat sekali.** Untuk posko $j$ tertentu,
jumlahkan semua $x_{ij}$ dari segala arah $i$. Hasilnya harus 1: ada tepat
satu kendaraan yang masuk. Kalau nilainya 0, posko itu terlewat; kalau 2, ia
dilayani dua kali.

**(2) Setiap posko ditinggalkan tepat sekali.** Cermin dari kendala pertama.
Keduanya bersama-sama memastikan setiap posko punya persis satu jalan masuk
dan satu jalan keluar.

**(3) Tepat $K$ kendaraan berangkat dan kembali.** Jumlah ruas yang keluar
dari gudang sama dengan jumlah ruas yang masuk kembali.

**(4) dan (5) — kendala Miller–Tucker–Zemlin.** Inilah bagian yang paling
sering membingungkan, jadi kita bedah dengan angka.

Bayangkan truk 1 pada jawaban kita: $G \to A \to B \to C \to G$ dengan
permintaan $q_A = 12$, $q_B = 10$, $q_C = 8$. Peubah $u_i$ mencatat muatan yang
sudah diantar begitu tiba di posko $i$:

$$
u_A = 12, \qquad u_B = 12 + 10 = 22, \qquad u_C = 22 + 8 = 30 .
$$

Kendala (5) menuntut $u_C \le Q = 30$ ✓ — inilah cara model menjaga kapasitas.

Sekarang kendala (4). Perhatikan dua kemungkinan:

- **Bila $x_{ij} = 1$** (truk memang melintas dari $i$ ke $j$), suku
  $-Q(1 - x_{ij})$ menjadi nol, sehingga kendalanya berbunyi
  $u_j \ge u_i + q_j$. Untuk ruas $A \to B$: $22 \ge 12 + 10$ ✓. Muatan
  kumulatif dipaksa selalu **bertambah** di sepanjang rute.
- **Bila $x_{ij} = 0$** (tidak ada ruas), suku itu menjadi $-Q$, sehingga
  kendalanya berbunyi $u_j \ge u_i + q_j - Q$. Karena $u_i \le Q$, ruas
  kanannya paling besar hanya $q_j$ dikurangi sesuatu yang tidak negatif —
  kendalanya menjadi longgar dan **tidak mengikat apa pun**.

**Kenapa itu mencegah rute liar.** Tanpa kendala ini, model bisa menghasilkan
lingkaran tertutup yang tidak menyentuh gudang sama sekali — misalnya truk
hantu yang berputar $D \to E \to D$ selamanya, murah tetapi tidak bisa
dijalankan. Andaikan lingkaran seperti itu ada, maka $x_{DE} = 1$ dan
$x_{ED} = 1$, sehingga kendala (4) memberi

$$
u_E \ge u_D + q_E \qquad \text{dan} \qquad u_D \ge u_E + q_D .
$$

Jumlahkan kedua pertidaksamaan itu:

$$
u_E + u_D \ge u_D + u_E + q_D + q_E \quad\Longrightarrow\quad 0 \ge q_D + q_E .
$$

Padahal permintaan selalu positif, jadi $q_D + q_E > 0$. Kontradiksi — maka
lingkaran semacam itu **mustahil terbentuk**. Argumen yang sama berlaku untuk
lingkaran berapa pun panjangnya [4].

### Tingkat kesulitannya

Model ini termasuk **program linear bilangan bulat campuran** dan bersifat
NP-hard: sampai hari ini tidak ada algoritma yang menjamin penyelesaian optimal
dalam waktu yang tumbuh secara polinomial. Untuk kasus kecil (puluhan posko),
solver seperti CPLEX atau Gurobi sanggup menemukan solusi optimal. Untuk kasus
besar dan mendesak, dipakai heuristik seperti Clarke–Wright [5].

## Heuristik bukan jaminan optimal

Clarke–Wright cepat dan hasilnya biasanya bagus, tetapi **tidak menjamin
optimum**. Cara memeriksanya: jalankan solver eksak pada model di atas, atau
coba perbaiki solusinya dengan pencarian lokal.

Dua teknik perbaikan yang lazim:

- **2-opt** — ambil satu rute, balik urutan sepotong bagian tengahnya, lalu
  periksa apakah jaraknya berkurang. Ulangi sampai tidak ada perbaikan.
- **or-opt** — pindahkan satu, dua, atau tiga posko berurutan ke posisi lain,
  bisa di rute yang sama atau ke rute lain, selama kapasitasnya masih muat.

Pada contoh kita, memeriksa seluruh kemungkinan menunjukkan 187 km memang sudah
optimal — tetapi itu kebetulan yang menyenangkan, bukan jaminan yang berlaku
umum.

## Ragam VRP yang lain

Model dasar tadi biasa diperluas sesuai keadaan lapangan:

- **VRPTW** — VRP dengan jendela waktu: setiap posko hanya boleh dilayani pada
  rentang jam tertentu, misalnya dapur umum yang hanya buka pagi hari.
- **VRPPD** — VRP ambil-antar: kendaraan mengambil barang di satu titik dan
  mengantarnya ke titik lain dalam perjalanan yang sama.
- **Multi-depot VRP** — gudangnya lebih dari satu, sehingga harus diputuskan
  juga posko mana dilayani gudang mana.
- **Heterogeneous fleet VRP** — kapasitas truknya berbeda-beda.
- **Stochastic / Fuzzy VRP** — permintaan atau waktu tempuh tidak pasti, dan
  dimodelkan sebagai peubah acak atau bilangan kabur. Pendekatan terakhir
  inilah yang dipakai pada penelitian ride-hailing di
  [halaman profil](/profil) [7] [8].

## Ringkasan langkah

<div class="langkah">

1. Susun daftar titik: gudang dan seluruh tujuan.
2. Hitung matriks jarak terpendek antar-titik; buang dulu ruas jalan yang
   tertutup.
3. Catat permintaan tiap tujuan dan kapasitas kendaraan; periksa jumlah
   kendaraan minimalnya, $\lceil \sum q_i / Q \rceil$.
4. Hitung patokan naif $z_0 = 2\sum_i c_{0i}$.
5. Hitung $s_{ij} = c_{0i} + c_{0j} - c_{ij}$ untuk semua pasangan, lalu
   urutkan menurun.
6. Telusuri dari penghematan terbesar; gabungkan bila ketiga syarat terpenuhi
   (beda rute, keduanya ujung, kapasitas cukup).
7. Hitung panjang tiap rute akhir dan totalnya; bandingkan dengan $z_0$.
8. Bila perlu, perbaiki dengan 2-opt atau or-opt.

</div>

## Latihan

1. Hitung ulang contoh di atas dengan kapasitas truk $40$ ton. Berapa truk yang
   terpakai, bagaimana rutenya, dan berapa total jaraknya?
2. Tunjukkan bahwa $s_{ij} \le 2\min(c_{0i}, c_{0j})$.
   *(Petunjuk: pakai pertidaksamaan segitiga $c_{ij} \ge |c_{0i} - c_{0j}|$.)*
   Jelaskan artinya: pasangan seperti apa yang penghematannya selalu kecil?
3. Ruas $D - E$ tertutup longsor sehingga jaraknya berubah dari $4$ km menjadi
   $38$ km lewat jalan memutar. Susun ulang tabel penghematan dan tentukan rute
   barunya.
4. Periksa apakah rute $G \to A \to B \to C \to G$ bisa diperpendek dengan
   2-opt. Hitung semua kemungkinan pembalikan potongan dan bandingkan.
5. Jelaskan mengapa kendala MTZ dengan $x_{ij} = 0$ tidak mengikat, lalu
   buktikan bahwa kendala itu mencegah terbentuknya lingkaran tertutup
   sepanjang tiga posko.
6. Andaikan tersedia truk keempat berkapasitas 30 ton. Apakah total jaraknya
   bisa berkurang? Jelaskan jawabannya dengan menunjuk kendala mana yang
   sebenarnya mengikat.
7. Untuk $n = 20$ posko, berapa banyak pasangan penghematan yang harus
   dihitung? Bandingkan dengan $20!$ dan jelaskan mengapa heuristik menjadi
   pilihan yang masuk akal.

## Lanjut ke mana

VRP menentukan rute dan urutan singgah. Dua pertanyaan tetangganya dijawab di
materi lain: *berapa banyak barang dikirim dari gudang mana ke tujuan mana*
dibahas di [Masalah Transportasi](/materi/masalah-transportasi), dan *berapa
banyak sekali pesan supaya ongkosnya paling hemat* dibahas di
[Economic Order Quantity](/materi/economic-order-quantity).

## Referensi

1. Dantzig, G. B., & Ramser, J. H. (1959). The truck dispatching problem.
   *Management Science*, 6(1), 80–91.
   [doi:10.1287/mnsc.6.1.80](https://doi.org/10.1287/mnsc.6.1.80)
2. Clarke, G., & Wright, J. W. (1964). Scheduling of vehicles from a central
   depot to a number of delivery points. *Operations Research*, 12(4), 568–581.
   [doi:10.1287/opre.12.4.568](https://doi.org/10.1287/opre.12.4.568)
3. Toth, P., & Vigo, D. (Eds.). (2014). *Vehicle Routing: Problems, Methods,
   and Applications* (2nd ed.). Philadelphia: SIAM.
4. Miller, C. E., Tucker, A. W., & Zemlin, R. A. (1960). Integer programming
   formulation of traveling salesman problems. *Journal of the ACM*, 7(4),
   326–329.
   [doi:10.1145/321043.321046](https://doi.org/10.1145/321043.321046)
5. Laporte, G. (1992). The vehicle routing problem: An overview of exact and
   approximate algorithms. *European Journal of Operational Research*, 59(3),
   345–358.
   [doi:10.1016/0377-2217(92)90192-C](https://doi.org/10.1016/0377-2217%2892%2990192-C)
6. Dijkstra, E. W. (1959). A note on two problems in connexion with graphs.
   *Numerische Mathematik*, 1, 269–271.
   [doi:10.1007/BF01386390](https://doi.org/10.1007/BF01386390)
7. Megantara, T. R., Supian, S., & Chaerani, D. (2024). Mathematical modeling
   on integrated vehicle assignment and rebalancing in ride-hailing system with
   uncertainty using fuzzy linear programming. *Journal of Advanced Research in
   Applied Sciences and Engineering Technology*, 42(2), 133–144.
   [doi:10.37934/araset.42.2.133144](https://doi.org/10.37934/araset.42.2.133144)
8. Megantara, T. R., Supian, S., & Chaerani, D. (2022). Strategies to reduce
   ride-hailing fuel consumption caused by pick-up trips: A mathematical model
   under uncertainty. *Sustainability*, 14(17), 10648.
   [doi:10.3390/su141710648](https://doi.org/10.3390/su141710648)
