// main.js — Loading screen, tabs da agenda, animações iniciais

(function () {
  'use strict';

  // --- LOADING SCREEN ---
  var loadingScreen = document.getElementById('loading-screen');
  var progressBar = document.querySelector('.loader-progress');

  function hideLoading() {
    loadingScreen.classList.add('hidden');
    document.body.classList.remove('loading');

    // Remove do DOM após animação
    setTimeout(function () {
      loadingScreen.style.display = 'none';
    }, 600);
  }

  if (loadingScreen) {
    document.body.classList.add('loading');

    // Anima a barra de progresso
    setTimeout(function () {
      progressBar.style.width = '100%';
    }, 100);

    // Esconde após carregamento
    if (document.readyState === 'complete') {
      setTimeout(hideLoading, 1400);
    } else {
      window.addEventListener('load', function () {
        setTimeout(hideLoading, 800);
      });
    }

    // Fallback: garante que a loading screen desaparece
    setTimeout(hideLoading, 3000);
  }

  // --- TABS DA AGENDA ---
  var agendaTabs = document.querySelectorAll('.agenda-tab');
  var agendaPanels = document.querySelectorAll('.agenda-panel');

  agendaTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetPanelId = tab.getAttribute('aria-controls');

      // Atualiza tabs
      agendaTabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Atualiza panels
      agendaPanels.forEach(function (panel) {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');

          // Reinicia animações dos reveal-items dentro deste panel
          var items = panel.querySelectorAll('.reveal-item');
          items.forEach(function (item, index) {
            item.classList.remove('visible');
            setTimeout(function () {
              item.classList.add('visible');
            }, index * 80);
          });
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', '');
        }
      });
    });

    // Navegação por teclado (setas)
    tab.addEventListener('keydown', function (e) {
      var tabsArr = Array.from(agendaTabs);
      var currentIndex = tabsArr.indexOf(tab);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        var next = tabsArr[currentIndex + 1] || tabsArr[0];
        next.focus();
        next.click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        var prev = tabsArr[currentIndex - 1] || tabsArr[tabsArr.length - 1];
        prev.focus();
        prev.click();
      } else if (e.key === 'Home') {
        e.preventDefault();
        tabsArr[0].focus();
        tabsArr[0].click();
      } else if (e.key === 'End') {
        e.preventDefault();
        tabsArr[tabsArr.length - 1].focus();
        tabsArr[tabsArr.length - 1].click();
      }
    });
  });

  // --- ANIMAÇÃO DOS CARDS DO HERO ---
  // Aplica uma flutuação suave ao card da frente
  var heroCard = document.querySelector('.hero-card--front');
  if (heroCard) {
    var floatKeyframes = [
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-10px)' },
      { transform: 'translateY(0px)' }
    ];
    var floatTiming = {
      duration: 4000,
      iterations: Infinity,
      easing: 'ease-in-out'
    };

    // Só anima se o utilizador não preferir redução de movimento
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced && typeof heroCard.animate === 'function') {
      heroCard.animate(floatKeyframes, floatTiming);
    }
  }

  // --- ANIMAÇÃO DO CARD DO MEIO ---
  var midCard = document.querySelector('.hero-card--mid');
  if (midCard) {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced && typeof midCard.animate === 'function') {
      midCard.animate(
        [
          { transform: 'rotate(-3deg) translateY(0px)' },
          { transform: 'rotate(-3deg) translateY(-5px)' },
          { transform: 'rotate(-3deg) translateY(0px)' }
        ],
        { duration: 5000, iterations: Infinity, easing: 'ease-in-out', delay: 800 }
      );
    }
  }

  // --- ACTIVAR REVEAL DOS ITEMS VISÍVEIS NO PRIMEIRO PANEL ---
  // O primeiro tab já está activo no HTML, revela os seus items imediatamente
  var firstPanelItems = document.querySelectorAll('#dia1-panel .reveal-item');
  firstPanelItems.forEach(function (item, index) {
    setTimeout(function () {
      item.classList.add('visible');
    }, 200 + index * 100);
  });

})();
