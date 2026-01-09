const yearEl = document.getElementById("currentyear");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const modEl = document.getElementById("lastModified");
if (modEl) modEl.textContent = `Last Modification: ${document.lastModified}`;
