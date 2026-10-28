import * as React from "react"

import type { Project } from "@/data/projects"
import { blip } from "@/lib/sound"

type WorkViewProps = {
  projects: Project[]
  index: number
  setIndex: (i: number) => void
  open: (slug: string) => void
}

const pad = (n: number) => String(n).padStart(2, "0")

/* Where a card sits for its distance `d` from the active one. Past cards fly
   off to the top right; upcoming ones wait in a stack by the counter. */
function place(d: number): React.CSSProperties {
  if (d === 0) {
    return { transform: "translate(-50%,-50%) rotateY(-7deg) rotateX(5deg) rotateZ(0.8deg)", opacity: 1, zIndex: 40 }
  }
  if (d < 0) {
    const k = -d
    return {
      transform: `translate(calc(-50% + ${10 + k * 7}vw), calc(-50% - ${34 + k * 12}vh)) rotateX(36deg) rotateY(-30deg) rotateZ(-7deg) scale(${1 - k * 0.06})`,
      opacity: k > 2 ? 0 : 1,
      zIndex: 40 - k,
    }
  }
  return {
    transform: `translate(calc(-50% - ${18 + d * 1.6}vw), calc(-50% + ${38 + d * 2.2}vh)) rotateX(56deg) rotateZ(-7deg) scale(${0.66 - d * 0.03})`,
    opacity: d > 3 ? 0 : 1,
    zIndex: 40 - d,
  }
}

export function Cover({ project, className }: { project: Project; className?: string }) {
  if (project.images.length) {
    return <img className={className} src={project.images[0]} alt="" draggable={false} />
  }
  return (
    <span className={(className ?? "") + " wk-type"} aria-hidden="true">
      {project.name}
    </span>
  )
}

export default function WorkView({ projects, index, setIndex, open }: WorkViewProps) {
  const count = projects.length
  const current = projects[index]
  const lock = React.useRef(0)

  const step = React.useCallback(
    (dir: number) => {
      const next = Math.min(count - 1, Math.max(0, index + dir))
      if (next === index) return
      blip(520 + next * 18)
      setIndex(next)
    },
    [count, index, setIndex],
  )

  /* Wheel, swipe and arrow keys step one project at a time on desktop. Phones
     get an ordinary scrolling list instead (see .wk-mobile). */
  React.useEffect(() => {
    const desk = window.matchMedia("(min-width: 900px)")
    let acc = 0
    let touchY: number | null = null
    const go = (dir: number) => {
      const now = performance.now()
      if (now < lock.current) return
      lock.current = now + 650
      step(dir)
    }
    const onWheel = (e: WheelEvent) => {
      if (!desk.matches) return
      acc += e.deltaY + e.deltaX
      if (Math.abs(acc) > 40) {
        go(Math.sign(acc))
        acc = 0
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (!desk.matches || (e.target as HTMLElement).closest("input,textarea")) return
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") go(1)
      if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") go(-1)
    }
    const onTouchStart = (e: TouchEvent) => (touchY = e.touches[0].clientY)
    const onTouchEnd = (e: TouchEvent) => {
      if (!desk.matches || touchY === null) return
      const dy = touchY - e.changedTouches[0].clientY
      if (Math.abs(dy) > 40) go(Math.sign(dy))
      touchY = null
    }
    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("keydown", onKey)
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd)
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [step])

  return (
    <main className="wk" aria-label="Selected work">
      <p className="sr-only" aria-live="polite">
        {pad(index + 1)} of {count}: {current.name}, {current.category}
      </p>

      <dl className="wk-meta" aria-hidden="true">
        <div className="wk-meta-row">
          <dt>Role</dt>
          <dd key={"r" + index} className="wk-swap">
            {current.role.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </dd>
        </div>
        <div className="wk-meta-row">
          <dt>Date</dt>
          <dd key={"d" + index} className="wk-swap">
            {current.date}
          </dd>
        </div>
        <div className="wk-meta-row">
          <dt>Highlights</dt>
          <dd key={"h" + index} className="wk-swap">
            {current.highlights.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </dd>
        </div>
      </dl>

      <div className="wk-stage">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            className="wk-card"
            style={{ ...place(i - index), "--i": Math.abs(i - index) } as React.CSSProperties}
            tabIndex={i === index ? 0 : -1}
            aria-label={i === index ? "Open " + p.name : undefined}
            aria-hidden={i === index ? undefined : true}
            onClick={() => (i === index ? open(p.slug) : setIndex(i))}
          >
            <Cover project={p} className="wk-img" />
          </button>
        ))}
      </div>

      <div className="wk-list">
        <ol className="wk-track" style={{ transform: `translateY(calc(${-index} * var(--wk-row)))` }}>
          {projects.map((p, i) => (
            <li key={p.slug} className="wk-item" data-active={i === index}>
              <button
                type="button"
                onClick={() => (i === index ? open(p.slug) : (blip(600), setIndex(i)))}
                onMouseEnter={() => blip(980, 0.03, 0.02)}
              >
                <span className="wk-cat">{p.category}</span>
                <span className="wk-name">{p.name}</span>
                <span className="wk-dash" aria-hidden="true">
                  —
                </span>
                <span className="wk-line">{p.line}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <ul className="wk-swatches" aria-hidden="true">
        {current.palette.map((c) => (
          <li key={c + index} style={{ background: c }} />
        ))}
      </ul>

      <div className="wk-count" aria-hidden="true">
        <span className="fr-label">Selected work</span>
        <span className="wk-num">
          <span key={index} className="wk-num-in">
            {pad(index + 1)}
          </span>
        </span>
        <span className="wk-total">/{pad(count)}</span>
      </div>

      <ol className="wk-mobile">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <button type="button" onClick={() => open(p.slug)}>
              <Cover project={p} className="wk-mimg" />
              <span className="wk-mrow">
                <span className="fr-label">
                  {pad(i + 1)} · {p.category}
                </span>
                <span className="fr-label">{p.date}</span>
              </span>
              <span className="wk-name">{p.name}</span>
              <span className="wk-line">{p.line}</span>
            </button>
          </li>
        ))}
      </ol>
    </main>
  )
}
