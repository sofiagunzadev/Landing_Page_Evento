// scroll.js — Scroll suave, header sticky, nav ativa, back-to-top, reveal

(function () {
  'use strict';

  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id], div[id="inicio"]');
  const revealItems = document.querySelectorAll('.reveal-item');

  // --- Header ao scroll ---
  function onScroll() {
    const y = window.scrollY;

    // Header com fundo após 60px
    header.classList.toggle('scrolled', y > 60);

    // Botão voltar ao topo após 400px
    if (y > 400) {
      backToTop.removeAttribute('hidden');
    } else {
      backToTop.setAttribute('hidden', '');
    }

    // Destaca link ativo no menu
    updateActiveNav();

    // Revela items ao scroll
    revealOnScroll();
  }

  // --- Nav ativa baseada na secção visível ---
  function updateActiveNav() {
    let currentId = '';
    const scrollMid = window.scrollY + window.innerHeight / 2;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollMid >= top && scrollMid <= bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    });
  }

  // --- Reveal ao scroll ---
  function revealOnScroll() {
    const triggerPoint = window.innerHeight * 0.88;

    revealItems.forEach(function (item) {
      const top = item.getBoundingClientRect().top;
      if (top < triggerPoint) {
        item.classList.add('visible');
      }
    });
  }

  // --- Scroll suave para âncoras ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();

      const headerH = header.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerH - 8;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  // --- Voltar ao topo ---
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Init ---
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // executa no load
  revealOnScroll(); // revela items já visíveis

})();
