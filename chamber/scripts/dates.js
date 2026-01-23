const yearSpan = document.querySelector("#currentyear");
const modifiedSpan = document.querySelector("#lastModified");

if (yearSpan) {
    const now = new Date();
    yearSpan.textContent = now.getFullYear();
}

if (modifiedSpan) {
    modifiedSpan.textContent = document.lastModified;
}
