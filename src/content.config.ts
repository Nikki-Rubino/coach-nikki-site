// Astro v5 Content Collections
// Schemas here are the contract between markdown files in src/content
// and the Decap CMS config at public/admin/config.yml.
// If you add/remove fields, mirror the change in both places.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Reusable block shapes (used in multiple page schemas below).
const Cta = z.object({
  heading: z.string().optional(),
  lead: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  ctaSecondaryLabel: z.string().optional(),
  ctaSecondaryHref: z.string().optional(),
});

const Step = z.object({ title: z.string(), body: z.string() });

const ArcBlock = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  lead: z.string().optional(),
  steps: z.array(Step).optional(),
  introCtaHeadline: z.string().optional(),
  introCtaSubcopy: z.string().optional(),
  introCtaLabel: z.string().optional(),
  introCtaHref: z.string().optional(),
});

const Tile = z.object({ word: z.string(), body: z.string() });

const Card = z.object({
  icon: z.string(),
  label: z.string(),
  body: z.string(),
});

const Door = z.object({
  tag: z.string(),
  tagStyle: z.enum(['teal', 'pink', 'orange']).default('teal'),
  heading: z.string(),
  body: z.string(),
  href: z.string(),
  imageHint: z.string().optional(),
  image: z.string().optional(),
  arrowLabel: z.string().default('Learn more →'),
});

const PricingTier = z.object({
  label: z.string(),
  headline: z.string().optional(),
  amount: z.string(),
  amountNote: z.string().optional(),
  desc: z.string().optional(),
  bullets: z.array(z.string()).default([]),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  featured: z.boolean().default(false),
});

const Policy = z.object({
  heading: z.string(),
  bullets: z.array(z.string()),
});

const CapacityCell = z.object({ number: z.string(), label: z.string() });

const Link = z.object({
  label: z.string(),
  href: z.string(),
  external: z.boolean().default(false),
});

const LinkGroup = z.object({
  heading: z.string(),
  items: z.array(Link),
});

const KeyValueRow = z.object({ label: z.string(), value: z.string() });

// ===========================================================================
// PAGES — one file per page on the site. Each page gets the hero fields PLUS
// whichever nested block objects it needs. All block fields are optional so
// each page only uses the subset it actually renders.
// ===========================================================================
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    // Shared hero fields (every page has these)
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
    /** YouTube video ID — used on /animal-flow and /speaking (main video for the page) */
    youtubeVideoId: z.string().optional(),
    /** Secondary video ID — used on /speaking for the vertical award-acceptance clip */
    awardVideoId: z.string().optional(),
    /** Companion vertical (9:16) clip — used on /animal-flow beside the main landscape video */
    verticalVideoId: z.string().optional(),
    /** Companion landscape (16:9) clip — used on /sassy-seniors beside the main vertical video */
    landscapeVideoId: z.string().optional(),
    /** Animal Flow hero badge text (orange pill) */
    badgeText: z.string().optional(),
    /** Timetable: static schedule image + intro note (replaces the live booking widget) */
    scheduleImage: z.string().optional(),
    scheduleNote: z.string().optional(),
    /** Sassy Seniors: up to three photos shown under the video */
    videoPhotos: z
      .object({
        image1: z.string().optional(),
        image2: z.string().optional(),
        image3: z.string().optional(),
      })
      .optional(),

    // ─── Home blocks ───────────────────────────────────────────────────
    doors: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
        items: z.array(Door).optional(),
      })
      .optional(),
    promise: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        tiles: z.array(Tile).optional(),
        pullQuote: z.string().optional(),
        pullQuoteCite: z.string().optional(),
      })
      .optional(),
    arc: ArcBlock.optional(), // also used by /home
    sessionsSectionHeader: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        caption: z.string().optional(),
      })
      .optional(),
    testimonialsHeader: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
      })
      .optional(),
    blogHeader: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        /** CMS-picked post slugs; empty = show the 3 most recent published */
        posts: z.array(z.string()).optional(),
      })
      .optional(),
    /** Onboarding info on the intro-screening thank-you page */
    onboarding: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
        rules: z
          .array(z.object({ label: z.string(), text: z.string() }))
          .optional(),
        closingHeading: z.string().optional(),
        closingBody: z.string().optional(),
        quote: z.string().optional(),
        quoteCite: z.string().optional(),
      })
      .optional(),
    /** Yellow FUEL trust strip under the home hero */
    trustStrip: z
      .object({
        badge: z.string().optional(),
        label: z.string().optional(),
        linkLabel: z.string().optional(),
        linkHref: z.string().optional(),
      })
      .optional(),

    // ─── Sassy Seniors blocks ──────────────────────────────────────────
    ifFamiliar: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        bullets: z.array(z.string()).optional(),
        closingLine: z.string().optional(),
      })
      .optional(),
    realStrength: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
        bullets: z.array(z.string()).optional(),
        closingLine: z.string().optional(),
        image: z.string().optional(),
      })
      .optional(),
    format: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        capacityGrid: z.array(CapacityCell).optional(),
      })
      .optional(),

    // ─── Animal Flow blocks ────────────────────────────────────────────
    whatIs: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        image: z.string().optional(),
      })
      .optional(),
    waysToTrain: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
      })
      .optional(),
    foundations: ArcBlock.optional(),
    l1Cert: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
        closingLine: z.string().optional(),
        ctaLabel: z.string().optional(),
        ctaHref: z.string().optional(),
      })
      .optional(),

    // ─── Pricing blocks ────────────────────────────────────────────────
    tiers: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        items: z.array(PricingTier).optional(),
        closingLine: z.string().optional(),
      })
      .optional(),
    weeklyUnpacked: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
        capacityGrid: z.array(CapacityCell).optional(),
        capacityCaption: z.string().optional(),
      })
      .optional(),
    policy: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
        items: z.array(Policy).optional(),
      })
      .optional(),

    // ─── About blocks ──────────────────────────────────────────────────
    philosophy: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
        tiles: z.array(Tile).optional(),
        /** Optional row of 3–4 photos shown under the philosophy block on /about.
         *  Stored as plain image-URL strings to match the Decap CMS list (single
         *  `field:` image widget), so CMS edits don't break the schema. */
        photos: z.array(z.string()).optional(),
      })
      .optional(),
    studio: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
        bullets: z.array(z.string()).optional(),
        closingLine: z.string().optional(),
        image: z.string().optional(),
      })
      .optional(),
    /** "My story" block on /about — editable eyebrow/heading + up to two portrait photos */
    storyEyebrow: z.string().optional(),
    storyHeading: z.string().optional(),
    storyImage: z.string().optional(),
    storyImage2: z.string().optional(),

    // ─── Get Started blocks ────────────────────────────────────────────
    expect: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        cards: z.array(Card).optional(),
      })
      .optional(),
    bookSection: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
      })
      .optional(),

    // ─── Timetable blocks ──────────────────────────────────────────────
    paths: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        cards: z.array(Card).optional(),
        closingLine: z.string().optional(),
      })
      .optional(),

    // ─── Contact blocks ────────────────────────────────────────────────
    info: z
      .object({
        address: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        links: z.array(Link).optional(),
        rows: z.array(KeyValueRow).optional(),
        bannerHeadline: z.string().optional(),
        bannerSubcopy: z.string().optional(),
        ctaLabel: z.string().optional(),
        ctaHref: z.string().optional(),
      })
      .optional(),

    // ─── Sessions blocks ───────────────────────────────────────────────
    intro: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
        closingLine: z.string().optional(),
      })
      .optional(),

    // ─── Speaking blocks ───────────────────────────────────────────────
    fuelMeaning: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
        closingLine: z.string().optional(),
        image1: z.string().optional(),
        image2: z.string().optional(),
        image3: z.string().optional(),
      })
      .optional(),
    speechIntro: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
        closingLine: z.string().optional(),
        ctaLabel: z.string().optional(),
        ctaHref: z.string().optional(),
      })
      .optional(),
    speechPull: z
      .object({
        pullQuote: z.string().optional(),
        pullQuoteCite: z.string().optional(),
      })
      .optional(),
    passion: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        ctaLabel: z.string().optional(),
        ctaHref: z.string().optional(),
        ctaSecondaryLabel: z.string().optional(),
        ctaSecondaryHref: z.string().optional(),
        body: z.string().optional(), // long-form story
        image: z.string().optional(),
      })
      .optional(),
    elsewhere: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        /** Blog post slugs (filenames without .md) picked in the CMS.
         *  When set, published posts replace the freeform cards below. */
        posts: z.array(z.string()).optional(),
        cards: z.array(Card).optional(),
      })
      .optional(),
    /** Podcasts / audio appearances — Spotify (or other) embeds on /speaking */
    podcasts: z
      .object({
        eyebrow: z.string().optional(),
        heading: z.string().optional(),
        lead: z.string().optional(),
        items: z
          .array(
            z.object({
              title: z.string(),
              embedUrl: z.string(),
              href: z.string().optional(),
            }),
          )
          .optional(),
      })
      .optional(),

    // ─── Final CTA banner — used on most pages ─────────────────────────
    finalCta: Cta.optional(),
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
    role: z.string().optional(),
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

const sessions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sessions' }),
  schema: z.object({
    title: z.string(),
    tag: z.string().optional(),
    tagStyle: z.enum(['teal', 'pink', 'orange']).default('teal'),
    summary: z.string(),
    capacity: z.string().optional(),
    duration: z.string().optional(),
    bestFor: z.string().optional(),
    image: z.string().optional(),
    price: z.string().optional(),
    bookingUrl: z.string().optional(),
    /** Card button on /sessions — defaults to "When it's on →" linking to /timetable */
    ctaLabel: z.string().optional(),
    ctaHref: z.string().optional(),
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

// ===========================================================================
// SITE — small singletons that are GENUINELY SHARED across multiple pages
// (FUEL band on /sassy-seniors AND /about; Sessions arc on 3+ pages; the
// yellow Intro band on /sessions; the Footer everywhere).
// Per-page blocks now live inside the page entries themselves.
// ===========================================================================
const site = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/site' }),
  schema: z.object({
    title: z.string(),
    // FUEL band fields
    awardTagText: z.string().optional(),
    heading: z.string().optional(),
    pullQuote: z.string().optional(),
    pullQuoteCite: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaHref: z.string().optional(),
    /** FUEL band photo (Nikki on stage at the Fuel summit) — rendered on /about, /sassy-seniors, /speaking */
    image: z.string().optional(),
    // Sessions arc fields
    eyebrow: z.string().optional(),
    lead: z.string().optional(),
    steps: z.array(Step).optional(),
    introCtaHeadline: z.string().optional(),
    introCtaSubcopy: z.string().optional(),
    introCtaLabel: z.string().optional(),
    introCtaHref: z.string().optional(),
    // Intro band fields
    bandText: z.string().optional(),
    bandTagText: z.string().optional(),
    // Footer fields
    lead2: z.string().optional(), // small line under Coach Nikki name
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    linkGroups: z.array(LinkGroup).optional(),
    copyrightLine: z.string().optional(),
    creditLine: z.string().optional(),
    // Branding fields (used by src/content/site/branding.md)
    logoImage: z.string().optional(),
    logoAlt: z.string().optional(),
    siteName: z.string().optional(),
    siteTagline: z.string().optional(),
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
