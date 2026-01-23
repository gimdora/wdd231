const menuButton = document.querySelector("#menuButton");
const primaryNav = document.querySelector("#primaryNav");

if (menuButton && primaryNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("open");
        menuButton.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", isOpen.toString());
    });
}
