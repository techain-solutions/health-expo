/**
 * English is the source of truth for every public string. The other locale
 * files are typed against `Dictionary`, so TypeScript fails the build when a
 * translation is missing rather than silently falling back to English.
 */
export const en = {
  shell: {
    skipToContent: "Skip to content",
    homeLabel: "Health and Beauty Expo home",
    primaryNav: "Primary navigation",
    mobileNav: "Mobile navigation",
    openNav: "Open navigation",
    closeNav: "Close navigation",
    backToTop: "Back to top",
    selectLanguage: "Select language",
    currentLanguage: "current language",
    nav: {
      about: "About",
      exhibitors: "Exhibitors",
      program: "Programme",
      visit: "Visit",
      tickets: "Tickets",
      plan: "Floor plan",
      fairMatch: "Fair Match",
      exhibit: "Exhibit",
      media: "Media",
      contact: "Contact",
      explore: "Explore",
      participate: "Participate",
      documents: "Documents",
      planVisit: "Plan your visit",
    },
    navHints: {
      tickets: "Access and event details",
      visit: "Venue, dates and practical info",
      plan: "Explore the expo layout",
      fairMatch: "Request a personal introduction",
    },
    footer: {
      tagline: "Where health, beauty, wellness and international opportunity meet.",
      socialLabel: "Social links",
      standPackages: "Stand packages",
      sponsorship: "Sponsorship",
      participantGuide: "Participant guide",
      exhibitorManualEn: "Exhibitor manual (EN)",
      participantManualNl: "Participant manual (NL)",
      exhibitorAgreement: "Exhibitor agreement",
      standPriceList: "Stand price list",
      floorPlanPdf: "Floor plan PDF",
      generalTerms: "General terms",
      paris: "Paris 2027",
      dates: "24–25 OCT 2026",
      venue: "De Broodfabriek",
      city: "Rijswijk, The Netherlands",
      hours: "Open 10:00–18:00",
      rights: "© 2026 Health & Beauty Expo",
      privacy: "Privacy",
      cookies: "Cookies",
      terms: "Terms",
    },
  },

  common: {
    home: "Home",
    viewProfile: "View profile",
    viewAllExhibitors: "View all exhibitors",
    allExhibitors: "All exhibitors",
    visitWebsite: "Visit website",
    openInNewTab: "opens in a new tab",
    selectOne: "Select one",
    required: "required",
  },

  forms: {
    consent:
      "I agree that my details may be used to handle this request. See the privacy policy for how your data is stored and how long we keep it.",
    consentRequired: "Please confirm the consent checkbox so we may process your request.",
    sending: "Sending your request…",
    success: "Thank you. Your request has been received and the organizing team will follow up by email.",
    error: "We could not send your request. Please check the highlighted fields and try again.",
    rateLimited: "You have sent several requests in a short time. Please wait a few minutes and try again.",
    invalid: "Some details are missing or incorrect. Please review the form and try again.",
    note: "Your request is sent to the organizing team, who reply by email.",
    privacyLink: "Privacy policy",
  },

  event: {
    eyebrowFallback: "Rijswijk 2026 · International health, beauty and wellness exhibition",
    datesFallback: "24–25 October 2026",
    hoursFallback: "10:00–18:00",
    venueFallback: "De Broodfabriek",
    cityFallback: "Rijswijk, NL",
    addressFallback: "Volmerlaan 12, 2288 GD Rijswijk",
  },

  home: {
    title: "Health & Beauty Expo Rijswijk 2026",
    description:
      "Two days connecting healthcare, beauty innovation, holistic wellness and international medical tourism professionals at De Broodfabriek in Rijswijk.",
    heroImageAlt: "Professionals meeting at an international health and beauty expo",
    exploreSuffix: "the expo",
    sectors: ["Health", "Beauty", "Wellness", "Medical tourism"],
    experience: {
      kicker: "THE EXPERIENCE",
      title: "Discover the ideas shaping better care and better living.",
      text: "National and international brands, professionals and visitors come together for two focused days of discovery, demonstrations and valuable business connections.",
      cards: [
        {
          kicker: "LIVE EXPERIENCE",
          title: "Innovation in action",
          text: "See treatments, technologies and launches presented by specialists.",
        },
        {
          kicker: "BUSINESS",
          title: "Connections that matter",
          text: "Meet brands, clinics, partners and decision-makers from across markets.",
        },
        {
          kicker: "PERSONAL DISCOVERY",
          title: "Care for body and mind",
          text: "Explore aesthetics, skincare, preventive care and holistic wellness.",
        },
      ],
    },
    ambition: {
      kicker: "FOR EVERY AMBITION",
      title: "One international meeting point. Many ways to take part.",
      text: "For visitors, exhibitors and media across the health and beauty sector.",
      cards: [
        {
          title: "Visit the expo",
          text: "Explore treatments, products and expert advice.",
          link: "Plan your day",
        },
        {
          title: "Exhibit your brand",
          text: "Position your organisation in front of an international audience.",
          link: "View packages",
        },
        {
          title: "Use Fair Match",
          text: "Request a tailored introduction from our team.",
          link: "Make a request",
        },
        {
          title: "Join as media",
          text: "Review accreditation criteria for press, creators and influencers.",
          link: "See criteria",
        },
      ],
    },
    featured: {
      kicker: "FEATURED EXHIBITORS",
      title: "Clinics, brands and partners joining Rijswijk 2026.",
      empty: "The first exhibitors will be announced here soon.",
    },
    programme: {
      kicker: "PROGRAMME",
      title: "Expert voices. Practical ideas. Meaningful conversations.",
      text: "The programme of talks and demonstrations is being finalised with our speakers.",
      link: "See the programme",
    },
    campaign: {
      kicker: "INTERNATIONAL MEDICAL TOURISM",
      title: "Your health, our priority.",
      text: "Our campaign connects world-class healthcare, aesthetics and holistic wellness.",
      posterAlt: "Health and Beauty Expo promotional poster",
      items: [
        { term: "Health", text: "World-class healthcare and medical tourism professionals" },
        { term: "Beauty", text: "Innovative solutions for aesthetics and personal care" },
        { term: "Wellness", text: "Holistic wellbeing for body, mind and soul" },
      ],
      link: "Discover our story",
    },
    fairMatch: {
      kicker: "FAIR MATCH",
      title: "Meet the right clinic, coordinated by our team.",
      text: "Tell us what you are looking for and our team arranges a personal introduction at the expo.",
      link: "How Fair Match works",
      steps: [
        { title: "Send your request", text: "Describe the care, product or partnership you are looking for." },
        { title: "We review it", text: "Our team matches your request with participating exhibitors." },
        { title: "Personal follow-up", text: "We contact you by email to arrange the introduction." },
      ],
    },
    cta: {
      title: "Ready for Rijswijk 2026?",
      text: "Join us at De Broodfabriek on 24–25 October.",
      label: "Ticket information",
    },
  },

  about: {
    title: "Where health & beauty grow together.",
    description:
      "A professional international stage for discovery, brand visibility, specialist expertise and meaningful connections across health, beauty and wellness.",
    metaTitle: "About the expo",
    heroImageAlt: "Visitors at the Health and Beauty Expo",
    primaryCta: "Visit the expo",
    secondaryCta: "Become an exhibitor",
    positioning: {
      kicker: "OUR POSITIONING",
      title: "More than an exhibition—a place to meet, learn and move forward.",
      body1:
        "Health & Beauty Expo 2026 takes place on 24 and 25 October at De Broodfabriek in Rijswijk. The two-day event connects national and international brands, professionals and visitors.",
      body2:
        "The expo covers cosmetics, aesthetic treatments, skincare, haircare, wellness, preventive care, lifestyle and medical tourism.",
      quote:
        "“A serious, modern and professional international expo—designed around quality, visibility and result.”",
      quoteSource: "Health & Beauty Expo 2026",
    },
    expect: {
      kicker: "WHAT TO EXPECT",
      title: "A complete health and beauty experience.",
      cards: [
        { title: "Live demonstrations", text: "Treatments and technologies shown and explained by specialists." },
        { title: "New launches", text: "Products and services introduced to the market at the expo." },
        { title: "Personal advice", text: "One-to-one conversations with professionals in every sector." },
        { title: "Fresh insight", text: "Talks and demonstrations covering care, prevention and wellbeing." },
        { title: "Business visibility", text: "Two days of exposure to an international professional audience." },
        { title: "Human connection", text: "Time and space to build relationships that continue after the expo." },
      ],
    },
    stats: [
      { value: "2", label: "Full exhibition days" },
      { value: "5", label: "Website languages" },
      { value: "4", label: "Core sectors" },
      { value: "1", label: "International meeting point" },
    ],
    cta: {
      title: "Be part of the Rijswijk edition.",
      text: "Meet the audience, partners and specialists shaping this growing sector.",
      label: "View participation options",
    },
  },

  exhibitors: {
    title: "Meet the exhibitors.",
    description:
      "Explore the clinics, healthcare groups, beauty innovators, wellness experts, specialist suppliers and industry partners shaping Rijswijk 2026.",
    metaTitle: "Exhibitors",
    searchLabel: "Search exhibitors",
    searchPlaceholder: "Search exhibitors…",
    filterAll: "All",
    empty: "Exhibitors will be announced soon.",
    noMatches: "No exhibitors match your search.",
    resultCount: "exhibitor(s) shown",
    suggestedCategories: [
      "Aesthetic medicine",
      "Skincare",
      "Haircare",
      "Wellness",
      "Preventive health",
      "Medical tourism",
      "Nutrition",
      "Fitness & movement",
      "Dermatology",
      "Medical devices",
    ],
    cta: {
      title: "Interested in exhibiting?",
      text: "Compare stand packages and sponsorship options for Rijswijk 2026.",
      label: "View packages",
    },
  },

  exhibitorDetail: {
    metaTitlePrefix: "Exhibitor",
    featuredLabel: "Exhibitor",
    about: {
      kicker: "ABOUT THE EXHIBITOR",
      title: "Who you will meet in Rijswijk.",
    },
    categoryLabel: "Category",
    websiteLabel: "Website",
    fairMatch: {
      kicker: "AT THE EXPO",
      title: "Request an introduction.",
      text: "Our team can arrange a personal introduction to this exhibitor during the expo.",
      link: "Open Fair Match",
    },
  },

  program: {
    title: "Programme & speakers.",
    description:
      "Talks, live demonstrations and expert-led sessions across both expo days, with practical insight, fresh ideas and conversations from across the health and beauty sector.\nThe full programme is announced ahead of the event.",
    metaTitle: "Programme",
    pending: {
      title: "The 2026 programme is being finalised.",
      text: "Speakers, topics and session times are confirmed with our partners and published here as soon as they are final.\nSubscribe through the contact form to be notified.",
      cta: "Ask to be notified",
    },
    structure: {
      kicker: "WHAT TO EXPECT",
      title: "How the two days are organised.",
      cards: [
        { title: "Main stage", text: "Keynotes and panels on healthcare, trust and international patient care." },
        { title: "Beauty stage", text: "Live demonstrations of aesthetic treatments, skincare and haircare." },
        { title: "Wellness corner", text: "Sessions on preventive health, nutrition, movement and mental wellbeing." },
      ],
    },
    speakers: {
      kicker: "SPEAKERS",
      title: "Want to speak at the expo?",
      text: "We welcome proposals from specialists, clinics and brands with practical expertise to share.",
      cta: "Submit a proposal",
    },
    cta: {
      title: "Want to attend a session?",
      text: "Sessions are included with your expo ticket.",
      label: "Ticket information",
    },
  },

  tickets: {
    title: "Plan your visit.",
    descriptionPrefix: "Everything you need to prepare for",
    descriptionFallback: "Health & Beauty Expo Rijswijk 2026",
    metaTitle: "Tickets",
    openTickets: "Get your ticket",
    ticketsPending: "Ticket sales open soon. Contact us to be notified when they go live.",
    details: {
      kicker: "EVENT DETAILS",
      title: "Two days of international discovery.",
      dates: "Dates",
      hours: "Opening hours",
      venue: "Venue",
      format: "Format",
      formatFallback: "Public exhibition, professional networking and live discovery",
    },
    visit: {
      kicker: "YOUR VISIT",
      title: "Everything is designed for a clear, enjoyable day.",
      cards: [
        { title: "Prepare", text: "Review exhibitors, sectors and the floor plan before arrival." },
        { title: "Discover", text: "Explore health, beauty, wellness and medical tourism." },
        { title: "Connect", text: "Request a personal introduction through Fair Match." },
      ],
    },
    cta: {
      title: "Need practical information?",
      text: "Find venue, accessibility and arrival guidance on the visit page.",
      label: "Plan your journey",
    },
  },

  visit: {
    title: "Plan your day in Rijswijk.",
    description: "Dates, opening hours, venue information and practical guidance for a smooth visit.",
    metaTitle: "Visit",
    practical: {
      kicker: "PRACTICAL INFORMATION",
      title: "De Broodfabriek, Rijswijk.",
      dates: "Dates",
      datesValue: "24–25 October 2026",
      hours: "Opening hours",
      hoursValue: "10:00–18:00 on both days",
      venue: "Venue",
      venueValue: "De Broodfabriek, Rijswijk, The Netherlands",
      address: "Address",
      addressValue: "Volmerlaan 12, 2288 GD Rijswijk",
      languages: "Languages",
      languagesValue: "Dutch, Turkish, English, Russian and Arabic",
      planLink: "View floor plan",
    },
    before: {
      kicker: "BEFORE YOU ARRIVE",
      title: "Make the most of your visit.",
      cards: [
        { title: "Get your ticket", text: "Buy in advance to skip the queue at the entrance." },
        { title: "Browse exhibitors", text: "Shortlist the clinics and brands you want to meet." },
        { title: "Review the plan", text: "Locate the stages, stands and catering areas." },
        { title: "Fair Match", text: "Ask us to arrange a personal introduction in advance." },
      ],
    },
    cta: {
      title: "Questions about your visit?",
      text: "Our team can help with practical information before the expo.",
      label: "Contact the team",
    },
  },

  floorPlan: {
    title: "Explore the expo floor.",
    description: "The current floor plan, including the entrance, stage, stand rows and catering areas.",
    metaTitle: "Floor plan",
    imageAlt: "Health and Beauty Expo floor plan showing stage, entrance, stands and catering areas",
    currentPlan: "Current floor plan",
    openPdf: "Open PDF",
    openLarge: "Open large view",
    download: "Download current plan",
    legend: [
      "Top: Podium / stage",
      "Centre: Exhibitor stands",
      "Bottom: Main entrance",
      "Sides: Catering areas",
    ],
    cta: {
      title: "Find the exhibitors you want to meet.",
      text: "Browse the directory before planning your route through the hall.",
      label: "Browse exhibitors",
    },
  },

  fairMatch: {
    title: "Fair Match",
    subtitle: "Request an introduction.",
    description:
      "Tell us what you are looking for and our team arranges a personal introduction with a participating exhibitor whose expertise best matches your priorities.",
    metaTitle: "Fair Match",
    heroCta: "Go to the request form",
    how: {
      kicker: "HOW IT WORKS",
      title: "A clear, personal request.",
      text: "Every request is read and handled by a person on the organizing team.\nThere is no automated matching or booking.",
      cards: [
        { title: "Explain your request", text: "Share the kind of connection or information you are looking for." },
        { title: "Send it to the team", text: "Your details reach the organizing team directly." },
        { title: "Personal follow-up", text: "We contact you by email to arrange the introduction." },
      ],
    },
    participants: {
      kicker: "PARTICIPATING EXHIBITORS",
      title: "Who you can be introduced to.",
      text: "Any active exhibitor can be included in a Fair Match introduction.",
      empty: "Participating exhibitors will be listed here as they confirm.",
    },
    form: {
      kicker: "INTRODUCTION REQUEST",
      title: "Request a personal introduction.",
      intro: "Send your contact details and request to the organizing team.",
      noteTitle: "Personal follow-up",
      note: "We reply by email. Nothing is booked or confirmed automatically.",
      formTitle: "Your request",
      button: "Send request",
      fields: {
        firstName: "First name",
        firstNamePlaceholder: "Your first name",
        lastName: "Last name",
        lastNamePlaceholder: "Your last name",
        email: "Email",
        emailPlaceholder: "name@example.com",
        phone: "Phone",
        phonePlaceholder: "+31 …",
        request: "What are you looking for?",
        requestPlaceholder: "Describe the introduction or information you need.",
      },
    },
  },

  participate: {
    title: "Put your brand at the centre of the conversation.",
    description: "Choose a stand or sponsorship package designed for professional visibility.",
    metaTitle: "Exhibit",
    heroCta: "Compare packages",
    heroSecondary: "Participant information",
    packages: {
      kicker: "STAND PACKAGES",
      title: "A professional platform for your organisation.",
      text: "Prices are taken from the 2026 stand price list and exclude VAT.",
      popular: "POPULAR",
      standLabel: "Stand",
      includes: [
        "Professional stand area",
        "230V electricity",
        "Tables and chairs",
        "Stand allocation by the organiser",
      ],
      request: "Request this stand",
      previewStands12: "See stands 1 & 2",
      previewStands34: "See stands 3 & 4",
      downloadPriceList: "Download price list",
    },
    sponsorship: {
      kicker: "SPONSORSHIP",
      title: "Extend your visibility beyond the stand.",
      text: "Three tiers combining digital promotion and venue exposure.",
      tiers: [
        { name: "Bronze", text: "Logo placement on the website and in the visitor guide." },
        { name: "Silver", text: "Website and venue branding plus social-media promotion." },
        { name: "Gold", text: "Headline branding across the venue, website and campaign." },
      ],
    },
    form: {
      kicker: "PARTICIPATION REQUEST",
      title: "Tell us how you want to take part.",
      intro: "Tell the organizing team about your organization and participation interest.",
      noteTitle: "Important deadline",
      note: "Extra electricity requirements must be submitted before 23 September 2026.",
      formTitle: "Organisation details",
      button: "Send request",
      fields: {
        company: "Company name",
        companyPlaceholder: "Your organisation",
        contact: "Contact person",
        contactPlaceholder: "Full name",
        email: "Business email",
        emailPlaceholder: "name@company.com",
        phone: "Phone",
        phonePlaceholder: "+31 …",
        interest: "Interest",
        interestPlaceholder: "Select package",
        about: "Tell us about your organisation",
        aboutPlaceholder: "Products, services and stand requirements.",
      },
    },
    cta: {
      title: "Already confirmed as an exhibitor?",
      text: "Review logistics, deadlines, safety rules and downloadable documents.",
      label: "Open participant guide",
    },
  },

  participantInfo: {
    title: "Participant information.",
    description: "A web summary of the participant manual for confirmed exhibitors.",
    metaTitle: "Participant information",
    downloadFull: "Download full manual",
    downloadEnglish: "English manual",
    keyDates: {
      kicker: "KEY DATES",
      title: "Prepare early for a smooth exhibition.",
      items: [
        { term: "Extra electricity", text: "Submit requirements before 23 September 2026" },
        { term: "Stand requests", text: "Send requirements at least 30 days before the expo" },
        { term: "Expo hours", text: "24–25 October · 10:00–18:00" },
        { term: "Payment", text: "As agreed in the signed exhibitor agreement" },
      ],
      steps: [
        { title: "Share contact details", text: "Give us the on-site contact for your stand." },
        { title: "Confirm logistics", text: "Delivery, build-up times and technical requirements." },
        { title: "Prepare the stand", text: "Branding, materials and staffing for both days." },
        { title: "Operate safely", text: "Follow the venue safety, hygiene and catering rules." },
      ],
    },
    documents: {
      kicker: "DOCUMENTS",
      title: "Downloads for participating companies.",
      text: "The manual and agreement are the binding reference for participation.",
      sourceLabel: "PDF document",
      open: "Open PDF",
      items: [
        { title: "Participant manual 2026 (NL)", href: "/downloads/participant-manual-2026.pdf" },
        { title: "Exhibitor manual (EN)", href: "/downloads/participant-manual-2026-en.pdf" },
        { title: "Exhibitor agreement (NL)", href: "/downloads/exhibitor-agreement-nl.pdf" },
        { title: "Stand price list 2026", href: "/downloads/stand-pricing-2026.pdf" },
      ],
    },
    topics: {
      kicker: "FREQUENT TOPICS",
      title: "Essential rules at a glance.",
      items: [
        {
          title: "Stand, branding and extra services",
          text: "Stand dimensions, build-up rules, branding limits and how to order extra electricity, furniture or services.",
        },
        {
          title: "Travel, transfer and accommodation",
          text: "Arrival, parking, loading times at De Broodfabriek and hotel options near the venue.",
        },
        {
          title: "Safety, hygiene and catering",
          text: "Venue safety rules, hygiene requirements for treatments and the rules for serving food or drink at your stand.",
        },
        {
          title: "Insurance, damage and cancellation",
          text: "Your insurance obligations, liability for damage and the cancellation terms in the exhibitor agreement.",
        },
      ],
    },
  },

  media: {
    title: "Media, press & influencers.",
    description:
      "Accreditation for professionals producing original coverage of healthcare, beauty, wellness and innovation, with a perspective on the people and ideas shaping the sector.",
    metaTitle: "Media",
    heroCta: "Go to the accreditation form",
    accreditation: {
      kicker: "ACCREDITATION",
      title: "Professional access for credible, original coverage.",
      text: "Every application is reviewed individually by the organizing team.",
      cards: [
        { title: "Established media", text: "Print, radio, television and news agencies with active editorial roles." },
        {
          title: "Digital & freelance",
          text: "Regular sites, podcasts, assigned journalists, photographers and analysts.",
        },
        { title: "Influencers", text: "Creators with relevant recent content and demonstrated original work." },
      ],
    },
    criteria: {
      kicker: "CRITERIA AT A GLANCE",
      items: [
        {
          title: "Digital media",
          text: "A regularly updated publication, podcast or channel with an audience in health, beauty or wellness.",
        },
        {
          title: "Freelance journalists & photographers",
          text: "A confirmed assignment or a recent portfolio of published work in the sector.",
        },
        {
          title: "Industry analysts",
          text: "A professional role in market research or consultancy relevant to the exhibiting sectors.",
        },
        {
          title: "Influencers & creators",
          text: "Recent original content in the sector and a commitment to cover the expo.",
        },
      ],
    },
    commitment: {
      kicker: "INFLUENCER COMMITMENT",
      title: "Three moments. Nine purposeful posts.",
      stats: [
        { value: "3", label: "Before the expo" },
        { value: "3", label: "During the expo" },
        { value: "3", label: "After the expo" },
        { value: "9", label: "Total posts" },
      ],
    },
    form: {
      kicker: "APPLICATION",
      title: "Request accreditation.",
      intro: "Send your professional details for review by the organizing team.",
      noteTitle: "Supporting evidence",
      note: "Add links to recent work in the message field; we will ask for more if needed.",
      formTitle: "Professional details",
      button: "Send application",
      fields: {
        name: "Full name",
        namePlaceholder: "Your full name",
        email: "Professional email",
        emailPlaceholder: "name@publication.com",
        organisation: "Organisation / publication",
        organisationPlaceholder: "Publication or channel",
        type: "Application type",
        typeOptions: [
          "Journalist / editor",
          "Freelance journalist / photographer",
          "Digital media / podcast",
          "Influencer / creator",
        ],
        website: "Website or profile URL",
        audience: "Audience and recent coverage",
        audiencePlaceholder: "Share relevant professional context and links.",
      },
    },
  },

  contact: {
    title: "Let’s connect.",
    description: "Questions about visiting, exhibiting, accreditation or the event? Send us a message.",
    metaTitle: "Contact",
    form: {
      kicker: "CONTACT",
      title: "We’re here to help.",
      intro: "Send your message to the organizing team.",
      noteTitle: "Response time",
      note: "We aim to reply within two working days.",
      formTitle: "Send a message",
      button: "Send message",
      fields: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "name@example.com",
        subject: "Subject",
        subjectOptions: [
          "Visitor information",
          "Exhibiting and sponsorship",
          "Media accreditation",
          "Fair Match",
          "Other",
        ],
        message: "Message",
        messagePlaceholder: "How can we help?",
      },
    },
    findUs: {
      kicker: "FIND US",
      title: "De Broodfabriek, Rijswijk.",
      maps: "Open in Google Maps",
      venue: "De Broodfabriek",
      address: "Volmerlaan 12, 2288 GD Rijswijk",
      country: "The Netherlands",
    },
    routes: {
      kicker: "DIRECT YOUR REQUEST",
      title: "Choose the right route.",
      cards: [
        { title: "Visitor", text: "Tickets, venue and practical information." },
        { title: "Exhibitor", text: "Stand, sponsorship and participation options." },
        { title: "Media", text: "Press, journalist and influencer accreditation." },
        { title: "Fair Match", text: "Request a personal introduction." },
      ],
    },
  },

  paris: {
    title: "Paris 2027.",
    description: "A new city. The same international ambition. Health & Beauty Expo Paris is coming.",
    metaTitle: "Paris 2027",
    heroImageAlt: "Paris skyline",
    heroCta: "Get updates",
    intro: {
      kicker: "COMING SOON",
      title: "The next chapter of our international journey.",
      body1:
        "Health & Beauty Expo Paris 2027 is in preparation. Dates, venue, programme and participation details are announced as soon as they are confirmed.",
      body2: "Leave your details below and we will let you know first.",
      quote: "“Health, beauty and wellness—connected across borders.”",
      quoteSource: "Health & Beauty Expo Paris 2027",
    },
    form: {
      kicker: "UPDATES",
      title: "Be the first to know.",
      intro: "Tell us how you would like to take part in Paris 2027.",
      formTitle: "Keep me informed",
      button: "Send",
      fields: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "name@example.com",
        interest: "I am interested as",
        interestOptions: ["Visitor", "Exhibitor", "Sponsor", "Media / influencer"],
      },
    },
  },

  legal: {
    metaTitle: "Legal information",
    heroDescription: "Legal and practical information about this website and the event.",
    navLabel: "Legal information",
    draftNotice: "This text is under legal review and will be finalised before the event.",
    sections: {
      scopeTitle: "1. Scope and purpose",
      scopeText:
        "This page explains who operates the website and how you can contact the responsible organisation with questions.",
      responsibilitiesTitle: "2. Information and responsibilities",
      responsibilitiesText:
        "It describes the relevant rights, responsibilities, external services used and the limitations that apply.",
      contactTitle: "3. Contact and changes",
      contactText:
        "You can contact us through the contact form for any question about this page. The current version date is shown on publication.",
    },
    tabs: {
      privacy: {
        label: "Privacy policy",
        heading: "How personal information is handled",
        intro:
          "We store the details you submit through the website forms only to handle your request. Retention periods, legal bases, processors and contact details are confirmed in the final version.",
      },
      cookies: {
        label: "Cookie policy",
        heading: "Clear choices and transparent information",
        intro:
          "The website uses only the cookies required to function. Any optional analytics would be added only after an explicit consent choice.",
      },
      terms: {
        label: "Website terms",
        heading: "Rules for using the public website",
        intro:
          "These terms cover acceptable use, intellectual property, external links and the limitations of liability for the website.",
      },
      visitors: {
        label: "Visitor information",
        heading: "Important information for attendees",
        intro:
          "Ticket, venue, accessibility, conduct and event-change information for visitors to Rijswijk 2026.",
      },
      exhibitors: {
        label: "Exhibitor information",
        heading: "Participation terms and responsibilities",
        intro:
          "The participant manual and exhibitor agreement cover stand, payment, cancellation, insurance, safety and operational responsibilities.",
      },
    },
  },
};

/** Every other locale must satisfy this shape, so nothing can be left untranslated. */
export type Dictionary = typeof en;
