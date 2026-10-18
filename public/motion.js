// Progressive enhancement: the document is fully visible before and without this script.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  const groups = [...document.querySelectorAll('[data-reveal]')];
  const animations = new Set();
  let observer;
  let scrollQueued = false;

  function updateHeader() {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    if (window.scrollY < 100) {
      document.querySelectorAll('.site-header nav a[aria-current]').forEach(link => link.removeAttribute('aria-current'));
    }
    scrollQueued = false;
  }
  updateHeader();
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateHeader);
    }
  }, { passive: true });

  function enter(element, delay = 0, greeting = false) {
    if (preference.matches || !element.animate) return;
    const frames = greeting
      ? [{ opacity: .15, transform: 'translateY(14px) rotate(-5deg)' },
         { opacity: 1, transform: 'translateY(0) rotate(3deg)', offset: .7 },
         { opacity: 1, transform: 'translateY(0) rotate(0)' }]
      : [{ opacity: .1, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }];
    const animation = element.animate(frames, { duration: greeting ? 600 : 540, delay, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'backwards' });
    animations.add(animation);
    animation.finished.catch(() => {}).finally(() => animations.delete(animation));
  }

  function startReveals() {
    observer?.disconnect();
    if (preference.matches || typeof window.IntersectionObserver !== 'function') {
      groups.forEach(group => group.classList.add('is-revealed'));
      return;
    }
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const group = entry.target;
        observer.unobserve(group);
        group.classList.add('is-revealed');
        enter(group);
        if (group.matches('.process')) {
          group.querySelectorAll('.steps li').forEach((step, index) => enter(step, index * 80));
        }
        if (group.matches('.greeting')) enter(group.querySelector('.chibi'), 0, true);
      }
    }, { threshold: .12, rootMargin: '0px 0px -24px 0px' });
    groups.filter(group => !group.classList.contains('is-revealed')).forEach(group => observer.observe(group));
  }

  // Active section state complements the persistent home-page identity state.
  if (typeof window.IntersectionObserver === 'function') {
    const sections = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (!visible.length) return;
      const target = `#${visible[0].target.id}`;
      document.querySelectorAll('.site-header nav a').forEach(link => {
        if (link.getAttribute('href') === target) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -55% 0px' });
    document.querySelectorAll('section[id]').forEach(section => sections.observe(section));
  }

  preference.addEventListener('change', () => {
    if (preference.matches) animations.forEach(animation => animation.cancel());
    startReveals();
  });
  startReveals();
})();
