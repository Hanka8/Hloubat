const hideOnMobileWidth = 768;

const elementsHiddenOnMobile = document.querySelectorAll(
  '[data-custom="hideOnMobile"]'
);
const hamburgerBtn = document.querySelector('[data-custom="hamburgerBtn"]');
const hamburgerLines = hamburgerBtn.querySelectorAll("span");
const navMenu = document.querySelector('[data-custom="navMenu"]');

function hideOnMobile(elements) {
  if (window.innerWidth < hideOnMobileWidth) {
    elements.forEach(function (element) {
      element.style.display = "none";
    });
  } else {
    elements.forEach(function (element) {
      element.style.display = "block";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  hideOnMobile(elementsHiddenOnMobile);
});
window.addEventListener("resize", () => {
  hideOnMobile(elementsHiddenOnMobile);
});

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("close");
  hamburgerLines.forEach(function (line) {
    line.classList.toggle("close");
  });
  navMenu.classList.toggle("open");
});

// TODO: swipe and touch events for mobile
// TODO: clicking outside the menu closes it


// REMOVE THE FOLLOWING CODE AFTER TESTING

// console.log window screen aspect ratio

// window.addEventListener("resize", () => {
//   console.log(
//     "aspect ratio " +
//       Math.round((window.innerWidth / window.innerHeight) * 100) / 100
//   );
// });
