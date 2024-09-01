const hamburgerBtn = document.querySelector('[data-custom="hamburgerBtn"]');
const hamburgerLines = hamburgerBtn.querySelectorAll("span");
const navMenu = document.querySelector('[data-custom="navMenu"]');
const carouselBtn = document.querySelector('[data-custom="carouselBtn"]');

function showOrHideMenu() {
  hamburgerBtn.classList.toggle("close");
  hamburgerLines.forEach((line) => {
    line.classList.toggle("close");
  });
  navMenu.classList.toggle("open");
}

hamburgerBtn.addEventListener("click", showOrHideMenu);

// TODO: swipe and touch events for mobile (hamburger + accordion)
// TODO: clicking outside the menu closes it

document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  const totalSlides = 2;
  const carouselInner = document.querySelector('[data-custom="carouselInner"]');

  if (!carouselInner) {
    console.error("Carousel inner container not found.");
    return;
  }

  function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    carouselBtn.classList.toggle("prev");
    updateCarousel();
  }

  carouselBtn
    .addEventListener("click", nextSlide);

  updateCarousel();
});

function toggleAccordion(event) {
  const header = event.currentTarget;
  const content = header.nextElementSibling;
  const allContents = document.querySelectorAll(
    '[data-custom="accordionContent"]'
  );

  allContents.forEach((item) => {
    if (item !== content) {
      item.style.maxHeight = null;
    }
  });

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}


// REMOVE THE FOLLOWING CODE AFTER TESTING

// console.log window screen aspect ratio

// window.addEventListener("resize", () => {
//   console.log(
//     "aspect ratio " +
//       Math.round((window.innerWidth / window.innerHeight) * 100) / 100
//   );
// });
