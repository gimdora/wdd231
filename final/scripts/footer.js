export function initFooterDates() {
    const y = document.querySelector("#currentyear");
    const m = document.querySelector("#lastModified");
    if (y) y.textContent = new Date().getFullYear();
    if (m) m.textContent = document.lastModified;
}
