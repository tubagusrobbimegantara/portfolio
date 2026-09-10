(function () {
  document.querySelectorAll('[data-route-demo]').forEach((demo) => {
    const plans = JSON.parse(demo.dataset.routes);
    const button = demo.querySelector('[data-route-next]');
    let index = 0;
    button.hidden = false;
    button.addEventListener('click', () => {
      index = (index + 1) % plans.length;
      const plan = plans[index];
      demo.querySelector('[data-route-path]').setAttribute('d', plan.path);
      demo.querySelector('[data-route-label]').textContent = plan.label;
      demo.querySelector('[data-route-distance]').textContent = plan.distance;
      demo.querySelector('[data-route-description]').textContent = plan.description;
    });
  });

  const hb = document.getElementById('hbg');
  const links = document.getElementById('navLinks');
  if (hb && links) {
    const close = () => { links.classList.remove('open'); hb.setAttribute('aria-expanded', 'false'); hb.setAttribute('aria-label', 'Buka menu'); };
    hb.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      hb.setAttribute('aria-expanded', String(open));
      hb.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    });
    links.addEventListener('click', (event) => { if (event.target.closest('a')) close(); });
    document.addEventListener('click', (event) => { if (!event.target.closest('#nav')) close(); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && links.classList.contains('open')) { close(); hb.focus(); }
    });
    matchMedia('(min-width: 601px)').addEventListener('change', close);
  }

  // Each library combines its search and category selection in one state.
  document.querySelectorAll('[data-library]').forEach((library) => {
    const input = library.querySelector('input[type="search"]');
    const chips = library.querySelectorAll('[data-filter]');
    const cards = library.querySelectorAll('[data-search]');
    const count = library.querySelector('[data-count]');
    const empty = library.querySelector('[data-empty]');
    let category = 'semua';
    const normalize = (value) => value.toLocaleLowerCase('id').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const update = () => {
      const query = normalize(input?.value.trim() || '');
      let visible = 0;
      cards.forEach((card) => {
        const matches = (category === 'semua' || card.dataset.kategori === category || card.dataset.topik === category) && normalize(card.dataset.search || '').includes(query);
        card.hidden = !matches;
        if (matches) visible++;
      });
      if (count) count.textContent = visible + ' dari ' + cards.length + ' ' + library.dataset.library;
      if (empty) empty.hidden = visible > 0;
    };
    chips.forEach((chip) => {
      chip.setAttribute('aria-pressed', String(chip.classList.contains('on')));
      chip.addEventListener('click', () => {
        category = chip.dataset.filter;
        chips.forEach((other) => { other.classList.toggle('on', chip === other); other.setAttribute('aria-pressed', String(chip === other)); });
        update();
      });
    });
    input?.addEventListener('input', update);
    library.querySelector('[data-reset]')?.addEventListener('click', () => {
      if (input) input.value = '';
      category = 'semua';
      chips.forEach((chip) => { const all = chip.dataset.filter === 'semua'; chip.classList.toggle('on', all); chip.setAttribute('aria-pressed', String(all)); });
      update();
      input?.focus();
    });
    update();
  });

  const tocDetails = document.querySelector('[data-mobile-toc]');
  if (tocDetails && matchMedia('(max-width: 800px)').matches) tocDetails.open = false;

  const tocLinks = [...document.querySelectorAll('.toc a')];
  const headings = tocLinks.map((link) => ({ link, heading: document.getElementById(decodeURIComponent(link.hash.slice(1))) })).filter((item) => item.heading);
  if (headings.length) {
    const updateToc = () => {
      let active = headings[0];
      headings.forEach((item) => { if (item.heading.getBoundingClientRect().top <= 140) active = item; });
      headings.forEach((item) => {
        item.link.classList.toggle('on', item === active);
        if (item === active) item.link.setAttribute('aria-current', 'location'); else item.link.removeAttribute('aria-current');
      });
    };
    let pending = false;
    window.addEventListener('scroll', () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { updateToc(); pending = false; });
    }, { passive: true });
    updateToc();
  }
})();
