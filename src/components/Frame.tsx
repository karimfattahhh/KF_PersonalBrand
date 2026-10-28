import * as React from "react"

import { blip, setSound, useSound } from "@/lib/sound"

export type View = "work" | "project" | "about"

type FrameProps = {
  view: View
  contactOpen: boolean
  go: (to: "work" | "about") => void
  openContact: () => void
  hint?: string
}

const EMAIL = "karimfattah14@gmail.com"

function useBeirutTime() {
  const fmt = React.useMemo(
    () => new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Beirut", hour: "2-digit", minute: "2-digit" }),
    [],
  )
  const [now, setNow] = React.useState(() => fmt.format(new Date()))
  React.useEffect(() => {
    const t = window.setInterval(() => setNow(fmt.format(new Date())), 15000)
    return () => window.clearInterval(t)
  }, [fmt])
  return now
}

/* The chrome that never moves: logo, menu, sound, clock and inquiries. */
export default function Frame({ view, contactOpen, go, openContact, hint = "Scroll" }: FrameProps) {
  const sound = useSound()
  const time = useBeirutTime()
  const active = contactOpen ? "contact" : view === "about" ? "about" : "work"

  const item = (key: "work" | "about" | "contact", label: string, onClick: () => void) => (
    <li>
      <button
        type="button"
        className="fr-link"
        data-active={active === key}
        aria-current={active === key ? "page" : undefined}
        onClick={() => {
          blip(720)
          onClick()
        }}
      >
        <span className="fr-arrow" aria-hidden="true">
          →
        </span>
        {label}
      </button>
    </li>
  )

  return (
    <header className="fr">
      <a className="fr-logo" href="#/" onClick={() => go("work")} aria-label="Karim Fattah, home">
        {view === "work" ? (
          <span className="fr-mark">K.FATTAH©</span>
        ) : (
          <span className="fr-badge" aria-hidden="true">
            <span>K.FATTAH</span>
            <img src="/mini-karim/head.webp" alt="" />
          </span>
        )}
        <span className="fr-meta">
          copyright 2026
          <br />
          beirut, lb
        </span>
      </a>

      <nav className="fr-menu" aria-label="Main">
        <span className="fr-label">Menu</span>
        <ul>
          {item("work", "Work", () => go("work"))}
          {item("about", "About", () => go("about"))}
          {item("contact", "Contact", openContact)}
        </ul>
      </nav>

      <button type="button" className="fr-audio" aria-pressed={sound} onClick={() => setSound(!sound)}>
        <span className="fr-label">Audio</span> {sound ? "On" : "Off"} —
      </button>

      <p className="fr-clock">
        Based in Beirut
        <br />
        <span className="fr-label">BEY, {time}</span>
      </p>

      <p className="fr-inq">
        <span className="fr-label">For inquiries</span> <a href={"mailto:" + EMAIL}>{EMAIL}</a>
      </p>

      <span className="fr-hint" aria-hidden="true">
        {hint}
      </span>
      <a className="fr-corner" href="https://www.linkedin.com/in/karim-fattah/" target="_blank" rel="noreferrer">
        LinkedIn ↗
      </a>
    </header>
  )
}
