/* ════════════════════════════════════════
   Floating math-symbol background animation
   Drifting glyphs + faint connection lines.
   Honors prefers-reduced-motion.
   ════════════════════════════════════════ */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('mathCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const SYMBOLS = ['∑','∫','∂','∇','π','λ','μ','∞','≈','∈','⊆','∀','∃','ƒ','θ','α','β','δ','≤','≥','√','∏','∮','Δ','σ','γ','φ','x̃','⊗','≅','∝','∩'];
  const COLORS = ['rgba(56,189,248,', 'rgba(129,140,248,', 'rgba(74,222,128,'];

  let W, H, particles = [], DENSITY = 0.00009;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function makeParticle() {
    const colorBase = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: rand(-0.18, 0.18),
      vy: rand(-0.22, -0.05),
      size: rand(15, 40),
      sym: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      color: colorBase,
      alpha: rand(0.12, 0.38),
      rot: rand(-0.4, 0.4),
      vr: rand(-0.0025, 0.0025),
      pulse: Math.random() * Math.PI * 2,
      vp: rand(0.005, 0.015)
    };
  }

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const target = Math.min(80, Math.max(26, Math.floor(W * H * DENSITY)));
    particles = [];
    for (let i = 0; i < target; i++) particles.push(makeParticle());
  }

  function step() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 17000) {
          const o = (1 - d2 / 17000) * 0.10;
          ctx.strokeStyle = 'rgba(56,189,248,' + o + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const p of particles) {
      p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.pulse += p.vp;
      if (p.y < -50) { p.y = H + 40; p.x = Math.random() * W; }
      if (p.x < -50) p.x = W + 40;
      if (p.x > W + 50) p.x = -40;

      const a = p.alpha + Math.sin(p.pulse) * 0.05;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.font = '500 ' + p.size + "px 'Newsreader', Georgia, serif";
      ctx.fillStyle = p.color + Math.max(0.08, a) + ')';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.sym, 0, 0);
      ctx.restore();
    }

    requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  step();
})();
