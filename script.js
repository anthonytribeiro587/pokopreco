const btn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
btn?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.menu a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  btn?.setAttribute('aria-expanded', 'false');
}));

/* =========================================================
NOVA SEÇÃO: VITRINE AGROPECUÁRIA + FERRAGEM
Cole este JS no final do script.js.
Caso a página não tenha script.js, cole antes do </body> dentro de:
<script> ... </script>
========================================================= */

(function () {
  const searchInput = document.getElementById("ppBuscaProduto");
  const filterButtons = document.querySelectorAll("[data-pp-filter]");
  const cards = document.querySelectorAll(".pp-produto");
  const emptyMessage = document.getElementById("ppMensagemVazia");

  if (!cards.length) return;

  let currentFilter = "todos";

  function normalizeText(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function applyFilters() {
    const searchTerm = normalizeText(searchInput ? searchInput.value : "");
    let visibleCount = 0;

    cards.forEach((card) => {
      const categories = normalizeText(card.dataset.ppCategory || "");
      const tags = normalizeText(card.dataset.ppTags || "");
      const text = normalizeText(card.innerText);
      const haystack = `${categories} ${tags} ${text}`;

      const matchesCategory =
        currentFilter === "todos" || categories.includes(currentFilter);

      const matchesSearch =
        !searchTerm || haystack.includes(searchTerm);

      const shouldShow = matchesCategory && matchesSearch;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (emptyMessage) {
      emptyMessage.classList.toggle("is-visible", visibleCount === 0);
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      currentFilter = button.dataset.ppFilter || "todos";
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  applyFilters();
})();