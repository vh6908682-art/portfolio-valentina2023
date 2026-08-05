/*=====menu icon navbar======*/
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  };

  navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    });
  });
}

/*=====sticky navbar + scroll spy======*/
const header   = document.querySelector('.header');
const sections = document.querySelectorAll('section[id]');
/* only in-page anchors take part in the scroll spy */
const navlinks = document.querySelectorAll('header nav a[href^="#"]');

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('sticky', window.scrollY > 100);

  if (!navlinks.length) return;

  sections.forEach(sec => {
    const top    = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector('header nav a[href="#' + id + '"]');

    if (link && top >= offset && top < offset + height) {
      navlinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

/*=====dark / light mode (remembered across pages)======*/
const darkModeIcon = document.querySelector('#darkMode-icon');
const root         = document.documentElement;

function syncThemeIcon() {
  if (!darkModeIcon) return;
  const dark = root.classList.contains('dark-mode');
  darkModeIcon.classList.toggle('bx-sun', dark);
  darkModeIcon.classList.toggle('bx-moon', !dark);
}

syncThemeIcon();

if (darkModeIcon) {
  darkModeIcon.onclick = () => {
    root.classList.toggle('dark-mode');
    localStorage.setItem('theme', root.classList.contains('dark-mode') ? 'dark' : 'light');
    syncThemeIcon();
  };
}

/*=====split hero======
  A panel only expands once the pointer is past the 30% mark on its side; anywhere
  in the middle 40% both halves rest at 50/50. Pointer-driven only — on touch the
  panels stay put and a tap opens the page.
====================*/
(function () {
  const hero = document.querySelector('.split-hero');
  if (!hero || !window.matchMedia('(hover: hover)').matches) return;

  const home   = document.querySelector('.home');
  const panels = Array.from(hero.querySelectorAll('.split-panel'));
  const EDGE   = 0.3;

  function setOpen(target) {
    panels.forEach(panel => {
      panel.classList.toggle('is-open', panel === target);
      panel.classList.toggle('is-shrunk', target !== null && panel !== target);
    });
    if (home) home.classList.toggle('is-exploring', target !== null);
  }

  hero.addEventListener('mousemove', e => {
    const rect     = hero.getBoundingClientRect();
    /* panels sit side by side on desktop and stack on narrow screens */
    const vertical = getComputedStyle(hero).flexDirection === 'column';
    const pos      = vertical
      ? (e.clientY - rect.top) / rect.height
      : (e.clientX - rect.left) / rect.width;

    if (pos < EDGE)          setOpen(panels[0]);
    else if (pos > 1 - EDGE) setOpen(panels[1]);
    else                     setOpen(null);
  });

  hero.addEventListener('mouseleave', () => setOpen(null));
})();

/*=====scroll reveal======
  The matching CSS only hides these elements while <html> carries .reveal-on,
  which the inline head script adds. Anything that goes wrong below reveals
  everything instead of leaving the page blank.
========================*/
(function () {
  const SELECTOR = '.home-intro, .heading, .page-hero, .section-intro, .services-box, .portfolio-box, .work-card, .contact form';
  const targets  = document.querySelectorAll(SELECTOR);

  function revealAll() {
    targets.forEach(el => el.classList.add('is-revealed'));
  }

  if (!root.classList.contains('reveal-on')) return;

  try {
    let pending = targets.length;

    targets.forEach(el => {
      /* stagger siblings inside the same container (grid cards, service boxes) */
      const i = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.transitionDelay = Math.min(i, 5) * 70 + 'ms';
    });

    const check = () => {
      targets.forEach(el => {
        if (el.classList.contains('is-revealed')) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
          el.classList.add('is-revealed');
          pending--;
        }
      });

      if (pending <= 0) {
        window.removeEventListener('scroll', check);
        window.removeEventListener('resize', check);
      }
    };

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    check();

    /* failsafe: never leave anything hidden */
    setTimeout(revealAll, 5000);
  } catch (e) {
    revealAll();
  }
})();
