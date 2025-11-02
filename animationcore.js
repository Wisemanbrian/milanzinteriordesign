class ProFadeIn {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    // Respect reduced motion
    if (this.matchesReducedMotion()) return;

    this.createObserver();
    this.observeElements();
    this.staggerGrids();
    this.animateOnLoad();
  }

  matchesReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  createObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            this.observer.unobserve(entry.target); // Memory efficient
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px' // Trigger early for smooth scroll
      }
    );
  }

  observeElements() {
    // Auto-detect common elements across your pages
    const selectors = [
      '.fade-in-element',           // Manual override
      '[class*="card"]',            // team-card, service-card, etc.
      '.hero-content',
      '.story-text',
      '.join-content',
      '.promise-card',
      '.service-body',
      '.project-card',
      '.furniture-card',
      '.team-card',
      'section h2',                 // All section headers
      '.portfolio-header',          // Portfolio header
      '.contact-info',
      '.contact-form'
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        this.observer.observe(el);
      });
    });
  }

  staggerGrids() {
    // Auto-detect grid containers and add stagger class
    const gridSelectors = [
      '.team-grid',
      '.services-grid',
      '.furniture-grid',
      '.portfolio-grid',
      '.promise-grid',
      '.story-section'
    ];

    gridSelectors.forEach((selector) => {
      const grid = document.querySelector(selector);
      if (grid) {
        grid.classList.add('fade-in-grid');
      }
    });
  }

  animateOnLoad() {
    // Force animate above-the-fold elements immediately
    requestAnimationFrame(() => {
      document.querySelectorAll('.hero, .portfolio-header').forEach((el) => {
        el.classList.add('fade-in-visible');
      });
    });
  }
}

// Initialize on DOM ready + images loaded (pro perf)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ProFadeIn());
} else {
  new ProFadeIn();
}

// Re-init on route change (for SPA-like behavior if needed)
window.addEventListener('load', () => {
  if (!document.body.hasAttribute('data-fade-init')) {
    new ProFadeIn();
    document.body.setAttribute('data-fade-init', 'true');
  }
});