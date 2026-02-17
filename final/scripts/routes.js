import { initNav } from "./nav.js";
import { initFooterDates } from "./footer.js";

initNav();
initFooterDates();

const container = document.querySelector("#routesContainer");
const difficultyFilter = document.querySelector("#difficultyFilter");
const timeFilter = document.querySelector("#timeFilter");
const tagFilter = document.querySelector("#tagFilter");
const resultCount = document.querySelector("#resultCount");
const dialog = document.querySelector("#routeDialog");
const dialogContent = document.querySelector("#dialogContent");
const closeDialogBtn = document.querySelector("#closeDialogBtn");

const LS_KEY = "swp_favorites";
let allRoutes = [];

function getFavorites() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function setFavorites(ids) {
    localStorage.setItem(LS_KEY, JSON.stringify(ids));
}

function toggleFavorite(id) {
    const favorites = getFavorites();
    const exists = favorites.includes(id);
    const updated = exists ? favorites.filter((x) => x !== id) : [...favorites, id];
    setFavorites(updated);
    renderRoutes();
}

function openRouteDialog(route) {
    if (!dialog || !dialogContent) return;
    dialogContent.innerHTML = `
    <h2>${route.name}</h2>
    <img src="images/${route.image}" alt="${route.name}" width="600" height="400" loading="lazy">
    <p><strong>Distance:</strong> ${route.distanceKm} km</p>
    <p><strong>Estimated Time:</strong> ${route.durationMin} min</p>
    <p><strong>Difficulty:</strong> ${route.difficulty}</p>
    <p><strong>Nearest Station:</strong> ${route.station}</p>
    <p><strong>Address:</strong> ${route.address}</p>
    <p>${route.summary}</p>
    <p><strong>Tags:</strong> ${route.tags.join(", ")}</p>
  `;
    dialog.showModal();
}

function closeDialog() {
    if (dialog?.open) dialog.close();
}

function getFilteredRoutes() {
    const difficulty = difficultyFilter?.value || "all";
    const maxTime = Number(timeFilter?.value || 999);
    const tag = tagFilter?.value || "all";

    return allRoutes.filter((r) => {
        const okDifficulty = difficulty === "all" || r.difficulty === difficulty;
        const okTime = r.durationMin <= maxTime;
        const okTag = tag === "all" || r.tags.includes(tag);
        return okDifficulty && okTime && okTag;
    });
}

function renderRoutes() {
    if (!container) return;
    const favorites = getFavorites();
    const filtered = getFilteredRoutes();

    resultCount.textContent = `${filtered.length} route(s) found`;

    container.innerHTML = "";
    filtered.forEach((route) => {
        const fav = favorites.includes(route.id);
        const card = document.createElement("article");
        card.className = "route-card";
        card.innerHTML = `
      <img src="images/${route.image}" alt="${route.name}" width="600" height="400" loading="lazy">
      <div class="route-body">
        <h3>${route.name}</h3>
        <div class="route-meta">
          <span>${route.distanceKm} km · ${route.durationMin} min</span>
          <span>${route.difficulty} · ${route.station}</span>
        </div>
        <p>${route.summary}</p>
        <div class="tag-list">
          ${route.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
        <div class="route-actions">
          <button class="btn primary details-btn" data-id="${route.id}" type="button">Details</button>
          <button class="btn fav-btn" data-id="${route.id}" type="button">${fav ? "★ Saved" : "☆ Save"}</button>
        </div>
      </div>
    `;
        container.appendChild(card);
    });

    container.querySelectorAll(".details-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = allRoutes.find((r) => r.id === btn.dataset.id);
            if (target) openRouteDialog(target);
        });
    });

    container.querySelectorAll(".fav-btn").forEach((btn) => {
        btn.addEventListener("click", () => toggleFavorite(btn.dataset.id));
    });
}

async function loadRoutes() {
    try {
        const res = await fetch("data/routes.json");
        if (!res.ok) throw new Error(`routes fetch failed: ${res.status}`);
        const data = await res.json();
        allRoutes = Array.isArray(data.routes) ? data.routes : [];
        renderRoutes();
    } catch (error) {
        if (container) container.textContent = "Unable to load routes right now.";
        console.error(error);
    }
}

[difficultyFilter, timeFilter, tagFilter].forEach((el) => {
    if (el) el.addEventListener("change", renderRoutes);
});

if (closeDialogBtn) closeDialogBtn.addEventListener("click", closeDialog);
if (dialog) dialog.addEventListener("click", (e) => {
    const rect = dialog.getBoundingClientRect();
    const inDialog = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inDialog) closeDialog();
});

loadRoutes();
