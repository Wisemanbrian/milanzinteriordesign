// ===== MODERN ANIMATION JS =====
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. TOP SECTION FADE IN ANIMATION
    gsap.from(".lx-top", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: ".lx-top",
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
        }
    });
    
    // 2. LEFT & RIGHT TEXT STAGGER ANIMATION
    gsap.from(".lx-left, .lx-right", {
        opacity: 0,
        x: (index) => index === 0 ? -30 : 30,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".lx-top",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
    
    // 3. SOCIAL ICONS ANIMATION
    gsap.from(".lx-socials a", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        scrollTrigger: {
            trigger: ".lx-socials",
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });
    
    // 4. CARDS AND IMAGES STAGGER ANIMATION
    gsap.utils.toArray(".lx-row").forEach((row, index) => {
        const card = row.querySelector(".lx-card");
        const img = row.querySelector(".lx-img");
        
        // Create timeline for each row
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: row,
                start: "top 80%",
                end: "bottom 40%",
                toggleActions: "play none none reverse"
            }
        });
        
        // Stagger animation for card and image
        tl.from(card, {
            opacity: 0,
            x: row.classList.contains("reverse") ? 50 : -50,
            duration: 0.8,
            ease: "power2.out"
        }).from(img, {
            opacity: 0,
            x: row.classList.contains("reverse") ? -50 : 50,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4");
        
        // Inner elements animation
        tl.from(card.children, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(0.7)"
        }, "-=0.3");
    });
    
    // 5. IMAGE REVEAL EFFECT (WITH CLIP-PATH)
    gsap.utils.toArray(".lx-img").forEach(img => {
        gsap.from(img, {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: img,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // 6. PARALLAX SCROLL EFFECT ON IMAGES
    gsap.utils.toArray(".lx-img img").forEach(img => {
        gsap.to(img, {
            y: 50,
            ease: "none",
            scrollTrigger: {
                trigger: img.closest(".lx-row"),
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });
    
    // 7. TEXT REVEAL ANIMATION FOR CARDS
    gsap.utils.toArray(".lx-card").forEach(card => {
        const lines = card.querySelectorAll("small, h3, p, .lx-read");
        
        gsap.from(lines, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: {
                amount: 0.6,
                from: "start"
            },
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // 8. BUTTON HOVER ENHANCEMENT (smooth transition already in CSS)
    // Adding click ripple effect to buttons
    document.querySelectorAll(".lx-btn").forEach(btn => {
        btn.addEventListener("click", function(e) {
            if (!this.classList.contains("ripple")) {
                const ripple = document.createElement("span");
                ripple.classList.add("ripple-effect");
                this.style.position = "relative";
                this.style.overflow = "hidden";
                this.appendChild(ripple);
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size/2}px`;
                ripple.style.top = `${e.clientY - rect.top - size/2}px`;
                
                setTimeout(() => ripple.remove(), 600);
            }
        });
    });
    
    // 9. SCROLL PROGRESS INDICATOR (OPTIONAL)
    const progressBar = document.createElement("div");
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6e6a64, #2d2d2d);
        z-index: 10000;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener("scroll", () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
    
    // 10. SMOOTH SCROLL ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
    
    // 11. ADD FADE-IN ON PAGE LOAD
    document.body.style.opacity = "0";
    gsap.to(document.body, {
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.inOut"
    });
    
    // 12. MOUSE FOLLOW GLARE EFFECT (optional - add class .lx-card-glow to enable)
    document.querySelectorAll(".lx-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            if (card.classList.contains("glow-effect")) {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.background = `radial-gradient(circle at ${x}% ${y}%, #f0ede8, #e9e6e1)`;
            }
        });
    });
    
});

// ===== ADD RIPPLE CSS DYNAMICALLY =====
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Add fade-in for images */
    .lx-img {
        overflow: hidden;
    }
    
    /* Add hover scale effect on images */
    .lx-img img {
        transition: transform 0.5s ease;
    }
    
    .lx-img:hover img {
        transform: scale(1.05);
    }
    
    /* Add card hover lift effect */
    .lx-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .lx-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.08);
    }
`;
document.head.appendChild(rippleStyle);