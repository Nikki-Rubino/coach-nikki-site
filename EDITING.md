# Editing the site — what lives where

Every editable bit on the site, with the exact CMS path to find it. Open the
admin at **coach-nikki.netlify.app/admin**, log in, and you'll see the
sidebar collections referenced below.

## The cheat sheet

| What you want to edit | CMS location |
|---|---|
| Hero copy on any page (headline, subcopy, CTAs) | Page copy → the numbered page |
| Three-door cards on the home page | Page copy → 01 Home (the door labels and links sit there); the photos go in Sessions cards |
| Yellow "three session intro required" banner on /sessions | Site blocks → Intro band |
| The session cards (1:1, Sassy Classics, Strength, AF, Breath) | Sessions (class types) — one entry per session |
| "Three sessions, then you choose" arc + intro CTA | Site blocks → Sessions arc (appears on /sessions, /about, /get-started) |
| Sassy "If this sounds familiar" bullets | Site blocks → Sassy — If this sounds familiar |
| Sassy "Real strength training" bullets and body | Site blocks → Sassy — Real strength training |
| Sassy / About FUEL band ("Recognised by my industry") | Site blocks → FUEL Woman of the Year band |
| Sassy / About Inna testimonial circle (now a real photo) | Testimonials → the entry tagged "Sassy Seniors" |
| FAQs on Sessions, Pricing, Sassy, /faq | FAQs — set the right Category and Order |
| Animal Flow orange-tag headline | Page copy → 04 Animal Flow → Hero headline |
| Animal Flow "what it is" bullet points | Page copy → 04 Animal Flow → Body |
| Animal Flow "See it in motion" video | Page copy → 04 Animal Flow → YouTube video ID |
| Pricing cards and policy block | Currently lives in code — ping me when you need to change |
| About hero | Page copy → 07 About |
| About "How I got here" / my story | Page copy → 07 About → Body |
| About philosophy / Safe Seen Heard | Currently lives in code — copy-only edits, ping me |
| About credentials cards | Credentials — one entry per card |
| About studio paragraph + bullets | Site blocks → About — The studio |
| Privacy + Terms wording | Page copy → 11 Privacy policy / 12 Terms (long form lives in code today; ping me for real text edits) |
| Footer (address, phone, email, socials) | Currently lives in code — ping me |
| Nav links order | Currently lives in code — ping me |
| Blog posts | Blog posts — write or paste, set Date, Excerpt, Cover image, untick Draft when ready |

## Page-by-page walkthrough

### Home (`/`)

- **Hero text + CTAs:** Page copy → 01 Home
- **Three-door cards** ("I'm 55+ and want to feel strong again", etc.): the
  text and link sit in Page copy → 01 Home (in code today — ping me to
  rephrase). The photos are wherever you set the session image.
- **Sessions list (mid-page):** Sessions (class types) — controls the cards.
  Tick "Show on home page" on the sessions you want featured.
- **Featured testimonials:** Testimonials — set Featured = yes, Order to control
  position. Upload an Avatar image to replace the grey circle.
- **Blog teasers:** Blog posts — the three most recent published posts show.

### Sessions (`/sessions`)

- **Hero:** Page copy → 02 Sessions
- **Yellow "three session intro" banner:** Site blocks → Intro band
- **Each session card** (1:1, Sassy Classics, Strength, AF Skills, AF Build, Breath
  & Mobility): Sessions (class types) — one entry each. Fields include title,
  chip label, summary, capacity, length, best for, price, image.
- **"Three sessions, then you choose" arc:** Site blocks → Sessions arc
- **FAQ at the bottom:** FAQs — Category = Sessions

### Sassy Seniors (`/sassy-seniors`)

- **Hero:** Page copy → 03 Sassy Seniors
- **FUEL band ("Recognised by my industry"):** Site blocks → FUEL Woman of the
  Year band (this is shared with /about — one edit, both pages update)
- **"If you've thought 'this isn't my scene'…":** Site blocks → Sassy — If this
  sounds familiar (edit the bullets and closing line)
- **"Real strength training. Properly coached.":** Site blocks → Sassy — Real
  strength training
- **Capacity stats (6 / 4 / 60 / 11am):** currently in code — ping me to change
- **Inna testimonial circle:** Testimonials → her entry → upload Avatar
- **FAQ at the bottom:** FAQs — Category = Sessions

### Animal Flow (`/animal-flow`)

- **Orange-tag headline ("Animal Flow. Ground based movement…"):** Page copy
  → 04 Animal Flow → Hero headline + Hero subcopy
- **"What it is" bullet list:** Page copy → 04 Animal Flow → Body (markdown
  list)
- **"See it in motion" video:** Page copy → 04 Animal Flow → YouTube video ID.
  Paste only the 11-char ID from the YouTube URL — for
  `youtube.com/watch?v=dQw4w9WgXcQ`, paste `dQw4w9WgXcQ`. For
  `youtu.be/dQw4w9WgXcQ`, same.
- **Skills + Build a Flow cards:** Sessions (class types) → the two AF entries
- **L1 cert section:** currently in code — ping me to change
- **AF-specific FAQ:** the single "Will I have to do Animal Flow?" FAQ pulls
  from FAQs by ID

### Timetable (`/timetable`)

- **Hero:** Page copy → 05 Timetable
- **Booking widget:** Page copy → 05 Timetable → Acuity booking URL. The widget
  pulls availability live from Acuity, so changes you make in Acuity show up
  here automatically.

### Pricing (`/pricing`)

- **Hero:** Page copy → 06 Pricing
- **Price cards (Intro, 1:1, Semi-private):** currently in code — ping me to
  change prices, copy, or features
- **Capacity numbers strip (6, 6, 8, 10):** code — ping me
- **Cancellation policy block:** code — ping me
- **Pricing FAQ:** FAQs — Categories = Pricing or Cancellations

### About (`/about`)

- **Hero:** Page copy → 07 About
- **Philosophy + Safe/Seen/Heard:** in code, copy-only — ping me to rephrase
- **"My story" three paragraphs:** Page copy → 07 About → Body
- **Credentials cards:** Credentials — one entry per card. Set Order to control
  position, iconStyle = featured for a star, standard for a dot.
- **FUEL band:** Site blocks → FUEL Woman of the Year band (shared with Sassy)
- **Studio section ("A studio that feels like the work"):** Site blocks →
  About — The studio

### Get Started (`/get-started`)

- **Hero:** Page copy → 08 Get Started
- **Three-step arc:** Site blocks → Sessions arc (shared)
- **"What to expect" cards:** in code — ping me
- **Pre-screening form:** in code — ping me if you want to add/remove fields
- **Booking widget:** Page copy → 08 Get Started → Acuity booking URL

### Contact (`/contact`)

- **Hero:** Page copy → 09 Contact
- **Form fields:** in code — ping me if you want to add/remove
- **Studio info block (address, hours, socials):** in code — ping me

### FAQ (`/faq`)

- **All FAQs by category:** FAQs collection. Categories: Getting started,
  Sessions, Pricing, Cancellations, General. Each FAQ also still shows on its
  relevant page (Sessions FAQs on /sessions, Pricing FAQs on /pricing).
- **Hero copy:** Page copy → 15 FAQ

### Privacy + Terms (`/privacy`, `/terms`)

- **Hero copy:** Page copy → 11 Privacy policy / 12 Terms
- **Long-form body:** in code today (legal-ish copy, less likely to need
  edits) — ping me to update sections

### Speaking (`/speaking`)

- **Hero + intro:** Page copy → 10 Speaking
- **Article/podcast/workshop cards:** in code — ping me

### Blog (`/blog`, `/blog/[slug]`)

- **Posts:** Blog posts → one entry per post. Set Date, Excerpt, Cover image,
  Tags. Untick Draft to publish.
- **Index page hero:** in code — ping me

## A few rules of thumb

- **Always click Publish** in the CMS for your changes to go live. The site
  rebuilds in about 30 seconds after you publish.
- **"In code" means** the text lives in the Astro template files that Richie
  maintains. If you find yourself wanting to edit something marked "in code"
  often, ping me and I'll move it into the CMS.
- **Site blocks are shared across pages.** Editing the FUEL band updates both
  Sassy Seniors and About. The Sessions arc updates Sessions, About, and Get
  Started. This is intentional — one edit, multiple pages updated.
- **Photos:** see `PHOTOS.md` (or `PHOTOS.pdf`) for the size specs.
- **Aweber blog import:** see `AWEBER_IMPORT.md` for the easiest way to bring
  your old newsletters across.
