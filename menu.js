// menu.js — Menu mobile (hambúrguer)

(function () {
  'use strict';

  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const navLinks = nav.querySelectorAll('.nav-link');

  function openMenu() {
    toggle.classList.add('active');
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu de navegação');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('active');
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu de navegação');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Abre/fecha ao clicar no botão
  toggle.addEventListener('click', toggleMenu);

  // Fecha ao clicar num link
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Fecha ao pressionar Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });

  // Fecha ao redimensionar para desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });

})();
