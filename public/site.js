/* Perilaku umum situs Mathantara */
(function () {
	// Menu untuk layar kecil
	var hb = document.getElementById("hbg");
	var links = document.getElementById("navLinks");
	if (hb && links) {
		hb.addEventListener("click", function () {
			var buka = links.classList.toggle("open");
			hb.setAttribute("aria-expanded", buka ? "true" : "false");
		});
	}

	// Munculkan elemen saat masuk layar
	var target = document.querySelectorAll(".rev");
	if (!("IntersectionObserver" in window)) {
		target.forEach(function (el) { el.classList.add("on"); });
	} else {
		var pengamat = new IntersectionObserver(function (entri) {
			entri.forEach(function (e) {
				if (e.isIntersecting) {
					e.target.classList.add("on");
					pengamat.unobserve(e.target);
				}
			});
		}, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
		target.forEach(function (el) { pengamat.observe(el); });
	}

	// Tandai bab yang sedang dibaca pada daftar isi
	var tautanToc = document.querySelectorAll(".toc a");
	if (tautanToc.length) {
		var judul = [];
		tautanToc.forEach(function (a) {
			var el = document.getElementById(decodeURIComponent(a.hash.slice(1)));
			if (el) judul.push({ a: a, el: el });
		});
		var perbarui = function () {
			var y = window.scrollY + 120;
			var aktif = judul[0];
			judul.forEach(function (j) { if (j.el.offsetTop <= y) aktif = j; });
			tautanToc.forEach(function (a) { a.classList.remove("on"); });
			if (aktif) aktif.a.classList.add("on");
		};
		var menunggu = false;
		window.addEventListener("scroll", function () {
			if (menunggu) return;
			menunggu = true;
			window.requestAnimationFrame(function () { perbarui(); menunggu = false; });
		}, { passive: true });
		perbarui();
	}
})();
