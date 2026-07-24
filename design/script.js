const app = document.querySelector("#main");
const toast = document.querySelector("#toast");
const modal = document.querySelector("#assetModal");
const modalContent = document.querySelector("#modalContent");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobileMenu");
const languageSelect = document.querySelector("#languageSelect");
let toastTimer;

const icons = {
  arrow: "<span aria-hidden='true'>→</span>",
  external: "<span aria-hidden='true'>↗</span>",
  check: "<span aria-hidden='true'>✓</span>"
};

function pageHero(title, description, actions = "", image = "") {
  const imageClass = image ? " page-hero--image" : "";
  const imageStyle = image ? ` style="background-image:url('${image}')"` : "";
  return `<section class="page-hero${imageClass}"${imageStyle}>
    <div class="shell">
      <div class="breadcrumbs"><a href="?page=home">Home</a><span>/</span><span>${title}</span></div>
      <h1>${title}</h1><p>${description}</p>
      ${actions ? `<div class="page-hero__actions">${actions}</div>` : ""}
    </div>
  </section>`;
}

function cta(title, text, href, label) {
  return `<section class="cta-band"><div class="shell"><div><h2>${title}</h2><p>${text}</p></div><a class="button button--white" href="${href}">${label} ${icons.arrow}</a></div></section>`;
}

function formField(label, type = "text", placeholder = "", options = "") {
  if (type === "select") {
    return `<div class="field"><label>${label} <span>*</span></label><select required><option value="">${placeholder}</option>${options}</select></div>`;
  }
  if (type === "textarea") {
    return `<div class="field"><label>${label} <span>*</span></label><textarea required placeholder="${placeholder}"></textarea></div>`;
  }
  return `<div class="field"><label>${label} <span>*</span></label><input type="${type}" required placeholder="${placeholder}" /></div>`;
}

function staticForm(title, fields, submit = "Submit request") {
  return `<form class="static-form demo-form">
    <h3 class="form-section-title">${title}</h3>${fields}
    <label class="check-field"><input type="checkbox" required /><span>I confirm that the information is correct and agree to the processing of these details for this request.</span></label>
    <button class="button button--primary" type="submit">${submit} ${icons.arrow}</button>
    <p class="form-note">Static validation prototype — no personal data is stored or transmitted.</p>
  </form>`;
}

function homePage() {
  return `<section class="hero">
    <div class="shell hero-grid">
      <div class="hero-copy reveal">
        <p class="eyebrow">Rijswijk 2026 · International exhibition</p>
        <h1>Where health, beauty and <em>opportunity</em> meet.</h1>
        <p>Connect with world-class healthcare, beauty innovation, holistic wellness and international medical tourism professionals—all under one roof.</p>
        <div class="hero-actions">
          <a class="button button--coral" href="?page=tickets">Plan your visit ${icons.external}</a>
          <a class="button button--outline" href="?page=participate">Exhibit with us ${icons.arrow}</a>
        </div>
        <div class="event-meta">
          <div><span class="meta-icon">24</span><p><b>24–25 October</b><small>10:00–18:00</small></p></div>
          <div><span class="meta-icon">⌖</span><p><b>De Broodfabriek</b><small>Rijswijk, NL</small></p></div>
        </div>
      </div>
      <div class="hero-visual reveal">
        <div class="hero-photo" role="img" aria-label="Healthcare professional at an international event"></div>
        <div class="hero-card hero-card--top"><b>2</b><p><b>Inspiring days</b><small>Discovery & connection</small></p></div>
        <div class="hero-card hero-card--bottom"><b>∞</b><p><b>International network</b><small>Professionals & visitors</small></p></div>
      </div>
    </div>
    <div class="shell sector-bar reveal"><p>Discover</p><a href="?page=exhibitors"><span>＋</span><b>Health</b></a><a href="?page=exhibitors"><span>✦</span><b>Beauty</b></a><a href="?page=exhibitors"><span>◌</span><b>Wellness</b></a><a href="?page=exhibitors"><span>◇</span><b>Medical tourism</b></a></div>
  </section>

  <section class="section section--cream"><div class="shell">
    <div class="section-heading reveal"><div><p class="kicker">THE EXPERIENCE</p><h2>Discover the ideas shaping better care and better living.</h2></div><p>Health & Beauty Expo brings national and international brands, professionals and visitors together for two focused days of discovery, demonstrations and valuable business connections.</p></div>
    <div class="card-grid">
      <article class="image-card reveal" style="background-image:url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85')"><div class="image-card__content"><p class="kicker">LIVE EXPERIENCE</p><h3>Innovation in action</h3><p>See treatments, technologies and launches presented by specialists.</p></div></article>
      <article class="image-card reveal" style="background-image:url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85')"><div class="image-card__content"><p class="kicker">BUSINESS</p><h3>Connections that matter</h3><p>Meet brands, clinics, partners and decision-makers from across markets.</p></div></article>
      <article class="image-card reveal" style="background-image:url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85')"><div class="image-card__content"><p class="kicker">PERSONAL DISCOVERY</p><h3>Care for body and mind</h3><p>Explore aesthetics, skincare, preventive care and holistic wellness.</p></div></article>
    </div>
  </div></section>

  <section class="section"><div class="shell">
    <div class="section-heading section-heading--center reveal"><p class="kicker">FOR EVERY AMBITION</p><h2>One international meeting point. Many ways to take part.</h2><p>Whether you are visiting, exhibiting, seeking a professional meeting or reporting on the sector, your journey starts here.</p></div>
    <div class="card-grid card-grid--4">
      <article class="info-card reveal"><span class="info-card__number">01</span><h3>Visit the expo</h3><p>Discover emerging treatments, products, knowledge and expert advice.</p><a href="?page=visit">Plan your day ${icons.arrow}</a></article>
      <article class="info-card reveal"><span class="info-card__number">02</span><h3>Exhibit your brand</h3><p>Position your organisation in front of an international audience.</p><a href="?page=participate">View packages ${icons.arrow}</a></article>
      <article class="info-card reveal"><span class="info-card__number">03</span><h3>Use Fair Match</h3><p>Select a participating clinic and request a preferred meeting time.</p><a href="?page=fair-match">Request a meeting ${icons.arrow}</a></article>
      <article class="info-card info-card--teal reveal"><span class="info-card__number">04</span><h3>Join as media</h3><p>Review accreditation criteria for press, creators and influencers.</p><a href="?page=media">See criteria ${icons.arrow}</a></article>
    </div>
  </div></section>

  <section class="section"><div class="shell">
    <div class="section-heading reveal"><div><p class="kicker">PROGRAMME PREVIEW</p><h2>Expert voices. Practical ideas. Meaningful conversations.</h2></div><p>Meet the specialists, founders and international professionals sharing knowledge across health, beauty, wellness and medical tourism.</p></div>
    <div class="speaker-grid">
      <article class="speaker-card reveal"><div class="speaker-photo speaker-photo--one" role="img" aria-label="Illustrative speaker portrait"></div><div><small>MEDICAL TOURISM</small><h3>Dr. Elif Kaya</h3><p>International patient care and trust across borders.</p></div></article>
      <article class="speaker-card reveal"><div class="speaker-photo speaker-photo--two" role="img" aria-label="Illustrative speaker portrait"></div><div><small>BEAUTY INNOVATION</small><h3>Sofia Martins</h3><p>Building credible, human-centred beauty brands.</p></div></article>
      <article class="speaker-card reveal"><div class="speaker-photo speaker-photo--three" role="img" aria-label="Illustrative speaker portrait"></div><div><small>WELLNESS</small><h3>Amira Rahman</h3><p>Wellbeing experiences that connect body and mind.</p></div></article>
    </div>
    <div class="approval-note reveal"><span>For direction approval</span><p>Speaker names, portraits, topics and schedule are illustrative. The organiser supplies and approves the final programme.</p><a href="?page=program">Review programme concept ${icons.arrow}</a></div>
  </div></section>

  <section class="section section--soft"><div class="shell split">
    <div class="media-frame media-frame--poster reveal"><img src="assets/poster-english.png" alt="English Health and Beauty Expo promotional poster" /></div>
    <div class="split-copy reveal"><p class="kicker">INTERNATIONAL MEDICAL TOURISM</p><h2>Your health, our priority.</h2><p>The supplied campaign positions the event around world-class healthcare, innovative aesthetics and personal care, and holistic wellness for body, mind and soul.</p>
      <ul class="detail-list"><li><b>Health</b><span>World-class healthcare and medical tourism professionals</span></li><li><b>Beauty</b><span>Innovative solutions for aesthetics and personal care</span></li><li><b>Wellness</b><span>Holistic wellbeing for body, mind and soul</span></li></ul>
      <a class="button button--primary" href="?page=about">Discover our story ${icons.arrow}</a>
    </div>
  </div></section>

  <section class="section section--dark"><div class="shell split">
    <div class="split-copy reveal"><p class="kicker">FAIR MATCH</p><h2 style="color:white">A personal introduction, coordinated by our team.</h2><p style="color:rgba(255,255,255,.65)">Choose a participating clinic, share your preferred date and time, and receive a manual confirmation or alternative proposal.</p><a class="button button--white" href="?page=fair-match">How Fair Match works ${icons.arrow}</a></div>
    <ol class="timeline reveal"><li><span>01</span><div><h3 style="color:white">Choose a clinic</h3><p style="color:rgba(255,255,255,.58)">Browse eligible participating specialists.</p></div></li><li><span>02</span><div><h3 style="color:white">Suggest a time</h3><p style="color:rgba(255,255,255,.58)">Share your preferred date and time.</p></div></li><li><span>03</span><div><h3 style="color:white">Receive confirmation</h3><p style="color:rgba(255,255,255,.58)">Our team coordinates the request personally.</p></div></li></ol>
  </div></section>
  ${cta("Ready for Rijswijk 2026?", "Join us at De Broodfabriek on 24–25 October.", "?page=tickets", "Explore tickets")}`;
}

function aboutPage() {
  return `${pageHero("Where health & beauty grow together.", "A professional international stage for discovery, brand visibility, specialist expertise and meaningful connections.", `<a class="button button--white" href="?page=tickets">Visit the expo ${icons.arrow}</a><a class="button button--ghost" href="?page=participate">Become an exhibitor ${icons.arrow}</a>`, "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=86")}
  <section class="section"><div class="shell split"><div class="split-copy reveal"><p class="kicker">OUR POSITIONING</p><h2>More than an exhibition—a place to meet, learn and move forward.</h2><p>Health & Beauty Expo 2026 takes place on 24 and 25 October at De Broodfabriek in Rijswijk. The two-day event brings national and international brands, professionals and visitors together to discover trends, present innovation and build valuable relationships.</p><p>The expo covers cosmetics, aesthetic treatments, skincare, haircare, wellness, preventive care, lifestyle, medical tourism and related services.</p></div><div class="quote-card reveal"><p>“A serious, modern and professional international expo—designed around quality, visibility and result.”</p><small>Health & Beauty Expo 2026 positioning</small></div></div></section>
  <section class="section section--soft"><div class="shell"><div class="section-heading section-heading--center reveal"><p class="kicker">WHAT TO EXPECT</p><h2>A complete health and beauty experience.</h2></div><div class="card-grid"><article class="info-card reveal"><span class="info-card__number">01</span><h3>Live demonstrations</h3><p>See innovative treatments and technologies presented in context.</p></article><article class="info-card reveal"><span class="info-card__number">02</span><h3>New launches</h3><p>Discover emerging brands, products and solutions before the wider market.</p></article><article class="info-card reveal"><span class="info-card__number">03</span><h3>Personal advice</h3><p>Ask experienced specialists about relevant approaches and options.</p></article><article class="info-card reveal"><span class="info-card__number">04</span><h3>Fresh insight</h3><p>Hear ideas, trends and professional perspectives across the sector.</p></article><article class="info-card reveal"><span class="info-card__number">05</span><h3>Business visibility</h3><p>Give your organisation a credible platform for international growth.</p></article><article class="info-card info-card--teal reveal"><span class="info-card__number">06</span><h3>Human connection</h3><p>Build relationships with people who share your ambition.</p></article></div></div></section>
  <section class="section"><div class="shell"><div class="stats-row reveal"><div class="stat"><b>2</b><span>Full exhibition days</span></div><div class="stat"><b>5</b><span>Website languages</span></div><div class="stat"><b>4</b><span>Core sectors</span></div><div class="stat"><b>1</b><span>International meeting point</span></div></div></div></section>
  ${cta("Be part of the Rijswijk edition.", "Meet the audience, partners and specialists shaping this growing sector.", "?page=participate", "View participation options")}`;
}

const exhibitorCards = [
  ["N", "", "Nova Medical Group", "Medical tourism", "International care pathways and specialist hospital services."],
  ["A", "coral", "Althea Aesthetics", "Aesthetic medicine", "Modern non-surgical aesthetics with a patient-first approach."],
  ["L", "green", "Lumen Skin Science", "Skincare", "Evidence-led professional skincare and diagnostic innovation."],
  ["O", "sky", "Origin Wellness Lab", "Wellness", "Holistic programmes for body, mind and sustainable wellbeing."],
  ["V", "teal", "Vita Preventive Care", "Preventive health", "Personal health insight, screening and lifestyle support."],
  ["E", "", "Elara Hair Institute", "Haircare", "Advanced hair health, restoration and professional products."]
];

function exhibitorsPage() {
  const cards = exhibitorCards.map(([letter, style, name, category, text]) => `<article class="exhibitor-card reveal" data-category="${category.toLowerCase()}"><div class="exhibitor-card__visual"><span class="fake-logo${style ? ` fake-logo--${style}` : ""}">${letter}</span></div><div class="exhibitor-card__body"><small>${category}</small><h3>${name}</h3><p>${text}</p><a href="?page=exhibitor-detail&name=${encodeURIComponent(name)}">View profile ${icons.arrow}</a></div></article>`).join("");
  return `${pageHero("Meet the exhibitors.", "Explore the clinics, healthcare groups, beauty innovators, wellness experts and partners joining Rijswijk 2026.")}
  <section class="section"><div class="shell"><div class="exhibitor-toolbar"><div class="search-field"><input id="exhibitorSearch" type="search" placeholder="Search exhibitors…" /><span>⌕</span></div><div class="tag-row"><button class="tag is-active" data-filter="all">All</button><button class="tag" data-filter="medical">Medical</button><button class="tag" data-filter="aesthetic">Aesthetics</button><button class="tag" data-filter="skincare">Skincare</button><button class="tag" data-filter="wellness">Wellness</button></div></div><div class="exhibitor-grid" id="exhibitorGrid">${cards}</div><p class="demo-note">Exhibitor names and descriptions are presentation data. Final exhibitor content will be supplied and approved by the client.</p></div></section>
  ${cta("Interested in exhibiting?", "Compare stand packages and sponsorship options for Rijswijk 2026.", "?page=participate", "View packages")}`;
}

function programPage() {
  return `${pageHero("Programme & speakers.", "A flexible presentation for talks, demonstrations and expert sessions. Final participants and times are supplied by the organiser.")}
  <section class="section"><div class="shell">
    <div class="approval-note approval-note--top"><span>Content approval required</span><p>This page validates the visual direction and information structure only. All names, portraits, topics and times below are illustrative.</p></div>
    <div class="section-heading"><div><p class="kicker">SATURDAY · 24 OCTOBER</p><h2>Ideas shaping better care and better living.</h2></div><p>A clear programme helps visitors plan their day while giving speakers and demonstrations the right visibility.</p></div>
    <div class="schedule">
      <article><time>11:00</time><div><small>OPENING TALK · MAIN STAGE</small><h3>Trust and innovation in international healthcare</h3><p>Dr. Elif Kaya · International patient-care specialist</p></div><span>45 min</span></article>
      <article><time>13:00</time><div><small>LIVE SESSION · BEAUTY STAGE</small><h3>The next generation of responsible beauty</h3><p>Sofia Martins · Beauty brand strategist</p></div><span>35 min</span></article>
      <article><time>15:00</time><div><small>PANEL · MAIN STAGE</small><h3>Wellness without borders</h3><p>Amira Rahman and invited experts</p></div><span>50 min</span></article>
    </div>
  </div></section>
  <section class="section section--soft"><div class="shell">
    <div class="section-heading"><div><p class="kicker">SPEAKER PROFILES</p><h2>Give every expert a credible introduction.</h2></div><p>The final profile can include an approved portrait, role, organisation, biography, topic and social or website link.</p></div>
    <div class="speaker-grid">
      <article class="speaker-card"><div class="speaker-photo speaker-photo--one" role="img" aria-label="Illustrative speaker portrait"></div><div><small>MEDICAL TOURISM</small><h3>Dr. Elif Kaya</h3><p>International patient-care specialist focused on trust, access and cross-border coordination.</p><a class="demo-action" href="#">View profile ${icons.arrow}</a></div></article>
      <article class="speaker-card"><div class="speaker-photo speaker-photo--two" role="img" aria-label="Illustrative speaker portrait"></div><div><small>BEAUTY INNOVATION</small><h3>Sofia Martins</h3><p>Brand strategist exploring responsible innovation and meaningful customer relationships.</p><a class="demo-action" href="#">View profile ${icons.arrow}</a></div></article>
      <article class="speaker-card"><div class="speaker-photo speaker-photo--three" role="img" aria-label="Illustrative speaker portrait"></div><div><small>WELLNESS</small><h3>Amira Rahman</h3><p>Wellbeing educator connecting practical science with inclusive personal-care experiences.</p><a class="demo-action" href="#">View profile ${icons.arrow}</a></div></article>
    </div>
  </div></section>
  ${cta("Want to attend a session?", "Ticket sales will continue through the organiser’s approved external ticketing platform.", "?page=tickets", "View ticket information")}`;
}

function exhibitorDetailPage() {
  const params = new URLSearchParams(location.search);
  const name = params.get("name") || "Nova Medical Group";
  return `${pageHero(name, "Featured exhibitor · Medical tourism and specialist healthcare.", `<a class="button button--white demo-action" href="#">Contact exhibitor ${icons.arrow}</a><a class="button button--ghost" href="?page=exhibitors">All exhibitors</a>`)}
  <section class="section"><div class="shell split"><div class="media-frame" style="background-image:url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=85')"></div><div class="split-copy"><p class="kicker">ABOUT THE EXHIBITOR</p><h2>International expertise, personal coordination.</h2><p>This profile demonstrates how an active exhibitor can present a logo, category, description, key information, media and a relevant contact action.</p><ul class="detail-list"><li><b>Category</b><span>Medical tourism · Hospital group</span></li><li><b>Specialisms</b><span>Diagnostics, specialist care, international patients</span></li><li><b>Country</b><span>International</span></li><li><b>Stand</b><span>Hall A · A12</span></li></ul><div class="tag-row"><span class="tag">International care</span><span class="tag">Diagnostics</span><span class="tag">Specialists</span></div></div></div></section>
  <section class="section section--soft"><div class="shell"><div class="section-heading"><div><p class="kicker">AT THE EXPO</p><h2>Meet the team in Rijswijk.</h2></div><p>Visitors can use the exhibitor’s approved contact action or, when eligible, request a manually coordinated Fair Match meeting.</p></div><div class="card-grid"><article class="info-card"><span class="info-card__number">01</span><h3>Visit stand A12</h3><p>Meet representatives throughout both exhibition days.</p></article><article class="info-card"><span class="info-card__number">02</span><h3>Ask a specialist</h3><p>Discuss services and international patient coordination.</p></article><article class="info-card info-card--teal"><span class="info-card__number">03</span><h3>Request a meeting</h3><p>Use Fair Match to suggest your preferred time.</p><a href="?page=fair-match">Open Fair Match ${icons.arrow}</a></article></div></div></section>`;
}

function ticketsPage() {
  return `${pageHero("Plan your visit.", "Everything you need to prepare for Health & Beauty Expo Rijswijk 2026. Ticket sales will connect to the approved external ticketing platform.", `<button class="button button--white ticket-pending" type="button">Ticket sales opening soon ${icons.external}</button>`)}
  <section class="section"><div class="shell split"><div class="split-copy"><p class="kicker">EVENT DETAILS</p><h2>Two days of international discovery.</h2><ul class="detail-list"><li><b>Saturday</b><span>24 October 2026 · 10:00–18:00</span></li><li><b>Sunday</b><span>25 October 2026 · 10:00–18:00</span></li><li><b>Venue</b><span>De Broodfabriek, Rijswijk</span></li><li><b>Format</b><span>Public exhibition, professional networking and live discovery</span></li></ul><p class="validation-banner">The final ticket price and external ticketing URL are awaiting client confirmation.</p></div><div class="media-frame" style="background-image:url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85')"></div></div></section>
  <section class="section section--soft"><div class="shell"><div class="section-heading section-heading--center"><p class="kicker">YOUR VISIT</p><h2>Everything is designed for a clear, enjoyable day.</h2></div><div class="card-grid"><article class="info-card"><span class="info-card__number">01</span><h3>Prepare</h3><p>Review exhibitors, sectors and the floor plan before you arrive.</p><a href="?page=floor-plan">Open floor plan ${icons.arrow}</a></article><article class="info-card"><span class="info-card__number">02</span><h3>Discover</h3><p>Explore health, beauty, wellness and medical tourism solutions.</p><a href="?page=exhibitors">Browse exhibitors ${icons.arrow}</a></article><article class="info-card info-card--teal"><span class="info-card__number">03</span><h3>Connect</h3><p>Request a manual introduction to a participating clinic.</p><a href="?page=fair-match">Use Fair Match ${icons.arrow}</a></article></div></div></section>
  ${cta("Need practical information?", "Find venue, accessibility and arrival guidance on the visit page.", "?page=visit", "Plan your journey")}`;
}

function visitPage() {
  return `${pageHero("Plan your day in Rijswijk.", "Dates, opening hours, venue information and practical guidance for a smooth visit.")}
  <section class="section"><div class="shell split"><div class="split-copy"><p class="kicker">PRACTICAL INFORMATION</p><h2>De Broodfabriek, Rijswijk.</h2><ul class="detail-list"><li><b>Dates</b><span>24–25 October 2026</span></li><li><b>Opening hours</b><span>10:00–18:00 on both days</span></li><li><b>Venue</b><span>De Broodfabriek, Rijswijk, The Netherlands</span></li><li><b>Address</b><span>Awaiting final client confirmation before publication</span></li><li><b>Languages</b><span>Dutch, Turkish, English, Russian and Arabic</span></li></ul><a class="button button--primary" href="?page=floor-plan">View floor plan ${icons.arrow}</a></div><div class="media-frame" style="background-image:url('https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85')"></div></div></section>
  <section class="section section--soft"><div class="shell"><div class="section-heading"><div><p class="kicker">BEFORE YOU ARRIVE</p><h2>Make the most of your visit.</h2></div></div><div class="card-grid card-grid--4"><article class="info-card"><span class="info-card__number">01</span><h3>Get your ticket</h3><p>Ticketing redirects to the approved external provider.</p></article><article class="info-card"><span class="info-card__number">02</span><h3>Browse exhibitors</h3><p>Identify the clinics, brands and specialists you want to meet.</p></article><article class="info-card"><span class="info-card__number">03</span><h3>Review the plan</h3><p>Use the static floor plan to understand the hall layout.</p></article><article class="info-card info-card--teal"><span class="info-card__number">04</span><h3>Fair Match</h3><p>Suggest a preferred meeting time with an eligible clinic.</p></article></div></div></section>
  ${cta("Questions about your visit?", "Our team can help with practical information before the expo.", "?page=contact", "Contact the team")}`;
}

function floorPlanPage() {
  return `${pageHero("Explore the expo floor.", "Preview the supplied static floor plan, including the central entrance, stage, stand rows and catering areas.")}
  <section class="section section--soft"><div class="shell"><div class="floor-plan-card reveal"><img src="assets/expo-floor-plan.jpg" alt="Health and Beauty Expo floor plan showing stage, entrance, stands and catering areas" /><div class="legend"><span>Top: Podium / stage</span><span>Centre: Exhibitor stands</span><span>Bottom: Main entrance</span><span>Sides: Catering areas</span></div><div class="floor-plan-actions"><button class="button button--primary asset-preview" data-asset="assets/expo-floor-plan.jpg" type="button">Open large view ${icons.external}</button><a class="button button--outline" href="downloads/expo-floor-plan.pdf" target="_blank">Download PDF ↓</a></div></div></div></section>
  ${cta("Find the exhibitors you want to meet.", "Browse the directory before planning your route through the hall.", "?page=exhibitors", "Browse exhibitors")}`;
}

function fairMatchPage() {
  const fields = `<div class="form-row">${formField("First name", "text", "Your first name")}${formField("Last name", "text", "Your last name")}</div><div class="form-row">${formField("Email", "email", "name@example.com")}${formField("Phone", "tel", "+31 …")}</div>${formField("Preferred clinic", "select", "Select a participating clinic", "<option>Nova Medical Group</option><option>Althea Aesthetics</option><option>Vita Preventive Care</option>")}<div class="form-row">${formField("Preferred date", "date")}${formField("Preferred time", "time")}</div>${formField("What would you like to discuss?", "textarea", "Share a short note for the clinic and coordination team.")}`;
  return `${pageHero("Fair Match—personal introductions made simple.", "Select a participating clinic, suggest your preferred date and time, and let our team coordinate the request manually.", `<a class="button button--white" href="#request">Request a meeting ${icons.arrow}</a>`)}
  <section class="section"><div class="shell"><div class="section-heading section-heading--center"><p class="kicker">HOW IT WORKS</p><h2>A clear three-step request.</h2><p>Fair Match is a manual coordination service. It does not provide live availability, automated matching, chat or calendar synchronisation.</p></div><div class="card-grid"><article class="info-card"><span class="info-card__number">01</span><h3>Choose a clinic</h3><p>Browse eligible active exhibitors and select who you want to meet.</p></article><article class="info-card"><span class="info-card__number">02</span><h3>Suggest a time</h3><p>Share your preferred date, time and contact details.</p></article><article class="info-card info-card--teal"><span class="info-card__number">03</span><h3>Receive a response</h3><p>Staff confirm, propose another time or decline the request manually.</p></article></div></div></section>
  <section class="section section--soft" id="request"><div class="shell form-shell"><div class="form-intro"><p class="kicker">MEETING REQUEST</p><h2>Who would you like to meet?</h2><p>Complete the static preview to demonstrate the intended visitor experience.</p><div class="contact-card"><b>Manual coordination</b><span>Your request is reviewed by the expo team before any confirmation is sent.</span></div></div>${staticForm("Your meeting preferences", fields, "Send meeting request")}</div></section>`;
}

function participatePage() {
  const packages = [
    ["Stand 1", "15 m²", "€3,495", ["5 × 3 metre stand", "230V electricity", "2 tables, low or high", "6 chairs, low or high"], ""],
    ["Stand 2", "30 m²", "€4,950", ["6 × 5 metre stand", "230V electricity", "2 tables, low or high", "6 chairs, low or high"], "featured"],
    ["Stand 3", "15 m²", "€4,995", ["5 × 3 metre premium build", "230V electricity", "2 tables, low or high", "6 chairs, low or high"], ""],
    ["Stand 4", "30 m²", "€6,995", ["6 × 5 metre premium build", "230V electricity", "2 tables, low or high", "6 chairs, low or high"], ""]
  ];
  const packageCards = packages.map(([name, size, price, items, featured]) => `<article class="price-card${featured ? " is-featured" : ""}"><div class="price-card__label"><span>${size}</span>${featured ? "<i>POPULAR</i>" : ""}</div><h3>${name}</h3><p class="price">${price}</p><ul>${items.map(item => `<li>${item}</li>`).join("")}</ul><button class="button ${featured ? "button--white" : "button--outline"} package-select" data-package="${name}" type="button">Request ${name} ${icons.arrow}</button></article>`).join("");
  const fields = `<div class="form-row">${formField("Company name", "text", "Your organisation")}${formField("Contact person", "text", "Full name")}</div><div class="form-row">${formField("Business email", "email", "name@company.com")}${formField("Phone", "tel", "+31 …")}</div>${formField("Interest", "select", "Select package", "<option>Stand 1 — 15m²</option><option>Stand 2 — 30m²</option><option>Stand 3 — 15m² premium</option><option>Stand 4 — 30m² premium</option><option>Bronze sponsorship</option><option>Silver sponsorship</option><option>Gold sponsorship</option>")}${formField("Tell us about your organisation", "textarea", "Products, services, target audience and any stand requirements.")}`;
  return `${pageHero("Put your brand at the centre of the conversation.", "Choose a stand or sponsorship package designed for professional visibility at Health & Beauty Expo Rijswijk 2026.", `<a class="button button--white" href="#packages">Compare packages ${icons.arrow}</a><a class="button button--ghost" href="?page=participant-info">Participant information</a>`)}
  <section class="section" id="packages"><div class="shell"><div class="section-heading section-heading--center"><p class="kicker">STAND PACKAGES</p><h2>A professional platform for your organisation.</h2><p>Prices and inclusions are taken from the supplied 2026 stand price list. Final commercial confirmation remains with the organiser.</p></div><div class="pricing-grid">${packageCards}</div><div class="floor-plan-actions"><button class="button button--outline asset-preview" data-asset="assets/stands-1-2.jpg" type="button">Preview stands 1 & 2</button><button class="button button--outline asset-preview" data-asset="assets/stands-3-4.jpg" type="button">Preview stands 3 & 4</button><a class="button button--outline" href="downloads/stand-pricing-2026.pdf" target="_blank">Download price list ↓</a></div></div></section>
  <section class="section section--cream" id="sponsorship"><div class="shell"><div class="section-heading"><div><p class="kicker">SPONSORSHIP</p><h2>Extend your visibility beyond the stand.</h2></div><p>Three supplied tiers combine digital promotion and exposure across the venue.</p></div><div class="sponsor-grid"><article class="sponsor-card"><span class="sponsor-card__medal">B</span><h3>Bronze</h3><p class="price">€1,500</p><p>Social media promotion and advertising at the hall entrance.</p></article><article class="sponsor-card sponsor-card--silver"><span class="sponsor-card__medal">S</span><h3>Silver</h3><p class="price">€3,000</p><p>Social media, hall entrance and digital stage video advertising.</p></article><article class="sponsor-card sponsor-card--gold"><span class="sponsor-card__medal">G</span><h3>Gold</h3><p class="price">€5,000</p><p>Product-category exclusivity, social media, three hall placements, magazine, stage and influencer promotion.</p></article></div></div></section>
  <section class="section section--soft" id="participation-form"><div class="shell form-shell"><div class="form-intro"><p class="kicker">PARTICIPATION REQUEST</p><h2>Tell us how you want to take part.</h2><p>Submit your interest and the organiser can follow up with availability, final inclusions and agreement details.</p><div class="contact-card"><b>Important deadline</b><span>Extra electricity requirements must be submitted before 23 September 2026.</span></div></div>${staticForm("Organisation details", fields, "Request participation")}</div></section>
  ${cta("Already confirmed as an exhibitor?", "Review logistics, deadlines, safety rules and downloadable documents.", "?page=participant-info", "Open participant guide")}`;
}

function participantInfoPage() {
  return `${pageHero("Participant information.", "A clear web summary of the supplied official participant manual for confirmed exhibitors.", `<a class="button button--white" href="downloads/participant-manual-2026.pdf" target="_blank">Download full manual ↓</a><a class="button button--ghost" href="downloads/exhibitor-agreement-nl.pdf" target="_blank">Open agreement ${icons.external}</a>`)}
  <section class="section"><div class="shell split split--wide"><div class="split-copy"><p class="kicker">KEY DATES</p><h2>Prepare early for a smooth exhibition.</h2><ul class="detail-list"><li><b>Extra electricity</b><span>Submit requirements before 23 September 2026</span></li><li><b>Stand requests</b><span>Send stand, furniture, branding and service needs at least 30 days before the expo</span></li><li><b>Expo hours</b><span>24–25 October · 10:00–18:00</span></li><li><b>Payment</b><span>50% within 30 days, remaining 50% within 60 days; full payment by 23 September</span></li><li><b>Late registration</b><span>Full payment within 3 days</span></li></ul></div><ol class="timeline"><li><span>01</span><div><h3>Share contact details</h3><p>Maximum two company contact persons; keep email and WhatsApp reachable.</p></div></li><li><span>02</span><div><h3>Confirm logistics</h3><p>Stand choice, furniture, branding, equipment and electrical needs.</p></div></li><li><span>03</span><div><h3>Prepare the stand</h3><p>Expo Fuar prepares stand build, furniture and agreed branding in advance.</p></div></li><li><span>04</span><div><h3>Operate safely</h3><p>Follow venue, hygiene, sound, advertising, fire and electrical rules.</p></div></li></ol></div></section>
  <section class="section section--soft"><div class="shell"><div class="section-heading"><div><p class="kicker">DOCUMENTS</p><h2>Downloads for participating companies.</h2></div><p>These documents remain subject to organiser and legal validation before public production publication.</p></div><div class="download-grid"><article class="download-card"><span>↧</span><b>Participant manual 2026</b><small>Rules, logistics, payment and safety</small><a href="downloads/participant-manual-2026.pdf" target="_blank">Download PDF</a></article><article class="download-card"><span>↧</span><b>Exhibitor agreement</b><small>Dutch agreement template</small><a href="downloads/exhibitor-agreement-nl.pdf" target="_blank">Open PDF</a></article><article class="download-card"><span>↧</span><b>Stand price list</b><small>Stand and sponsorship packages</small><a href="downloads/stand-pricing-2026.pdf" target="_blank">Download PDF</a></article><article class="download-card"><span>↧</span><b>Expo floor plan</b><small>Static hall layout</small><a href="downloads/expo-floor-plan.pdf" target="_blank">Open PDF</a></article></div></div></section>
  <section class="section"><div class="shell"><div class="section-heading section-heading--center"><p class="kicker">FREQUENT TOPICS</p><h2>Essential rules at a glance.</h2></div><div class="accordion"><details open><summary>Stand, branding and extra services</summary><div>Extra services must be requested in advance and are charged separately. Promotion outside the stand requires approval. Stand structures may not be damaged or modified without written permission.</div></details><details><summary>Travel, transfer and accommodation</summary><div>The supplied manual describes Amsterdam airport reception, airport–hotel–venue transfer, and organiser-selected contract hotels. Final operational confirmation should be provided directly to participants.</div></details><details><summary>Safety, hygiene and catering</summary><div>Indoor smoking is prohibited. Food exhibitors must follow hygiene rules and operate only within assigned areas. The manual states meat and chicken offered at the expo are 100% halal.</div></details><details><summary>Insurance, damage and cancellation</summary><div>Participating companies must maintain suitable insurance. Cancellation is free within 14 days of signing; later charges are described in the agreement and participant manual.</div></details></div></div></section>`;
}

function mediaPage() {
  const fields = `<div class="form-row">${formField("Full name", "text", "Your full name")}${formField("Professional email", "email", "name@publication.com")}</div><div class="form-row">${formField("Organisation / publication", "text", "Publication or channel")}${formField("Application type", "select", "Select one", "<option>Journalist / editor</option><option>Freelance journalist / photographer</option><option>Digital media / podcast</option><option>Industry analyst</option><option>Influencer / creator</option>")}</div>${formField("Website or profile URL", "url", "https://")}${formField("Audience and recent coverage", "textarea", "Share relevant reach, engagement and recent health, technology or innovation work.")}`;
  return `${pageHero("Media, press & influencers.", "Accreditation for professionals producing original coverage of healthcare, health technology, beauty, wellness and innovation.", `<a class="button button--white" href="#accreditation">Apply for accreditation ${icons.arrow}</a>`)}
  <section class="section"><div class="shell"><div class="section-heading"><div><p class="kicker">ACCREDITATION</p><h2>Professional access for credible, original coverage.</h2></div><p>Applications are reviewed individually. Additional evidence may be requested, and approval remains at the discretion of the organiser.</p></div><div class="card-grid"><article class="info-card"><span class="info-card__number">01</span><h3>Established media</h3><p>Print, radio, television and news agencies with active editorial roles covering relevant sectors.</p></article><article class="info-card"><span class="info-card__number">02</span><h3>Digital & freelance</h3><p>Regular websites, blogs, podcasts, assigned journalists, photographers and analysts with evidence.</p></article><article class="info-card info-card--teal"><span class="info-card__number">03</span><h3>Influencers</h3><p>Creators with relevant recent content, meaningful reach and demonstrated original work.</p></article></div></div></section>
  <section class="section section--soft"><div class="shell split"><div><p class="kicker">CRITERIA AT A GLANCE</p><div class="accordion"><details open><summary>Digital media</summary><div>Publication name and website, regular monthly coverage, and at least 7,500 unique monthly interactions. Corporate bloggers, marketing/PR staff and purely personal bloggers are not eligible under the supplied criteria.</div></details><details><summary>Freelance journalists & photographers</summary><div>An assignment letter or email from an editor on official stationery or from a publication email, with qualifications in the publication’s name.</div></details><details><summary>Industry analysts</summary><div>A publicly available attributed report from the previous six months. Client-exclusive reports, financial analysts and corporate consultants are excluded.</div></details><details><summary>Influencers & creators</summary><div>At least 50% relevant recent content, 10,000 followers on one platform, approximately 2% engagement and evidence of original work. Podcast/video thresholds and blogger/newsletter criteria are reviewed separately.</div></details></div></div><div class="media-frame" style="background-image:url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85')"></div></div></section>
  <section class="section"><div class="shell"><div class="section-heading section-heading--center"><p class="kicker">INFLUENCER COMMITMENT</p><h2>Three moments. Nine purposeful posts.</h2><p>The supplied guidelines propose three posts before, three during and three after the event, using the official event hashtag and appropriate disclosure.</p></div><div class="stats-row"><div class="stat"><b>3</b><span>Before the expo</span></div><div class="stat"><b>3</b><span>During the expo</span></div><div class="stat"><b>3</b><span>After the expo</span></div><div class="stat"><b>9</b><span>Total posts</span></div></div></div></section>
  <section class="section section--cream" id="accreditation"><div class="shell form-shell"><div class="form-intro"><p class="kicker">APPLICATION</p><h2>Request accreditation.</h2><p>Provide enough professional context for the organiser to assess the application.</p><div class="contact-card"><b>Supporting evidence</b><span>The final form can support links or controlled file upload after provider decisions are approved.</span></div></div>${staticForm("Professional details", fields, "Submit application")}</div></section>`;
}

function contactPage() {
  const fields = `<div class="form-row">${formField("Name", "text", "Your name")}${formField("Email", "email", "name@example.com")}</div>${formField("Subject", "select", "Choose a topic", "<option>Visitor information</option><option>Exhibiting and sponsorship</option><option>Media accreditation</option><option>Fair Match</option><option>Other</option>")}${formField("Message", "textarea", "How can we help?")}`;
  return `${pageHero("Let’s connect.", "Questions about visiting, exhibiting, accreditation or the event? Send a message to the relevant team.")}
  <section class="section"><div class="shell form-shell"><div class="form-intro"><p class="kicker">CONTACT</p><h2>We’re here to help.</h2><p>Contact details below are presentation placeholders based on existing-site references and require client revalidation before production.</p><ul class="detail-list"><li><b>General</b><span>info@expofuar.nl</span></li><li><b>Telephone</b><span>+31 (0)570 238 100</span></li><li><b>Office hours</b><span>Mon–Fri 09:00–17:00 · Sat 11:00–16:00</span></li><li><b>Event venue</b><span>De Broodfabriek, Rijswijk</span></li></ul><p class="validation-banner">The official address, telephone, recipients and social links need final confirmation.</p></div>${staticForm("Send a message", fields, "Send message")}</div></section>
  <section class="section section--soft"><div class="shell"><div class="section-heading section-heading--center"><p class="kicker">DIRECT YOUR REQUEST</p><h2>Choose the right route.</h2></div><div class="card-grid card-grid--4"><article class="info-card"><span class="info-card__number">01</span><h3>Visitor</h3><p>Tickets, venue and practical information.</p><a href="?page=visit">Visit information ${icons.arrow}</a></article><article class="info-card"><span class="info-card__number">02</span><h3>Exhibitor</h3><p>Stand, sponsorship and participation options.</p><a href="?page=participate">Exhibit with us ${icons.arrow}</a></article><article class="info-card"><span class="info-card__number">03</span><h3>Media</h3><p>Press, journalist and influencer accreditation.</p><a href="?page=media">Media criteria ${icons.arrow}</a></article><article class="info-card info-card--teal"><span class="info-card__number">04</span><h3>Fair Match</h3><p>Clinic meeting request and manual coordination.</p><a href="?page=fair-match">Open Fair Match ${icons.arrow}</a></article></div></div></section>`;
}

function parisPage() {
  return `${pageHero("Paris 2027.", "A new city. The same international ambition. Health & Beauty Expo Paris is coming soon.", `<a class="button button--white" href="#updates">Keep me updated ${icons.arrow}</a>`, "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=86")}
  <section class="section"><div class="shell split"><div class="split-copy"><p class="kicker">COMING SOON</p><h2>The next chapter of our international journey.</h2><p>Paris 2027 is presented as a static coming-soon edition. Dates, venue, programme and participation details will be announced after organiser approval.</p><p>This page intentionally does not imply independent multi-edition administration in the first product phase.</p></div><div class="quote-card"><p>“Health, beauty and wellness—connected across borders.”</p><small>Paris 2027 preview positioning</small></div></div></section>
  <section class="section section--soft" id="updates"><div class="shell form-shell"><div class="form-intro"><p class="kicker">UPDATES</p><h2>Be the first to know.</h2><p>Register interest for announcements about the Paris edition.</p></div>${staticForm("Update preference", `<div class="form-row">${formField("Name", "text", "Your name")}${formField("Email", "email", "name@example.com")}</div>${formField("I am interested as", "select", "Select one", "<option>Visitor</option><option>Exhibitor</option><option>Sponsor</option><option>Media / influencer</option>")}`, "Keep me updated")}</div></section>`;
}

function legalPage() {
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab") || "privacy";
  const copy = {
    privacy: ["Privacy policy", "How personal information is handled", "This draft page shows the intended structure for privacy information covering contact, participation, accreditation and Fair Match requests. Final retention periods, legal bases, processors and contact details require client and legal approval."],
    cookies: ["Cookie policy", "Clear choices and transparent information", "The final policy will describe strictly necessary cookies and any optional analytics or embedded services after the project’s analytics and consent decisions are approved."],
    terms: ["Website terms", "Rules for using the public website", "These terms will cover acceptable use, intellectual property, external ticketing links, accuracy of exhibitor content, medical-information disclaimers and limitation of liability after legal review."],
    visitors: ["Visitor information", "Important information for attendees", "This page will contain approved ticket, entry, venue, accessibility, conduct and event-change information. The website redirects to an external ticket provider and does not process payment."],
    exhibitors: ["Exhibitor information", "Participation terms and responsibilities", "The supplied participant manual and agreement cover stand requirements, payment, cancellation, insurance, safety and operational responsibilities. Final publication must be approved by the organiser and legal adviser."]
  };
  const [title, heading, intro] = copy[tab] || copy.privacy;
  return `${pageHero(title, "Client-validation structure for an approved legal and informational page.")}
  <section class="section"><div class="shell legal-layout"><nav class="legal-nav"><a class="${tab === "privacy" ? "is-active" : ""}" href="?page=legal&tab=privacy">Privacy policy</a><a class="${tab === "cookies" ? "is-active" : ""}" href="?page=legal&tab=cookies">Cookie policy</a><a class="${tab === "terms" ? "is-active" : ""}" href="?page=legal&tab=terms">Website terms</a><a class="${tab === "visitors" ? "is-active" : ""}" href="?page=legal&tab=visitors">Visitor information</a><a class="${tab === "exhibitors" ? "is-active" : ""}" href="?page=legal&tab=exhibitors">Exhibitor information</a></nav><article class="legal-copy"><p class="validation-banner">Draft layout only. This text is not legal advice and must be reviewed and approved before production publication.</p><h2>${heading}</h2><p>${intro}</p><h3>1. Scope and purpose</h3><p>The final text will explain who operates the website, which activities are covered and how users can contact the responsible organisation.</p><h3>2. Information and responsibilities</h3><p>Approved content will describe relevant user rights, organiser responsibilities, external services and any limitations in plain language.</p><h3>3. Contact and changes</h3><p>Users will be told how to ask questions, exercise applicable rights and review the current effective date of the policy.</p></article></div></section>`;
}

const pageRenderers = {
  home: homePage,
  about: aboutPage,
  exhibitors: exhibitorsPage,
  program: programPage,
  "exhibitor-detail": exhibitorDetailPage,
  tickets: ticketsPage,
  visit: visitPage,
  "floor-plan": floorPlanPage,
  "fair-match": fairMatchPage,
  participate: participatePage,
  "participant-info": participantInfoPage,
  media: mediaPage,
  contact: contactPage,
  paris: parisPage,
  legal: legalPage
};

const languageLabels = {
  en: ["Client validation prototype", "Preview admin dashboard"],
  nl: ["Prototype voor klantvalidatie", "Bekijk beheerdersdashboard"],
  tr: ["Müşteri onay prototipi", "Yönetim panelini görüntüle"],
  ru: ["Прототип для согласования", "Панель администратора"],
  ar: ["نموذج لمراجعة العميل", "معاينة لوحة الإدارة"]
};

const translationSets = {
  nl: {
    "About": "Over ons", "Exhibitors": "Exposanten", "Programme": "Programma", "Programme & speakers": "Programma & sprekers", "Visit": "Bezoeken", "Tickets": "Tickets", "Plan your visit": "Plan je bezoek", "Floor plan": "Plattegrond", "Fair Match": "Fair Match", "Exhibit": "Deelnemen", "Media": "Media", "Contact": "Contact",
    "About the expo": "Over de expo", "Explore": "Ontdekken", "Participate": "Deelnemen", "Stand packages": "Standpakketten", "Sponsorship": "Sponsoring", "Participant guide": "Deelnemershandleiding", "Agreement": "Overeenkomst", "Privacy": "Privacy", "Cookies": "Cookies", "Terms": "Voorwaarden",
    "Where health, beauty and opportunity meet.": "Waar gezondheid, beauty en kansen samenkomen.", "Where health, beauty and": "Waar gezondheid, beauty en", "opportunity": "kansen", "meet.": "samenkomen.", "Connect with world-class healthcare, beauty innovation, holistic wellness and international medical tourism professionals—all under one roof.": "Ontmoet toonaangevende zorgprofessionals, beauty-innovators, wellness-experts en specialisten in internationaal medisch toerisme—alles onder één dak.", "Plan your visit ↗": "Plan je bezoek ↗", "Exhibit with us": "Neem deel",
    "Discover": "Ontdek", "Health": "Gezondheid", "Beauty": "Beauty", "Wellness": "Wellness", "Medical tourism": "Medisch toerisme", "THE EXPERIENCE": "DE BELEVING", "Discover the ideas shaping better care and better living.": "Ontdek de ideeën die betere zorg en een beter leven vormgeven.", "FOR EVERY AMBITION": "VOOR ELKE AMBITIE", "One international meeting point. Many ways to take part.": "Eén internationaal ontmoetingspunt. Veel manieren om deel te nemen.",
    "Visit the expo": "Bezoek de expo", "Exhibit your brand": "Presenteer je merk", "Use Fair Match": "Gebruik Fair Match", "Join as media": "Word mediapartner", "PROGRAMME PREVIEW": "PROGRAMMAVOORBEELD", "Expert voices. Practical ideas. Meaningful conversations.": "Deskundige stemmen. Praktische ideeën. Waardevolle gesprekken.", "For direction approval": "Ter goedkeuring van de richting", "Review programme concept →": "Bekijk het programmaconcept →", "Ready for Rijswijk 2026?": "Klaar voor Rijswijk 2026?", "Explore tickets →": "Bekijk tickets →"
  },
  tr: {
    "About": "Hakkımızda", "Exhibitors": "Katılımcılar", "Programme": "Program", "Programme & speakers": "Program ve konuşmacılar", "Visit": "Ziyaret", "Tickets": "Biletler", "Plan your visit": "Ziyaretini planla", "Floor plan": "Fuar planı", "Fair Match": "Fair Match", "Exhibit": "Katıl", "Media": "Medya", "Contact": "İletişim",
    "About the expo": "Fuar hakkında", "Explore": "Keşfet", "Participate": "Katılım", "Stand packages": "Stant paketleri", "Sponsorship": "Sponsorluk", "Participant guide": "Katılımcı rehberi", "Agreement": "Sözleşme", "Privacy": "Gizlilik", "Cookies": "Çerezler", "Terms": "Koşullar",
    "Where health, beauty and opportunity meet.": "Sağlık, güzellik ve fırsatın buluştuğu yer.", "Where health, beauty and": "Sağlık, güzellik ve", "opportunity": "fırsatın", "meet.": "buluştuğu yer.", "Connect with world-class healthcare, beauty innovation, holistic wellness and international medical tourism professionals—all under one roof.": "Dünya standartlarında sağlık hizmetleri, güzellik inovasyonu, bütünsel yaşam ve uluslararası sağlık turizmi profesyonelleriyle tek çatı altında buluşun.", "Plan your visit ↗": "Ziyaretini planla ↗", "Exhibit with us": "Bizimle katıl",
    "Discover": "Keşfet", "Health": "Sağlık", "Beauty": "Güzellik", "Wellness": "İyi yaşam", "Medical tourism": "Sağlık turizmi", "THE EXPERIENCE": "DENEYİM", "Discover the ideas shaping better care and better living.": "Daha iyi bakım ve yaşamı şekillendiren fikirleri keşfedin.", "FOR EVERY AMBITION": "HER HEDEF İÇİN", "One international meeting point. Many ways to take part.": "Tek bir uluslararası buluşma noktası. Katılmanın birçok yolu.",
    "Visit the expo": "Fuarı ziyaret et", "Exhibit your brand": "Markanı sergile", "Use Fair Match": "Fair Match kullan", "Join as media": "Medya olarak katıl", "PROGRAMME PREVIEW": "PROGRAM ÖNİZLEMESİ", "Expert voices. Practical ideas. Meaningful conversations.": "Uzman görüşleri. Pratik fikirler. Anlamlı buluşmalar.", "For direction approval": "Tasarım yönü onayı için", "Review programme concept →": "Program konseptini incele →", "Ready for Rijswijk 2026?": "Rijswijk 2026'ya hazır mısınız?", "Explore tickets →": "Biletleri incele →"
  },
  ru: {
    "About": "О выставке", "Exhibitors": "Участники", "Programme": "Программа", "Programme & speakers": "Программа и спикеры", "Visit": "Посещение", "Tickets": "Билеты", "Plan your visit": "Спланировать визит", "Floor plan": "План выставки", "Fair Match": "Fair Match", "Exhibit": "Участвовать", "Media": "Медиа", "Contact": "Контакты",
    "About the expo": "О выставке", "Explore": "Узнать больше", "Participate": "Участие", "Stand packages": "Пакеты стендов", "Sponsorship": "Спонсорство", "Participant guide": "Руководство участника", "Agreement": "Соглашение", "Privacy": "Конфиденциальность", "Cookies": "Файлы cookie", "Terms": "Условия",
    "Where health, beauty and opportunity meet.": "Место встречи здоровья, красоты и возможностей.", "Where health, beauty and": "Место встречи здоровья, красоты и", "opportunity": "возможностей", "meet.": ".", "Connect with world-class healthcare, beauty innovation, holistic wellness and international medical tourism professionals—all under one roof.": "Встречайтесь с ведущими специалистами в сфере здравоохранения, красоты, велнеса и медицинского туризма под одной крышей.", "Plan your visit ↗": "Спланировать визит ↗", "Exhibit with us": "Стать участником",
    "Discover": "Откройте", "Health": "Здоровье", "Beauty": "Красота", "Wellness": "Велнес", "Medical tourism": "Медицинский туризм", "THE EXPERIENCE": "ВПЕЧАТЛЕНИЯ", "Discover the ideas shaping better care and better living.": "Откройте идеи, которые формируют лучший уход и качество жизни.", "FOR EVERY AMBITION": "ДЛЯ КАЖДОЙ ЦЕЛИ", "One international meeting point. Many ways to take part.": "Одна международная площадка. Множество способов участия.",
    "Visit the expo": "Посетить выставку", "Exhibit your brand": "Представить бренд", "Use Fair Match": "Использовать Fair Match", "Join as media": "Стать медиапартнёром", "PROGRAMME PREVIEW": "ПРЕДПРОСМОТР ПРОГРАММЫ", "Expert voices. Practical ideas. Meaningful conversations.": "Экспертные мнения. Практические идеи. Важные встречи.", "For direction approval": "Для согласования направления", "Review programme concept →": "Посмотреть концепцию →", "Ready for Rijswijk 2026?": "Готовы к Rijswijk 2026?", "Explore tickets →": "Посмотреть билеты →"
  },
  ar: {
    "About": "عن المعرض", "Exhibitors": "العارضون", "Programme": "البرنامج", "Programme & speakers": "البرنامج والمتحدثون", "Visit": "الزيارة", "Tickets": "التذاكر", "Plan your visit": "خطط لزيارتك", "Floor plan": "مخطط المعرض", "Fair Match": "Fair Match", "Exhibit": "شارك كعارض", "Media": "الإعلام", "Contact": "تواصل معنا",
    "About the expo": "عن المعرض", "Explore": "استكشف", "Participate": "المشاركة", "Stand packages": "باقات الأجنحة", "Sponsorship": "الرعاية", "Participant guide": "دليل المشاركين", "Agreement": "الاتفاقية", "Privacy": "الخصوصية", "Cookies": "ملفات الارتباط", "Terms": "الشروط",
    "Where health, beauty and opportunity meet.": "حيث تلتقي الصحة والجمال والفرص.", "Where health, beauty and": "حيث تلتقي الصحة والجمال و", "opportunity": "الفرص", "meet.": ".", "Connect with world-class healthcare, beauty innovation, holistic wellness and international medical tourism professionals—all under one roof.": "تواصل مع نخبة من خبراء الرعاية الصحية وابتكارات الجمال والعافية الشاملة والسياحة العلاجية الدولية تحت سقف واحد.", "Plan your visit ↗": "خطط لزيارتك ↗", "Exhibit with us": "شارك معنا",
    "Discover": "اكتشف", "Health": "الصحة", "Beauty": "الجمال", "Wellness": "العافية", "Medical tourism": "السياحة العلاجية", "THE EXPERIENCE": "التجربة", "Discover the ideas shaping better care and better living.": "اكتشف الأفكار التي تصنع رعاية أفضل وحياة أجمل.", "FOR EVERY AMBITION": "لكل طموح", "One international meeting point. Many ways to take part.": "ملتقى دولي واحد وطرق عديدة للمشاركة.",
    "Visit the expo": "زر المعرض", "Exhibit your brand": "اعرض علامتك", "Use Fair Match": "استخدم Fair Match", "Join as media": "شارك كإعلامي", "PROGRAMME PREVIEW": "معاينة البرنامج", "Expert voices. Practical ideas. Meaningful conversations.": "خبرات ملهمة. أفكار عملية. لقاءات مؤثرة.", "For direction approval": "لاعتماد التوجه", "Review programme concept →": "راجع تصور البرنامج ←", "Ready for Rijswijk 2026?": "هل أنت مستعد لريسفايك 2026؟", "Explore tickets →": "استكشف التذاكر ←"
  }
};

const heroTranslations = {
  nl: { headline: "Waar gezondheid, beauty en <em>kansen</em> samenkomen.", primary: "Plan je bezoek", secondary: "Neem deel" },
  tr: { headline: "Sağlık, güzellik ve <em>fırsatın</em> buluştuğu yer.", primary: "Ziyaretini planla", secondary: "Bizimle katıl" },
  ru: { headline: "Место встречи здоровья, красоты и <em>возможностей</em>.", primary: "Спланировать визит", secondary: "Стать участником" },
  ar: { headline: "حيث تلتقي الصحة والجمال و<em>الفرص</em>.", primary: "خطط لزيارتك", secondary: "شارك معنا" }
};

function translateRenderedContent(language) {
  if (language === "en") return;
  const translations = translationSets[language] || {};
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (["SCRIPT", "STYLE"].includes(node.parentElement?.tagName)) continue;
    const source = node.textContent.trim();
    if (translations[source]) node.textContent = node.textContent.replace(source, translations[source]);
  }
  const heroCopy = heroTranslations[language];
  const heroHeadline = document.querySelector(".hero h1");
  const heroActions = document.querySelectorAll(".hero-actions a");
  if (heroCopy && heroHeadline) heroHeadline.innerHTML = heroCopy.headline;
  if (heroCopy && heroActions[0]) heroActions[0].childNodes[0].textContent = `${heroCopy.primary} `;
  if (heroCopy && heroActions[1]) heroActions[1].childNodes[0].textContent = `${heroCopy.secondary} `;
}

function setLanguage(language) {
  const rtl = language === "ar";
  document.documentElement.lang = language;
  document.documentElement.dir = rtl ? "rtl" : "ltr";
  document.body.dir = rtl ? "rtl" : "ltr";
  const labels = languageLabels[language] || languageLabels.en;
  document.querySelector(".concept-ribbon p").lastChild.textContent = labels[0];
  document.querySelector(".concept-ribbon a").childNodes[0].textContent = `${labels[1]} `;
  localStorage.setItem("expo-language", language);
  translateRenderedContent(language);
}

function showToast(title = "Prototype interaction complete", message = "This static form demonstrates the final experience. No data was sent.") {
  toast.querySelector("b").textContent = title;
  toast.querySelector("small").textContent = message;
  clearTimeout(toastTimer);
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 4800);
}

function wirePage() {
  document.querySelectorAll(".demo-form").forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    if (form.checkValidity()) {
      showToast();
      form.reset();
    } else {
      form.reportValidity();
    }
  }));
  document.querySelectorAll(".demo-action").forEach(button => button.addEventListener("click", event => {
    event.preventDefault();
    showToast("Demonstration action", "The final action will use approved contact and workflow settings.");
  }));
  document.querySelectorAll(".ticket-pending").forEach(button => button.addEventListener("click", () => {
    showToast("External ticket link pending", "The approved ticketing URL and ticket details will be connected after client confirmation.");
  }));
  document.querySelectorAll(".package-select").forEach(button => button.addEventListener("click", () => {
    location.hash = "participation-form";
    document.querySelector("#participation-form")?.scrollIntoView({ behavior: "smooth" });
    const select = document.querySelector("#participation-form select");
    if (select) select.value = [...select.options].find(option => option.text.includes(button.dataset.package))?.value || "";
  }));
  document.querySelectorAll(".asset-preview").forEach(button => button.addEventListener("click", () => {
    modalContent.innerHTML = `<img src="${button.dataset.asset}" alt="Document preview" />`;
    modal.showModal();
  }));
  const search = document.querySelector("#exhibitorSearch");
  if (search) {
    const filterCards = () => {
      const text = search.value.toLowerCase();
      const active = document.querySelector(".tag.is-active")?.dataset.filter || "all";
      document.querySelectorAll(".exhibitor-card").forEach(card => {
        const matchesText = card.textContent.toLowerCase().includes(text);
        const matchesFilter = active === "all" || card.dataset.category.includes(active);
        card.hidden = !(matchesText && matchesFilter);
      });
    };
    search.addEventListener("input", filterCards);
    document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(item => item.classList.remove("is-active"));
      button.classList.add("is-active");
      filterCards();
    }));
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: .08 });
  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
}

function renderPage() {
  const params = new URLSearchParams(location.search);
  const page = params.get("page") || "home";
  const renderer = pageRenderers[page] || homePage;
  app.innerHTML = renderer();
  document.querySelectorAll("[data-nav]").forEach(link => link.classList.toggle("is-active", link.dataset.nav === page));
  document.title = `${page === "home" ? "Health & Beauty Expo" : page.replaceAll("-", " ").replace(/\b\w/g, letter => letter.toUpperCase())} — Rijswijk 2026`;
  wirePage();
  translateRenderedContent(languageSelect.value);
  if (location.hash) setTimeout(() => document.querySelector(location.hash)?.scrollIntoView(), 50);
  else window.scrollTo(0, 0);
}

menuToggle.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});
mobileMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileMenu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}));
languageSelect.addEventListener("change", event => {
  setLanguage(event.target.value);
  renderPage();
  if (event.target.value !== "en") {
    const label = event.target.value === "ar" ? "Arabic RTL layout preview" : "Language layout preview";
    showToast(label, "The complete translated copy will be inserted after client review; this prototype demonstrates direction and layout behavior.");
  }
});
toast.querySelector("button").addEventListener("click", () => toast.classList.remove("is-visible"));
modal.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", event => { if (event.target === modal) modal.close(); });

const storedLanguage = localStorage.getItem("expo-language") || "en";
languageSelect.value = storedLanguage;
setLanguage(storedLanguage);
renderPage();
