// ========== Slider Logic ==========
(function () {
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");

  if (!slides.length || !dotsContainer) return;

  let currentSlide = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    dotsContainer.children[currentSlide].classList.remove("active");

    currentSlide = index;

    slides[currentSlide].classList.add("active");
    dotsContainer.children[currentSlide].classList.add("active");

    updateButtons();
  }

  function updateButtons() {
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    if (prevBtn) prevBtn.style.opacity = currentSlide === 0 ? "0.3" : "1";
    if (nextBtn) nextBtn.style.opacity = currentSlide === slides.length - 1 ? "0.3" : "1";
  }

  // Expose to global
  window.nextSlide = function () {
    if (currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
  };

  window.prevSlide = function () {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  };

  // Swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  const sliderEl = document.querySelector(".slider");

  if (sliderEl) {
    sliderEl.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    sliderEl.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) window.nextSlide();
        else window.prevSlide();
      }
    });
  }

  updateButtons();
})();
