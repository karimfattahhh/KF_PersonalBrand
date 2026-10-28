export type Project = {
  slug: string
  /** Small label above the name. */
  category: string
  name: string
  /** One line, shown in the work list. */
  line: string
  /** A short paragraph for the case page. */
  about: string
  role: string[]
  date: string
  highlights: string[]
  /** Who the work was shared with. Never leave a team effort uncredited. */
  team?: string
  /** Under public/work/<slug>/. Empty means a typographic cover. */
  images: string[]
  palette: string[]
}

const img = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/work/${slug}/${String(i + 1).padStart(2, "0")}.webp`)

export const projects: Project[] = [
  {
    slug: "house-of-prep",
    category: "Education group",
    name: "House of Prep",
    line: "A home for learning: five brands under one roof.",
    about:
      "House of Prep brings test preparation, school subjects, student guidance, university learning and technology together under one masterbrand. I work across business development, brand and design, alongside the founding team.",
    role: ["Business development", "Brand & design"],
    date: "2025 — now",
    highlights: ["Five-brand ecosystem", "TestPrep · prep me. · weguide.", "Taleb · Elmy"],
    team: "With the House of Prep team",
    images: img("house-of-prep", 3),
    palette: ["#1740A9", "#FF963E", "#0B1E5C"],
  },
  {
    slug: "testprep",
    category: "Brand & collateral",
    name: "TestPrep",
    line: "One visual language for brochures, reports, proposals and the web.",
    about:
      "I design TestPrep's collateral end to end: the student brochure, the company profile, school proposals and the web experience, all in one locked identity of cobalt, orange, white space and plain English.",
    role: ["Design system", "Collateral design"],
    date: "2025 — 26",
    highlights: ["Student brochure v3", "Company profile 2026–27", "Web experience"],
    team: "With the TestPrep team",
    images: img("testprep", 5),
    palette: ["#1740A9", "#FF963E", "#FBFBFC"],
  },
  {
    slug: "elmy",
    category: "Platform storytelling",
    name: "Elmy",
    line: "Explaining a learning platform through its website and a film.",
    about:
      "Elmy is the learning platform that powers the family. My work shapes how it explains itself: the website narrative, product explanations and a film about its methodology.",
    role: ["Narrative", "Creative direction"],
    date: "2026",
    highlights: ["Website redesign", "Methodology film"],
    team: "With the Elmy team",
    images: img("elmy", 3),
    palette: ["#2444E2", "#00030F", "#E9ECF8"],
  },
  {
    slug: "taleb",
    category: "University learning",
    name: "Taleb",
    line: "The home of university learning.",
    about:
      "Taleb supports university students with tutoring, study materials and a place to work. I'm a partner in the venture and work on its brand and web presence.",
    role: ["Partner", "Brand & web"],
    date: "2026",
    highlights: ["Brand identity", "Website", "Taleb House"],
    team: "With the Taleb team",
    images: img("taleb", 4),
    palette: ["#27463D", "#F6F2EA", "#171918"],
  },
  {
    slug: "stratinvest",
    category: "Startup build",
    name: "StratInvest",
    line: "A UAE company-formation service, built from zero.",
    about:
      "With a mentor, I helped build a company-formation business in Dubai's Meydan Free Zone: identity, website, onboarding logic, sales and day-to-day operations. A one-person show, and the best crash course in how a business really works.",
    role: ["Marketing strategist", "Web & operations"],
    date: "2023 — 24",
    highlights: ["Website & copy", "Conditional onboarding forms", "Sales webinars"],
    images: [],
    palette: ["#0B0B0B", "#FF5A52"],
  },
  {
    slug: "kitkat-publicis",
    category: "Campaign · team",
    name: "KitKat Break",
    line: "Out-of-office emails that send a break to colleagues still at work.",
    about:
      "At Publicis Middle East I worked on the Nestlé account in communications and project management, and was part of the team behind KitKat Arabia's Auto Reply Break.",
    role: ["Senior project manager", "Communications"],
    date: "2024",
    highlights: ["Nestlé account", "Auto Reply Break"],
    team: "A Publicis Middle East team effort",
    images: img("kitkat-publicis", 1),
    palette: ["#D6001C", "#FFFFFF"],
  },
  {
    slug: "rami-kadi",
    category: "Event",
    name: "Rami Kadi",
    line: "With the maison at the Forbes Middle East Sustainability Leaders' Summit.",
    about:
      "I joined the Rami Kadi Maison de Couture team at the Forbes Middle East Sustainability Leaders' Summit in 2024.",
    role: ["Team member"],
    date: "2024",
    highlights: ["Forbes ME Sustainability Leaders' Summit"],
    team: "With the Rami Kadi team",
    images: img("rami-kadi", 3),
    palette: ["#1A1A1A", "#C9B79C"],
  },
  {
    slug: "ac-associates",
    category: "Freelance",
    name: "AC & Associates",
    line: "Business development, and a clearer story on the website.",
    about:
      "A freelance engagement across business development, logistics and operating procedures, plus content structure and copy for the website during a rebrand.",
    role: ["Business development", "Content & UX copy"],
    date: "2024",
    highlights: ["Website content structure", "Operating procedures"],
    images: img("ac-associates", 1),
    palette: ["#2B3A55", "#D9D4C7"],
  },
  {
    slug: "studypedia",
    category: "Outreach",
    name: "Studypedia",
    line: "Brought 50+ students to an international education fair.",
    about:
      "As a brand ambassador I promoted study-abroad options and brought more than fifty students to Studypedia's second International Educational Fair in Beirut, mostly through personal conversations.",
    role: ["Brand ambassador"],
    date: "2022",
    highlights: ["50+ students to the fair"],
    team: "With the Studypedia team",
    images: img("studypedia", 2),
    palette: ["#2C5FA8", "#F2C14E"],
  },
  {
    slug: "redseer",
    category: "Case competition",
    name: "Redseer",
    line: "A winning growth strategy for a UAE grocery retailer.",
    about:
      "With LAU Sailors Consulting, our team built a Ramadan growth strategy for a UAE grocery chain, combining sustainability, digital experiences and customer engagement. We won.",
    role: ["Strategy", "Presentation"],
    date: "2022",
    highlights: ["Winner, Unwrapping Ramadan 2022"],
    team: "LAU Sailors Consulting",
    images: img("redseer", 2),
    palette: ["#6E2A8E", "#F5F5F5"],
  },
  {
    slug: "frea",
    category: "Concept",
    name: "FRÉA",
    line: "A sustainable, inclusive beauty concept for L'Oréal Brandstorm.",
    about:
      "A university team concept for L'Oréal Brandstorm: a no-wash-off makeup idea with a broad shade range and recyclable packaging. A proposal, not a launched product.",
    role: ["Concept & positioning"],
    date: "2022",
    highlights: ["L'Oréal Brandstorm"],
    team: "University team project",
    images: img("frea", 1),
    palette: ["#E7B8A9", "#3B2F2F"],
  },
  {
    slug: "docubid",
    category: "Ambassador",
    name: "Docubid",
    line: "Tutoring, writing, and 50+ clients onboarded in a month.",
    about:
      "When my tutoring network outgrew what I could handle, Docubid became another route for students. I tutored, wrote and onboarded more than fifty clients in my first month as an ambassador.",
    role: ["Writer, tutor & ambassador"],
    date: "2022",
    highlights: ["50+ clients in one month"],
    images: img("docubid", 1),
    palette: ["#FF6B35", "#1E1E1E"],
  },
]
