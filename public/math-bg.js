/* Lambang matematika yang melayang pelan di latar belakang. */
(function () {
	var kanvas = document.getElementById("mathCanvas");
	if (!kanvas) return;
	if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	var ctx = kanvas.getContext("2d");
	var lambang = ["∑", "∫", "∂", "√", "π", "∞", "≤", "≥", "Δ", "λ", "μ", "θ", "×", "÷", "≈", "∈"];
	var warna = ["rgba(93,32,33,0.10)", "rgba(168,132,84,0.13)"];
	var butir = [];
	var lebar = 0;
	var tinggi = 0;

	function ukur() {
		lebar = kanvas.width = window.innerWidth;
		tinggi = kanvas.height = window.innerHeight;
	}

	function isi() {
		var jumlah = Math.min(26, Math.round(window.innerWidth / 62));
		butir = [];
		for (var i = 0; i < jumlah; i++) {
			butir.push({
				x: Math.random() * lebar,
				y: Math.random() * tinggi,
				t: lambang[(Math.random() * lambang.length) | 0],
				u: 14 + Math.random() * 26,
				c: warna[(Math.random() * warna.length) | 0],
				dx: (Math.random() - 0.5) * 0.16,
				dy: -0.08 - Math.random() * 0.16,
				r: Math.random() * Math.PI * 2,
				dr: (Math.random() - 0.5) * 0.0016,
			});
		}
	}

	function gambar() {
		ctx.clearRect(0, 0, lebar, tinggi);
		for (var i = 0; i < butir.length; i++) {
			var b = butir[i];
			b.x += b.dx;
			b.y += b.dy;
			b.r += b.dr;
			if (b.y < -60) { b.y = tinggi + 40; b.x = Math.random() * lebar; }
			if (b.x < -60) b.x = lebar + 40;
			if (b.x > lebar + 60) b.x = -40;
			ctx.save();
			ctx.translate(b.x, b.y);
			ctx.rotate(b.r);
			ctx.font = b.u + 'px "Playfair Display", Georgia, serif';
			ctx.fillStyle = b.c;
			ctx.textAlign = "center";
			ctx.fillText(b.t, 0, 0);
			ctx.restore();
		}
		requestAnimationFrame(gambar);
	}

	ukur();
	isi();
	gambar();

	var jeda;
	window.addEventListener("resize", function () {
		clearTimeout(jeda);
		jeda = setTimeout(function () { ukur(); isi(); }, 180);
	});
})();
