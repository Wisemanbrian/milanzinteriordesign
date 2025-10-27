document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero h1 span", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out",
  });

  gsap.from(".hero a", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.5,
    stagger: 0.2,
    ease: "power3.out",
  });

  gsap.from(".stats-section .stat", {
    scrollTrigger: {
      trigger: ".stats-section",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });

  gsap.from(".award-section .award-item", {
    scrollTrigger: {
      trigger: ".award-section",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    x: -50,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out",
  });

  gsap.from(".ourwork .project-card", {
    scrollTrigger: {
      trigger: ".ourwork",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    scale: 0.9,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });

  gsap.from(".trusted .word", {
    scrollTrigger: {
      trigger: ".trusted",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
  });

  gsap.from(".trusted .btn-discover", {
    scrollTrigger: {
      trigger: ".trusted",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.5,
    ease: "power3.out",
  });

  gsap.from(".featured-logos-section img", {
    scrollTrigger: {
      trigger: ".featured-logos-section",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    x: 50,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });

  gsap.from(".milanzi-footer .footer-container > div", {
    scrollTrigger: {
      trigger: ".milanzi-footer",
      start: "top 90%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out",
  });

  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power3.out",
    });
    gsap.to(follower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: "power3.out",
    });
  });

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: "power3.out" });
      gsap.to(follower, { scale: 1.2, duration: 0.3, ease: "power3.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3.out" });
      gsap.to(follower, { scale: 1, duration: 0.3, ease: "power3.out" });
    });
  });

  gsap.to(".logo-track", {
    xPercent: -50,
    ease: "none",
    duration: 20,
    repeat: -1,
  });
});