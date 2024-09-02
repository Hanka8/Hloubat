(function () {
  // DOM Elements
  const hamburgerBtn = document.querySelector('[data-custom="hamburgerBtn"]');
  const hamburgerLines = hamburgerBtn.querySelectorAll("span");
  const navMenu = document.querySelector('[data-custom="navMenu"]');
  const navMenuItems = document.querySelectorAll('[data-custom="navMenuItem"]');
  const carouselBtn = document.querySelector('[data-custom="carouselBtn"]');
  const carouselInner = document.querySelector('[data-custom="carouselInner"]');
  const carouselSlide1 = document.querySelector(
    '[data-custom="carouselSlide1"]'
  );
  const carouselSlide2 = document.querySelector(
    '[data-custom="carouselSlide2"]'
  );
  const allAccordionContents = document.querySelectorAll(
    '[data-custom="accordionContent"]'
  );
  const accordionHeaders = document.querySelectorAll(
    '[data-custom="accordionHeader"]'
  );

  // Hamburger Menu Logic
  function toggleAriaAttributes() {
    const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
    hamburgerBtn.setAttribute("aria-expanded", !expanded);
  }

  function closeMenu() {
    hamburgerBtn.classList.remove("close");
    hamburgerLines.forEach((line) => line.classList.remove("close"));
    navMenu.classList.remove("open");
    toggleAriaAttributes();
  }

  function showOrHideMenu() {
    hamburgerBtn.classList.toggle("close");
    hamburgerLines.forEach((line) => line.classList.toggle("close"));
    navMenu.classList.toggle("open");
    toggleAriaAttributes();
  }

  function setupHamburgerMenu() {
    navMenuItems.forEach((item) => item.addEventListener("click", closeMenu));
    hamburgerBtn.addEventListener("click", showOrHideMenu);

    document.addEventListener("click", (event) => {
      if (
        !navMenu.contains(event.target) &&
        !hamburgerBtn.contains(event.target) &&
        navMenu.classList.contains("open")
      ) {
        closeMenu();
      }
    });
  }

  // Carousel Logic
  function updateCarousel(currentSlide) {
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function setupCarousel() {
    let currentSlide = 0;
    const totalSlides = 2;

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      carouselBtn.classList.toggle("prev");
      updateCarousel(currentSlide);
    }

    carouselBtn.addEventListener("click", nextSlide);
    updateCarousel(currentSlide);
  }

  // Swipe Events for Mobile
  let touchStart = 0;
  let touchEnd = 0;

  function handleTouchStart(event) {
    touchStart = event.changedTouches[0].screenX;
  }

  function handleTouchMove(event) {
    touchEnd = event.changedTouches[0].screenX;
  }

  function handleTouchEnd(event) {
    if (Math.abs(touchStart - touchEnd) > 50) {
      closeMenu();
    }
  }

  function handleTouchSlide1End(event) {
    if (touchStart - touchEnd > 50) {
      carouselBtn.click();
    }
  }

  function handleTouchSlide2End(event) {
    if (touchStart - touchEnd < -50) {
      carouselBtn.click();
    }
  }

  function setupSwipeEvents() {
    navMenu.addEventListener("touchstart", handleTouchStart, false);
    navMenu.addEventListener("touchmove", handleTouchMove, false);
    navMenu.addEventListener("touchend", handleTouchEnd, false);

    carouselSlide1.addEventListener("touchstart", handleTouchStart, false);
    carouselSlide1.addEventListener("touchmove", handleTouchMove, false);
    carouselSlide1.addEventListener("touchend", handleTouchSlide1End, false);

    carouselSlide2.addEventListener("touchstart", handleTouchStart, false);
    carouselSlide2.addEventListener("touchmove", handleTouchMove, false);
    carouselSlide2.addEventListener("touchend", handleTouchSlide2End, false);
  }

  // Accordion Logic
  function toggleAccordion(event) {
    const header = event.currentTarget;
    const content = header.nextElementSibling;

    allAccordionContents.forEach((item) => {
      if (item !== content) {
        item.style.maxHeight = null;
      }
    });

    content.style.maxHeight = content.style.maxHeight
      ? null
      : content.scrollHeight + "px";
  }

  function setupAccordion() {
    accordionHeaders.forEach((header) =>
      header.addEventListener("click", toggleAccordion)
    );
  }

  // Initialize all functionality
  document.addEventListener("DOMContentLoaded", () => {
    setupHamburgerMenu();
    setupCarousel();
    setupSwipeEvents();
    setupAccordion();
  });
})();
