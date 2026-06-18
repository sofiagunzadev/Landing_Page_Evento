// faq.js — Accordion FAQ com acessibilidade

(function () {
  'use strict';

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Fecha todos os outros (comportamento accordion)
      faqItems.forEach(function (otherItem) {
        const otherBtn = otherItem.querySelector('.faq-question');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherBtn && otherAnswer && otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAnswer.setAttribute('hidden', '');
        }
      });

      // Abre ou fecha o atual
      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        answer.setAttribute('hidden', '');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.removeAttribute('hidden');
      }
    });
  });

  // Navegação por teclado (setas)
  const allBtns = document.querySelectorAll('.faq-question');

  allBtns.forEach(function (btn, index) {
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = allBtns[index + 1];
        if (next) next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = allBtns[index - 1];
        if (prev) prev.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        allBtns[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        allBtns[allBtns.length - 1].focus();
      }
    });
  });

})();
