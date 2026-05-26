# Photo specs — what to prepare for each placeholder

Every photo placeholder on the site has a fixed aspect ratio. If you prep
your images at the right ratio they'll drop in cleanly without awkward
cropping. Sizes below are "minimum recommended" — bigger is fine, the site
will scale them down.

## The four shapes used across the site

| Shape | Ratio | Min size | Where it's used |
|---|---|---|---|
| Portrait | 4:5 (1080 × 1350 Instagram-style) | **1200 × 1500 px** | Hero images, side-by-side feature blocks, Animal Flow hero, Speaking hero, FUEL band |
| Landscape | 4:3 | **800 × 600 px** | The three-door cards on the home page, session catalogue cards, Speaking page grid |
| Wide landscape | 16:10 | **800 × 500 px** | Session cards on home page, blog post thumbnails |
| Video / wide media | 16:9 | **1280 × 720 px** | Animal Flow video block, Speaking page video player |

Tip: if you're cropping from a phone photo, the portrait shape (4:5) is what
Instagram uses for portrait posts. Easy to match.

## Page-by-page list of placeholders

### Home (`/`)
| Placeholder | Shape | Subject hint |
|---|---|---|
| Hero photo (right of headline) | 4:5 portrait | Studio glow-light vibe with Nikki coaching |
| Three door cards (top of page) | 4:3 landscape × 3 | Senior client mid-deadlift / Semi-private strength / Animal Flow movement |
| Session cards (mid-page) | 16:10 wide × up to 6 | One per session type — same image as the matching session card on `/sessions` is fine |
| Blog post thumbnails | 16:10 wide × 3 | Per blog post — usually a feature photo from the post |

### Sessions (`/sessions`)
| Placeholder | Shape | Subject hint |
|---|---|---|
| Hero photo | 4:5 portrait | Studio collage — Classics, AF, semi-private strength |
| Session detail cards | 4:3 landscape × 6 | One per session type. Pulled from the **Sessions** collection's Image field in the CMS |

### Sassy Seniors (`/sassy-seniors`)
| Placeholder | Shape | Subject hint |
|---|---|---|
| Hero photo | 4:5 portrait | Senior client mid-strength move, glow lights, real smile |
| FUEL band photo | 4:5 portrait | Nikki on stage at the Fuel summit. **Singleton** — same photo also shows on `/about` |
| "Real strength training" photo | 4:5 portrait | Senior client mid-deadlift, smiling |

### Animal Flow (`/animal-flow`)
| Placeholder | Shape | Subject hint |
|---|---|---|
| Hero photo | 4:5 portrait | Client in Beast hold, glow lights |
| "What it is" photo | 4:5 portrait | Beast or Crab hold, mid-flow |
| Video block | 16:9 widescreen | 30-second studio flow demo |
| Session detail cards | 4:3 landscape × 2 | One per AF session (Skills + Build a Flow). Pulled from the Sessions collection |

### About (`/about`)
| Placeholder | Shape | Subject hint |
|---|---|---|
| Hero photo | 4:5 portrait | Nikki in the studio, glow-light vibe, candid |
| "My story" photo | 4:5 portrait | Nikki younger / origin moment |
| FUEL band photo | 4:5 portrait | Nikki on stage at the Fuel summit. Same as Sassy Seniors |
| Studio photo (bottom) | 4:5 portrait | Studio wide shot, glow lights on |

### Speaking (`/speaking`)
| Placeholder | Shape | Subject hint |
|---|---|---|
| Hero photo | 4:5 portrait | Nikki on stage at Fuel Summit, mid-speech |
| Recognition grid | 4:3 landscape × 3 | Award moment / Group shot at summit / Nikki with award |
| Video player | 16:9 widescreen | Nikki's Fuel Summit speech |
| Portrait | 4:5 portrait | Portrait of Nikki for the "Passion" section |
| Media thumbnails | 4:3 landscape × 3 | Article / Podcast / Workshop |

### Get Started (`/get-started`)
| Placeholder | Shape | Subject hint |
|---|---|---|
| Hero photo | 4:5 portrait | Nikki coaching a new client through their assessment |

### Pricing (`/pricing`)
| Placeholder | Shape | Subject hint |
|---|---|---|
| Hero photo | 4:5 portrait | Studio detail or client smiling mid-session |

### Contact (`/contact`)
| Placeholder | Shape | Subject hint |
|---|---|---|
| Hero photo | 4:5 portrait | Studio exterior or doorway |

### Blog index (`/blog`)
| Placeholder | Shape | Subject hint |
|---|---|---|
| Post thumbnails | 16:10 wide × all posts | Per blog post |

## File format and size guidance

- **JPEG** for photos. PNG is huge and unnecessary for photographs.
- Aim to keep each image **under 500 KB**. Most online compressors (TinyJPG,
  Squoosh) will do this without visible quality loss.
- If you're working with a designer, **WebP** is even smaller for the same
  quality and Netlify serves it fine. But JPEG is the safest default.
- 72 dpi is what the browser uses. No need for 300 dpi print-quality files.

## How to upload through the CMS

For most photos:
1. Go to `/admin` and log in
2. Open the page you want the photo on (e.g. "07 About")
3. Use the **Hero image** field to upload — or, for images inside the page
   body (like the "my story" photo), use the image button in the markdown
   body editor
4. Save and publish — Netlify will redeploy and the photo replaces the
   placeholder

For session card images:
1. Go to **Sessions (class types)** in the CMS sidebar
2. Open the session you want (e.g. "Strong and Sassy Squad")
3. Upload to the **Image** field
4. Save and publish

For blog post thumbnails:
1. Open the blog post in the CMS
2. Upload to the **Cover image** field

For the FUEL band photo (used on both Sassy Seniors and About):
1. Go to **Site blocks** in the CMS sidebar
2. Open "FUEL Woman of the Year band"
3. Currently there's no image field on this block — let me know when you
   have the photo and I'll add one so it edits in one place

## One more thing — placeholder labels

While the photos are still missing, every placeholder shows a small italic
caption describing what should go there (e.g. "Photo: Nikki coaching a new
client through their assessment"). That's the cue for what to source. Once
you upload a real photo, the label disappears.
