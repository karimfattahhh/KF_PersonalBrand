import * as React from "react"

/* ------------------------------------------------------------------ types */

type Swatch = { name: string; color: string; /** Text set on the colour. */ on: string }
type TypeMood = { name: string; font: string; weight: number; transform: string; tracking: string }
type Corner = { name: string; r: string }
type Voice = { name: string; tagline: string; cta: string }

export type PlaygroundSectionProps = {
  index?: string
  discipline?: string
  tagline?: string
  collection?: [string, string]
  reel?: [string, string]

  lines?: [string, string, string]
  intro?: string
  defaultName?: string
  swatches?: Swatch[]
  types?: TypeMood[]
  corners?: Corner[]
  voices?: Voice[]

  ctaLabel?: string
  cta?: string
  href?: string

  accent?: string
  paper?: string
  ink?: string
  id?: string
  className?: string
}

const SANS_STACK =
  '"Inter","Helvetica Neue",Helvetica,Arial,system-ui,sans-serif'
const DISPLAY_STACK =
  '"Archivo Black","Arial Black","Helvetica Neue",Helvetica,Arial,system-ui,sans-serif'

const DEFAULT_SWATCHES: Swatch[] = [
  { name: "Green", color: "#5fb57a", on: "#111111" },
  { name: "Cobalt", color: "#1f45c4", on: "#ffffff" },
  { name: "Tangerine", color: "#ff8a3d", on: "#111111" },
  { name: "Violet", color: "#6e41f4", on: "#ffffff" },
  { name: "Bubblegum", color: "#ff7eb6", on: "#111111" },
]

const DEFAULT_TYPES: TypeMood[] = [
  { name: "Loud", font: DISPLAY_STACK, weight: 900, transform: "uppercase", tracking: "-0.045em" },
  { name: "Clean", font: SANS_STACK, weight: 800, transform: "none", tracking: "-0.035em" },
  { name: "Quiet", font: SANS_STACK, weight: 500, transform: "lowercase", tracking: "-0.02em" },
]

const DEFAULT_CORNERS: Corner[] = [
  { name: "Sharp", r: "0px" },
  { name: "Soft", r: "12px" },
  { name: "Round", r: "28px" },
]

const DEFAULT_VOICES: Voice[] = [
  { name: "Bold", tagline: "Make some noise.", cta: "Join now" },
  { name: "Friendly", tagline: "Come say hi.", cta: "Let's talk" },
  { name: "Calm", tagline: "Less, but better.", cta: "Learn more" },
]

/* ----------------------------------------------------------------- styles
   Every mockup reads the same handful of custom properties set on the board,
   so changing one control restyles all six at once — which is the point. */

const CSS = `
.pg-root{position:relative;overflow:hidden;isolation:isolate;background:var(--pg-paper);color:var(--pg-ink);font-family:var(--pg-sans);container:pg / inline-size;-webkit-font-smoothing:antialiased;border-top:1.5px solid var(--pg-ink);}
.pg-grid{position:absolute;inset:0;z-index:-1;pointer-events:none;background-image:linear-gradient(to right,var(--pg-line) 1px,transparent 1px),linear-gradient(to bottom,var(--pg-line) 1px,transparent 1px);background-size:5.8cqw 5.8cqw;background-position:-1px -1px;}
.pg-inner{padding:clamp(28px,4.4cqw,72px) clamp(16px,4.6cqw,88px) clamp(56px,6.4cqw,110px);}

.pg-top{display:grid;grid-template-columns:auto auto 1fr auto auto;align-items:center;column-gap:2.4cqw;font-size:clamp(10px,1.05cqw,15px);font-weight:800;line-height:1.1;text-transform:uppercase;letter-spacing:.02em;}
.pg-index{display:inline-flex;align-items:center;gap:.9em;border:1.5px solid var(--pg-ink);border-radius:999px;padding:.12em .9em .12em .12em;font-size:.72em;}
.pg-index b{background:var(--pg-accent);border-radius:999px;padding:.3em 1.2em;font-weight:800;}
.pg-tagline{font-size:1.18em;font-weight:900;margin-left:1cqw;}
.pg-brace{grid-column:4;font-size:1.3em;font-weight:700;letter-spacing:.04em;margin-right:2.6cqw;}
.pg-reel{grid-column:5;display:flex;align-items:center;gap:.8em;font-size:.8em;text-align:right;}
.pg-reel i{display:block;width:1.9em;height:1.9em;border-radius:50%;background:var(--pg-accent);border:1.5px solid var(--pg-ink);flex:none;}

.pg-main{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr);gap:4.4cqw;align-items:start;margin-top:clamp(36px,5cqw,90px);padding-left:4.2cqw;}
.pg-h2{margin:0;font-family:var(--pg-display);font-weight:900;font-size:clamp(34px,4.1cqw,80px);line-height:.93;letter-spacing:-.045em;text-transform:uppercase;}
.pg-line{display:block;width:max-content;max-width:100%;white-space:nowrap;}
.pg-ch{display:inline-block;transition:transform .35s cubic-bezier(.3,1.6,.5,1),color .2s;}
.pg-ch:hover{transform:translateY(-.08em) rotate(-4deg);color:var(--pg-accent);}
.pg-follow{display:inline-block;color:var(--pg-b);transition:color .4s;}
.pg-follow .pg-ch:hover{color:var(--pg-ink);}
.pg-star{display:inline-block;font-size:.62em;vertical-align:.55em;margin-left:.02em;transition:transform .6s cubic-bezier(.3,1.6,.5,1);}
.pg-h2:hover .pg-star{transform:rotate(180deg) scale(1.2);}
.pg-intro{max-width:30em;margin:clamp(18px,2.2cqw,36px) 0 0;font-size:clamp(16px,1.2cqw,19px);line-height:1.55;font-weight:500;}

.pg-panel{margin-top:clamp(24px,2.8cqw,48px);background:#fff;border:2px solid var(--pg-ink);border-radius:clamp(18px,1.8cqw,30px);padding:clamp(18px,1.9cqw,32px);box-shadow:clamp(5px,.5cqw,9px) clamp(5px,.5cqw,9px) 0 var(--pg-b);transition:box-shadow .4s;}
.pg-field{border:0;margin:0;padding:0;min-width:0;}
.pg-field+.pg-field{margin-top:clamp(14px,1.4cqw,22px);}
.pg-legend,.pg-label{display:block;margin-bottom:.7em;padding:0;font-size:clamp(10px,.82cqw,13px);font-weight:800;letter-spacing:.08em;text-transform:uppercase;}
.pg-input{box-sizing:border-box;width:100%;border:1.5px solid var(--pg-ink);border-radius:999px;background:var(--pg-paper);padding:.7em 1.1em;font:800 clamp(16px,1.2cqw,19px)/1 var(--pg-sans);color:var(--pg-ink);outline:none;transition:box-shadow .2s;}
.pg-input:focus-visible{box-shadow:0 0 0 3px var(--pg-b);}
.pg-row{display:flex;flex-wrap:wrap;gap:8px;}
.pg-swatch{width:clamp(34px,2.7cqw,44px);aspect-ratio:1;border-radius:50%;border:1.5px solid var(--pg-ink);background:var(--c);cursor:pointer;padding:0;transition:transform .35s cubic-bezier(.3,1.6,.5,1);}
.pg-swatch:hover{transform:scale(1.1) rotate(-8deg);}
.pg-swatch[aria-pressed="true"]{box-shadow:0 0 0 3px #fff,0 0 0 4.5px var(--pg-ink);transform:scale(1.06);}
.pg-chip{border:1.5px solid var(--pg-ink);border-radius:999px;background:#fff;color:var(--pg-ink);padding:.55em 1.1em;font:800 clamp(12px,.95cqw,15px)/1 var(--pg-sans);cursor:pointer;transition:background .2s,color .2s,transform .35s cubic-bezier(.3,1.6,.5,1);}
.pg-chip:hover{transform:translateY(-2px);}
.pg-chip[aria-pressed="true"]{background:var(--pg-ink);color:var(--pg-paper);}
.pg-swatch:focus-visible,.pg-chip:focus-visible,.pg-dice:focus-visible{outline:2px dashed var(--pg-ink);outline-offset:3px;}
.pg-dice{display:inline-flex;align-items:center;gap:.6em;margin-top:clamp(16px,1.6cqw,26px);border:1.5px solid var(--pg-ink);border-radius:999px;background:var(--pg-b);color:var(--pg-on);padding:.7em 1.3em;font:800 clamp(13px,1cqw,16px)/1 var(--pg-sans);cursor:pointer;transition:background .4s,color .4s,transform .35s cubic-bezier(.3,1.6,.5,1);}
.pg-dice:hover{transform:rotate(-3deg) scale(1.04);}
.pg-dice svg{width:1.2em;height:1.2em;transition:transform .5s cubic-bezier(.3,1.6,.5,1);}
.pg-dice:hover svg{transform:rotate(180deg);}

/* ---- the board ---- */
.pg-board{--t:.45s;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-template-areas:"poster poster post post card card" "poster poster post post icon sticker" "site site site site site site";gap:clamp(12px,1.4cqw,24px);}
.pg-board *{transition:background-color var(--t),color var(--t),border-radius var(--t),border-color var(--t),letter-spacing var(--t);}
.pg-mock{position:relative;border:2px solid var(--pg-ink);border-radius:var(--pg-r);overflow:hidden;background:#fff;}
.pg-tag{position:absolute;left:10px;bottom:-1px;transform:translateY(100%);font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;}
.pg-cell{position:relative;padding-bottom:22px;}
.pg-cell:hover .pg-mock{transform:translateY(-4px) rotate(-.6deg);}
.pg-cell .pg-mock{transition:transform .45s cubic-bezier(.3,1.6,.5,1),background-color var(--t),border-radius var(--t);}
.pg-word{font-family:var(--pg-font);font-weight:var(--pg-weight);text-transform:var(--pg-case);letter-spacing:var(--pg-track);line-height:.92;}

.pg-poster{grid-area:poster;}
.pg-poster .pg-mock{height:100%;min-height:clamp(300px,24cqw,460px);background:var(--pg-b);color:var(--pg-on);display:flex;flex-direction:column;justify-content:space-between;padding:clamp(14px,1.4cqw,24px);box-sizing:border-box;}
.pg-poster .pg-word{font-size:clamp(34px,3.8cqw,72px);overflow-wrap:anywhere;}
.pg-poster-top{display:flex;justify-content:space-between;font-size:clamp(9px,.75cqw,12px);font-weight:800;letter-spacing:.06em;text-transform:uppercase;}
.pg-poster-tag{font-size:clamp(13px,1.1cqw,18px);font-weight:700;}
.pg-poster-mono{position:absolute;right:-8%;bottom:16%;font-family:var(--pg-font);font-weight:var(--pg-weight);font-size:clamp(120px,14cqw,260px);line-height:.8;opacity:.16;text-transform:var(--pg-case);pointer-events:none;}

.pg-card{grid-area:card;}
.pg-card .pg-mock{aspect-ratio:1.75/1;display:flex;flex-direction:column;justify-content:space-between;padding:clamp(12px,1.2cqw,20px);box-sizing:border-box;}
.pg-mono{display:inline-grid;place-items:center;width:clamp(34px,2.8cqw,48px);aspect-ratio:1;border-radius:calc(var(--pg-r) * .6);background:var(--pg-b);color:var(--pg-on);font-family:var(--pg-font);font-weight:var(--pg-weight);font-size:clamp(14px,1.2cqw,20px);text-transform:var(--pg-case);}
.pg-card .pg-word{font-size:clamp(17px,1.5cqw,26px);}
.pg-card small{display:block;margin-top:.35em;font-size:clamp(10px,.8cqw,12px);font-weight:600;opacity:.7;}

.pg-icon{grid-area:icon;}
.pg-icon .pg-mock{width:100%;aspect-ratio:1;border-radius:calc(var(--pg-r) * 1.1 + 6px);background:var(--pg-b);color:var(--pg-on);display:grid;place-items:center;}
.pg-icon .pg-word{font-size:clamp(26px,2.6cqw,46px);}
.pg-sticker{grid-area:sticker;align-self:start;}
.pg-sticker svg{display:block;width:100%;height:auto;overflow:visible;animation:pg-spin 18s linear infinite;}
.pg-sticker circle{fill:var(--pg-b);stroke:var(--pg-ink);stroke-width:2;transition:fill var(--t);}
.pg-sticker text{fill:var(--pg-on);font-family:var(--pg-font);font-weight:var(--pg-weight);text-transform:var(--pg-case);font-size:15px;letter-spacing:.12em;transition:fill var(--t);}
.pg-sticker .pg-star-c{fill:var(--pg-on);font-size:30px;letter-spacing:0;}

.pg-post{grid-area:post;}
.pg-post .pg-mock{height:100%;min-height:clamp(240px,22cqw,420px);background:var(--pg-ink);color:var(--pg-paper);display:flex;flex-direction:column;justify-content:space-between;padding:clamp(12px,1.2cqw,20px);box-sizing:border-box;}
.pg-post-head{display:flex;align-items:center;gap:8px;font-size:clamp(10px,.8cqw,12px);font-weight:700;}
.pg-post-head .pg-mono{width:clamp(22px,1.8cqw,30px);font-size:clamp(10px,.8cqw,13px);}
.pg-post .pg-word{font-size:clamp(24px,2.6cqw,48px);color:var(--pg-b);}
.pg-post-foot{display:flex;justify-content:space-between;font-size:clamp(10px,.8cqw,12px);font-weight:700;opacity:.8;}

.pg-site{grid-area:site;}
.pg-site .pg-mock{display:flex;flex-direction:column;}
.pg-bar{display:flex;align-items:center;gap:6px;padding:8px 12px;border-bottom:2px solid var(--pg-ink);background:var(--pg-paper);}
.pg-bar i{width:9px;height:9px;border-radius:50%;border:1.5px solid var(--pg-ink);}
.pg-bar span{margin-left:8px;flex:1;max-width:60%;border:1.5px solid var(--pg-ink);border-radius:999px;padding:3px 10px;font-size:10px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:#fff;}
.pg-page{display:grid;grid-template-columns:1.3fr 1fr;gap:clamp(10px,1.2cqw,20px);align-items:center;padding:clamp(14px,1.6cqw,26px);}
.pg-nav{grid-column:1 / -1;display:flex;align-items:center;justify-content:space-between;font-size:clamp(10px,.8cqw,12px);font-weight:700;}
.pg-nav .pg-word{font-size:clamp(14px,1.2cqw,19px);}
.pg-nav ul{display:flex;gap:1.4em;margin:0;padding:0;list-style:none;}
.pg-page h5{margin:0;font-family:var(--pg-font);font-weight:var(--pg-weight);text-transform:var(--pg-case);letter-spacing:var(--pg-track);font-size:clamp(22px,2.3cqw,42px);line-height:.95;}
.pg-btn{display:inline-block;margin-top:.9em;background:var(--pg-b);color:var(--pg-on);border:1.5px solid var(--pg-ink);border-radius:var(--pg-r);padding:.6em 1.1em;font-size:clamp(11px,.9cqw,14px);font-weight:800;}
.pg-art{aspect-ratio:1.2/1;border:1.5px solid var(--pg-ink);border-radius:var(--pg-r);background:repeating-linear-gradient(-45deg,var(--pg-b) 0 10px,transparent 10px 20px);display:grid;place-items:center;}
.pg-art .pg-mono{width:clamp(40px,3.6cqw,64px);font-size:clamp(16px,1.5cqw,26px);border:1.5px solid var(--pg-ink);}

.pg-end{display:flex;justify-content:flex-end;margin-top:clamp(32px,3.6cqw,64px);}
.pg-pill{display:flex;align-items:stretch;font-size:clamp(15px,1.5cqw,24px);font-weight:800;line-height:1;}
.pg-pill-a{position:relative;z-index:1;background:#fff;border:2px solid var(--pg-ink);border-radius:999px;padding:.72em 1.25em;}
.pg-pill-b{display:inline-flex;align-items:center;gap:.5em;margin-left:-1.4em;padding:.72em 2.4em .72em 2.2em;background:var(--pg-accent);color:var(--pg-ink);border:2px solid var(--pg-ink);border-radius:0 999px 999px 0;text-decoration:none;transition:background .25s,color .25s;}
.pg-pill-b:hover,.pg-pill-b:focus-visible{background:var(--pg-ink);color:var(--pg-paper);outline:none;}

@keyframes pg-spin{to{transform:rotate(360deg);}}

@container pg (max-width: 1000px){
.pg-main{grid-template-columns:minmax(0,1fr);padding-left:0;}
}
@container pg (max-width: 760px){
.pg-grid{background-size:44px 44px;}
.pg-top{grid-template-columns:auto 1fr auto;font-size:10px;}
.pg-tagline,.pg-brace{display:none;}
.pg-reel{grid-column:3;}
.pg-h2{font-size:clamp(30px,9cqw,60px);}
.pg-board{grid-template-columns:repeat(2,minmax(0,1fr));grid-template-areas:"poster poster" "post post" "card card" "icon sticker" "site site";}
.pg-poster .pg-mock{min-height:340px;}
.pg-post .pg-mock{aspect-ratio:1;height:auto;}
.pg-nav ul{display:none;}
.pg-end{justify-content:flex-start;}
.pg-pill{font-size:14px;white-space:nowrap;}
.pg-pill-b{padding:.72em 1.4em .72em 2em;}
.pg-icon .pg-mock,.pg-sticker svg{width:78%;margin:0 auto;}
}

@media (prefers-reduced-motion: reduce){
.pg-root *{animation:none!important;transition:none!important;}
}
`

/* ------------------------------------------------------------- component */

const pick = <T,>(xs: T[], not: number) => {
  if (xs.length < 2) return 0
  let i = not
  while (i === not) i = Math.floor(Math.random() * xs.length)
  return i
}

export default function PlaygroundSection({
  index = "02",
  discipline = "Playground",
  tagline = "Design systems, hands-on",
  collection = ["Try", "It"],
  reel = ["Interactive", "Go ahead, play"],
  lines = ["One decision.", "Every", "touchpoint"],
  intro = "A brand isn't a logo. It's a handful of decisions — colour, type, shape, voice — made once and applied everywhere. Name a brand, change one thing, and watch the whole system follow.",
  defaultName = "Nova",
  swatches = DEFAULT_SWATCHES,
  types = DEFAULT_TYPES,
  corners = DEFAULT_CORNERS,
  voices = DEFAULT_VOICES,
  ctaLabel = "Want this for real?*",
  cta = "Let's build yours",
  href = "mailto:karimfattah14@gmail.com",
  accent = "#5fb57a",
  paper = "#ebebea",
  ink = "#111111",
  id = "playground",
  className,
}: PlaygroundSectionProps) {
  const [name, setName] = React.useState(defaultName)
  const [s, setS] = React.useState(0)
  const [t, setT] = React.useState(0)
  const [c, setC] = React.useState(1)
  const [v, setV] = React.useState(0)

  const shuffle = () => {
    setS(pick(swatches, s))
    setT(pick(types, t))
    setC(pick(corners, c))
    setV(pick(voices, v))
  }

  const brand = name.trim() || defaultName
  const words = brand.split(/\s+/)
  const mono = (words.length > 1 ? words[0][0] + words[1][0] : brand.slice(0, 1)).toUpperCase()
  const slug = brand.toLowerCase().replace(/[^a-z0-9]+/g, "") || "brand"
  const sw = swatches[s]
  const ty = types[t]
  const voice = voices[v]
  const uid = React.useId().replace(/:/g, "")

  const chars = (str: string) =>
    Array.from(str).map((ch, i) => (
      <span key={i} className="pg-ch">
        {ch === " " ? " " : ch}
      </span>
    ))

  const vars = {
    "--pg-accent": accent,
    "--pg-paper": paper,
    "--pg-ink": ink,
    "--pg-line": "color-mix(in srgb, " + ink + " 8%, transparent)",
    "--pg-sans": SANS_STACK,
    "--pg-display": DISPLAY_STACK,
    "--pg-b": sw.color,
    "--pg-on": sw.on,
    "--pg-font": ty.font,
    "--pg-weight": ty.weight,
    "--pg-case": ty.transform,
    "--pg-track": ty.tracking,
    "--pg-r": corners[c].r,
  } as React.CSSProperties

  const group = <T extends { name: string }>(legend: string, xs: T[], cur: number, set: (i: number) => void) => (
    <fieldset className="pg-field">
      <legend className="pg-legend">{legend}</legend>
      <div className="pg-row">
        {xs.map((x, i) => (
          <button key={x.name} type="button" className="pg-chip" aria-pressed={i === cur} onClick={() => set(i)}>
            {x.name}
          </button>
        ))}
      </div>
    </fieldset>
  )

  return (
    <section id={id} className={"pg-root" + (className ? " " + className : "")} style={vars} aria-labelledby={id + "-title"}>
      <style>{CSS}</style>
      <div className="pg-grid" aria-hidden="true" />

      <div className="pg-inner">
        <header className="pg-top">
          <span className="pg-index">
            <b>{index}</b>
            {discipline}
          </span>
          <span className="pg-tagline">{tagline}</span>
          <span className="pg-brace">
            {"{"}
            {collection[0]}/{collection[1]}
            {"}"}
          </span>
          <span className="pg-reel">
            <i aria-hidden="true" />
            <span>
              {reel[0]}
              <br />
              {reel[1]}
            </span>
          </span>
        </header>

        <div className="pg-main">
          <div>
            <h2 id={id + "-title"} className="pg-h2" aria-label={lines.join(" ")}>
              <span className="pg-line" aria-hidden="true">
                {chars(lines[0])}
              </span>
              <span className="pg-line" aria-hidden="true">
                {chars(lines[1])}
              </span>
              <span className="pg-line" aria-hidden="true">
                <span className="pg-follow">{chars(lines[2])}</span>
                <span className="pg-star">*</span>
              </span>
            </h2>
            <p className="pg-intro">{intro}</p>

            <div className="pg-panel">
              <div className="pg-field">
                <label className="pg-label" htmlFor={uid + "-name"}>
                  Brand name
                </label>
                <input
                  id={uid + "-name"}
                  className="pg-input"
                  value={name}
                  maxLength={16}
                  placeholder="Type a brand name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <fieldset className="pg-field">
                <legend className="pg-legend">Colour · {sw.name}</legend>
                <div className="pg-row">
                  {swatches.map((x, i) => (
                    <button
                      key={x.name}
                      type="button"
                      className="pg-swatch"
                      style={{ "--c": x.color } as React.CSSProperties}
                      aria-pressed={i === s}
                      aria-label={x.name}
                      onClick={() => setS(i)}
                    />
                  ))}
                </div>
              </fieldset>
              {group("Type", types, t, setT)}
              {group("Corners", corners, c, setC)}
              {group("Voice", voices, v, setV)}
              <button type="button" className="pg-dice" onClick={shuffle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" />
                  <circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                </svg>
                Surprise me
              </button>
            </div>
          </div>

          <div className="pg-board" aria-live="polite" aria-label={"Mock touchpoints for " + brand}>
            <div className="pg-cell pg-poster">
              <div className="pg-mock">
                <div className="pg-poster-top">
                  <span>{brand}</span>
                  <span>Vol. 01</span>
                </div>
                <span className="pg-poster-mono" aria-hidden="true">
                  {mono}
                </span>
                <div>
                  <div className="pg-word">{brand}</div>
                  <p className="pg-poster-tag">{voice.tagline}</p>
                </div>
              </div>
              <span className="pg-tag">Poster</span>
            </div>

            <div className="pg-cell pg-card">
              <div className="pg-mock">
                <span className="pg-mono">{mono}</span>
                <div>
                  <div className="pg-word">{brand}</div>
                  <small>hello@{slug}.com</small>
                </div>
              </div>
              <span className="pg-tag">Business card</span>
            </div>

            <div className="pg-cell pg-icon">
              <div className="pg-mock">
                <span className="pg-word">{mono}</span>
              </div>
              <span className="pg-tag">App icon</span>
            </div>

            <div className="pg-cell pg-sticker">
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <defs>
                  <path id={uid + "-ring"} d="M60 60 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" />
                </defs>
                <circle cx="60" cy="60" r="56" />
                <text>
                  <textPath href={"#" + uid + "-ring"}>
                    {(brand + " · " + voice.cta + " · ").repeat(3).slice(0, 34)}
                  </textPath>
                </text>
                <text className="pg-star-c" x="60" y="71" textAnchor="middle">
                  *
                </text>
              </svg>
              <span className="pg-tag">Sticker</span>
            </div>

            <div className="pg-cell pg-post">
              <div className="pg-mock">
                <div className="pg-post-head">
                  <span className="pg-mono">{mono}</span>@{slug}
                </div>
                <div className="pg-word">{voice.tagline}</div>
                <div className="pg-post-foot">
                  <span>♥ 2,481</span>
                  <span>{voice.cta} →</span>
                </div>
              </div>
              <span className="pg-tag">Social post</span>
            </div>

            <div className="pg-cell pg-site">
              <div className="pg-mock">
                <div className="pg-bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>{slug}.com</span>
                </div>
                <div className="pg-page">
                  <div className="pg-nav">
                    <span className="pg-word">{brand}</span>
                    <ul>
                      <li>Work</li>
                      <li>About</li>
                      <li>Contact</li>
                    </ul>
                  </div>
                  <div>
                    <h5>{voice.tagline}</h5>
                    <span className="pg-btn">{voice.cta}</span>
                  </div>
                  <div className="pg-art">
                    <span className="pg-mono">{mono}</span>
                  </div>
                </div>
              </div>
              <span className="pg-tag">Website</span>
            </div>
          </div>
        </div>

        <div className="pg-end">
          <div className="pg-pill">
            <span className="pg-pill-a">{ctaLabel}</span>
            <a className="pg-pill-b" href={href}>
              {cta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
