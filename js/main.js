/* SLIME Workshop — minimal vanilla JS (no dependencies)
   1. Mobile hamburger menu  2. Sticky-header compression on scroll
   3. Active nav highlighting 4. Gallery lightbox                        */
(function () {
  "use strict";

  /* ---- 1. Mobile nav -------------------------------------------------- */
  var body = document.body;
  var hamburger = document.querySelector(".hamburger");
  var mobileNav = document.querySelector(".mobile-nav");
  var mobileClose = document.querySelector(".mobile-nav-close");

  function openNav() {
    if (!mobileNav) return;
    mobileNav.classList.add("open");
    body.classList.add("nav-open");
  }
  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove("open");
    body.classList.remove("nav-open");
  }
  if (hamburger) hamburger.addEventListener("click", openNav);
  if (mobileClose) mobileClose.addEventListener("click", closeNav);
  if (mobileNav) {
    mobileNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeNav(); closeLightbox(); }
  });

  /* ---- 2. Sticky-header compression ---------------------------------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      body.classList.toggle("is-compact", window.scrollY > 60);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- 3. Active nav item (from <body data-page="…">) ----------------- */
  var page = body.getAttribute("data-page");
  if (page) {
    var links = document.querySelectorAll("[data-nav]");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("data-nav") === page) {
        links[i].classList.add("active");
      }
    }
  }

  /* ---- 4. Gallery lightbox ------------------------------------------- */
  var lightbox, lightboxImg;
  function closeLightbox() {
    if (lightbox) lightbox.classList.remove("open");
  }
  var grid = document.querySelector(".gallery-grid");
  if (grid) {
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML =
      '<button class="lightbox-close" aria-label="Close">&times;</button><img alt="">';
    body.appendChild(lightbox);
    lightboxImg = lightbox.querySelector("img");
    lightbox.addEventListener("click", function (e) {
      if (e.target !== lightboxImg) closeLightbox();
    });
    grid.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link) return;
      e.preventDefault();
      lightboxImg.src = link.getAttribute("href");
      lightboxImg.alt = link.getAttribute("data-caption") || "";
      lightbox.classList.add("open");
    });
  }
})();
