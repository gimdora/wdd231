export function initNav() {
    const btn = document.querySelector("#menuButton");
    const nav = document.querySelector("#primaryNav");
    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(isOpen));
    });
}
