import { initFooterDates } from "./footer.js";

initFooterDates();

const output = document.querySelector("#submittedData");
const params = new URLSearchParams(window.location.search);

function val(key) {
  return params.get(key)?.trim() || "N/A";
}

if (output) {
  output.innerHTML = `
    <ul>
      <li><strong>First Name:</strong> ${val("firstName")}</li>
      <li><strong>Last Name:</strong> ${val("lastName")}</li>
      <li><strong>Email:</strong> ${val("email")}</li>
      <li><strong>Preferred Day:</strong> ${val("preferredDay")}</li>
      <li><strong>Submitted At:</strong> ${val("submittedAt")}</li>
      <li><strong>Notes:</strong> ${val("notes")}</li>
    </ul>
  `;
}
