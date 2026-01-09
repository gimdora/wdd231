const btn = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primaryNav");

if (btn && nav) {
    btn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(isOpen));
        btn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
}
