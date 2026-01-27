const outFirstName = document.querySelector("#outFirstName");
const outLastName = document.querySelector("#outLastName");
const outEmail = document.querySelector("#outEmail");
const outMobile = document.querySelector("#outMobile");
const outOrganization = document.querySelector("#outOrganization");
const outTimestamp = document.querySelector("#outTimestamp");

function safeText(el, value) {
    if (!el) return;
    el.textContent = value || "";
}

function readParams() {
    const params = new URLSearchParams(window.location.search);

    return {
        firstName: params.get("firstName") || "",
        lastName: params.get("lastName") || "",
        email: params.get("email") || "",
        mobile: params.get("mobile") || "",
        organization: params.get("organization") || "",
        timestamp: params.get("timestamp") || ""
    };
}

const data = readParams();

safeText(outFirstName, data.firstName);
safeText(outLastName, data.lastName);
safeText(outEmail, data.email);
safeText(outMobile, data.mobile);
safeText(outOrganization, data.organization);
safeText(outTimestamp, data.timestamp);
