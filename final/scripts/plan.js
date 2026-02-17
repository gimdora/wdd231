import { initNav } from "./nav.js";
import { initFooterDates } from "./footer.js";

initNav();
initFooterDates();

const form = document.querySelector("#planForm");
const submittedAtInput = document.querySelector("#submittedAt");
const picksList = document.querySelector("#savedPicks");

const FAVORITES_KEY = "swp_favorites";

function setSubmittedAt() {
    if (!submittedAtInput) return;
    submittedAtInput.value = new Date().toISOString();
}

async function loadSavedPicks() {
    if (!picksList) return;

    let favoriteIds = [];
    try {
        const raw = localStorage.getItem(FAVORITES_KEY);
        favoriteIds = raw ? JSON.parse(raw) : [];
    } catch {
        favoriteIds = [];
    }

    picksList.innerHTML = "";

    if (!Array.isArray(favoriteIds) || favoriteIds.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No saved routes yet. Add favorites on the Routes page.";
        picksList.appendChild(li);
        return;
    }

    try {
        const res = await fetch("data/routes.json");
        if (!res.ok) throw new Error(`routes fetch failed: ${res.status}`);
        const data = await res.json();
        const routes = Array.isArray(data.routes) ? data.routes : [];

        const names = favoriteIds
            .map((id) => routes.find((r) => r.id === id)?.name || id);

        names.forEach((name) => {
            const li = document.createElement("li");
            li.textContent = name;
            picksList.appendChild(li);
        });
    } catch (error) {
        favoriteIds.forEach((id) => {
            const li = document.createElement("li");
            li.textContent = id;
            picksList.appendChild(li);
        });
        console.error(error);
    }
}

if (form) {
    setSubmittedAt();
}

loadSavedPicks();
