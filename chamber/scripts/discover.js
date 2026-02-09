import { places } from "../data/discover.mjs";

const grid = document.querySelector("#discoverGrid");
const visitMessage = document.querySelector("#visitMessage");

function createCard(place) {
    const article = document.createElement("article");
    article.className = "discover-card";
    article.style.gridArea = place.id;

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.alt;
    img.width = 300;
    img.height = 200;
    img.loading = "lazy";
    img.decoding = "async";

    figure.appendChild(img);

    const address = document.createElement("address");
    address.textContent = place.address;

    const desc = document.createElement("p");
    desc.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn More";
    button.addEventListener("click", () => {
        window.open(place.url, "_blank", "noopener,noreferrer");
    });

    article.appendChild(title);
    article.appendChild(figure);
    article.appendChild(address);
    article.appendChild(desc);
    article.appendChild(button);

    return article;
}

function renderPlaces() {
    if (!grid) return;
    grid.innerHTML = "";
    places.forEach((place) => {
        grid.appendChild(createCard(place));
    });
}

function showVisitMessage() {
    if (!visitMessage) return;

    const key = "discover-last-visit";
    const now = Date.now();
    const lastVisit = Number(localStorage.getItem(key));

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
        localStorage.setItem(key, String(now));
        return;
    }

    const diffMs = now - lastVisit;
    const oneDayMs = 1000 * 60 * 60 * 24;

    if (diffMs < oneDayMs) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else {
        const days = Math.floor(diffMs / oneDayMs);
        visitMessage.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }

    localStorage.setItem(key, String(now));
}

renderPlaces();
showVisitMessage();
