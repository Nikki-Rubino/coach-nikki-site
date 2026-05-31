// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.coachnikki.com.au',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  image: {
    // Allow Astro's <Image> component to optimise remote images from Cloudinary.
    // The Decap CMS media library uploads to this Cloudinary account, then
    // saves the full https://res.cloudinary.com/db6eijltv/... URL into markdown.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/db6eijltv/**',
      },
    ],
  },
});
