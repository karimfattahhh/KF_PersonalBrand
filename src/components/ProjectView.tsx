import * as React from "react"

import type { Project } from "@/data/projects"
import { blip } from "@/lib/sound"

import { Cover } from "./WorkView"

type ProjectViewProps = {
  project: Project
  next: Project
  close: () => void
  open: (slug: string) => void
}

export default function ProjectView({ project, next, close, open }: ProjectViewProps) {
  const scroller = React.useRef<HTMLDivElement>(null)
  const shots = React.useRef<(HTMLElement | null)[]>([])
  const teaser = React.useRef<HTMLButtonElement>(null)
  const [seen, setSeen] = React.useState(0)
  const [atEnd, setAtEnd] = React.useState(false)

  React.useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
    setSeen(0)
    setAtEnd(false)
  }, [project.slug])

  /* The next project's name waits at the bottom. Once it fills the screen,
     keep going: scrolling all the way onto it opens it. */
  React.useEffect(() => {
    const root = scroller.current
    const el = teaser.current
    if (!root || !el) return
    let fired = false
    const io = new IntersectionObserver(
      ([e]) => {
        setAtEnd(e.intersectionRatio > 0.1)
        if (!fired && e.intersectionRatio > 0.97 && root.scrollTop > 0) {
          fired = true
          open(next.slug)
        }
      },
      { root, threshold: [0, 0.1, 0.5, 0.97, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [project.slug, next.slug, open])

  // The rail highlights whichever image is in the middle of the column.
  React.useEffect(() => {
    const root = scroller.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSeen(Number((e.target as HTMLElement).dataset.i))
      },
      { root, rootMargin: "-45% 0px -45% 0px" },
    )
    shots.current.forEach((s) => s && io.observe(s))
    return () => io.disconnect()
  }, [project.slug])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [close])

  const jump = (i: number) => {
    blip(800)
    shots.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const frames = project.images.length ? project.images : [""]

  return (
    <div ref={scroller} className="pv" role="main" aria-labelledby="pv-title">
      <aside className="pv-info">
        <dl>
          <div className="pv-row">
            <dt>About</dt>
            <dd>{project.about}</dd>
          </div>
          <div className="pv-row pv-pair">
            <div>
              <dt>Role</dt>
              <dd>
                {project.role.map((r) => (
                  <span key={r}>{r}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{project.date}</dd>
            </div>
          </div>
          <div className="pv-row">
            <dt>Highlights</dt>
            <dd>
              {project.highlights.map((h) => (
                <span key={h}>{h}</span>
              ))}
            </dd>
          </div>
          {project.team && (
            <div className="pv-row">
              <dt>Team</dt>
              <dd>{project.team}</dd>
            </div>
          )}
        </dl>
        <button type="button" className="pv-close" onClick={close}>
          ← All work
        </button>
      </aside>

      <h1 id="pv-title" className="pv-title" data-hidden={atEnd} data-long={project.name.length > 9}>
        <span className="sr-only">{project.category}: </span>
        {project.name}
      </h1>

      <article className="pv-col">
        {frames.map((src, i) => (
          <figure key={src || i} ref={(el) => void (shots.current[i] = el)} data-i={i} className="pv-shot">
            {src ? <img src={src} alt={`${project.name}, image ${i + 1}`} loading={i ? "lazy" : "eager"} /> : <Cover project={project} className="pv-typecover" />}
          </figure>
        ))}
      </article>

      <button ref={teaser} type="button" className="pv-next" onClick={() => open(next.slug)}>
        <span>Next project</span>
        <span className="pv-next-name">{next.name}</span>
      </button>

      {project.images.length > 1 && (
        <nav className="pv-rail" aria-label="Images">
          {project.images.map((src, i) => (
            <button key={src} type="button" data-on={seen === i} onClick={() => jump(i)} aria-label={`Image ${i + 1}`}>
              <img src={src} alt="" />
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
