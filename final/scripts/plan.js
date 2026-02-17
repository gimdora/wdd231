const form = document.querySelector("#planForm");
const submittedAtInput = document.querySelector("#submittedAt");
const picksList = document.querySelector("#savedPicks");

function setSubmittedAt() {
    if (!submittedAtInput) return;
    submittedAtInput.value = new Date().toISOString();
}

function loadSavedPicks() {
    if (!picksList) return;
    const raw = localStorage.getItem("swp-favorites");
    const favorites = raw ? JSON.parse(raw) : [];
    picksList.innerHTML = "";

    if (!Array.isArray(favorites) || favorites.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No saved routes yet. Add favorites on the Routes page.";
        picksList.appendChild(li);
        return;
    }

    favorites.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;
        picksList.appendChild(li);
    });
}

if (form) {
    setSubmittedAt();
}

loadSavedPicks();
