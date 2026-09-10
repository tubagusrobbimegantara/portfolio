/*  Logo Mathantara sebagai voxel.

    Berkas PNG logo dibaca piksel demi piksel, tiap piksel berisi jadi satu
    kubus yang berdiri sendiri dengan renggang di sekelilingnya. Kisinya
    dibuat kasar supaya jumlah kubus tetap wajar untuk digambar tiap bingkai.
    Perendernya ditulis sendiri di canvas 2D: proyeksi, urutan kedalaman, dan
    pencahayaan datar per sisi — tanpa pustaka 3D.  */

(() => {
	const panggung = document.querySelector('[data-logo-3d]');
	if (!panggung) return;

	const canvas = panggung.querySelector('canvas');
	const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
	if (!ctx) return; // Tanpa canvas, gambar cadangan di HTML yang dipakai.

	const SUMBER = panggung.dataset.logo3d || '/brand/mark.png';
	// Kisi sengaja dibuat kasar: tiap voxel kini satu kubus tersendiri,
	// jadi jumlahnya langsung menentukan berat gambar tiap bingkai.
	const LEBAR_KISI = 30;
	const TEBAL = 3; // Ketebalan kubus, dalam satuan voxel.
	const RENGGANG = 0.2; // Sela antarkubus, sebagian dari satu voxel.

	// Batas ayunan mendatar. Logo ini pipih, jadi kalau diputar melewati
	// seperempat putaran kita melihat punggungnya dan huruf M terbaca
	// terbalik. Sudutnya dikurung supaya selalu terbaca benar.
	const BATAS_YAW = 0.7;

	const MAROON = [93, 32, 33];
	const EMAS = [214, 155, 60];
	const kurangGerak = window.matchMedia('(prefers-reduced-motion: reduce)');

	let balok = [];
	let yaw = -0.34;
	let pitch = -0.2;
	let lajuYaw = 0;
	let lajuPitch = 0;
	let arah = 1;
	let seret = null;
	let bidikYaw = null;
	let bidikPitch = null;
	let siap = false;

	/* ── 1. Baca PNG jadi kisi voxel ───────────────────────── */

	function bacaKisi(img) {
		const skala = LEBAR_KISI / img.width;
		const w = LEBAR_KISI;
		const h = Math.max(1, Math.round(img.height * skala));

		const tmp = document.createElement('canvas');
		tmp.width = w;
		tmp.height = h;
		const tctx = tmp.getContext('2d');
		tctx.imageSmoothingEnabled = false;
		tctx.drawImage(img, 0, 0, w, h);

		const data = tctx.getImageData(0, 0, w, h).data;
		const kisi = new Array(h);

		for (let y = 0; y < h; y++) {
			kisi[y] = new Array(w).fill(0);
			for (let x = 0; x < w; x++) {
				const i = (y * w + x) * 4;
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				const a = data[i + 3];

				// Kosong bila tembus pandang atau nyaris putih — supaya
				// berkas dengan latar putih maupun transparan sama-sama jalan.
				if (a < 128 || (r > 232 && g > 232 && b > 232)) continue;

				const keMaroon = jarak(r, g, b, MAROON);
				const keEmas = jarak(r, g, b, EMAS);
				kisi[y][x] = keEmas < keMaroon ? 2 : 1;
			}
		}
		return { kisi, w, h };
	}

	function jarak(r, g, b, c) {
		return (r - c[0]) ** 2 + (g - c[1]) ** 2 + (b - c[2]) ** 2;
	}

	/* ── 2. Tiap voxel jadi satu kubus ────────────────────── */

	function susunBalok({ kisi, w, h }) {
		const hasil = [];
		const sela = RENGGANG / 2;

		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				const warna = kisi[y][x];
				if (!warna) continue;

				hasil.push({
					x0: x - w / 2 + sela,
					x1: x + 1 - w / 2 - sela,
					// Baris gambar bertambah ke bawah, sumbu Y ruang ke atas.
					y0: h / 2 - (y + 1) + sela,
					y1: h / 2 - y - sela,
					warna: warna === 2 ? EMAS : MAROON,
				});
			}
		}
		return hasil;
	}

	/* ── 3. Perender ──────────────────────────────────────── */

	// Enam sisi balok: titik sudut (urutan berlawanan jarum jam) + normal.
	const SISI = [
		{ n: [0, 0, 1], t: [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]] },
		{ n: [0, 0, -1], t: [[1, 0, 0], [0, 0, 0], [0, 1, 0], [1, 1, 0]] },
		{ n: [1, 0, 0], t: [[1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 1]] },
		{ n: [-1, 0, 0], t: [[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]] },
		{ n: [0, -1, 0], t: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]] },
		{ n: [0, 1, 0], t: [[0, 1, 1], [1, 1, 1], [1, 1, 0], [0, 1, 0]] },
	];

	const CAHAYA = (() => {
		const v = [-0.45, -0.75, 0.5];
		const p = Math.hypot(v[0], v[1], v[2]);
		return [v[0] / p, v[1] / p, v[2] / p];
	})();

	function putar(p, cy, sy, cx, sx) {
		const x = p[0] * cy + p[2] * sy;
		const z = -p[0] * sy + p[2] * cy;
		const y = p[1] * cx - z * sx;
		const z2 = p[1] * sx + z * cx;
		return [x, y, z2];
	}

	function gambar() {
		const lebar = canvas.clientWidth;
		const tinggi = canvas.clientHeight;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);

		if (canvas.width !== Math.round(lebar * dpr) || canvas.height !== Math.round(tinggi * dpr)) {
			canvas.width = Math.round(lebar * dpr);
			canvas.height = Math.round(tinggi * dpr);
		}

		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, lebar, tinggi);
		if (!siap) return;

		const cy = Math.cos(yaw);
		const sy = Math.sin(yaw);
		const cx = Math.cos(pitch);
		const sx = Math.sin(pitch);

		const skala = Math.min(lebar, tinggi) / (LEBAR_KISI * 1.3);
		const ox = lebar / 2;
		const oy = tinggi / 2;

		const antre = [];

		for (const b of balok) {
			const z0 = -TEBAL / 2;
			const z1 = TEBAL / 2;

			for (const sisi of SISI) {
				const n = putar(sisi.n, cy, sy, cx, sx);
				if (n[2] <= 0.001) continue; // Sisi membelakangi penonton.

				let jumlahZ = 0;
				const titik = sisi.t.map(([ux, uy, uz]) => {
					const p = putar(
						[
							ux ? b.x1 : b.x0,
							uy ? b.y1 : b.y0,
							uz ? z1 : z0,
						],
						cy, sy, cx, sx,
					);
					jumlahZ += p[2];
					// Sumbu Y layar tumbuh ke bawah, jadi dibalik.
					return [ox + p[0] * skala, oy - p[1] * skala];
				});

				const terang = 0.62 + 0.38 * Math.max(0, n[0] * CAHAYA[0] + n[1] * CAHAYA[1] + n[2] * CAHAYA[2]);
				antre.push({ titik, z: jumlahZ / 4, warna: b.warna, terang });
			}
		}

		antre.sort((a, b) => a.z - b.z); // Jauh dulu, dekat belakangan.

		// Tanpa garis tepi — sela antarkubus yang memisahkan bentuknya.
		for (const f of antre) {
			ctx.beginPath();
			ctx.moveTo(f.titik[0][0], f.titik[0][1]);
			for (let i = 1; i < f.titik.length; i++) ctx.lineTo(f.titik[i][0], f.titik[i][1]);
			ctx.closePath();
			ctx.fillStyle = `rgb(${Math.round(f.warna[0] * f.terang)},${Math.round(f.warna[1] * f.terang)},${Math.round(f.warna[2] * f.terang)})`;
			ctx.fill();
		}
	}

	/* ── 4. Gerak & interaksi ─────────────────────────────── */

	function detak() {
		if (seret) {
			// Saat diseret, sudut diatur langsung oleh penunjuk.
		} else if (bidikYaw !== null) {
			// Mengikuti kursor dengan lembut.
			yaw += (bidikYaw - yaw) * 0.06;
			pitch += (bidikPitch - pitch) * 0.06;
		} else {
			yaw += lajuYaw;
			pitch += lajuPitch;
			lajuYaw *= 0.94;
			lajuPitch *= 0.94;
			// Mengayun bolak-balik, bukan berputar penuh.
			if (!kurangGerak.matches && Math.abs(lajuYaw) < 0.0006) yaw += 0.0026 * arah;
		}

		if (yaw > BATAS_YAW) {
			yaw = BATAS_YAW;
			arah = -1;
			lajuYaw = 0;
		} else if (yaw < -BATAS_YAW) {
			yaw = -BATAS_YAW;
			arah = 1;
			lajuYaw = 0;
		}

		pitch = Math.max(-0.9, Math.min(0.9, pitch));
		gambar();
		requestAnimationFrame(detak);
	}

	function mulaiSeret(e) {
		seret = { x: e.clientX, y: e.clientY };
		bidikYaw = null;
		canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
		panggung.classList.add('menyeret');
	}

	function gerakSeret(e) {
		if (seret) {
			const dx = e.clientX - seret.x;
			const dy = e.clientY - seret.y;
			seret = { x: e.clientX, y: e.clientY };
			lajuYaw = dx * 0.008;
			lajuPitch = -dy * 0.006;
			yaw += lajuYaw;
			pitch += lajuPitch;
			return;
		}
		if (e.pointerType === 'mouse') {
			const kotak = canvas.getBoundingClientRect();
			const nx = (e.clientX - kotak.left) / kotak.width - 0.5;
			const ny = (e.clientY - kotak.top) / kotak.height - 0.5;
			bidikYaw = Math.max(-BATAS_YAW, Math.min(BATAS_YAW, nx * 1.1));
			bidikPitch = -0.2 + ny * 0.6;
		}
	}

	function selesaiSeret() {
		seret = null;
		panggung.classList.remove('menyeret');
	}

	canvas.addEventListener('pointerdown', mulaiSeret);
	canvas.addEventListener('pointermove', gerakSeret);
	canvas.addEventListener('pointerup', selesaiSeret);
	canvas.addEventListener('pointercancel', selesaiSeret);
	canvas.addEventListener('pointerleave', () => {
		if (!seret) bidikYaw = null;
	});

	// Bisa diputar lewat papan ketik.
	canvas.addEventListener('keydown', (e) => {
		const langkah = 0.22;
		if (e.key === 'ArrowLeft') yaw -= langkah;
		else if (e.key === 'ArrowRight') yaw += langkah;
		else if (e.key === 'ArrowUp') pitch -= langkah;
		else if (e.key === 'ArrowDown') pitch += langkah;
		else return;
		bidikYaw = null;
		e.preventDefault();
	});

	window.addEventListener('resize', gambar);

	/* ── 5. Muat gambar lalu jalan ────────────────────────── */

	const img = new Image();
	img.crossOrigin = 'anonymous';
	img.onload = () => {
		try {
			balok = susunBalok(bacaKisi(img));
			siap = balok.length > 0;
		} catch (err) {
			siap = false; // Canvas tercemar atau gambar gagal dibaca.
		}
		if (siap) {
			panggung.classList.add('hidup');
			requestAnimationFrame(detak);
		}
	};
	img.onerror = () => {
		siap = false;
	};
	img.src = SUMBER;
})();
