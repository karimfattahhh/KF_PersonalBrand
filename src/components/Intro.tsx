import * as React from "react"

const SEEN = "kf-intro-seen"
/** When the site starts dropping in over the name, and when the intro is gone. */
const REVEAL = 4300
const LENGTH = 5100

/** True when the intro should be skipped: seen this session, or reduced motion. */
export function skipIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true
  if (new URLSearchParams(location.search).get("intro") === "1") return false
  try {
    return sessionStorage.getItem(SEEN) === "1"
  } catch {
    return false
  }
}

type IntroProps = {
  /** The site should mount now; it is revealed from the top down. */
  onReveal: () => void
  onDone: () => void
}

/* A black screen. Mini Karim shoulders it off to the right, uncovering a white
   page with the name on it. The name holds, then the site drops in from the
   top like a curtain. */
export default function Intro({ onReveal, onDone }: IntroProps) {
  const revealed = React.useRef(false)
  const done = React.useRef(false)

  const reveal = React.useCallback(() => {
    if (revealed.current) return
    revealed.current = true
    onReveal()
  }, [onReveal])

  const finish = React.useCallback(() => {
    if (done.current) return
    done.current = true
    reveal()
    try {
      sessionStorage.setItem(SEEN, "1")
    } catch {
      /* private mode: the intro just plays again next time */
    }
    onDone()
  }, [onDone, reveal])

  React.useEffect(() => {
    const a = window.setTimeout(reveal, REVEAL)
    const b = window.setTimeout(finish, LENGTH)
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish()
    window.addEventListener("keydown", onKey)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
      window.removeEventListener("keydown", onKey)
    }
  }, [reveal, finish])

  return (
    <div className="in" role="presentation" onClick={finish}>
      <h1 className="in-name" aria-label="Karim Fattah">
        <span>KARIM</span>
        <span>FATTAH</span>
      </h1>
      {/* Mini Karim rides on the panel's left edge, so the two always move
          together. His legs run a four-frame push-walk cycle the whole way. */}
      <div className="in-panel" aria-hidden="true">
        <div className="in-mini">
          <img src="/mini-karim/push-cycle.webp" alt="" />
        </div>
      </div>
      <button type="button" className="in-skip" onClick={finish}>
        Skip intro
      </button>
    </div>
  )
}
