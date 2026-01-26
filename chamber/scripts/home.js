const spotlightsEl = document.querySelector("#spotlights");
const tempNowEl = document.querySelector("#tempNow");
const descNowEl = document.querySelector("#descNow");
const forecastListEl = document.querySelector("#forecastList");

const membersUrl = "data/members.json";

const weatherKey = "b42a9e4fddafd6d2e084ab1e471fbaed";
const seoulLat = 37.5665;
const seoulLon = 126.9780;
const units = "metric";

function safeText(el, value) {
    if (!el) return;
    el.textContent = value;
}

function formatDayLabel(unixSeconds) {
    const date = new Date(unixSeconds * 1000);
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
}

async function loadWeather() {
    if (!weatherKey) return;

    const nowUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${seoulLat}&lon=${seoulLon}&units=${units}&appid=${weatherKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${seoulLat}&lon=${seoulLon}&units=${units}&appid=${weatherKey}`;

    try {
        const nowData = await fetchJson(nowUrl);
        const temp = Math.round(nowData.main?.temp ?? 0);
        const desc = nowData.weather?.[0]?.description ?? "N/A";
        safeText(tempNowEl, temp);
        safeText(descNowEl, desc);

        const forecastData = await fetchJson(forecastUrl);
        const list = Array.isArray(forecastData.list) ? forecastData.list : [];

        const midday = list.filter(
            (item) => typeof item.dt_txt === "string" && item.dt_txt.includes("12:00:00")
        );
        const next3 = midday.slice(0, 3);

        if (forecastListEl) {
            forecastListEl.innerHTML = "";
            next3.forEach((item) => {
                const day = formatDayLabel(item.dt);
                const t = Math.round(item.main?.temp ?? 0);
                const li = document.createElement("li");
                li.textContent = `${day}: ${t}°C`;
                forecastListEl.appendChild(li);
            });
        }
    } catch (err) {
        safeText(descNowEl, "Weather unavailable right now.");
        if (forecastListEl) forecastListEl.innerHTML = "";
        console.error(err);
    }
}

function shuffle(array) {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function membershipLabel(level) {
    if (level === 3) return "Gold Member";
    if (level === 2) return "Silver Member";
    return "Member";
}

function renderSpotlights(members) {
    if (!spotlightsEl) return;

    const eligible = members.filter((m) => m.membership === 2 || m.membership === 3);
    const chosen = shuffle(eligible).slice(0, 3);

    spotlightsEl.innerHTML = "";

    chosen.forEach((m) => {
        const card = document.createElement("article");
        card.className = "spotlight-card";

        const img = document.createElement("img");
        img.src = `images/${m.image}`;
        img.alt = `${m.name} logo`;
        img.loading = "lazy";
        img.width = 96;
        img.height = 96;

        const body = document.createElement("div");
        body.className = "spotlight-body";

        const name = document.createElement("h3");
        name.textContent = m.name;

        const tag = document.createElement("p");
        tag.className = "spotlight-tagline";
        tag.textContent = m.tagline;

        const addr = document.createElement("p");
        addr.textContent = m.address;

        const phone = document.createElement("p");
        phone.textContent = m.phone;

        const site = document.createElement("a");
        site.href = m.website;
        site.target = "_blank";
        site.rel = "noopener noreferrer";
        site.textContent = m.website.replace("https://", "").replace("http://", "");

        const badge = document.createElement("span");
        badge.className = `badge ${m.membership === 3 ? "gold" : "silver"}`;
        badge.textContent = membershipLabel(m.membership);

        body.append(name, tag, addr, phone, site, badge);
        card.append(img, body);
        spotlightsEl.appendChild(card);
    });
}

async function loadSpotlights() {
    try {
        const data = await fetchJson(membersUrl);
        const members = Array.isArray(data.members) ? data.members : [];
        renderSpotlights(members);
    } catch (err) {
        if (spotlightsEl) spotlightsEl.textContent = "Unable to load spotlights right now.";
        console.error(err);
    }
}

loadWeather();
loadSpotlights();
