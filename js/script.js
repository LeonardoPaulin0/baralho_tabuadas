// ====================================================
// BARALHO DE TABUADAS — script.js
// ====================================================

document.addEventListener('DOMContentLoaded', () => {
  initFaq();
  initScrollReveal();
  initStickyCta();
  setYear();
});

/**
 * Link único de checkout.
 * Troque apenas este valor quando o checkout estiver pronto —
 * todos os botões "Comprar Agora" da página usam esta constante
 * através do atributo [data-checkout-link] em cada <a>.
 */
const CHECKOUT_LINK = '#';

(function applyCheckoutLink() {
  document.querySelectorAll('[data-checkout-link]').forEach((el) => {
    el.setAttribute('href', CHECKOUT_LINK);
  });
})();

/**
 * Acordeão do FAQ — apenas uma pergunta aberta por vez,
 * com altura animada via max-height.
 */
function initFaq() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.getAttribute('aria-expanded') === 'true';

      items.forEach((other) => {
        other.setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/**
 * Revela seções suavemente conforme entram na viewport.
 */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || revealEls.length === 0) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/**
 * Mostra a barra de compra fixa no mobile depois que o
 * usuário rola além do Hero, escondendo perto do rodapé.
 */
function initStickyCta() {
  const stickyCta = document.querySelector('.sticky-cta');
  const hero = document.querySelector('.hero');

  if (!stickyCta || !hero) return;

  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        stickyCta.classList.toggle('is-visible', !entry.isIntersecting);
      });
    },
    { threshold: 0 }
  );

  heroObserver.observe(hero);
}

/**
 * Atualiza o ano no rodapé automaticamente.
 */
function setYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
