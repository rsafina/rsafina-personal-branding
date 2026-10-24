// Everything on the page is readable without this file. It only adds small conveniences.
(() => {
  const english = document.documentElement.lang === 'en';

  // Language: mark the active ID / EN link, translate image descriptions,
  // and keep English when moving between the two pages.
  document.querySelectorAll('[data-lang-link]').forEach(link => {
    if (link.dataset.langLink === (english ? 'en' : 'id')) link.setAttribute('aria-current', 'true');
  });
  if (english) {
    document.querySelectorAll('[data-alt-en]').forEach(image => { image.alt = image.dataset.altEn; });
    document.querySelectorAll('a[data-page]').forEach(link => {
      const [page, hash = ''] = link.getAttribute('href').split('#');
      link.setAttribute('href', `${page}?lang=en${hash ? `#${hash}` : ''}`);
    });
  }

  // Header: one scroll listener sets the scrolled style and the current section link.
  const header = document.querySelector('.site-header');
  const sectionLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
  const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href')));
  let queued = false;
  function updateHeader() {
    queued = false;
    // Separate on/off points so the bar never flickers when you stop near the top.
    header.classList.toggle('is-scrolled', header.classList.contains('is-scrolled') ? scrollY > 8 : scrollY > 48);
    let active = -1;
    if (scrollY > 100) sections.forEach((section, index) => { if (section.getBoundingClientRect().top <= innerHeight * .35) active = index; });
    sectionLinks.forEach((link, index) => link.toggleAttribute('aria-current', index === active));
  }
  updateHeader();
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(updateHeader); } }, { passive: true });

  // The hero's moving light pauses while it is off screen.
  const backdrop = document.querySelector('.backdrop');
  if (backdrop && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => backdrop.classList.toggle('is-paused', !entry.isIntersecting)).observe(backdrop);
  }

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  // Keyboard users never wait for the entrance: the first key press completes it.
  addEventListener('keydown', () => document.documentElement.classList.add('skip-entrance'), { once: true });

  // Hero depth: while scrolling past the hero, its text drifts up a little slower than the page
  // and softly fades, and the light moves slower still. Follows the scroll position, so it
  // reverses when scrolling back up.
  const hero = document.querySelector('.hero');
  const heroMain = hero?.querySelector('.hero-main');
  const heroStrip = hero?.querySelector('.hero-strip');
  const lights = hero?.querySelector('.lights');
  let depthFrame = 0;
  function depth() {
    depthFrame = 0;
    if (reduceMotion.matches) { heroMain.style.translate = heroMain.style.opacity = lights.style.transform = ''; return; }
    const y = Math.min(Math.max(scrollY, 0), hero.offsetHeight);
    // The text fades out before it can reach the bottom strip, whatever the screen size.
    // The separate translate property leaves the entrance animation's transform untouched.
    const textBottom = [...heroMain.children].filter(child => child.getClientRects().length).pop().getBoundingClientRect().bottom - (parseFloat(heroMain.style.translate.split(' ')[1]) || 0);
    // Whatever sits below the text (the profile card on smaller screens, or the strip).
    const below = [hero.querySelector('.hero-aside'), heroStrip].filter(element => element && element.getBoundingClientRect().top >= textBottom - 1).map(element => element.getBoundingClientRect().top);
    const room = Math.max(40, Math.min(...below, Infinity) - textBottom);
    const fadeEnd = Math.min(hero.offsetHeight * .5, room / .22 * .85);
    heroMain.style.translate = y ? `0 ${(y * .22).toFixed(1)}px` : '';
    // Keyboard focus inside the hero always sees it fully.
    heroMain.style.opacity = y && !heroMain.contains(document.activeElement) ? Math.max(0, 1 - y / fadeEnd).toFixed(3) : '';
    lights.style.transform = y ? `translate3d(0, ${(y * .18).toFixed(1)}px, 0)` : '';
  }
  if (hero && heroMain && heroStrip && lights) {
    addEventListener('scroll', () => { if (!depthFrame && scrollY < hero.offsetHeight + 200) depthFrame = requestAnimationFrame(depth); }, { passive: true });
    reduceMotion.addEventListener('change', depth);
    heroMain.addEventListener('focusin', depth);
    heroMain.addEventListener('focusout', () => requestAnimationFrame(depth));
    depth();
  }

  // Experience cards, after Athos: each card pins 15px lower than the one before and the
  // next card slides over it. A covered card shrinks 5% per card that has arrived on top,
  // following the scroll position (so it reverses when scrolling up), lightly smoothed.
  // Only used when every card fits on screen; otherwise the cards stay a normal list.
  const stack = document.querySelector('.experience-cards');
  if (stack) {
    const cards = [...stack.children];
    const SHRINK = .04, APPROACH = 480, STEP = 15;
    let naturalTops = [], pin = 0, current = cards.map(() => 1), frame = 0, stacked = false;

    function docTop(element) { let top = 0; for (let e = element; e; e = e.offsetParent) top += e.offsetTop; return top; }
    function layout() {
      stack.classList.remove('is-stacked');
      stack.style.removeProperty('--card-h');
      cards.forEach(card => { card.style.transform = ''; });
      current = cards.map(() => 1);
      pin = header.offsetHeight + 16;
      const tallest = Math.max(...cards.map(card => card.offsetHeight));
      const fits = tallest + pin + STEP * (cards.length - 1) + 24 <= innerHeight;
      stacked = fits && innerWidth >= 900 && !reduceMotion.matches;
      if (!stacked) return;
      // Equal heights let all cards release together at the end of the section.
      stack.style.setProperty('--card-h', `${tallest}px`);
      stack.style.setProperty('--pin', `${pin}px`);
      naturalTops = cards.map(docTop);
      stack.classList.add('is-stacked');
      requestFrame();
    }
    function targets() {
      // How far each card has arrived on top of the stack: 0 until it is APPROACH px from its pin, 1 once pinned.
      const arrived = naturalTops.map((top, i) => Math.min(1, Math.max(0, 1 - (top - scrollY - (pin + i * STEP)) / APPROACH)));
      return cards.map((_, i) => 1 - SHRINK * arrived.slice(i + 1).reduce((sum, value) => sum + value, 0));
    }
    function render() {
      frame = 0;
      if (!stacked) return;
      let moving = false;
      targets().forEach((target, i) => {
        current[i] += (target - current[i]) * .14;
        if (Math.abs(target - current[i]) > .0005) moving = true; else current[i] = target;
        cards[i].style.transform = current[i] === 1 ? '' : `scale(${current[i].toFixed(4)})`;
      });
      if (moving) requestFrame();
    }
    function requestFrame() { if (!frame) frame = requestAnimationFrame(render); }
    addEventListener('scroll', () => { if (stacked) requestFrame(); }, { passive: true });
    let resizeTimer;
    addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(layout, 150); });
    addEventListener('load', layout);
    reduceMotion.addEventListener('change', layout);
    // A keyboard user moving into a covered card gets scrolled to where that card is on top.
    stack.addEventListener('focusin', event => {
      if (!stacked) return;
      const i = cards.indexOf(event.target.closest('.experience-card'));
      const top = naturalTops[i] - (pin + i * STEP);
      if (i >= 0 && Math.abs(scrollY - top) > 4) scrollTo({ top, behavior: 'instant' });
    });
    layout();
  }

  // Section reveals, after Athos: play once per section. Only sections still below the screen
  // are hidden first, so something you can already see never disappears and fades back.
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    show(entry.target, true);
  }), { threshold: 0, rootMargin: '0px 0px -40px 0px' });
  function show(element, animate) {
    observer.unobserve(element);
    element.classList.remove('waiting');
    if (animate) {
      element.classList.add('fading-in');
      setTimeout(() => element.classList.remove('fading-in'), 900);
    }
  }
  document.querySelectorAll('[data-reveal]').forEach(element => {
    if (element.getBoundingClientRect().top < innerHeight) return;
    element.classList.add('waiting');
    observer.observe(element);
  });
  // Keyboard users never wait for a fade, and turning on reduced motion shows everything.
  addEventListener('focusin', event => {
    const element = event.target.closest('.waiting');
    if (element) show(element, false);
  });
  reduceMotion.addEventListener('change', () => document.querySelectorAll('.waiting').forEach(element => show(element, false)));
})();
