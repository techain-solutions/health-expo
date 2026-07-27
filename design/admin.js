const adminMain = document.querySelector("#adminMain");
const toast = document.querySelector(".admin-toast");
const sidebar = document.querySelector("#sidebar");
const sidebarToggle = document.querySelector(".sidebar-toggle");
const rolePreview = document.querySelector("#rolePreview");
let toastTimer;

const adminField = (label, value = "", type = "text", helper = "") => `<div class="admin-field"><label>${label}</label>${type === "textarea" ? `<textarea>${value}</textarea>` : type === "select" ? `<select>${value}</select>` : `<input type="${type}" value="${value}" />`}${helper ? `<p class="helper">${helper}</p>` : ""}</div>`;
const pageHead = (title, text, actions = "") => `<div class="page-head"><div><h1>${title}</h1><p>${text}</p></div>${actions ? `<div class="head-actions">${actions}</div>` : ""}</div>`;
const saveButton = `<button class="admin-btn admin-btn--primary static-save" type="button">Save changes</button>`;

function dashboard() {
  const cards = [
    ["◎", "Exhibitors", "Add, update or remove participating exhibitors.", "exhibitors"],
    ["◫", "Event information", "Dates, location, opening hours and visitor information.", "event"],
    ["▧", "Photos & videos", "Manage the approved visual media used on the website.", "media"],
    ["✉", "Form requests", "Review submissions received through the website forms.", "requests"],
    ["↗", "Ticketing link", "Set the external link used by ticket buttons.", "ticketing"]
  ];
  const visibleCards = cards.filter(([, , , page]) => (rolePermissions[rolePreview.value] || rolePermissions.administrator).includes(page));
  return `<div class="admin-page">${pageHead("Administration panel", "A focused workspace for the agreed Health & Beauty Expo website scope.", `<a class="admin-btn admin-btn--outline" href="index.html?page=home" target="_blank">Preview website ↗</a>`)}
  <div class="prototype-warning"><b>Static design preview</b><span>Buttons and save states demonstrate the interface only. No data is stored or sent.</span></div>
  <div class="metric-grid">${visibleCards.map(([icon, title, text, page]) => `<a class="metric" href="admin.html?page=${page}"><div class="metric-top"><span class="metric-icon">${icon}</span><small>Manage →</small></div><b>${title}</b><span>${text}</span></a>`).join("")}</div>
  <div class="dash-grid"><section class="panel"><div class="panel-head"><h2>What this panel covers</h2></div><div class="panel-body"><ul class="checklist"><li><span class="check-icon">✓</span><p><b>Website content operations</b><small>Exhibitor details, event information, visual media, incoming forms and the ticket destination.</small></p></li><li><span class="check-icon">✓</span><p><b>Authorized team access</b><small>Administrator, Employee / Staff and Organizer access is represented in this preview.</small></p></li></ul></div></section><section class="panel"><div class="panel-head"><h2>Attention needed</h2></div><div class="panel-body"><div class="status-list"><div class="status-item"><span>External ticketing link</span><b class="status status--danger">Add link</b></div><div class="status-item"><span>Client photos and videos</span><b class="status status--warning">Pending</b></div></div></div></section></div></div>`;
}

function eventPage() {
  return `<div class="admin-page">${pageHead("Event information", "Manage the event details presented to visitors.", `<button class="admin-btn admin-btn--outline" type="button">Preview</button>${saveButton}`)}
  <div class="admin-grid"><section class="form-panel"><h2>Event details</h2><div class="form-row">${adminField("Event name", "Health & Beauty Expo Rijswijk 2026")}${adminField("Publication status", "<option>Published</option><option>Draft</option>", "select")}</div><div class="form-row">${adminField("Start date", "2026-10-24", "date")}${adminField("End date", "2026-10-25", "date")}</div><div class="form-row">${adminField("Opening time", "10:00", "time")}${adminField("Closing time", "18:00", "time")}</div><div class="form-row">${adminField("Venue", "De Broodfabriek")}${adminField("City", "Rijswijk")}</div>${adminField("Official address", "Volmerlaan 12, 2288 GD Rijswijk", "text", "Confirm the production address before publication.")}${adminField("Event description", "An international meeting point for health, beauty, wellness and medical tourism.", "textarea")}<h2>Visitor information</h2>${adminField("Practical information", "Doors open at 10:00 on both exhibition days. Review the exhibitors before arrival.", "textarea")}</section><aside><div class="side-card"><h3>Publication</h3><div class="toggle-row"><span>Publicly visible</span><button class="switch is-on" type="button"></button></div><div class="toggle-row"><span>Show dates and hours</span><button class="switch is-on" type="button"></button></div><div class="toggle-row"><span>Show location</span><button class="switch is-on" type="button"></button></div></div><div class="side-card"><h3>Check before publishing</h3><p class="helper">Confirm dates, location, address and opening hours with the organiser.</p></div></aside></div></div>`;
}

const exhibitors = [["N", "Nova Medical Group", "Medical tourism", "Published"], ["A", "Althea Aesthetics", "Aesthetic medicine", "Published"], ["L", "Lumen Skin Science", "Skincare", "Draft"]];
function exhibitorsPage() {
  return `<div class="admin-page">${pageHead("Exhibitors", "Add, edit or remove exhibitor profiles, including logos, images and descriptions.", `<button class="admin-btn admin-btn--primary static-save" type="button">+ Add exhibitor</button>`)}<section class="table-panel"><div class="table-tools"><input type="search" placeholder="Search exhibitors…" /><div class="filters"><button class="filter is-active">All</button><button class="filter">Published</button><button class="filter">Draft</button></div></div><table><thead><tr><th>Exhibitor</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead><tbody>${exhibitors.map(row => `<tr><td><div class="table-identity"><span class="mini-logo">${row[0]}</span><strong>${row[1]}</strong></div></td><td>${row[2]}</td><td><span class="status ${row[3] === "Published" ? "status--success" : "status--draft"}">${row[3]}</span></td><td><div class="row-actions"><button class="static-save" aria-label="Edit ${row[1]}">✎</button><button class="static-save" aria-label="Remove ${row[1]}">×</button></div></td></tr>`).join("")}</tbody></table></section><div class="admin-grid" style="margin-top:16px"><section class="form-panel"><h2>Exhibitor profile</h2><div class="form-row">${adminField("Exhibitor name", "Nova Medical Group")}${adminField("Category", "<option>Medical tourism</option><option>Health</option><option>Beauty</option><option>Wellness</option>", "select")}</div>${adminField("Short description", "International patient care and medical tourism services.", "textarea")}<div class="form-row">${adminField("Logo", "nova-medical-logo.png")}${adminField("Profile image", "nova-medical-stand.jpg")}</div></section><aside><div class="side-card"><h3>Profile status</h3><div class="toggle-row"><span>Visible on website</span><button class="switch is-on" type="button"></button></div><div class="toggle-row"><span>Featured exhibitor</span><button class="switch" type="button"></button></div>${saveButton}</div></aside></div></div>`;
}

function mediaPage() {
  const media = [["assets/poster-english.png", "campaign-en.png", "Image"], ["assets/poster-turkish.png", "campaign-tr.png", "Image"], ["assets/stands-1-2.jpg", "stands-1-2.jpg", "Image"], ["assets/media-sample.jpg", "wellness-video-cover.jpg", "Video"]];
  return `<div class="admin-page">${pageHead("Photos & videos", "Manage approved images and video references for the website.", `<button class="admin-btn admin-btn--primary static-save" type="button">Add media</button>`)}<div class="upload-zone"><div><span>⇧</span><b>Add approved photos or videos</b><small>Static preview only · final production validation will apply</small></div></div><div class="media-grid" style="margin-top:16px">${media.map(item => `<article class="media-item"><div class="media-thumb" style="background-image:url('${item[0]}')"></div><div class="media-body"><b>${item[1]}</b><small>${item[2]} · Ready to assign</small></div></article>`).join("")}</div></div>`;
}

const requestRows = [["Participation", "Alara Clinic", "Stand 2 / Silver sponsor", "New"], ["Fair Match", "Sara K.", "Forward to the organizing team", "New"], ["Media", "Maya Peters", "Digital publication", "In review"], ["Contact", "Thomas de Boer", "Visitor information", "Resolved"]];
function requestsPage() {
  return `<div class="admin-page">${pageHead("Form requests", "View submissions received through the website forms.", `<button class="admin-btn admin-btn--outline static-save" type="button">Export</button>`)}<div class="admin-grid"><section class="table-panel"><div class="table-tools"><input placeholder="Search requests…" /><div class="filters"><button class="filter is-active">All</button><button class="filter">New</button><button class="filter">In review</button></div></div><table><thead><tr><th>Type</th><th>Name</th><th>Subject</th><th>Status</th></tr></thead><tbody>${requestRows.map(row => `<tr><td><strong>${row[0]}</strong></td><td>${row[1]}</td><td>${row[2]}</td><td><span class="status ${row[3] === "New" ? "status--warning" : row[3] === "Resolved" ? "status--success" : "status--draft"}">${row[3]}</span></td></tr>`).join("")}</tbody></table></section><aside class="request-detail"><h2>Request details</h2><p>Select a request to review its submitted information.</p><div class="detail-grid"><div class="detail-box"><b>Action</b><span>Read and follow up outside the website where needed.</span></div><div class="detail-box"><b>Data handling</b><span>Only authorized users can review form submissions.</span></div></div></aside></div></div>`;
}

function ticketingPage() {
  return `<div class="admin-page">${pageHead("External ticketing link", "Set the external destination used by ticket buttons on the website.", saveButton)}<div class="admin-grid"><section class="form-panel"><h2>Ticket destination</h2>${adminField("External ticket URL", "", "url", "Use the approved ticketing platform link. The website does not process payments or issue tickets.")}${adminField("Button label", "Get tickets")}<h2>Visitor message</h2>${adminField("Ticket information", "Tickets are provided by our external ticketing partner.", "textarea")}</section><aside><div class="side-card"><h3>Current status</h3><div class="status-item"><span>Ticketing link</span><b class="status status--danger">Missing</b></div><p class="helper">Add and verify the final link before enabling ticket buttons.</p></div></aside></div></div>`;
}

const renderers = { dashboard: dashboard, event: eventPage, exhibitors: exhibitorsPage, media: mediaPage, requests: requestsPage, ticketing: ticketingPage };
const rolePermissions = {
  administrator: ["dashboard", "event", "exhibitors", "media", "requests", "ticketing"],
  staff: ["dashboard", "event", "exhibitors", "media", "requests", "ticketing"],
  organizer: ["dashboard", "event", "exhibitors", "media"]
};
const roleDescriptions = {
  administrator: "Full access to the agreed management areas.",
  staff: "Authorized access to the agreed day-to-day management areas.",
  organizer: "Limited access to authorized event information, related media and associated exhibitors."
};

function showToast() { clearTimeout(toastTimer); toast.classList.add("is-visible"); toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200); }
function wireAdmin() { document.querySelectorAll(".static-save").forEach(button => button.addEventListener("click", showToast)); document.querySelectorAll(".switch").forEach(button => button.addEventListener("click", () => { button.classList.toggle("is-on"); showToast(); })); document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => { button.parentElement.querySelectorAll(".filter").forEach(item => item.classList.remove("is-active")); button.classList.add("is-active"); })); }
function render() {
  const requestedPage = new URLSearchParams(location.search).get("page") || "dashboard";
  const role = rolePreview.value;
  const allowed = rolePermissions[role] || rolePermissions.administrator;
  const page = allowed.includes(requestedPage) ? requestedPage : "dashboard";
  adminMain.innerHTML = (renderers[page] || dashboard)();
  adminMain.insertAdjacentHTML("afterbegin", `<div class="role-context"><b>${rolePreview.options[rolePreview.selectedIndex].text} preview</b><span>${roleDescriptions[role]}</span><i>Static permission demonstration</i></div>`);
  document.querySelectorAll("[data-page]").forEach(link => { link.hidden = !allowed.includes(link.dataset.page); link.classList.toggle("is-active", link.dataset.page === page); });
  document.title = `${page.replaceAll("-", " ").replace(/\b\w/g, letter => letter.toUpperCase())} — Expo admin preview`;
  wireAdmin();
  window.scrollTo(0, 0);
}

sidebarToggle.addEventListener("click", () => { const open = sidebar.classList.toggle("is-open"); sidebarToggle.setAttribute("aria-expanded", String(open)); });
rolePreview.value = localStorage.getItem("expo-admin-role") || "administrator";
rolePreview.addEventListener("change", () => { localStorage.setItem("expo-admin-role", rolePreview.value); render(); });
render();
