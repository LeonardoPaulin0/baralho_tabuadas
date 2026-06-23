// ====================================================
// BARALHO DE TABUADAS — script.js
// ====================================================

document.addEventListener('DOMContentLoaded', () => {
  applyCheckoutLink();
  applyPrice();
  initFaq();
  initScrollReveal();
  initStickyCta();
  setYear();
});

/**
 * Link único de checkout.
 * Troque apenas este valor quando o checkout estiver pronto —
 * todos os botões "Comprar agora" da página usam esta constante
 * através do atributo [data-checkout-link] em cada <a>.
 */
const CHECKOUT_LINK = 'https://pay.cakto.com.br/5n4vngf_935283';

function applyCheckoutLink() {
  document.querySelectorAll('[data-checkout-link]').forEach((el) => {
    el.setAttribute('href', CHECKOUT_LINK);
  });
}

/**
 * Preço único do produto.
 * NÃO edite valores de preço aqui — edite no HTML, na tag <body>:
 *   <body data-price="14.97" data-price-old="29.90">
 * Esta função lê esses dois atributos e preenche automaticamente
 * todo elemento marcado com [data-price-display] no formato pedido:
 *   "full"      -> R$ 14,97
 *   "value"     -> 14,97          (sem o "R$", usado ao lado de um <sup>R$</sup> fixo)
 *   "old-full"  -> De R$ 29,90    (usa data-price-old; some se o atributo não existir)
 */
function applyPrice() {
  const body = document.body;
  const price = parseFloat(body.dataset.price);
  const priceOld = body.dataset.priceOld ? parseFloat(body.dataset.priceOld) : null;

  if (isNaN(price)) {
    console.warn('[preço] Defina data-price na tag <body>, ex: data-price="14.97"');
    return;
  }

  const formatBRL = (n) =>
    n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  document.querySelectorAll('[data-price-display]').forEach((el) => {
    const mode = el.getAttribute('data-price-display');

    switch (mode) {
      case 'full':
        el.textContent = `R$ ${formatBRL(price)}`;
        break;
      case 'value':
        el.textContent = formatBRL(price);
        break;
      case 'old-full':
        if (priceOld !== null && !isNaN(priceOld)) {
          el.textContent = `De R$ ${formatBRL(priceOld)}`;
          el.style.display = '';
        } else {
          // sem preço antigo definido: oculta o elemento (ex.: sem oferta ativa)
          el.style.display = 'none';
        }
        break;
      default:
        el.textContent = `R$ ${formatBRL(price)}`;
    }
  });
}

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
