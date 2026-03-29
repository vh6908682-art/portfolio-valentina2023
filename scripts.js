/*=====menu icon navbar======*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};


/*=====scroll section active link======*/
let sections =  document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
      navlinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });

    };
  });


/*=====sticky navbar======*/
let header = document.querySelector('.header');

header.classList.toggle('sticky', window.scrollY > 100);


/*=====remove menu icon navbar when click scroll======*/

menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');



};

/*=====swiper======*/

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

/*=====drak light mode======*/
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle('bx-sun');
  document.body.classList.toggle('dark-mode');
};

/*=====scroll reveal======*/
ScrollReveal({
  //reset:true,
  distance: '80px',
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', {
  origin: 'top'
});

ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', {
  origin: 'bottom'
});

ScrollReveal().reveal('.home-content h1, .about-img img', {
  origin: 'left'
});

ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', {
  origin: 'right'
});

/*=====project modal======*/
const projects = [
  {
    name: 'Clueplay.ai',
    category: 'OTT Platform · UI/UX Design',
    images: [
      'images/projects/clueplay/clueplayai1.png',
      'images/projects/clueplay/clueplayai2.png'
    ]
  },
  {
    name: 'Healthcare Dashboard',
    category: 'Enterprise SaaS · Dashboard Design',
    images: [
      'images/projects/healthcare/healthcare.png'
    ]
  },
  {
    name: 'SpeakBetter',
    category: 'Mobile App · Micro-interactions',
    images: [
      'images/projects/speakbetter/speakbetter1.png',
      'images/projects/speakbetter/speakbetter2.png'
    ]
  },
  {
    name: 'Forex Platform',
    category: 'Fintech · Trading UI',
    images: Array.from({length: 20}, (_, i) => `images/projects/forex/forex${i + 1}.jpg`)
  },
  {
    name: 'Praxis Richter',
    category: 'Healthcare · Web Design',
    images: [
      'images/projects/praxis/praxis1.png',
      'images/projects/praxis/praxis2.png'
    ]
  },
  {
    name: 'Glycoso',
    category: 'Digital Healthcare · UX Design',
    images: Array.from({length: 16}, (_, i) => `images/projects/glycoso/glycoso${i + 1}.jpg`)
  },
  {
    name: 'Gravelu',
    category: 'Branding · Web Design',
    images: Array.from({length: 17}, (_, i) => `images/projects/gravelu/gravelu${i + 1}.jpg`)
  },
  {
    name: 'FIFA World Cup',
    category: 'Illustration · Graphic Design',
    images: Array.from({length: 18}, (_, i) => `images/projects/wolrdcup/worldcup${i + 1}.jpg`)
  }
];

const modal       = document.getElementById('projectModal');
const modalOverlay= document.getElementById('modalOverlay');
const modalClose  = document.getElementById('modalClose');
const modalTitle  = document.getElementById('modalTitle');
const modalCat    = document.getElementById('modalCategory');
const modalImg    = document.getElementById('modalImg');
const modalDots   = document.getElementById('modalDots');
const modalCounter= document.getElementById('modalCounter');
const modalPrev   = document.getElementById('modalPrev');
const modalNext   = document.getElementById('modalNext');

let slideImages = [];
let slideIndex  = 0;

function goToSlide(i) {
  slideIndex = i;
  const img = modalImg;

  img.classList.add('fade');
  setTimeout(() => {
    img.src = slideImages[slideIndex];
    img.alt = modalTitle.textContent + ' — image ' + (slideIndex + 1);
    img.classList.remove('fade');
  }, 180);

  modalCounter.textContent = (slideIndex + 1) + ' / ' + slideImages.length;
  modalPrev.disabled = slideIndex === 0;
  modalNext.disabled = slideIndex === slideImages.length - 1;

  document.querySelectorAll('.modal-dot').forEach((d, idx) => {
    d.classList.toggle('active', idx === slideIndex);
  });
}

function openModal(projectIndex) {
  const project   = projects[projectIndex];
  slideImages     = project.images;
  slideIndex      = 0;

  modalTitle.textContent = project.name;
  modalCat.textContent   = project.category;

  // Build dots
  modalDots.innerHTML = slideImages.map((_, i) =>
    `<button class="modal-dot${i === 0 ? ' active' : ''}" data-i="${i}" aria-label="Image ${i + 1}"></button>`
  ).join('');

  modalDots.querySelectorAll('.modal-dot').forEach(dot => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.i)));
  });

  // Set first image immediately (no fade on open)
  modalImg.src = slideImages[0];
  modalCounter.textContent = '1 / ' + slideImages.length;
  modalPrev.disabled = true;
  modalNext.disabled = slideImages.length === 1;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalPrev.addEventListener('click', () => { if (slideIndex > 0) goToSlide(slideIndex - 1); });
modalNext.addEventListener('click', () => { if (slideIndex < slideImages.length - 1) goToSlide(slideIndex + 1); });

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('active')) return;
  if (e.key === 'Escape')      closeModal();
  if (e.key === 'ArrowLeft')   { if (slideIndex > 0) goToSlide(slideIndex - 1); }
  if (e.key === 'ArrowRight')  { if (slideIndex < slideImages.length - 1) goToSlide(slideIndex + 1); }
});

document.querySelectorAll('.portfolio-box').forEach(box => {
  box.addEventListener('click', e => {
    // don't open if clicking the external link icon
    if (e.target.closest('a')) return;
    openModal(parseInt(box.dataset.project));
  });
});