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

// Site-wide reusable content blocks (FUEL band, etc) — singletons rendered on
// multiple pages from one source so Nikki edits once and every page updates.
const site = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/site' }),
  schema: z.object({
    title: z.string(),
    awardTagText: z.string().optional(),
    heading: z.string().optional(),
    pullQuote: z.string().optional(),
    pullQuoteCite: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaHref: z.string().optional(),
  }),
});

export const collections = { pages, blog, testimonials, sessions, faqs, site };
