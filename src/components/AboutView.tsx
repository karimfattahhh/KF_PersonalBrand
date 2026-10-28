import type * as React from "react"

// The lines from the hero of the first site.
const FACTS = ["Always curious.", "Still becoming."]
const MOTTO = "Learning. Building. Becoming."

const STATEMENT = "A work in progress. Beirut, Lebanon."

const COLUMNS: { title: string; items: string[] }[] = [
  {
    title: "Education & recognition",
    items: [
      "LAU, B.S. Economics with distinction",
      "Top 10%, Adnan Kassar School of Business",
      "Honors Program graduate",
      "MEPI-TLS scholar",
      "Winner, Redseer case competition 2022",
      "McKinsey.org Forward, 2025",
    ],
  },
  {
    title: "Talks & community",
    items: [
      "Speaker, Beirut Annunciation Orthodox College",
      "Brand ambassador, Studypedia",
      "Brand ambassador, Docubid",
      "150+ students tutored",
    ],
  },
  {
    title: "Capabilities",
    items: [
      "Brand architecture",
      "Design systems",
      "Growth strategy",
      "Business development",
      "Pitching & sales",
      "AI-assisted design & build",
    ],
  },
  {
    title: "Worked with",
    items: ["House of Prep", "TestPrep", "Elmy", "Taleb", "Publicis Middle East", "StratInvest", "AC & Associates", "Unigaz"],
  },
]

/* Line icons for what's on his mind. Each one rises out of the head in turn. */
const ICONS: { label: string; x: number; y: number; r: number; svg: React.ReactNode }[] = [
  {
    label: "book",
    x: -118,
    y: -60,
    r: -14,
    svg: <path d="M6 10c6-3 12-3 18 0v30c-6-3-12-3-18 0zM24 10c6-3 12-3 18 0v30c-6-3-12-3-18 0" />,
  },
  {
    label: "pencil",
    x: -58,
    y: -128,
    r: 18,
    svg: <path d="M10 38l4-12 20-20 8 8-20 20zM14 26l8 8M30 10l8 8" />,
  },
  {
    label: "laptop",
    x: 20,
    y: -150,
    r: -6,
    svg: <path d="M10 12h28v20H10zM4 36h40l-3 4H7z" />,
  },
  {
    label: "chart",
    x: 92,
    y: -112,
    r: 12,
    svg: <path d="M6 40h36M10 32l9-10 7 6 14-16M32 12h8v8" />,
  },
  {
    label: "microphone",
    x: 128,
    y: -40,
    r: -10,
    svg: <path d="M18 6h12v20a6 6 0 01-12 0zM12 22a12 12 0 0024 0M24 34v8M17 42h14" />,
  },
]

export default function AboutView() {
  return (
    <main className="ab" aria-labelledby="ab-title">
      <h1 id="ab-title" className="sr-only">
        About Karim Fattah
      </h1>
      <span className="ab-big ab-k" aria-hidden="true">
        K
      </span>
      <span className="ab-big ab-f" aria-hidden="true">
        F
      </span>

      <div className="ab-head" aria-hidden="true">
        {ICONS.map((ic, i) => (
          <svg
            key={ic.label}
            className="ab-icon"
            viewBox="0 0 48 48"
            style={{ "--x": ic.x + "px", "--y": ic.y + "px", "--r": ic.r + "deg", "--i": i } as React.CSSProperties}
          >
            <rect x="1" y="1" width="46" height="46" rx="12" />
            {ic.svg}
          </svg>
        ))}
        <img src="/mini-karim/head.webp" alt="" draggable={false} />
      </div>

      <ul className="ab-facts">
        {FACTS.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <p className="ab-motto">{MOTTO}</p>
      <p className="ab-statement">{STATEMENT}</p>

      <div className="ab-cols">
        {COLUMNS.map((c) => (
          <section key={c.title}>
            <h2 className="fr-label">{c.title}</h2>
            <ul>
              {c.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}
