/*=====project modal=====
  Each project page defines:
    window.PROJECT_DATA — [{ name, category, images: [...] }]
    window.PROJECT_MODE — 'tall' (scrollable email artwork) | 'fit' (contained)
======================*/
(function () {
  const projects = window.PROJECT_DATA || [];

  const modal        = document.getElementById('projectModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose   = document.getElementById('modalClose');
  const modalTitle   = document.getElementById('modalTitle');
  const modalCat     = document.getElementById('modalCategory');
  const modalImg     = document.getElementById('modalImg');
  const modalWrap    = document.getElementById('modalImageWrap');
  const modalDots    = document.getElementById('modalDots');
  const modalCounter = document.getElementById('modalCounter');
  const modalPrev    = document.getElementById('modalPrev');
  const modalNext    = document.getElementById('modalNext');

  if (!modal || !projects.length) return;

  let slideImages = [];
  let slideIndex  = 0;

  function updateControls() {
    modalCounter.textContent = (slideIndex + 1) + ' / ' + slideImages.length;
    modalPrev.disabled = slideIndex === 0;
    modalNext.disabled = slideIndex === slideImages.length - 1;

    modalDots.querySelectorAll('.modal-dot').forEach((d, i) => {
      d.classList.toggle('active', i === slideIndex);
    });
  }

  function goToSlide(i) {
    slideIndex = i;

    modalImg.classList.add('fade');
    setTimeout(() => {
      modalImg.src = slideImages[slideIndex];
      modalImg.alt = modalTitle.textContent + ' — image ' + (slideIndex + 1);
      modalImg.classList.remove('fade');
      if (modalWrap) modalWrap.scrollTop = 0;
    }, 180);

    updateControls();
  }

  function openModal(projectIndex) {
    const project = projects[projectIndex];
    if (!project) return;

    slideImages = project.images;
    slideIndex  = 0;

    modalTitle.textContent = project.name;
    modalCat.textContent   = project.category;

    modalDots.innerHTML = slideImages.map((_, i) =>
      `<button class="modal-dot${i === 0 ? ' active' : ''}" data-i="${i}" aria-label="Image ${i + 1}"></button>`
    ).join('');

    modalDots.querySelectorAll('.modal-dot').forEach(dot => {
      dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.i, 10)));
    });

    modalImg.src = slideImages[0];
    modalImg.alt = project.name + ' — image 1';
    if (modalWrap) modalWrap.scrollTop = 0;
    updateControls();

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
    if (e.key === 'Escape')     closeModal();
    if (e.key === 'ArrowLeft'  && slideIndex > 0)                     goToSlide(slideIndex - 1);
    if (e.key === 'ArrowRight' && slideIndex < slideImages.length - 1) goToSlide(slideIndex + 1);
  });

  document.querySelectorAll('.portfolio-box').forEach(box => {
    box.addEventListener('click', () => openModal(parseInt(box.dataset.project, 10)));
  });
})();
