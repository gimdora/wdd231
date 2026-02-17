const API_KEY = "b42a9e4fddafd6d2e084ab1e471fbaed";
const LAT = 37.5665;
const LON = 126.9780;

function safeText(el, value) {
    if (el) el.textContent = value;
}

async function fetchJson(url, errorPrefix) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${errorPrefix}: ${res.status}`);
    return res.json();
}

export async function loadHomeWeather() {
    const tempEl = document.querySelector("#nowTemp");
    const descEl = document.querySelector("#nowDesc");
    const listEl = document.querySelector("#miniForecast");
    if (!tempEl || !descEl || !listEl) return;

    if (!API_KEY || API_KEY === "YOUR_OPENWEATHER_API_KEY") {
        safeText(descEl, "Weather configuration is missing.");
        listEl.innerHTML = "";
        return;
    }

    const nowUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

    try {
        const now = await fetchJson(nowUrl, "Weather now failed");
        safeText(tempEl, `${Math.round(now.main?.temp ?? 0)}°C`);
        safeText(descEl, now.weather?.[0]?.description ?? "N/A");

        const forecast = await fetchJson(forecastUrl, "Forecast failed");
        const noon = (forecast.list || [])
            .filter((x) => typeof x.dt_txt === "string" && x.dt_txt.includes("12:00:00"))
            .slice(0, 3);

        listEl.innerHTML = "";

        if (noon.length === 0) {
            const li = document.createElement("li");
            li.textContent = "Forecast data is temporarily unavailable.";
            listEl.appendChild(li);
            return;
        }

        noon.forEach((item) => {
            const day = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
            const li = document.createElement("li");
            li.textContent = `${day}: ${Math.round(item.main?.temp ?? 0)}°C`;
            listEl.appendChild(li);
        });
    } catch (error) {
        safeText(descEl, "Weather unavailable right now.");
        listEl.innerHTML = "";
        console.error(error);
    }
}
