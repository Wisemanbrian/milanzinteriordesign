// Animate counter
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // ~60fps
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '%';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + '%';
    }
  }, 16);
}

// Intersection Observer to trigger on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      
      // Reset counter to 0 before animating again
      entry.target.textContent = '0%';
      animateCounter(entry.target, target);
    }
  });
}, { threshold: 0.7 });

// Observe all counters
document.querySelectorAll('.number').forEach(counter => {
  observer.observe(counter);
});
