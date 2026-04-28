document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initCriticalAnimations, 100);
    setTimeout(initNonCriticalFeatures, 500);
});

function initCriticalAnimations() {
    // === PRELOADER ===
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress-bar');
    const preloaderLogo = document.querySelector('.preloader-logo span');

    if (preloader && progressBar && preloaderLogo) {
        let start = null;
        const duration = 2000;
        const animateProgress = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration * 100, 100);
            progressBar.style.width = `${progress}%`;

            if (progress < 100) {
                requestAnimationFrame(animateProgress);
            } else {
                if (typeof gsap !== 'undefined') {
                    gsap.to(preloaderLogo, {
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        onComplete: () => {
                            gsap.to(preloader, {
                                opacity: 0,
                                duration: 0.6,
                                ease: 'power2.inOut',
                                onComplete: () => {
                                    preloader.remove();
                                    document.body.style.overflow = 'auto';
                                }
                            });
                        }
                    });
                } else {
                    preloaderLogo.style.transform = 'translateY(0)';
                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        setTimeout(() => {
                            preloader.remove();
                            document.body.style.overflow = 'auto';
                        }, 600);
                    }, 800);
                }
            }
        };
        requestAnimationFrame(animateProgress);
    }

    // === HERO ANIMATIONS ===
    if (document.querySelector('.hero-title span')) {
        animateWithFallback('.hero-title span', {
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.5
        });
    }

    if (document.querySelector('.hero-subtitle')) {
        animateWithFallback('.hero-subtitle', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 1.2
        });
    }

    if (document.querySelector('.hero-buttons')) {
        animateWithFallback('.hero-buttons', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 1.5
        });
    }

    // === HEADER SCROLL EFFECT ===
    const header = document.querySelector('.header');
    if (header) {
        let ticking = false;
        const updateHeader = () => {
            header.classList.toggle('header-scrolled', window.scrollY > 100);
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
        updateHeader();
    }
}

function initNonCriticalFeatures() {
    initCustomCursor();
    initMobileMenu();
    initScrollAnimations();
    initTestimonialSlider();
    initPortfolioModal();
    initContactForm();
    initSmoothScrolling();
    initVideoBackground();
}



// === CUSTOM CURSOR ===
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower) return;

    let lastX = 0, lastY = 0, requestId = null;

    const moveCursor = (e) => {
        lastX = e.clientX;
        lastY = e.clientY;

        if (!requestId) {
            requestId = requestAnimationFrame(() => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(cursor, { x: lastX, y: lastY, duration: 0.1, ease: 'power2.out' });
                    gsap.to(cursorFollower, { x: lastX, y: lastY, duration: 0.3, ease: 'power2.out' });
                } else {
                    cursor.style.transform = `translate(${lastX}px, ${lastY}px)`;
                    cursorFollower.style.transform = `translate(${lastX}px, ${lastY}px)`;
                }
                requestId = null;
            });
        }
    };

    document.addEventListener('mousemove', moveCursor, { passive: true });

    document.querySelectorAll('a, button, .nav-link, .btn, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            cursorFollower.classList.add('cursor-follower-active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            cursorFollower.classList.remove('cursor-follower-active');
        });
    });
}

// === MOBILE MENU ===
function initMobileMenu() {
    document.addEventListener('click', (e) => {
        const toggle = e.target.closest('.mobile-menu-toggle');
        if (toggle) {
            toggle.classList.toggle('active');
            document.querySelector('.nav-links-mobile')?.classList.toggle('active');
        }

        if (e.target.closest('.nav-link') && document.querySelector('.mobile-menu-toggle.active')) {
            document.querySelector('.mobile-menu-toggle')?.classList.remove('active');
            document.querySelector('.nav-links-mobile')?.classList.remove('active');
        }
    });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        loadGSAPAndRetry();
        return;
    }

    initStatsAnimation();
    initPortfolioAnimation();
    ScrollTrigger.refresh();
}

function loadGSAPAndRetry() {
    if (window._gsapLoading) return;
    window._gsapLoading = true;

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js', () => {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js', () => {
            window._gsapLoading = false;
            initScrollAnimations();
        });
    });
}

// === STATS COUNTER ===
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count')) || 0;
        ScrollTrigger.create({
            trigger: stat.closest('.stat'),
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to(stat, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: "power2.out"
                });
            }
        });
    });
}


// === VIDEO BACKGROUND FALLBACK ===
function initVideoBackground() {
    const video = document.querySelector('.hero-video');
    if (!video) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(() => {
                    video.style.display = 'none';
                    video.parentElement.style.backgroundImage = 'url("fallback.jpg")';
                    video.parentElement.style.backgroundSize = 'cover';
                });
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(video);
}

// === UTILITY: Load Script ===
function loadScript(src, cb) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = cb;
    document.head.appendChild(script);
}