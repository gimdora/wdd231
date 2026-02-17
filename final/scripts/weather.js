const API_KEY = "YOUR_OPENWEATHER_API_KEY";
const LAT = 37.5665;
const LON = 126.9780;

function safeText(el, value) {
    if (el) el.textContent = value;
}

export async function loadHomeWeather() {
    const tempEl = document.querySelector("#nowTemp");
    const descEl = document.querySelector("#nowDesc");
    const listEl = document.querySelector("#miniForecast");
    if (!tempEl || !descEl || !listEl) return;

    if (!API_KEY || API_KEY === "YOUR_OPENWEATHER_API_KEY") {
        safeText(descEl, "Add OpenWeather key in scripts/weather.js");
        return;
    }

    const nowUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

    try {
        const nowRes = await fetch(nowUrl);
        if (!nowRes.ok) throw new Error(`Weather now failed: ${nowRes.status}`);
        const now = await nowRes.json();

        safeText(tempEl, `${Math.round(now.main.temp)}°C`);
        safeText(descEl, now.weather?.[0]?.description ?? "N/A");

        const fRes = await fetch(forecastUrl);
        if (!fRes.ok) throw new Error(`Forecast failed: ${fRes.status}`);
        const fData = await fRes.json();

        const noon = (fData.list || []).filter((x) => x.dt_txt?.includes("12:00:00")).slice(0, 3);
        listEl.innerHTML = "";
        noon.forEach((item) => {
            const day = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
            const li = document.createElement("li");
            li.textContent = `${day}: ${Math.round(item.main.temp)}°C`;
            listEl.appendChild(li);
        });
    } catch (error) {
        safeText(descEl, "Weather unavailable right now.");
        listEl.innerHTML = "";
        console.error(error);
    }
}
