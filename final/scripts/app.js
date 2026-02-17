import { initNav } from "./nav.js";
import { initFooterDates } from "./footer.js";
import { loadHomeWeather } from "./weather.js";

initNav();
initFooterDates();
loadHomeWeather();

async function loadFeatured() {
    const container = document.querySelector("#featuredRoutes");
    if (!container) return;

    try {
        const res = await fetch("data/routes.json");
        if (!res.ok) throw new Error(`routes fetch failed: ${res.status}`);
        const data = await res.json();
        const routes = Array.isArray(data.routes) ? data.routes : [];
        const featured = routes.slice(0, 3);

        container.innerHTML = "";
        featured.forEach((route) => {
            const card = document.createElement("article");
            card.className = "route-card";
            card.innerHTML = `
        <img src="images/${route.image}" alt="${route.name}" width="600" height="400" loading="lazy">
        <div class="route-body">
          <h3>${route.name}</h3>
          <p>${route.summary}</p>
          <p class="muted">${route.distanceKm} km · ${route.durationMin} min · ${route.difficulty}</p>
        </div>
      `;
            container.appendChild(card);
        });
    } catch (error) {
        container.textContent = "Unable to load featured routes.";
        console.error(error);
    }
}

loadFeatured();
