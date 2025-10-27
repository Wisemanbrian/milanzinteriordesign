// scroll-animations.js
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// === 0. SMOOTH SCROLL (Optional but Recommended) ===
ScrollSmoother.create({
  smooth: 1.8,
  effects: true,
  smoothTouch: 0.1,
});

// === 1. CUSTOM CURSOR WITH PARALLAX ===
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
  gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power2.out" });
});

document.querySelectorAll("a, button, .project-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    gsap.to(cursor, { scale: 0, duration: 0.3 });
    gsap.to(follower, { scale: 3, background: "rgba(255,255,255,0.3)", duration: 0.3 });
  });
  el.addEventListener("mouseleave", () => {
    gsap.to(cursor, { scale: 1, duration: 0.3 });
    gsap.to(follower, { scale: 1, background: "rgba(255,255,255,0.1)", duration: 0.3 });
  });
});

// === 2. HERO – EPIC ENTRANCE ===
gsap.fromTo(
  ".hero video",
  { scale: 1.1, filter: "brightness(0.8)" },
  {
    scale: 1,
    filter: "brightness(1)",
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  }
);

// Word-by-word + letter stagger
".hero h1 span".split("").forEach((char, i) => {
  const span = document.createElement("span");
  span.textContent = char === " " ? "\u00A0" : char;
  span.style.display = "inline-block";
  document.querySelector(".hero h1 span").appendChild(span);

  gsap.fromTo(
    span,
    { y: 120, rotationX: -90, opacity: 0 },
    {
      y: 0,
      rotationX: 0,
      opacity: 1,
      duration: 1,
      delay: i * 0.03,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".hero",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    }
  );
});

// CTA Buttons
gsap.fromTo(
  ".hero a",
  { y: 60, opacity: 0, scale: 0.8 },
  {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.4)",
    scrollTrigger: {
      trigger: ".hero div > div",
      start: "top 85%",
      toggleActions: "play reverse play reverse",
    },
  }
);

// === 3. STATS – COUNTER + PULSE + BG GROW ===
document.querySelectorAll('.stats-section .stat').forEach((stat, i) => {
  const number = stat.querySelector('.number');
  const target = +number.getAttribute('data-target');
  let count = 0;
  const increment = target / 100;

  const update = () => {
    if (count < target) {
      count += increment;
      if (count > target) count = target;
      number.textContent = Math.floor(count) + (target === 100 ? '%' : '+');
      requestAnimationFrame(update);
    }
  };

  ScrollTrigger.create({
    trigger: stat,
    start: "top 85%",
    toggleActions: "play reverse play reverse",
    onEnter: () => {
      update();
      gsap.to(stat, { scale: 1.1, duration: 0.3, yoyo: true, repeat: 1 });
      gsap.to(stat, { background: "rgba(255,255,255,0.1)", duration: 0.5 });
    },
    onLeaveBack: () => {
      count = 0;
      number.textContent = '0';
      gsap.to(stat, { scale: 1, background: "transparent", duration: 0.3 });
    },
  });
});

// === 4. TRUSTED – 3D WORDS + SHADOW + GLOW ===
gsap.utils.toArray(".trusted-title .word").forEach((word, i) => {
  gsap.fromTo(
    word,
    {
      y: 80,
      rotationX: -80,
      scale: 0.8,
      opacity: 0,
      filter: "blur(10px)",
      textShadow: "0 0 0px rgba(255,255,255,0)",
    },
    {
      y: 0,
      rotationX: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      textShadow: "0 10px 20px rgba(0,0,0,0.3)",
      duration: 1,
      delay: i * 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".trusted",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    }
  );
});

fadeUpOnScroll(".trusted-text", { duration: 1.2 });
fadeUpOnScroll(".btn-discover", { duration: 1, scale: 1.1, ease: "elastic.out(1,0.5)" });

// === 5. AWARDS – CARD FLIP + ICON PULSE ===
gsap.utils.toArray(".award-item").forEach((item, i) => {
  gsap.fromTo(
    item,
    { rotationY: 90, opacity: 0, scale: 0.8 },
    {
      rotationY: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: i * 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".award-box",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    }
  );

  // Pulse icon
  gsap.to(item.querySelector(".award-icon svg"), {
    scale: 1.2,
    duration: 0.6,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    delay: i * 0.2,
  });
});

// === 6. OUR WORK – PARALLAX + TILT ON HOVER ===
gsap.utils.toArray(".project-card img").forEach((img, i) => {
  gsap.to(img, {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: img,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
});

// Hover tilt
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = (x - centerX) / 10;
    const rotateX = (centerY - y) / 10;

    gsap.to(card, { rotationY: rotateY, rotationX: rotateX, transformPerspective: 1000, ease: "power1.out" });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.6, ease: "power2.out" });
  });
});

// === 7. LOGOS – INFINITE SCROLL + GLOW ===
gsap.to(".logo-track", {
  xPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".logo-slider",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
});

gsap.fromTo(
  ".logo-track img",
  { filter: "blur(5px)", opacity: 0.5 },
  {
    filter: "blur(0px)",
    opacity: 1,
    duration: 1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".logo-slider",
      start: "top 85%",
      toggleActions: "play reverse play reverse",
    },
  }
);

// === 8. INSTAGRAM – POP + ROTATE + GLOW ===
gsap.utils.toArray(".image-container").forEach((img, i) => {
  gsap.fromTo(
    img,
    {
      scale: 0,
      rotation: -180,
      opacity: 0,
      borderColor: "rgba(255,255,255,0)",
    },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      borderColor: "rgba(255,255,255,0.6)",
      duration: 0.8,
      delay: i * 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".image-grid",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    }
  );
});

// === 9. FOOTER – STAGGER + SVG PATH DRAW ===
gsap.utils.toArray(".footer-container > div").forEach((col, i) => {
  gsap.fromTo(
    col,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: i * 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".milanzi-footer",
        start: "top 90%",
        toggleActions: "play reverse play reverse",
      },
    }
  );
});

// SVG path draw
gsap.utils.toArray(".footer-contact svg path, .footer-social svg path").forEach(path => {
  const length = path.getTotalLength();
  gsap.fromTo(
    path,
    { strokeDasharray: length, strokeDashoffset: length },
    {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: path.closest("li"),
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
    }
  );
});

// === REUSABLE FADE-UP (with scale & blur) ===
function fadeUpOnScroll(trigger, opts = {}) {
  gsap.fromTo(
    trigger,
    { y: 80, opacity: 0, scale: 0.9, filter: "blur(5px)" },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: opts.duration || 1,
      stagger: opts.stagger || 0.15,
      ease: opts.ease || "power3.out",
      scrollTrigger: {
        trigger: trigger,
        start: opts.start || "top 85%",
        toggleActions: "play reverse play reverse",
      },
    }
  );
}

// Apply to headers
fadeUpOnScroll(".ourwork-header h2 span");
fadeUpOnScroll(".ourwork-header p");
fadeUpOnScroll(".featured-title");
fadeUpOnScroll(".text-sectionz h2");