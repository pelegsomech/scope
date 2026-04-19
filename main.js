/* ============================================================
   SCOPE — main.js
   Minimal, no dependencies. Reveal + nav state + smooth scroll.
   ============================================================ */

(function () {
  'use strict';

  // ─── Scroll reveal ───
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // ─── Nav scroll state ───
  const nav = document.getElementById('nav');
  const setNavState = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 32);
  };
  window.addEventListener('scroll', setNavState, { passive: true });
  setNavState();

  // ─── Mobile nav toggle ───
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        if (links.classList.contains('open')) {
          links.classList.remove('open');
          toggle.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // ─── Smooth scroll with nav offset ───
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ─── Footer year ───
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

})();
