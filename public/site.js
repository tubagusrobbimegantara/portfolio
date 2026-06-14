/* Shared site behaviors */
(function () {
  // Mobile menu toggle
  var hb = document.getElementById('hbg');
  if (hb) hb.addEventListener('click', function () {
    document.getElementById('navLinks').classList.toggle('open');
  });

  // Scroll reveal
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.rev').forEach(function (el) { obs.observe(el); });
})();
