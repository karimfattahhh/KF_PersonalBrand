import * as React from "react"

const EMAIL = "karimfattah14@gmail.com"

/* Two cards dropped on the page: how to reach Karim, and who made what. */
export default function ContactCards({ close }: { close: () => void }) {
  const closeRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [close])

  return (
    <div className="cc" role="dialog" aria-modal="true" aria-labelledby="cc-title" onClick={close}>
      <section className="cc-card cc-hi" onClick={(e) => e.stopPropagation()}>
        <h2 id="cc-title" className="cc-title">
          Come say hi
        </h2>
        <dl className="cc-grid">
          <div>
            <dt>Drop me a line</dt>
            <dd>
              <a href={"mailto:" + EMAIL}>{EMAIL}</a>
            </dd>
          </div>
          <div>
            <dt>Work & updates</dt>
            <dd>
              <a href="https://www.linkedin.com/in/karim-fattah/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </dd>
          </div>
          <div>
            <dt>Brand, growth or design work</dt>
            <dd>
              <a href={"mailto:" + EMAIL + "?subject=Let's%20build%20something"}>Start a project</a>
            </dd>
          </div>
          <div>
            <dt>Need a speaker?</dt>
            <dd>
              <a href={"mailto:" + EMAIL + "?subject=Speaking%20invitation"}>Book a talk</a>
            </dd>
          </div>
        </dl>
        <button ref={closeRef} type="button" className="cc-close" onClick={close}>
          Close ×
        </button>
      </section>

      <section className="cc-card cc-credits" aria-label="Credits" onClick={(e) => e.stopPropagation()}>
        <h2 className="cc-title">Credits</h2>
        <dl className="cc-grid">
          <div>
            <dt>Design & build</dt>
            <dd>Karim Fattah, with Claude Code</dd>
          </div>
          <div>
            <dt>Character</dt>
            <dd>Mini Karim</dd>
          </div>
          <div>
            <dt>Fonts</dt>
            <dd>
              Marcellus
              <br />
              Inter Tight
            </dd>
          </div>
          <div>
            <dt>Layout inspired by</dt>
            <dd>
              <a href="https://huyml.co/" target="_blank" rel="noreferrer">
                huyml.co
              </a>
            </dd>
          </div>
        </dl>
        <img className="cc-mini" src="/mini-karim/full.webp" alt="" aria-hidden="true" />
      </section>
    </div>
  )
}
