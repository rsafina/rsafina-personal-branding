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
    header.classList.toggle('is-scrolled', scrollY > 24);
    let active = -1;
    if (scrollY > 100) sections.forEach((section, index) => { if (section.getBoundingClientRect().top <= innerHeight * .35) active = index; });
    sectionLinks.forEach((link, index) => link.toggleAttribute('aria-current', index === active));
  }
  updateHeader();
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(updateHeader); } }, { passive: true });

  // Gentle fade-in, played once per section. Only sections still below the screen are
  // hidden first, so something you can already see never disappears and fades back.
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    show(entry.target, true);
  }), { threshold: .12, rootMargin: '0px 0px -24px 0px' });
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
