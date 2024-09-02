(function () {
  // DOM Elements
  const hamburgerBtn = document.querySelector('[data-custom="hamburgerBtn"]');
  const hamburgerLines = hamburgerBtn.querySelectorAll("span");
  const navBar = document.querySelector('[data-custom="navBar"]');
  const navMenu = document.querySelector('[data-custom="navMenu"]');
  const navMenuItems = document.querySelectorAll('[data-custom="navMenuItem"]');
  const carouselBtn = document.querySelector('[data-custom="carouselBtn"]');
  const backToTopBtn = document.querySelector('[data-custom="backToTopBtn"]');
  const carouselInner = document.querySelector('[data-custom="carouselInner"]');
  const carouselSlide1 = document.querySelector(
    '[data-custom="carouselSlide1"]'
  );
  const carouselSlide2 = document.querySelector(
    '[data-custom="carouselSlide2"]'
  );
  const carouselIndicatorLeft = document.querySelector(
    '[data-custom="carouselIndicatorLeft"]'
  );
  const carouselIndicatorRight = document.querySelector(
    '[data-custom="carouselIndicatorRight"]'
  );
  const allAccordionContents = document.querySelectorAll(
    '[data-custom="accordionContent"]'
  );
  const accordionHeaders = document.querySelectorAll(
    '[data-custom="accordionHeader"]'
  );

  // Navbar backgroung on mobile when scrolling 
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      navBar.classList.add("nav--scroll-mobile");
    } else {
      navBar.classList.remove("nav--scroll-mobile");
    }
  });

  // Back to Top Button Logic
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

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
      carouselIndicatorLeft.classList.toggle(
        "meditation__carousel-indicator--active"
      );
      carouselIndicatorRight.classList.toggle(
        "meditation__carousel-indicator--active"
      );
      updateCarousel(currentSlide);
    }

    carouselBtn.addEventListener("click", nextSlide);
    carouselIndicatorLeft.addEventListener("click", () => {
      if (
        carouselIndicatorLeft.classList.contains(
          "meditation__carousel-indicator--active"
        )
      ) {
        return;
      }
      nextSlide();
    });
    carouselIndicatorRight.addEventListener("click", () => {
      if (
        carouselIndicatorRight.classList.contains(
          "meditation__carousel-indicator--active"
        )
      ) {
        return;
      }
      nextSlide();
    });
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
    if (Math.abs(touchStart - touchEnd) > 80) {
      closeMenu();
    }
  }

  function handleTouchSlide1End(event) {
    if (touchStart - touchEnd > 80) {
      carouselBtn.click();
    }
  }

  function handleTouchSlide2End(event) {
    if (touchStart - touchEnd < -80) {
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
