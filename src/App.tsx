import * as React from "react"

import AboutView from "@/components/AboutView"
import ContactCards from "@/components/ContactCards"
import Frame, { type View } from "@/components/Frame"
import Intro, { skipIntro } from "@/components/Intro"
import ProjectView from "@/components/ProjectView"
import WorkView from "@/components/WorkView"
import { projects } from "@/data/projects"
import { blip } from "@/lib/sound"

import "@/styles/site.css"

type Route = { view: View; slug?: string; contact: boolean }

/* Routes live in the hash so every view can be linked:
   #/  ·  #/work/<slug>  ·  #/about  ·  #/contact */
function parse(hash: string): Route {
  const [, a, b] = hash.replace(/^#/, "").split("/")
  if (a === "work" && projects.some((p) => p.slug === b)) return { view: "project", slug: b, contact: false }
  if (a === "about") return { view: "about", contact: false }
  if (a === "contact") return { view: "about", contact: true }
  return { view: "work", contact: false }
}

const WIPE_IN = 600
const WIPE_ALL = 1300

export default function App() {
  const [intro, setIntro] = React.useState(() => !skipIntro())
  // While the intro plays, the site waits; it mounts as the intro reveals it.
  const [ready, setReady] = React.useState(() => !intro)
  const [route, setRoute] = React.useState<Route>(() => parse(location.hash))
  const [index, setIndex] = React.useState(() => Math.max(0, projects.findIndex((p) => p.slug === route.slug)))
  const [wipe, setWipe] = React.useState<string | null>(null)
  const timers = React.useRef<number[]>([])

  React.useEffect(() => {
    const onHash = () => setRoute(parse(location.hash))
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  React.useEffect(() => () => timers.current.forEach(clearTimeout), [])

  /* A black sheet with the destination's name covers the screen, the view
     changes underneath it, and the sheet lifts away. */
  const navigate = React.useCallback((hash: string, label: string) => {
    if (location.hash === hash) return
    timers.current.forEach(clearTimeout)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      location.hash = hash
      return
    }
    blip(300, 0.18, 0.06)
    setWipe(label)
    timers.current = [
      window.setTimeout(() => (location.hash = hash), WIPE_IN),
      window.setTimeout(() => setWipe(null), WIPE_ALL),
    ]
  }, [])

  const openProject = React.useCallback(
    (slug: string) => {
      const i = projects.findIndex((p) => p.slug === slug)
      setIndex(i)
      navigate("#/work/" + slug, projects[i].name)
    },
    [navigate],
  )

  const go = (to: "work" | "about") => navigate(to === "work" ? "#/" : "#/about", to === "work" ? "Work" : "About")
  const openContact = () => setRoute((r) => ({ ...r, contact: true }))
  const closeContact = React.useCallback(() => {
    if (location.hash === "#/contact") location.hash = "#/about"
    setRoute((r) => ({ ...r, contact: false }))
  }, [])

  const project = route.view === "project" ? projects.find((p) => p.slug === route.slug)! : null
  const next = project ? projects[(projects.indexOf(project) + 1) % projects.length] : null

  return (
    <div className="site" data-view={route.view} data-intro={intro}>
      <Frame
        view={route.view}
        contactOpen={route.contact}
        go={go}
        openContact={openContact}
        hint={route.view === "work" ? "Scroll" : route.view === "project" ? "Esc to close" : "About"}
      />

      {ready && route.view === "work" && (
        <WorkView projects={projects} index={index} setIndex={setIndex} open={openProject} />
      )}
      {ready && project && next && <ProjectView project={project} next={next} close={() => navigate("#/", "Work")} open={openProject} />}
      {ready && route.view === "about" && <AboutView />}
      {route.contact && <ContactCards close={closeContact} />}

      {wipe && (
        <div className="wp" aria-hidden="true">
          <span className="wp-label">{wipe}</span>
        </div>
      )}
      {intro && <Intro onReveal={() => setReady(true)} onDone={() => setIntro(false)} />}
    </div>
  )
}
