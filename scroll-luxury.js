gsap.registerPlugin(ScrollTrigger);

/* ==========================================
   CLEAN SCOPED ANIMATIONS
   HERO + HEADER untouched
========================================== */

function reveal(selector, direction = "up", duration = 1.1) {
  let x = 0;
  let y = 0;

  if (direction === "left") x = -80;
  if (direction === "right") x = 80;
  if (direction === "up") y = 80;
  if (direction === "down") y = -80;

  gsap.utils.toArray(selector).forEach((el) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        x,
        y
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "bottom 20%",
          toggleActions: "restart none restart reverse"
        }
      }
    );
  });
}


/* ==========================================
   ABOUT ONLY
========================================== */
reveal("section.about .about-left", "left");
reveal("section.about .about-right", "right");
reveal("section.about .img-top", "left");
reveal("section.about .img-bottom", "down");


/* ==========================================
   PORTFOLIO ONLY
========================================== */
reveal("section.portfolio h2", "up");
reveal("section.portfolio .item:nth-child(1)", "left");
reveal("section.portfolio .item:nth-child(2)", "up");
reveal("section.portfolio .item:nth-child(3)", "right");
reveal("section.portfolio .btn-wrap", "up");


/* ==========================================
   AWARDS ONLY
========================================== */
reveal(".award-section .image-box", "left");
reveal(".award-section .award:nth-child(1)", "right");
reveal(".award-section .award:nth-child(2)", "right");
reveal(".award-section .award:nth-child(3)", "right");
reveal(".award-section .award:nth-child(4)", "right");


/* ==========================================
   STATS ONLY
========================================== */
reveal(".stats-section .stat:nth-child(1)", "left");
reveal(".stats-section .stat:nth-child(2)", "up");
reveal(".stats-section .stat:nth-child(3)", "down");
reveal(".stats-section .stat:nth-child(4)", "up");
reveal(".stats-section .stat:nth-child(5)", "right");


/* ==========================================
   INSTAGRAM ONLY
========================================== */
reveal(".sc-ig-wrapper .sc-ig-text", "left");
reveal(".sc-ig-wrapper .sc-ig-item:nth-child(1)", "left");
reveal(".sc-ig-wrapper .sc-ig-item:nth-child(2)", "up");
reveal(".sc-ig-wrapper .sc-ig-item:nth-child(3)", "right");
reveal(".sc-ig-wrapper .sc-ig-item:nth-child(4)", "left");
reveal(".sc-ig-wrapper .sc-ig-item:nth-child(5)", "up");
reveal(".sc-ig-wrapper .sc-ig-item:nth-child(6)", "right");
reveal(".sc-ig-wrapper .sc-ig-item:nth-child(7)", "left");
reveal(".sc-ig-wrapper .sc-ig-item:nth-child(8)", "right");


/* ==========================================
   TRUSTED ONLY
========================================== */
reveal(".featured-logos-section", "up");


/* ==========================================
   CONTACT ONLY
========================================== */
reveal("section.contact h2", "up");
reveal("section.contact .form-container", "up");


/* ==========================================
   FOOTER ONLY
========================================== */
reveal("footer .ft-newsletter", "left");
reveal("footer .ft-contact", "right");

