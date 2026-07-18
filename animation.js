//1. Select every animated element at once.
const animatedElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
       observer.unobserve(entry.target);// Stop watching elements once they've animated in
    }
  });
}, {
  threshold: 0.1
});

animatedElements.forEach((element) => {
  observer.observe(element);
});