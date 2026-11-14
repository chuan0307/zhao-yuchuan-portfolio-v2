(() => {
  const nav = document.querySelector('.site-nav');
  const heroVideo = document.querySelector('.hero-video');
  const menuButton = document.querySelector('#menuToggle');
  const mobileNav = document.querySelector('#mobileNav');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let previousY = window.scrollY;

  if (heroVideo) {
    const revealVideo = () => heroVideo.classList.add('media-ready');
    heroVideo.addEventListener('loadeddata', revealVideo, { once:true });
    heroVideo.addEventListener('playing', revealVideo, { once:true });
    if (heroVideo.readyState >= 2) revealVideo();
  }

  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('in'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.delay || 0);
        entry.target.style.setProperty('--delay', `${delay}ms`);
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
    revealItems.forEach(item => observer.observe(item));
  }

  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '打开导航菜单');
    mobileNav.hidden = true;
    document.body.classList.remove('menu-open');
  }

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? '打开导航菜单' : '关闭导航菜单');
    mobileNav.hidden = isOpen;
    document.body.classList.toggle('menu-open', !isOpen);
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) closeMenu();
  });

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    nav.classList.toggle('scrolled-down', currentY > window.innerHeight * 0.6 && currentY > previousY + 2);
    if (currentY < 48 || currentY < previousY - 2) nav.classList.remove('scrolled-down');
    previousY = currentY;
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      closeMenu();
      history.replaceState(null, '', link.getAttribute('href'));
    });
  });
})();
