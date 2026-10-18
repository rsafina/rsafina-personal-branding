// Progressive enhancement: the document is fully visible before and without this script.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  const groups = [...document.querySelectorAll('[data-reveal]')];
  const navLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  let observer;
  let scrollQueued = false;

  // One scroll listener owns both header state and the active section link.
  function updateHeader() {
    scrollQueued = false;
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    let active = null;
    if (window.scrollY >= 100) {
      const line = window.innerHeight * .35;
      for (const section of sections) if (section.getBoundingClientRect().top <= line) active = section;
    }
    for (const link of navLinks) {
      const current = active && link.getAttribute('href') === `#${active.id}`;
      if (current && !link.hasAttribute('aria-current')) link.setAttribute('aria-current', 'location');
      else if (!current && link.hasAttribute('aria-current')) link.removeAttribute('aria-current');
    }
  }
  updateHeader();
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateHeader);
    }
  }, { passive: true });

  function revealAll() {
    observer?.disconnect();
    groups.forEach(group => group.classList.remove('reveal-pending', 'is-revealing'));
    groups.forEach(group => group.classList.add('is-revealed'));
  }

  // Entrances play once. Only groups that are still off-screen are hidden, so nothing
  // that has already been painted is ever made invisible again.
  function startReveals() {
    if (preference.matches || typeof window.IntersectionObserver !== 'function') return revealAll();
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const group = entry.target;
        observer.unobserve(group);
        // is-revealing carries the entrance transition only while it plays, so hover
        // transitions keep their own timing afterwards. reveal-played stays for one-time details.
        group.classList.add('is-revealing', 'is-revealed', 'reveal-played');
        group.classList.remove('reveal-pending');
        setTimeout(() => group.classList.remove('is-revealing'), 1200);
      }
    }, { threshold: .12, rootMargin: '0px 0px -24px 0px' });
    for (const group of groups) {
      const box = group.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) {
        group.classList.add('is-revealed');
        continue;
      }
      group.classList.add('reveal-pending');
      observer.observe(group);
    }
  }

  // Keyboard focus never waits for a decorative entrance.
  document.addEventListener('focusin', event => {
    const group = event.target.closest?.('.reveal-pending, .is-revealing');
    if (!group) return;
    observer?.unobserve(group);
    group.classList.remove('reveal-pending', 'is-revealing');
    group.classList.add('is-revealed');
  });

  preference.addEventListener('change', () => {
    if (preference.matches) revealAll();
  });
  startReveals();
})();
