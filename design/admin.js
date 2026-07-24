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
  return `<div class="admin-page">${pageHead("Good afternoon, Adil.", "Here’s what needs attention for Rijswijk 2026.", `<a class="admin-btn admin-btn--outline" href="index.html?page=home" target="_blank">Preview website ↗</a>`)}
  <div class="metric-grid"><article class="metric"><div class="metric-top"><span class="metric-icon">◎</span><small>+3 this week</small></div><b>28</b><span>Active exhibitors</span></article><article class="metric"><div class="metric-top"><span class="metric-icon">✉</span><small>5 new</small></div><b>42</b><span>Website form requests</span></article><article class="metric"><div class="metric-top"><span class="metric-icon">◫</span><small>Rijswijk 2026</small></div><b>2</b><span>Event days configured</span></article><article class="metric"><div class="metric-top"><span class="metric-icon">▧</span><small>Client media pending</small></div><b>6</b><span>Approved media records</span></article></div>
  <div class="dash-grid"><section class="panel"><div class="panel-head"><h2>Recent activity</h2><a href="admin.html?page=requests">View requests →</a></div><div class="panel-body"><ul class="activity"><li><span>✉</span><p><b>New exhibitor participation request</b><small>Alara Clinic · Stand 2 interest</small></p><time>12 min</time></li><li><span>✉</span><p><b>New Fair Match request</b><small>Forward to the organizing team for manual follow-up</small></p><time>36 min</time></li><li><span>◎</span><p><b>Exhibitor published</b><small>Lumen Skin Science is now visible</small></p><time>2 hrs</time></li><li><span>▧</span><p><b>Homepage media updated</b><small>Temporary visual remains pending replacement</small></p><time>Yesterday</time></li></ul></div></section><section class="panel"><div class="panel-head"><h2>Content reminders</h2></div><div class="panel-body"><div class="status-list"><div class="status-item"><span>Ticket link</span><b class="status status--danger">Missing</b></div><div class="status-item"><span>Official address</span><b class="status status--warning">Review</b></div><div class="status-item"><span>Client photos and videos</span><b class="status status--warning">Pending</b></div><div class="status-item"><span>Public pages</span><b class="status status--success">Ready for review</b></div></div></div></section></div></div>`;
}

function eventPage() {
  const speakersCard = rolePreview.value === "organizer"
    ? `<div class="side-card"><h3>Event speakers</h3><p class="helper">Speaker profiles are part of the published event information. An Administrator or Employee / Staff manages the approved profiles.</p></div>`
    : `<div class="side-card"><h3>Event speakers</h3><p class="helper">Speaker profiles are managed as part of the event information. Replace illustrative details with organiser-approved information before publication.</p><a class="admin-btn admin-btn--outline" href="admin.html?page=speakers" style="width:100%;margin-top:12px">Manage event speakers →</a></div>`;
  return `<div class="admin-page">${pageHead("Event management", "Edit the predefined details and publication state for Rijswijk 2026.", `<button class="admin-btn admin-btn--outline" type="button">Preview</button>${saveButton}`)}
  <div class="admin-grid"><section class="form-panel"><h2>Core event information</h2><div class="form-row">${adminField("Event name","Health & Beauty Expo Rijswijk 2026")}${adminField("Publication status","<option>Published</option><option>Draft</option>","select")}</div><div class="form-row">${adminField("Start date","2026-10-24","date")}${adminField("End date","2026-10-25","date")}</div><div class="form-row">${adminField("Opening time","10:00","time")}${adminField("Closing time","18:00","time")}</div><div class="form-row">${adminField("Venue","De Broodfabriek")}${adminField("City","Rijswijk")}</div>${adminField("Official address","Volmerlaan 12, 2288 GD Rijswijk","text","Confirm the production address before publication.")}${adminField("Short description","An international meeting point for health, beauty, wellness and medical tourism.","textarea")}<h2>Ticketing</h2>${adminField("External ticket URL","","url","Required before ticket buttons can be activated.")}<h2>Visitor information</h2>${adminField("Practical information","Doors open at 10:00 on both exhibition days. Review the floor plan and exhibitors before arrival.","textarea")}<h2>Event media</h2><div class="linked-record"><div class="linked-thumb linked-thumb--hero"></div><p><b>Homepage hero</b><span>Temporary approved placeholder · replace with client photo</span></p><button class="admin-btn admin-btn--outline static-save">Change</button></div><div class="linked-record"><div class="linked-thumb linked-thumb--video">▶</div><p><b>Event video</b><span>No approved video connected</span></p><button class="admin-btn admin-btn--outline static-save">Connect</button></div></section><aside><div class="side-card"><h3>Publish settings</h3><div class="toggle-row"><span>Publicly visible</span><button class="switch is-on" type="button"></button></div><div class="toggle-row"><span>Show on homepage</span><button class="switch is-on" type="button"></button></div><div class="toggle-row"><span>Ticket button enabled</span><button class="switch" type="button"></button></div></div><div class="side-card"><h3>Completion</h3><div class="status-item"><span>Dates & times</span><b class="status status--success">Complete</b></div><div class="status-item"><span>Address</span><b class="status status--warning">Review</b></div><div class="status-item"><span>Ticket link</span><b class="status status--danger">Missing</b></div><div class="status-item"><span>Client photography</span><b class="status status--warning">Pending</b></div></div>${speakersCard}</aside></div></div>`;
}

function speakersPage() {
  const speakers = [
    ["EK","Dr. Elif Kaya","International patient care","Illustrative profile","Draft"],
    ["SM","Sofia Martins","Beauty innovation","Illustrative profile","Draft"],
    ["AR","Amira Rahman","Wellness","Illustrative profile","Draft"]
  ];
  return `<div class="admin-page">${pageHead("Event speakers", "Manage the speaker information included with the Rijswijk 2026 event.", `<button class="admin-btn admin-btn--primary static-save" type="button">+ Add speaker</button>`)}
  <div class="prototype-warning"><b>Illustrative content</b><span>Current names, portraits and biographies exist only to validate the event-management structure. The organiser supplies and approves final information.</span></div>
  <section class="table-panel"><table><thead><tr><th>Speaker</th><th>Role / sector</th><th>Profile</th><th>Status</th><th>Actions</th></tr></thead><tbody>${speakers.map(row=>`<tr><td><div class="table-identity"><span class="mini-logo">${row[0]}</span><strong>${row[1]}</strong></div></td><td>${row[2]}</td><td>${row[3]}</td><td><span class="status status--draft">${row[4]}</span></td><td><div class="row-actions"><button class="static-save" aria-label="Edit speaker">✎</button><button class="static-save" aria-label="More speaker actions">•••</button></div></td></tr>`).join("")}</tbody></table></section>
  <div class="admin-grid" style="margin-top:16px"><section class="form-panel"><h2>Speaker information</h2><div class="form-row">${adminField("Full name","Dr. Elif Kaya")}${adminField("Professional role","International patient-care specialist")}</div><div class="form-row">${adminField("Organisation","Client to confirm")}${adminField("Sector","<option>Medical tourism</option><option>Health</option><option>Beauty</option><option>Wellness</option>","select")}</div>${adminField("Approved biography","International patient-care specialist focused on trust, access and cross-border coordination.","textarea")}</section><aside><div class="side-card"><h3>Publishing</h3><div class="toggle-row"><span>Profile approved</span><button class="switch" type="button"></button></div><div class="toggle-row"><span>Show with event information</span><button class="switch is-on" type="button"></button></div>${saveButton}</div></aside></div></div>`;
}

const rows = [
  ["N","Nova Medical Group","Medical tourism","Featured","Published"],
  ["A","Althea Aesthetics","Aesthetic medicine","—","Published"],
  ["L","Lumen Skin Science","Skincare","Featured","Published"],
  ["O","Origin Wellness Lab","Wellness","—","Draft"],
  ["V","Vita Preventive Care","Preventive health","—","Inactive"]
];
function exhibitorsPage() {
  const organizerView = rolePreview.value === "organizer";
  const visibleRows = organizerView ? rows.filter(row => ["Nova Medical Group", "Althea Aesthetics"].includes(row[1])) : rows;
  const tableRows = visibleRows.map(row=>`<tr><td><div class="table-identity"><span class="mini-logo">${row[0]}</span><strong>${row[1]}</strong></div></td><td>${row[2]}</td><td>${row[3]}</td><td><span class="status ${row[4]==="Published"?"status--success":row[4]==="Draft"?"status--draft":"status--danger"}">${row[4]}</span></td>${organizerView ? "" : `<td><div class="row-actions"><button class="static-save" aria-label="Edit">✎</button><button class="static-save" aria-label="More">•••</button></div></td>`}</tr>`).join("");
  const actions = organizerView ? "" : `<button class="admin-btn admin-btn--outline" type="button">Reorder</button><button class="admin-btn admin-btn--primary static-save" type="button">+ Add exhibitor</button>`;
  const description = organizerView ? "View the exhibitors associated with your event responsibilities." : "Create, edit, reorder, feature, activate and deactivate exhibitor profiles.";
  return `<div class="admin-page">${pageHead("Exhibitors", description, actions)}<section class="table-panel"><div class="table-tools"><input type="search" placeholder="Search exhibitors…" /><div class="filters"><button class="filter is-active">All</button><button class="filter">Published</button><button class="filter">Draft</button><button class="filter">Inactive</button></div></div><table><thead><tr><th>Exhibitor</th><th>Category</th><th>Homepage</th><th>Status</th>${organizerView ? "" : "<th>Actions</th>"}</tr></thead><tbody>${tableRows}</tbody></table></section></div>`;
}

function mediaPage() {
  const media = [
    ["assets/scene-health.svg","hero-medical-team.jpg","Homepage hero"],
    ["assets/poster-english.png","campaign-en.png","English campaign"],
    ["assets/poster-turkish.png","campaign-tr.png","Turkish campaign"],
    ["assets/stands-1-2.jpg","stands-1-2.jpg","Stand packages"],
    ["assets/expo-floor-plan.jpg","floor-plan.jpg","Floor plan"],
    ["assets/scene-wellness.svg","wellness.jpg","Visitor section"]
  ];
  return `<div class="admin-page">${pageHead("Media library", "Manage approved images, videos, documents and accessibility metadata.", `<button class="admin-btn admin-btn--primary static-save" type="button">Upload media</button>`)}<div class="upload-zone"><div><span>⇧</span><b>Drop approved media here</b><small>Images, approved video references and documents · validation applies</small></div></div><div class="media-grid" style="margin-top:16px">${media.map(item=>`<article class="media-item"><div class="media-thumb" style="background-image:url('${item[0]}')"></div><div class="media-body"><b>${item[1]}</b><small>${item[2]} · Alt text added</small></div></article>`).join("")}</div></div>`;
}

function floorPlanPage() {
  return `<div class="admin-page">${pageHead("Floor plan", "Replace the active static plan and manage the public open/download experience.", `<button class="admin-btn admin-btn--outline" type="button">Preview public page</button><button class="admin-btn admin-btn--primary static-save" type="button">Replace floor plan</button>`)}<div class="admin-grid"><div class="floor-preview"><img src="assets/expo-floor-plan.jpg" alt="Current expo floor plan" /></div><aside><div class="side-card"><h3>Active file</h3><div class="status-item"><span>expo-floor-plan.pdf</span><b class="status status--success">Active</b></div><div class="status-item"><span>Updated</span><b>24 Jul 2026</b></div><div class="status-item"><span>Public download</span><b class="status status--success">Enabled</b></div></div><div class="side-card"><h3>Accessibility</h3>${adminField("Public file name","Health & Beauty Expo floor plan 2026")}${adminField("Alternative text","Static floor plan showing stage, entrance, exhibitor stands and catering areas.","textarea")}${saveButton}</div></aside></div></div>`;
}

function contentPage() {
  return `<div class="admin-page">${pageHead("Page content", "Edit predefined website sections without changing layouts or creating arbitrary pages.", saveButton)}<div class="admin-grid"><section class="form-panel"><h2>Homepage · Hero</h2><div class="form-row">${adminField("Eyebrow","Rijswijk 2026 · International exhibition")}${adminField("Section visibility","<option>Visible</option><option>Hidden</option>","select")}</div>${adminField("Headline","Where health, beauty and opportunity meet.")}${adminField("Supporting text","Connect with world-class healthcare, beauty innovation, holistic wellness and international medical tourism professionals—all under one roof.","textarea")}<div class="form-row">${adminField("Primary button label","Plan your visit")}${adminField("Primary button destination","/tickets")}</div><h2>Homepage · Experience</h2>${adminField("Section title","Discover the ideas shaping better care and better living.")}${adminField("Section description","Health & Beauty Expo brings national and international brands, professionals and visitors together.","textarea")}</section><aside><div class="side-card"><h3>Page sections</h3><div class="toggle-row"><span>Hero</span><button class="switch is-on" type="button"></button></div><div class="toggle-row"><span>Sector bar</span><button class="switch is-on" type="button"></button></div><div class="toggle-row"><span>Experience cards</span><button class="switch is-on" type="button"></button></div><div class="toggle-row"><span>Featured exhibitors</span><button class="switch is-on" type="button"></button></div><div class="toggle-row"><span>Fair Match</span><button class="switch is-on" type="button"></button></div><div class="toggle-row"><span>Paris 2027</span><button class="switch is-on" type="button"></button></div></div><div class="side-card"><h3>Important limitation</h3><p class="helper">This dashboard edits approved fields in existing sections. New layouts and arbitrary sections require development.</p></div></aside></div></div>`;
}

const requestRows = [
  ["Participation","Alara Clinic","Stand 2 / Silver sponsor","New"],
  ["Fair Match","Sara K.","Nova Medical Group · Sat 24 Oct, 14:00","New"],
  ["Media","Maya Peters","Digital publication","In review"],
  ["Influencer","Elena V.","Instagram / YouTube","New"],
  ["Contact","Thomas de Boer","Visitor information","Resolved"],
  ["Participation","VitaCare GmbH","Stand 4","In review"]
];
function requestsPage() {
  return `<div class="admin-page">${pageHead("Form requests", "Review website submissions and forward Fair Match requests to the organizing team for manual follow-up.", `<button class="admin-btn admin-btn--outline" type="button">Export</button>`)}<div class="admin-grid"><section class="table-panel"><div class="table-tools"><input placeholder="Search requests…" /><div class="filters"><button class="filter is-active">All</button><button class="filter">New</button><button class="filter">In review</button></div></div><table><thead><tr><th>Type</th><th>Name</th><th>Subject</th><th>Status</th></tr></thead><tbody>${requestRows.map((row,index)=>`<tr class="request-row" data-index="${index}"><td><strong>${row[0]}</strong></td><td>${row[1]}</td><td>${row[2]}</td><td><span class="status ${row[3]==="New"?"status--warning":row[3]==="Resolved"?"status--success":"status--draft"}">${row[3]}</span></td></tr>`).join("")}</tbody></table></section><aside class="request-detail" id="requestDetail"><h2>Fair Match — Sara K.</h2><p>Meeting request · received 36 minutes ago</p><div class="detail-grid"><div class="detail-box"><b>Clinic</b><span>Nova Medical Group</span></div><div class="detail-box"><b>Preferred date</b><span>Sat 24 Oct 2026</span></div><div class="detail-box"><b>Preferred time</b><span>14:00</span></div><div class="detail-box"><b>Status</b><span>New</span></div></div><div class="detail-grid"><div class="detail-box"><b>Email</b><span>sara.k@example.com</span></div><div class="detail-box"><b>Phone</b><span>+31 6 1234 5678</span></div></div><div class="admin-field"><label>Internal note</label><textarea placeholder="Add a note for the team…"></textarea></div><div class="head-actions"><button class="admin-btn admin-btn--outline static-save">Propose another time</button><button class="admin-btn admin-btn--outline static-save">Decline</button><button class="admin-btn admin-btn--primary static-save">Confirm meeting</button></div></aside></div></div>`;
}

function usersPage() {
  const users=[["AD","Adil Demo","admin@expo.example","Administrator","Active"],["MS","Meryem Staff","staff@expo.example","Employee / Staff","Active"],["OR","Organiser Demo","organiser@expo.example","Organizer","Active"],["LM","Leyla Media","media@expo.example","Employee / Staff","Invited"]];
  return `<div class="admin-page">${pageHead("Users & roles", "Manage internal accounts and server-enforced access levels.", `<button class="admin-btn admin-btn--primary static-save">+ Invite user</button>`)}<section class="table-panel"><table><thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>${users.map(user=>`<tr><td><div class="table-identity"><span class="mini-logo">${user[0]}</span><strong>${user[1]}</strong></div></td><td>${user[2]}</td><td>${user[3]}</td><td><span class="status ${user[4]==="Active"?"status--success":"status--warning"}">${user[4]}</span></td><td><div class="row-actions"><button class="static-save">✎</button><button class="static-save">•••</button></div></td></tr>`).join("")}</tbody></table></section><div class="metric-grid" style="margin-top:16px"><article class="metric"><b>Administrator</b><span>Full dashboard, users, event, exhibitors, media, requests and settings.</span></article><article class="metric"><b>Staff</b><span>Allowed daily content, exhibitors, media, requests and event information.</span></article><article class="metric"><b>Organizer</b><span>Limited event and associated exhibitor access only.</span></article><article class="metric"><b>Public</b><span>No administration access. Published content only.</span></article></div></div>`;
}

function settingsPage() {
  return `<div class="admin-page">${pageHead("Settings", "Manage predefined contact values, request recipients and agreed external links.", saveButton)}<div class="admin-grid"><section class="form-panel"><h2>General contact</h2><div class="form-row">${adminField("Public email","info@expofuar.nl","email")}${adminField("Public telephone","+31 (0)570 238 100")}</div>${adminField("Official address","Volmerlaan 12, 2288 GD Rijswijk")}<h2>Form routing</h2><div class="form-row">${adminField("General requests recipient","")}${adminField("Participation recipient","")}</div><div class="form-row">${adminField("Media recipient","")}${adminField("Fair Match recipient","")}</div><h2>External links</h2>${adminField("Ticket platform URL","","url","Missing — ticket buttons remain in pending mode.")}<div class="form-row">${adminField("Instagram URL","","url")}${adminField("Facebook URL","","url")}</div></section><aside><div class="side-card"><h3>Scope reminder</h3><p class="helper">This dashboard manages agreed values and existing website content. It does not add a page builder, exhibitor accounts, payments, automated matching or appointment management.</p></div></aside></div></div>`;
}

function loginPage() {
  return `<div class="login-preview"><section class="login-art"><p class="kicker">SECURE TEAM ACCESS</p><h1>Manage the expo with clarity.</h1><p>Role-protected access for Administrators, Employees/Staff and Organizers.</p></section><section class="login-form"><form class="login-card preview-form"><img src="assets/health-beauty-expo-logo.png" alt="Health and Beauty Expo" /><h2>Welcome back.</h2><p>Sign in to manage Rijswijk 2026.</p>${adminField("Email address","admin@expo.example","email")}${adminField("Password","demo-password","password")}<button class="admin-btn admin-btn--primary" type="submit">Sign in</button><p class="helper" style="text-align:center">Static access preview — no authentication occurs.</p></form></section></div>`;
}

const renderers={dashboard,event:eventPage,speakers:speakersPage,exhibitors:exhibitorsPage,media:mediaPage,"floor-plan":floorPlanPage,content:contentPage,requests:requestsPage,users:usersPage,settings:settingsPage,login:loginPage};
const rolePermissions = {
  administrator: ["dashboard","event","speakers","exhibitors","media","floor-plan","content","requests","users","settings"],
  staff: ["dashboard","event","speakers","exhibitors","media","content","requests"],
  organizer: ["dashboard","event","exhibitors"]
};
const roleDescriptions = {
  administrator: "Full access to the management features included in the agreed dashboard.",
  staff: "Authorized access to content, exhibitors, photos and videos, requests, and event information.",
  organizer: "Limited access to authorized event information and associated exhibitors."
};
function showToast(){clearTimeout(toastTimer);toast.classList.add("is-visible");toastTimer=setTimeout(()=>toast.classList.remove("is-visible"),3200)}
function wireAdmin(){document.querySelectorAll(".static-save").forEach(button=>button.addEventListener("click",showToast));document.querySelectorAll(".switch").forEach(button=>button.addEventListener("click",()=>{button.classList.toggle("is-on");showToast()}));document.querySelectorAll(".preview-form").forEach(form=>form.addEventListener("submit",event=>{event.preventDefault();location.href="admin.html?page=dashboard"}));document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{button.parentElement.querySelectorAll(".filter").forEach(item=>item.classList.remove("is-active"));button.classList.add("is-active")}))}
function render(){
  const requestedPage=new URLSearchParams(location.search).get("page")||"dashboard";
  const role=rolePreview.value;
  const allowed=rolePermissions[role]||rolePermissions.administrator;
  const page=allowed.includes(requestedPage)?requestedPage:"dashboard";
  adminMain.innerHTML=(renderers[page]||dashboard)();
  adminMain.insertAdjacentHTML("afterbegin",`<div class="role-context"><b>${rolePreview.options[rolePreview.selectedIndex].text} preview</b><span>${roleDescriptions[role]}</span><i>Static permission demonstration</i></div>`);
  document.querySelectorAll("[data-page]").forEach(link=>{
    const permitted=allowed.includes(link.dataset.page);
    link.hidden=!permitted;
    link.classList.toggle("is-active",link.dataset.page===page);
  });
  document.title=`${page.replaceAll("-"," ").replace(/\b\w/g,l=>l.toUpperCase())} — Expo admin preview`;
  wireAdmin();
  window.scrollTo(0,0);
}
sidebarToggle.addEventListener("click",()=>{const open=sidebar.classList.toggle("is-open");sidebarToggle.setAttribute("aria-expanded",String(open))});
rolePreview.value=localStorage.getItem("expo-admin-role")||"administrator";
rolePreview.addEventListener("change",()=>{
  localStorage.setItem("expo-admin-role",rolePreview.value);
  const requestedPage=new URLSearchParams(location.search).get("page")||"dashboard";
  if(!rolePermissions[rolePreview.value].includes(requestedPage)) history.replaceState(null,"","admin.html?page=dashboard");
  render();
});
render();
