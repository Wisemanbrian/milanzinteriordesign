// Animate counter
    function animateCounter(element, target, duration = 2000) {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          element.textContent = target + (target === 100 ? '' : '') + '%';
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(start) + '%';
        }
      }, 16);
    }

    // Intersection Observer to trigger on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          const target = entry.target.getAttribute('data-target');
          animateCounter(entry.target, parseInt(target));
          entry.target.classList.add('counted');
        }
      });
    }, { threshold: 0.7 });

    // Observe all counters
    document.querySelectorAll('.number').forEach(counter => {
      observer.observe(counter);
    });