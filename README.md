# Karim Fattah — first website draft

A self-contained, responsive HTML/CSS/JavaScript website. No package install or build is needed. Open `index.html` directly, or serve this directory with `python3 -m http.server 4317 --bind 127.0.0.1`.

## Included

- Dark editorial homepage, ivory story section, rust contact section.
- Ten dedicated article pages: five personal journal stories and five project stories.
- Career overview, working principles, attributed testimonial, LinkedIn contact links.
- Mobile navigation, keyboard focus management, reduced-motion support, locally hosted fonts.
- No analytics, forms, external scripts, or backend.
- `noindex,nofollow` while this is a draft. No deployment has been performed.

## Edit

- `index.html`: page copy, sections, and links.
- `styles.css`: typography, colors, responsive layout, and motion.
- `script.js`: mobile navigation, section highlights, and scroll reveals.
- `stories/`: standalone journal and project pages.
- `assets/`: locally hosted fonts, favicon, and approved landing photograph.

## Content review before publication

- Confirm current titles and the exact relationship to House of Prep, Taleb, and Elmy.
- The site now centers personal growth and readers building themselves, as requested.
- The user-approved childhood photograph is used on the landing. Project covers remain typographic.
- Review all proposed first-person copy. It was drafted from prior conversations and records; it is not a set of direct quotations.
- Confirm present project status, permissions for company materials, and career dates.
- Add a public email address if desired. The current contact route is the verified LinkedIn profile.
- Replace conceptual typographic project covers with approved brand assets or work examples if preferred. They are illustrations, not dashboards or measured results.
- The Elmy redesign is described as in review. Dough and Crumbcoat are planning cases, not claims of realized revenue.
- Choose domain/hosting, finalize metadata and social image, and remove `noindex` only when ready to publish.

## Sources used for copy

- September 2025 CV: https://drive.google.com/file/d/1vD_CsxT7JBYmGkwmSX9vQiqr0bklWPyj/view
- LAU Honors: https://honors.lau.edu.lb/testimonials.php
- Hadi Zeaiter's testimonial: https://www.lau.edu.lb/experience/my-journey-at-lau/hadi-zeaiter.php
- LinkedIn: https://www.linkedin.com/in/karim-fattah/
- Prior tasks: AIOS for House of Prep; ITM; Plan Dough Beirut revitalization; Crumbcoat Brand Understanding; Confirm Elmy project context.
- Local House of Prep Executive Core and project README files inspected during the research pass.

## Checks completed

- JavaScript syntax check.
- All five project overlays opened, correct content observed, close controls exercised.
- Escape dismissal and focus return to the originating project verified.
- Mobile menu open/close and anchor navigation verified.
- Desktop visual review and phone visual review.
- Narrow-phone horizontal overflow corrected and rechecked at a 320px CSS viewport.
- Temporary browser viewport override reset after testing.

## Landing update — September 26
The user-selected IMG_3835.HEIC is now the landing photograph, converted locally to a 2400 × 1800 JPEG in assets/landing.jpg. No generative edits were applied. The childhood photograph replaces the typographic portrait placeholder.

The supplied screen recording informed the opening: a centered name reveal followed by four staggered ivory curtains moving down, completing in approximately 2.6 seconds. A bounded cleanup removes the overlay; without JavaScript or with reduced motion the site appears directly. Deep links skip the intro. Desktop and phone crops keep the subject visible, with the introductory copy moved beneath the photo.

Verified in Chrome: photograph loads, opening starts and clears, desktop and phone layouts (including 320 CSS px) have no horizontal overflow, and the mobile menu opens. Still a local, unpublished draft.

## Personal identity and journal revision
The user directed the site toward self-reflection, building from scratch, consistency, dedication, hard work, persistence, resilience, movement, and learning. The main sequence is now opening → introduction → personal background → experience → journal → current work → principles → connection.

The university turning point comes directly from the user’s account: academic difficulties at school, doubts about affordability and academic fit at LAU, and graduating with distinction as an Honors Program graduate and MEPI TLS scholar. No literal disparaging quotes, routines, financial figures, or hardship events were invented. First-person interpretation remains draft copy for review.

Read LinkedIn activity in Chrome on September 26, 2026: McKinsey Forward completion (certificate July 7, 2025), returning to Beirut Annunciation Orthodox College as a speaker, TestPrep end-of-semester teaching reflection, KitKat Arabia Auto Reply Break team contribution, and Publicis joining announcement. Sources: https://www.linkedin.com/in/karim-fattah/recent-activity/all/ . No private messages or analytics were used in the site.

User explicitly requested no story popups. All ten story cards are now ordinary links to full HTML pages, each with a return link. Dialog markup and modal handlers were removed. Local article/asset links and JavaScript syntax validated.

## About Me consolidation
The user requested one continuous About Me story instead of a journal/blog. The landing now introduces the transformation and links to #about. The university turning point, teaching, school visit, agency experience, continued learning, timeline, and personal principles are consolidated within About Me. Journal navigation and cards were removed; project pages remain. Older personal story URLs are retained for compatibility and return to About Me.

## About typography and motion
Left statement uses bold Geist, paired with a warm Georgia italic accent; sticky on desktop, static on mobile. Locally hosted GSAP 3.13.0 and ScrollTrigger animate masked headline lines, staggered chapter text, and the reading-progress rule. Native scrolling remains in place. gsap.matchMedia disables these effects for reduced motion; content stays visible if libraries fail. Typography and progress styles verified in Chrome desktop/mobile, no console errors observed, viewport override reset. Reference: https://gsap.com/cheatsheet/ . Vendor source: jsDelivr gsap@3.13.0/dist; license headers retained.

## Individual chapter transitions
About Me now uses five spacious reading stages. Each chapter number, word-masked heading, and paragraph group enters in sequence through a scroll-scrubbed GSAP timeline, holds for reading, then exits upward. Scrolling backward reverses the transition. The desktop statement remains sticky. Dynamic word wrappers and chapter spacing are removed when reduced motion is requested. Refresh is deferred until layout settles to keep trigger positions accurate. Verified visible chapter text and no browser errors after scrolling.

## Text visibility fix
Replaced the reversible opacity scrub/exit timeline, which could leave chapters invisible after refresh, with explicit fromTo entrance animations triggered only on entry. Text stays visible after completion; no hidden waiting state or fade-out. Chapter spacing and word reveals remain. Script URL versioned to refresh cached copies. Verified zero hidden paragraphs/heading words after direct About load, fresh home load, forward scrolling, and backward scrolling; JavaScript syntax passes.

## Midnight color direction
Replaced the earthy palette with ink black, violet, cobalt, glacial blue, and cool white. Updated opening curtains, About Me, chapter details, project covers, contact, article pages, and favicon. Decorative gradients drift slowly with transform animations and stop for reduced motion. Original photograph remains intact, with a cooler CSS overlay. Verified About and contact text contrast visually and no desktop horizontal overflow. Stylesheet URL versioned for refresh.

## Persistent navigation and caption
Header is now fixed across the homepage, with a darker glass surface after scrolling; article headers remain sticky. GSAP ScrollToPlugin eases section navigation with a header-height offset. Wheel, touch, and navigation keys interrupt scrolling; reduced motion uses native anchors. Disabled ScrollTo autoKill in favor of explicit input cancellation because zoomed browser scrolling caused false interruption; verified About lands 24px below the 86px header. Restored plain, unlinked “Always curious. Still becoming.” beside the photograph.

## Cinematic first-visit name introduction
MEET appears above centered uppercase KARIM FATTAH on a dark violet/cobalt field. GSAP grows and separates the name words into the measured landing headline positions as staggered curtains uncover the photograph. Runs once per browser session on the home URL; ?intro=1 replays it. Reduced motion skips it. Escape/Tab or viewport resizing safely completes it; a bounded timeout restores the page if initialization fails. Verified completed intro restores the real headline, scrolling, and no console errors. Original photo and story copy unchanged.

## Light notebook direction
User replaced the dark direction with paper, scribbles, and editorial typography. References inspected: https://foldex.framer.website/ (graph paper, collage, tactile cards) and https://www.anthropic.com/institute/econ-scenarios (serif editorial layout and fine sketch-like visualizations), plus the supplied September 26 10:53 PM recording sampled into a contact sheet.

Implemented graph-paper landing, printed-photo frame, original SVG ink arrow and drawn underlines, blue handwritten-style annotations, serif story typography, pastel paper project covers, and light opening curtains. Existing biography, project links, fixed navigation, and safe entrance animations preserved. Screenshot checks completed on desktop and phone; phone has no horizontal overflow. No external reference assets copied.

## Navigation alignment and contact page
Created contact.html/contact.js: stationery layout with stamp, tape, original drawn SVG line, accessible labeled fields, native required/email validation, character count, encoded mailto draft, and clipboard fallback. Recipient: karimfattah14@gmail.com, explicitly provided by the user. No email service or server is configured, so the form truthfully prepares an email for the visitor to send; no false delivery success is shown. No test email was sent.

Framer inspiration reviewed: Portfolder (https://www.framer.com/marketplace/templates/72319/) and The Voss Report (https://www.framer.com/marketplace/templates/the-voss-report/), particularly stationery and letters-to-the-editor concepts. No reference assets copied.

Navigation now uses layout offsets rather than transformed bounding rectangles and aligns section labels below the fixed header. Initial deep links align after fonts/load. Active states update during scroll. Verified About direct link (114px label / 86px header), Work navigation (113px / 86px), form validation, message counter, desktop composition, and mobile form with no horizontal overflow.

## First-click navigation polish
Changed section navigation to an immediate ease-out, capped at 0.95 seconds. Early clicks cancel pending initial-hash alignment. Transit through intervening sections skips chapter entrances and CSS reveal delays, leaving content visible. Contact now shares the homepage header, all three section links, contact active state, and mobile menu. Verified all three destinations after reload at 113–115px below viewport top (86px header), and contact navigation/menu on mobile.

### Personal memory collage and minimal navigation — September 26
- Header now contains K/F (home) and Let’s connect (contact.html), including project pages. Removed unused mobile-menu handlers.
- About includes ten supplied personal photographs as a paper contact sheet with handwritten captions. Desktop pointer movement creates a bounded, fading photo trail and gentle parallax. Mobile uses native horizontal scrolling with snap; reduced-motion disables pointer effects.
- Images converted to browser JPEGs in assets/memories; no dates, institutions or achievements inferred for the graduation image.
- Verified desktop rendering, all ten image loads, mobile overflow bounds, both navigation destinations, JavaScript syntax and browser errors (none observed). Original hero and introduction retained.

### Full-screen journal introduction
Replaced the brief introductory row with a ruled-paper journal entry: centered editorial heading, expanded first-person text, handwritten margin labels, signoff and onward link. Native sticky layout holds the entry under the fixed header for an additional 55svh when all text fits; smaller screens, short viewports and reduced motion retain readable normal flow. A GSAP scroll progress line accompanies the reading pause. Verified full viewport coverage (top 86px, bottom 992px in a 992px viewport), onward link, single-column mobile layout without horizontal overflow, and JS syntax.

### Knotted-thread principles illustration
Restyled What keeps me going with a centered editorial heading and an original continuous blue SVG cord forming three loops. Handwritten taped notes and custom line symbols connect the ideas of consistency, resilience and curiosity. Light accents travel along the cord while the section is visible; reduced-motion disables motion. Principles become a vertical reading sequence on mobile. Verified desktop visual rendering, mobile column layout and overflow bounds, and no browser console errors.

### Personal pencil margins
Reworked the principles illustration into a thin graphite study with separate handwritten annotations, sketch arrows, idle loops, crossed-out waves, stars and stray marks. Removed label/line overlaps and glossy icon styling. Added a one-time line drawing entrance with reduced-motion support. Decorative SVGs are hidden from assistive technology and cannot intercept clicks.

### Light handwritten introduction
Replaced dark name morph with original lowercase SVG lettering: meet / karim fattah, drawn sequentially on pale ruled paper before the sheet lifts into the existing photographic landing. Includes Skip intro, Escape/Tab and resize cleanup, once-per-session behavior, reduced-motion bypass and seven-second safety fallback. Replay with ?intro=1#home. Verified completed lettering and skip/scroll-unlock behavior; no console errors.
