document.addEventListener('DOMContentLoaded', () => {
    // Defer non-critical animations and interactions
    setTimeout(initCriticalAnimations, 100);
    setTimeout(initNonCriticalFeatures, 500);
});

function initCriticalAnimations() {
    // Preloader Animation (Optimized with requestAnimationFrame)
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress-bar');
    const preloaderLogo = document.querySelector('.preloader-logo span');
    
    if (preloader && progressBar && preloaderLogo) {
        let start = null;
        const duration = 2000; // 2 seconds total
        const animateProgress = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration * 100, 100);
            progressBar.style.width = `${progress}%`;
            
            if (progress < 100) {
                requestAnimationFrame(animateProgress);
            } else {
                // Animate logo and hide preloader
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
                    // Fallback if GSAP isn't loaded yet
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

    // Hero Section Animations (Critical above-the-fold content)
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

    // Header Scroll Effect (Optimized with throttling)
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
        
        // Initial check
        updateHeader();
    }
}

function initNonCriticalFeatures() {
    // Custom Cursor (Optimized with throttling)
    initCustomCursor();
    
    // Mobile Menu Toggle (Optimized event delegation)
    initMobileMenu();
    
    // ScrollTrigger animations
    initScrollAnimations();
    
    // Testimonial Slider
    initTestimonialSlider();
    
    // Portfolio Modal
    initPortfolioModal();
    
    // Contact Form
    initContactForm();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Video Background
    initVideoBackground();
    
    // Gallery Filter
    initGalleryFilter();
}

// Helper function for animations with GSAP fallback
function animateWithFallback(selector, options) {
    if (typeof gsap !== 'undefined') {
        gsap.to(selector, options);
    } else {
        // Fallback using CSS transitions
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, i) => {
            setTimeout(() => {
                el.style.transition = `transform ${options.duration || 1}s ${options.ease || 'ease'}, opacity ${options.duration || 1}s ${options.ease || 'ease'}`;
                el.style.transform = 'translateY(0)';
                if (options.opacity !== undefined) {
                    el.style.opacity = options.opacity;
                }
            }, (options.delay || 0) * 1000 + (options.stagger || 0) * 1000 * i);
        });
    }
}

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        let lastX = 0, lastY = 0;
        let requestId = null;
        
        const moveCursor = (e) => {
            lastX = e.clientX;
            lastY = e.clientY;
            
            if (!requestId) {
                requestId = requestAnimationFrame(() => {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(cursor, {
                            x: lastX,
                            y: lastY,
                            duration: 0.1,
                            ease: 'power2.out'
                        });
                        
                        gsap.to(cursorFollower, {
                            x: lastX,
                            y: lastY,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    } else {
                        cursor.style.transform = `translate(${lastX}px, ${lastY}px)`;
                        cursorFollower.style.transform = `translate(${lastX}px, ${lastY}px)`;
                    }
                    
                    requestId = null;
                });
            }
        };
        
        document.addEventListener('mousemove', moveCursor, { passive: true });
        
        // Optimized hover elements
        const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .service-card, .nav-link, .modal-close');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-active');
                cursorFollower.classList.add('cursor-follower-active');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-active');
                cursorFollower.classList.remove('cursor-follower-active');
            });
        });
    }
}

function initMobileMenu() {
    document.addEventListener('click', (e) => {
        // Mobile menu toggle
        if (e.target.closest('.mobile-menu-toggle')) {
            const toggle = e.target.closest('.mobile-menu-toggle');
            toggle.classList.toggle('active');
            document.querySelector('.nav-links-mobile')?.classList.toggle('active');
        }
        
        // Close mobile menu when clicking on a link
        if (e.target.closest('.nav-link') && document.querySelector('.mobile-menu-toggle.active')) {
            document.querySelector('.mobile-menu-toggle')?.classList.remove('active');
            document.querySelector('.nav-links-mobile')?.classList.remove('active');
        }
    });
}

function initScrollAnimations() {
    // Check if GSAP and ScrollTrigger are loaded, if not, load them and retry
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        loadGSAPAndRetry();
        return;
    }

    // Initialize all scroll animations
    initAboutAnimation();
    initStatsAnimation();
    initServicesAnimation();
    initPortfolioAnimation();
    initContactAnimation();
    
    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
}

function loadGSAPAndRetry() {
    if (!window._gsapLoading) {
        window._gsapLoading = true;
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js', () => {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js', () => {
                window._gsapLoading = false;
                initScrollAnimations();
            });
        });
    } else {
        // If already loading, check again after a delay
        setTimeout(() => {
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                initScrollAnimations();
            }
        }, 500);
    }
}

function initAboutAnimation() {
    if (document.querySelector('.about-image img')) {
        gsap.from('.about-image img', {
            scale: 1.1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.about',
                start: 'top 70%',
                once: true
            }
        });
    }
}

function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count')) || 0;
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    const duration = 2;
                    gsap.to(stat, {
                        innerText: target,
                        duration: duration,
                        snap: { innerText: 1 },
                        ease: "power2.out"
                    });
                }
            });
        });
    }
}

function initServicesAnimation() {
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        // First make sure all service cards are visible
        gsap.set('.service-card', { opacity: 1, y: 0 });
        
        // Then set up the animation
        gsap.from('.service-card', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: servicesGrid,
                start: 'top 80%',
                once: true
            }
        });
    }
}

function initPortfolioAnimation() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        // First make sure all portfolio items are visible
        gsap.set('.portfolio-item', { opacity: 1, y: 0 });
        
        // Then set up the animation
        gsap.from('.portfolio-item', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: portfolioGrid,
                start: 'top 80%',
                once: true
            }
        });
    }
}

function initContactAnimation() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        gsap.from('.contact-form', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: contactForm,
                start: 'top 80%',
                once: true
            }
        });
    }
}

function initTestimonialSlider() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    if (!testimonialSlides.length) return;

    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const slider = document.querySelector('.testimonials-slider');
    let currentSlide = 0;
    let slideInterval;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationId;

    function showSlide(index) {
        if (index < 0) index = testimonialSlides.length - 1;
        if (index >= testimonialSlides.length) index = 0;
        
        currentSlide = index;
        
        testimonialSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            if (i === index) {
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(slide, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
                    );
                } else {
                    slide.style.opacity = '0';
                    slide.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        slide.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        slide.style.opacity = '1';
                        slide.style.transform = 'translateY(0)';
                    }, 10);
                }
            }
        });
    }

    function startSlider() {
        if (!slideInterval) {
            slideInterval = setInterval(() => {
                showSlide((currentSlide + 1) % testimonialSlides.length);
            }, 5000);
        }
    }

    function stopSlider() {
        clearInterval(slideInterval);
        slideInterval = null;
    }

    // Touch events for mobile swipe
    function touchStart(index) {
        return function(e) {
            isDragging = true;
            startPos = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            currentTranslate = 0;
            prevTranslate = 0;
            animationId = requestAnimationFrame(animation);
            stopSlider();
            e.preventDefault();
        };
    }

    function touchMove(e) {
        if (isDragging) {
            const currentPosition = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            currentTranslate = currentPosition - startPos;
        }
    }

    function touchEnd() {
        if (isDragging) {
            isDragging = false;
            cancelAnimationFrame(animationId);
            
            if (currentTranslate < -50) {
                // Swipe left
                showSlide(currentSlide + 1);
            } else if (currentTranslate > 50) {
                // Swipe right
                showSlide(currentSlide - 1);
            }
            
            startSlider();
        }
    }

    function animation() {
        if (isDragging) {
            testimonialSlides[currentSlide].style.transform = `translateX(${currentTranslate}px)`;
            animationId = requestAnimationFrame(animation);
        }
    }

    // Initialize
    showSlide(0);
    startSlider();

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopSlider();
        showSlide(currentSlide - 1);
        startSlider();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopSlider();
        showSlide(currentSlide + 1);
        startSlider();
    });

    if (slider) {
        slider.addEventListener('mouseenter', stopSlider);
        slider.addEventListener('mouseleave', startSlider);
        
        // Touch events
        testimonialSlides.forEach((slide, index) => {
            slide.addEventListener('touchstart', touchStart(index), { passive: false });
            slide.addEventListener('mousedown', touchStart(index));
        });
        
        document.addEventListener('touchmove', touchMove, { passive: false });
        document.addEventListener('mousemove', touchMove);
        document.addEventListener('touchend', touchEnd);
        document.addEventListener('mouseup', touchEnd);
    }
}

function initPortfolioModal() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (!portfolioItems.length) return;

    const projectModal = document.querySelector('.project-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.querySelector('.modal-image img');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalLocation = document.querySelector('.modal-location');
    const modalYear = document.querySelector('.modal-year');
    const modalScope = document.querySelector('.modal-scope');

    // Sample project data (could be loaded from API)
    const projects = [
        {
            title: "Spark Systems",
            description: "This contemporary penthouse in the heart of Mayfair features floor-to-ceiling windows offering panoramic views of London. We designed a minimalist yet warm interior with custom furniture pieces and a neutral palette accented with rich textures.",
            image: "IMG_1694.jpg",
            location: "city center, malawi",
            year: "2022",
            scope: "Full interior design"
        },
        {
            title: "Spark Systems",
            description: "This contemporary penthouse in the heart of Mayfair features floor-to-ceiling windows offering panoramic views of London. We designed a minimalist yet warm interior with custom furniture pieces and a neutral palette accented with rich textures.",
            image: "IMG_1694.jpg",
            location: "city center, malawi",
            year: "2022",
            scope: "Full interior design"
        },
         {
            title: "Spark Systems",
            description: "This contemporary penthouse in the heart of Mayfair features floor-to-ceiling windows offering panoramic views of London. We designed a minimalist yet warm interior with custom furniture pieces and a neutral palette accented with rich textures.",
            image: "IMG_1694.jpg",
            location: "city center, malawi",
            year: "2022",
            scope: "Full interior design"
        },
    ];

    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const project = projects[index];
            
            // Show modal immediately with loading state
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalLocation.textContent = project.location;
            modalYear.textContent = project.year;
            modalScope.textContent = project.scope;
            modalImage.src = ''; // Clear previous image
            modalImage.classList.add('loading');
            
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Load image in background
            const img = new Image();
            img.src = project.image;
            img.onload = () => {
                modalImage.src = project.image;
                modalImage.classList.remove('loading');
            };
            img.onerror = () => {
                modalImage.src = 'https://via.placeholder.com/800x600?text=Project+Image';
                modalImage.classList.remove('loading');
            };
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Simulate API call (replace with actual fetch)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.textContent = 'Thank you for your message! We will get back to you soon.';
                contactForm.appendChild(successMsg);
                
                // Remove message after 5 seconds
                setTimeout(() => successMsg.remove(), 5000);
                contactForm.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                alert('There was an error sending your message. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
}

function initSmoothScrolling() {
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}

function initVideoBackground() {
    const video = document.querySelector('.hero-video');
    const videoContainer = document.querySelector('.video-container');
    
    if (video && videoContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video is in view, check if it can play
                    video.play().catch(() => {
                        // If video fails to play, use fallback image
                        videoContainer.style.backgroundImage = 'url("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80")';
                        videoContainer.style.backgroundSize = 'cover';
                        videoContainer.style.backgroundPosition = 'center';
                        video.style.display = 'none';
                    });
                } else {
                    // Video is out of view, pause it
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(videoContainer);
        
        // Fallback if IntersectionObserver is not supported
        video.addEventListener('error', () => {
            videoContainer.style.backgroundImage = 'url("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80")';
            videoContainer.style.backgroundSize = 'cover';
            videoContainer.style.backgroundPosition = 'center';
            video.style.display = 'none';
        });
    }
}

function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    // Animate appearance
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(item, 
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.6 }
                        );
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = () => {
        console.error(`Failed to load script: ${src}`);
        // Fallback to local version if available
        if (src.includes('gsap')) {
            loadScript('/js/gsap.min.js', callback);
        }
    };
    document.head.appendChild(script);
}

// Enhanced NexusTrophyDisplay Initialization with 3D Effects
document.addEventListener('DOMContentLoaded', function() {
  const trophyDisplay = document.querySelector('.nexus-trophy-display');
  const glassElement = document.querySelector('.nexus-trophy-glass');
  const particlesContainer = document.querySelector('.nexus-trophy-particles');
  
  // Create floating particles with 3D depth
  function createParticles() {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'nexus-particle';
      
      // Random properties with depth variation
      const size = Math.random() * 8 + 3;
      const posX = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 15 + 15;
      const depth = Math.random() * 40 + 10; // Z-depth variation
      const opacity = Math.random() * 0.6 + 0.3;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.bottom = `-${size}px`;
      particle.style.background = `rgba(212, 175, 55, ${opacity})`;
      particle.style.animation = `nexus-particle-float ${duration}s infinite ${delay}s`;
      particle.style.borderRadius = '50%';
      particle.style.position = 'absolute';
      particle.style.transform = `translateZ(${depth}px)`;
      particle.style.boxShadow = `0 0 ${size*2}px rgba(212, 175, 55, ${opacity*0.7})`;
      
      particlesContainer.appendChild(particle);
    }
  }
  
  // Enhanced 3D tilt effect with parallax layers
  trophyDisplay.addEventListener('mousemove', (e) => {
    const rect = trophyDisplay.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt angles based on mouse position
    const rotateY = (x - centerX) / 15;
    const rotateX = (centerY - y) / 15;
    
    // Parallax effect for different layers
    glassElement.style.transform = `
      translateY(-10px) 
      rotateX(${5 + rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(30px)
    `;
    
    // Depth-based movement for inner elements
    const imageContainer = glassElement.querySelector('.nexus-trophy-image-container');
    const content = glassElement.querySelector('.nexus-trophy-content');
    const badge = trophyDisplay.querySelector('.nexus-trophy-badge');
    
    const imageMoveX = rotateY * 0.3;
    const imageMoveY = rotateX * 0.3;
    
    imageContainer.style.transform = `
      translateZ(30px)
      translateX(${imageMoveX}px)
      translateY(${imageMoveY}px)
    `;
    
    content.style.transform = `
      translateZ(40px)
      translateX(${rotateY * 0.5}px)
      translateY(${rotateX * 0.5}px)
    `;
    
    badge.style.transform = `
      rotate(15deg)
      translateZ(70px)
      translateX(${rotateY * 0.8}px)
      translateY(${rotateX * 0.8}px)
      scale(1.05)
    `;
  });
  
  trophyDisplay.addEventListener('mouseleave', () => {
    glassElement.style.transform = 'translateY(-10px) rotateX(5deg) translateZ(20px)';
    glassElement.querySelector('.nexus-trophy-image-container').style.transform = 'translateZ(30px)';
    glassElement.querySelector('.nexus-trophy-content').style.transform = 'translateZ(40px)';
    trophyDisplay.querySelector('.nexus-trophy-badge').style.transform = 'rotate(15deg) translateZ(50px)';
  });
  
  // Initialize particles and set initial 3D transforms
  createParticles();
  
  // Set initial 3D positions
  glassElement.style.transform = 'translateY(-10px) rotateX(5deg) translateZ(20px)';
});
