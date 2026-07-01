const menuToggle = document.getElementById("menuToggle");
const siteMenu = document.getElementById("siteMenu");

if (menuToggle && siteMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const searchInput = document.getElementById("catalogSearch");
const filterButtons = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".catalog-card");
const emptyMessage = document.getElementById("emptyMessage");
let activeFilter = "todos";

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function applyCatalogFilters() {
  const term = normalizeText(searchInput ? searchInput.value : "");
  let visible = 0;

  cards.forEach((card) => {
    const categories = normalizeText(card.dataset.category || "");
    const searchText = normalizeText(`${card.dataset.search || ""} ${card.innerText}`);

    const matchesFilter = activeFilter === "todos" || categories.includes(activeFilter);
    const matchesSearch = !term || searchText.includes(term);
    const shouldShow = matchesFilter && matchesSearch;

    card.hidden = !shouldShow;
    if (shouldShow) visible += 1;
  });

  if (emptyMessage) {
    emptyMessage.classList.toggle("show", visible === 0);
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter || "todos";
    applyCatalogFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", applyCatalogFilters);
}

applyCatalogFilters();

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
