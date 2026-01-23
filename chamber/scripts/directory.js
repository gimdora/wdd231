const membersUrl = "data/members.json";
const membersContainer = document.querySelector("#membersContainer");
const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");

async function loadMembers() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        if (membersContainer) {
            membersContainer.textContent = "Unable to load member data right now.";
        }
        console.error(error);
    }
}

function displayMembers(members) {
    if (!membersContainer) return;

    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        const img = document.createElement("img");
        img.src = `images/${member.image}`;
        img.alt = member.name;
        img.loading = "lazy";
        img.width = 120;
        img.height = 120;

        const info = document.createElement("div");
        info.classList.add("member-info");

        const name = document.createElement("h3");
        name.textContent = member.name;

        const tag = document.createElement("p");
        tag.textContent = member.tagline;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const url = document.createElement("a");
        url.href = member.website;
        url.target = "_blank";
        url.rel = "noopener noreferrer";
        url.textContent = member.website.replace("https://", "").replace("http://", "");

        const badge = document.createElement("span");
        badge.classList.add("badge");
        if (member.membership === 3) {
            badge.classList.add("gold");
            badge.textContent = "Gold Member";
        } else if (member.membership === 2) {
            badge.classList.add("silver");
            badge.textContent = "Silver Member";
        } else {
            badge.classList.add("standard");
            badge.textContent = "Member";
        }

        info.appendChild(name);
        info.appendChild(tag);
        info.appendChild(address);
        info.appendChild(phone);
        info.appendChild(url);
        info.appendChild(badge);

        card.appendChild(img);
        card.appendChild(info);
        membersContainer.appendChild(card);
    });
}

function setGridView() {
    if (!membersContainer) return;
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
}

function setListView() {
    if (!membersContainer) return;
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
}

if (gridButton && listButton) {
    gridButton.addEventListener("click", setGridView);
    listButton.addEventListener("click", setListView);
}

loadMembers();
