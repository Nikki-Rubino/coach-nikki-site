// Astro v5 Content Collections
// Schemas here are the contract between markdown files in src/content
// and the Decap CMS config at public/admin/config.yml.
// If you add/remove fields, mirror the change in both places.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Editable per-page copy (hero, intro, callouts) — keyed by slug.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    heroHeadline: z.string().optional(),
    heroSubcopy: z.string().optional(),
    heroImage: z.string().optional(),
    primaryCtaLabel: z.string().optional(),
    primaryCtaHref: z.string().optional(),
    secondaryCtaLabel: z.string().optional(),
    secondaryCtaHref: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    /** Acuity Scheduling iframe URL — used on the Timetable + Get Started pages */
    acuityEmbedUrl: z.string().url().optional(),
    /** YouTube video ID (the 11-char bit after watch?v= in the URL). Used on /animal-flow. */
    youtubeVideoId: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    author: z.string().default('Nikki Rubino'),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(), // e.g. "Sassy Seniors regular"
    program: z
      .enum([
        '1:1',
        'Semi-private',
        'Animal Flow',
        'Sassy Seniors',
        'Semi-Private PT',
        'Workshop',
        'Other',
      ])
      .optional(),
    quote: z.string(),
    avatar: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

// Class types / session products: 1:1, Sassy Seniors, AF Skills, etc.
const sessions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sessions' }),
  schema: z.object({
    title: z.string(),
    tag: z.string().optional(), // small chip label
    tagStyle: z.enum(['teal', 'pink', 'orange']).default('teal'),
    summary: z.string(),
    capacity: z.string().optional(), // e.g. "Up to 8"
    duration: z.string().optional(), // e.g. "45 min"
    bestFor: z.string().optional(),
    image: z.string().optional(),
    price: z.string().optional(),
    bookingUrl: z.string().optional(),
    order: z.number().default(0),
    showOnHome: z.boolean().default(false),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    category: z
      .enum(['Getting started', 'Pricing', 'Cancellations', 'Sessions', 'General'])
      .default('General'),
    order: z.number().default(0),
  }),
});

// Site-wide reusable content blocks (FUEL band, sessions arc, etc) — singletons
// rendered on multiple pages from one source so Nikki edits once and every page
// updates. Most fields are optional — each block uses whichever subset it needs.
const site = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/site' }),
  schema: z.object({
    title: z.string(),
    page: z.string().optional(), // Used for CMS filter (e.g. "Home", "Pricing")
    eyebrow: z.string().optional(),
    heading: z.string().optional(),
    subHeading: z.string().optional(),
    lead: z.string().optional(),
    bullets: z.array(z.string()).optional(),
    closingLine: z.string().optional(),
    awardTagText: z.string().optional(),
    pullQuote: z.string().optional(),
    pullQuoteCite: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaHref: z.string().optional(),
    ctaSecondaryLabel: z.string().optional(),
    ctaSecondaryHref: z.string().optional(),
    ctaSubcopy: z.string().optional(),
    steps: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .optional(),
    introCtaHeadline: z.string().optional(),
    introCtaSubcopy: z.string().optional(),
    introCtaLabel: z.string().optional(),
    introCtaHref: z.string().optional(),
    bandText: z.string().optional(),
    bandTagText: z.string().optional(),
    // Three "doors" or feature cards (Home, etc.)
    doors: z
      .array(
        z.object({
          tag: z.string(),
          tagStyle: z.enum(['teal', 'pink', 'orange']).default('teal'),
          heading: z.string(),
          body: z.string(),
          href: z.string(),
          imageHint: z.string().optional(),
          arrowLabel: z.string().default('Learn more →'),
        })
      )
      .optional(),
    // Tiles like Safe/Seen/Heard (word + body)
    tiles: z
      .array(z.object({ word: z.string(), body: z.string() }))
      .optional(),
    // Pricing tier cards
    tiers: z
      .array(
        z.object({
          label: z.string(),
          headline: z.string().optional(),
          amount: z.string(),
          amountNote: z.string().optional(),
          desc: z.string().optional(),
          bullets: z.array(z.string()).default([]),
          ctaLabel: z.string().optional(),
          ctaHref: z.string().optional(),
          featured: z.boolean().default(false),
        })
      )
      .optional(),
    // Policy blocks (heading + bullets) — pricing cancellations etc.
    policies: z
      .array(z.object({ heading: z.string(), bullets: z.array(z.string()) }))
      .optional(),
    // Get Started "what to expect" cards (icon + label + body)
    cards: z
      .array(z.object({ icon: z.string(), label: z.string(), body: z.string() }))
      .optional(),
    // Footer / contact link lists
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          external: z.boolean().default(false),
        })
      )
      .optional(),
    linkGroups: z
      .array(
        z.object({
          heading: z.string(),
          items: z.array(
            z.object({
              label: z.string(),
              href: z.string(),
              external: z.boolean().default(false),
            })
          ),
        })
      )
      .optional(),
    // Generic key/value rows (e.g. studio hours, contact info)
    rows: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .optional(),
    // Footer-specific
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    copyrightLine: z.string().optional(),
    creditLine: z.string().optional(),
    // Capacity grid (4 cards with number + label)
    capacityGrid: z
      .array(z.object({ number: z.string(), label: z.string() }))
      .optional(),
    capacityCaption: z.string().optional(),
    // Generic CTA banner inside a section
    bannerHeadline: z.string().optional(),
    bannerSubcopy: z.string().optional(),
  }),
});

// Credentials shown on the About page. Each card is its own entry so Nikki can
// add/remove/reorder them. `body` is optional in the frontmatter — Decap stores
// long-form text as the markdown content below the frontmatter, which Astro
// exposes via `rendered.html`. Either source works (see /about template).
const credentials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/credentials' }),
  schema: z.object({
    title: z.string(),
    iconStyle: z.enum(['featured', 'standard']).default('standard'),
    body: z.string().optional(),
    linkLabel: z.string().optional(),
    linkHref: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  pages,
  blog,
  testimonials,
  sessions,
  faqs,
  site,
  credentials,
};
