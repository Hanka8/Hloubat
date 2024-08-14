const hideOnMobileWidth = 768;

const elementsHiddenOnMobile = document.querySelectorAll('[data-custom="hideOnMobile"]');

function hideOnMobile(elements) {
    if (window.innerWidth < hideOnMobileWidth) {
        elements.forEach(function(element) {
            element.style.display = 'none';
        });
    } else {
        elements.forEach(function(element) {
            element.style.display = 'block';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    hideOnMobile(elementsHiddenOnMobile);
});
window.addEventListener('resize', () => {
    hideOnMobile(elementsHiddenOnMobile);
});