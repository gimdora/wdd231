const courses = [
    { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
    { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
    { subject: "WDD", number: 231, title: "Web Frontend Development I", credits: 2, completed: false },
    { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
    { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: false },
    { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: false }
];

const listEl = document.getElementById("courseList");
const creditEl = document.getElementById("creditTotal");
const buttons = Array.from(document.querySelectorAll(".filter-btn"));

function getFiltered(filterKey) {
    if (filterKey === "wdd") return courses.filter(c => c.subject === "WDD");
    if (filterKey === "cse") return courses.filter(c => c.subject === "CSE");
    return courses.slice();
}

function render(filterKey) {
    const data = getFiltered(filterKey);

    if (listEl) {
        listEl.innerHTML = data.map(c => {
            const label = `${c.subject} ${c.number}`;
            const cls = c.completed ? "course completed" : "course";
            return `<div class="${cls}" role="listitem" aria-label="${label}">${label}</div>`;
        }).join("");
    }

    const total = data.reduce((sum, c) => sum + c.credits, 0);
    if (creditEl) creditEl.textContent = `${total}`;
}

function setActive(btn) {
    buttons.forEach(b => b.classList.toggle("is-active", b === btn));
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const key = btn.dataset.filter || "all";
        setActive(btn);
        render(key);
    });
});

render("all");
