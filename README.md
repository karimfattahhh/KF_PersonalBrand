# KF_PersonalBrand

Karim Fattah's personal portfolio. Brand, growth and design work from Beirut.

Layout inspired by [huyml.co](https://huyml.co). The character is Mini Karim.

## Run it

```sh
npm install
npm run dev      # http://localhost:5173  (add ?intro=1 to replay the intro)
npm run build    # type-check and build to dist/
```

## Stack

Vite 7, React 19, TypeScript and Tailwind v4. Most styling is plain CSS in `src/styles/site.css`.

## Where things are

- `src/App.tsx`: hash routes (`#/`, `#/work/<slug>`, `#/about`, `#/contact`) and page wipes.
- `src/components/`:
  - `Intro`: the black wall that Mini Karim pushes away.
  - `WorkView`: the wheel-driven work carousel.
  - `ProjectView`: case pages.
  - `AboutView`: the About page.
  - `ContactCards`: the contact and credits cards.
  - `Frame`: the fixed frame around every page.
- `src/data/projects.ts`: all project copy. Images live in `public/work/<slug>/NN.webp`.
- `public/mini-karim/`: the character's web images. `push-cycle.webp` is the four-frame push sprite.
- `design/`: full-size source PNGs for Mini Karim.

## Earlier versions

- `archive/codex-v1`: the first site, built in Codex. It used a notebook / editorial style.
- `archive/v2-mascot`: the mascot hero and brand-system playground.
