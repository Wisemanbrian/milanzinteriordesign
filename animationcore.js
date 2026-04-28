
window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  function reveal(selector, direction = "up", duration = 1.2, stagger = 0) {
    let x = 0;
    let y = 0;
    let scale = 1;
    let rotate = 0;

    if (direction === "left") x = -100;
    if (direction === "right") x = 100;
    if (direction === "up") y = 100;
    if (direction === "down") y = -100;
    if (direction === "zoom") scale = 0.85;

    if (direction === "rotate-left") {
      x = -70;
      rotate = -5;
      scale = 0.92;
    }

    if (direction === "rotate-right") {
      x = 70;
      rotate = 5;
      scale = 0.92;
    }

    gsap.utils.toArray(selector).forEach((el, i) => {
      const hidden = {
        opacity: 0,
        x,
        y,
        scale,
        rotate,
        filter: "blur(10px)"
      };

      gsap.set(el, hidden);

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "bottom 15%",

        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            duration,
            delay: i * stagger,
            ease: "expo.out"
          });
        },

        onLeave: () => {
          gsap.to(el, {
            ...hidden,
            duration: 0.7,
            ease: "power2.out"
          });
        },

        onEnterBack: () => {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            duration,
            delay: i * stagger,
            ease: "expo.out"
          });
        },

        onLeaveBack: () => {
          gsap.to(el, {
            ...hidden,
            duration: 0.7,
            ease: "power2.out"
          });
        }
      });
    });
  }

  /* HERO */
  reveal(".sparc-hero-subtitle", "up");
  reveal(".sparc-hero-title", "zoom");
  reveal(".sparc-scroll-down", "down");

  /* INTRO */
  reveal(".lx-left", "left");
  reveal(".lx-right", "right");
  reveal(".lx-socials a", "up", 1, 0.12);

  /* ALL FURNITURE ROWS */
  reveal(".lx-row:nth-child(2) .lx-card", "left");
  reveal(".lx-row:nth-child(2) .lx-img", "right");

  reveal(".lx-row:nth-child(3) .lx-card", "right");
  reveal(".lx-row:nth-child(3) .lx-img", "left");

  reveal(".lx-row:nth-child(4) .lx-card", "left");
  reveal(".lx-row:nth-child(4) .lx-img", "zoom");

  reveal(".lx-row:nth-child(5) .lx-card", "right");
  reveal(".lx-row:nth-child(5) .lx-img", "rotate-left");

  /* FOOTER */
  reveal(".ft-newsletter", "left");
  reveal(".ft-contact", "right");
  reveal(".ft-logo", "up");
  reveal(".ft-links span", "up", 1, 0.08);
  
});