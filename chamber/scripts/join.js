const timestampEl = document.querySelector("#timestamp");
const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll("[data-close]");

function setTimestamp() {
    if (!timestampEl) return;
    const now = new Date();
    timestampEl.value = now.toISOString();
}

function openModalById(id) {
    const dlg = document.querySelector(`#${id}`);
    if (!dlg) return;
    if (typeof dlg.showModal === "function") {
        dlg.showModal();
    }
}

function closeModal(dialogEl) {
    if (!dialogEl) return;
    if (typeof dialogEl.close === "function") {
        dialogEl.close();
    }
}

modalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-modal");
        if (id) openModalById(id);
    });
});

closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const dlg = btn.closest("dialog");
        closeModal(dlg);
    });
});

document.addEventListener("click", (e) => {
    const dlg = e.target instanceof Element ? e.target.closest("dialog") : null;
    if (!dlg || !(e.target instanceof HTMLDialogElement)) return;

    const rect = dlg.getBoundingClientRect();
    const inDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

    if (!inDialog) closeModal(dlg);
});

setTimestamp();
