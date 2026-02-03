(function () {
  'use strict';

  const header = document.querySelector('.header');
  const workCards = document.querySelectorAll('.work-card');
  const serviceTabs = document.querySelectorAll('.service-tab');
  const servicePanels = document.querySelectorAll('.service-panel');
  const backTop = document.querySelector('.back-top');
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  const themeToggle = document.querySelector('.theme-toggle');
  const THEME_KEY = 'valentina-theme';

  // Theme toggle
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }
  themeToggle?.addEventListener('click', () => {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  // Project gallery data (from ValentinaDesign portfolio)
  function range(n, prefix, ext) {
    const arr = [];
    for (let i = 1; i <= n; i++) arr.push(prefix + i + ext);
    return arr;
  }
  const PROJECTS = [
    {
      title: 'Clueplay.ai',
      description: 'OTT platform revamp with a cinematic, user-centric interface. Rich content previews, smooth transitions, and effortless navigation—helping users discover, engage, and continue watching seamlessly. A modern OTT experience that feels immersive and intuitive.',
      images: ['assets/projects/clueplay/clueplayai1.png', 'assets/projects/clueplay/clueplayai2.png']
    },
    {
      title: 'Forex',
      description: 'Dashboard and landing design for a forex platform. Focus on clarity, trust, and easy access to key metrics and trading tools across devices.',
      images: range(20, 'assets/projects/forex/forex', '.jpg')
    },
    {
      title: 'Glycoso',
      description: 'Web presence for a health-focused product. Clean layout and visual hierarchy to communicate values and guide users through information and actions.',
      images: range(16, 'assets/projects/glycoso/glycoso', '.jpg')
    },
    {
      title: 'Gravelu',
      description: 'Full-site design balancing brand personality with usability. Responsive layouts and clear CTAs to support discovery and conversion.',
      images: range(17, 'assets/projects/gravelu/gravelu', '.jpg')
    },
    {
      title: 'Healthcare Operations Dashboard',
      description: 'Centralized platform for healthcare administrators to oversee appointments, patient records, and doctor assignments. Built for efficiency and clarity.',
      images: ['assets/projects/healthcare/healthcare.png']
    },
    {
      title: 'Praxis Richter',
      description: 'Modern dental clinic website thoughtfully designed to enhance patient experience and inspire confident smiles. Clean layout and calming visual language for trust, care, and professionalism. Patients can explore services, book appointments, and navigate with ease.',
      images: ['assets/projects/praxis/praxis1.png', 'assets/projects/praxis/praxis2.png']
    },
    {
      title: 'SpeakBetter',
      description: 'UI/UX for an app that tracks filler words in real time and helps users speak more confidently by reducing them step by step. Simple, focused interface.',
      images: ['assets/projects/speakbetter/speakbetter1.png', 'assets/projects/speakbetter/speakbetter2.png']
    },
    {
      title: 'WorldCup',
      description: 'Landing and UI design with an event-driven, energetic feel. Responsive and engaging for fans and users during the campaign.',
      images: range(18, 'assets/projects/wolrdcup/worldcup', '.jpg')
    }
  ];

  // Project gallery modal
  const galleryModal = document.getElementById('project-gallery');
  const galleryBackdrop = galleryModal?.querySelector('.gallery-modal-backdrop');
  const galleryTitle = galleryModal?.querySelector('.gallery-modal-title');
  const galleryDesc = galleryModal?.querySelector('.gallery-modal-desc');
  const galleryImage = galleryModal?.querySelector('.gallery-modal-image');
  const galleryPrev = galleryModal?.querySelector('.gallery-prev');
  const galleryNext = galleryModal?.querySelector('.gallery-next');
  const galleryClose = galleryModal?.querySelector('.gallery-modal-close');
  const galleryCurrent = galleryModal?.querySelector('.gallery-current');
  const galleryTotal = galleryModal?.querySelector('.gallery-total');

  let currentProject = null;
  let currentImageIndex = 0;

  function openGallery(projectIndex) {
    const proj = PROJECTS[projectIndex];
    if (!proj || !proj.images || !proj.images.length) return;
    currentProject = projectIndex;
    currentImageIndex = 0;
    if (galleryModal) galleryModal.hidden = false;
    if (galleryTitle) galleryTitle.textContent = proj.title;
    if (galleryDesc) galleryDesc.textContent = proj.description;
    if (galleryTotal) galleryTotal.textContent = String(proj.images.length);
    updateGalleryImage();
    document.body.style.overflow = 'hidden';
  }

  function closeGallery() {
    if (galleryModal) galleryModal.hidden = true;
    currentProject = null;
    document.body.style.overflow = '';
  }

  function updateGalleryImage() {
    if (currentProject == null) return;
    const proj = PROJECTS[currentProject];
    if (!proj || !galleryImage) return;
    const src = proj.images[currentImageIndex];
    galleryImage.src = src;
    galleryImage.alt = proj.title + ' — image ' + (currentImageIndex + 1);
    if (galleryCurrent) galleryCurrent.textContent = String(currentImageIndex + 1);
  }

  function galleryPrevImage() {
    if (currentProject == null) return;
    const n = PROJECTS[currentProject].images.length;
    currentImageIndex = currentImageIndex <= 0 ? n - 1 : currentImageIndex - 1;
    updateGalleryImage();
  }

  function galleryNextImage() {
    if (currentProject == null) return;
    const n = PROJECTS[currentProject].images.length;
    currentImageIndex = currentImageIndex >= n - 1 ? 0 : currentImageIndex + 1;
    updateGalleryImage();
  }

  document.querySelectorAll('.work-card-clickable').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project');
      if (id != null) openGallery(parseInt(id, 10));
    });
  });

  galleryBackdrop?.addEventListener('click', closeGallery);
  galleryClose?.addEventListener('click', closeGallery);
  galleryPrev?.addEventListener('click', galleryPrevImage);
  galleryNext?.addEventListener('click', galleryNextImage);

  document.addEventListener('keydown', (e) => {
    if (currentProject == null) return;
    if (e.key === 'Escape') {
      closeGallery();
      return;
    }
    const n = PROJECTS[currentProject].images.length;
    if (e.key === 'ArrowLeft') {
      galleryPrevImage();
      return;
    }
    if (e.key === 'ArrowRight') {
      galleryNextImage();
    }
  });

  // Header background on scroll
  function onScroll() {
    if (window.scrollY > 80) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Work cards: reveal on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.transitionDelay = `${Math.min(el.dataset.index ?? 0, 6) * 0.08}s`;
        el.classList.add('visible');
      }
    });
  }, observerOptions);
  workCards.forEach((card, i) => {
    card.dataset.index = i;
    observer.observe(card);
  });

  // Service tabs
  serviceTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-tab');
      serviceTabs.forEach((t) => t.classList.remove('active'));
      servicePanels.forEach((p) => {
        p.classList.toggle('active', p.getAttribute('data-panel') === id);
      });
      tab.classList.add('active');
    });
  });

  // Back to top
  backTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Mobile menu
  menuBtn?.addEventListener('click', () => {
    nav?.classList.toggle('open');
    menuBtn?.classList.toggle('open');
  });

  // Scroll reveal — add .in-view when element enters viewport
  const revealEls = document.querySelectorAll('.reveal[data-reveal]');
  const revealOpts = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, revealOpts);
  revealEls.forEach((el) => revealObserver.observe(el));
})();
