# coach-nikki-site

Astro site for Coach Nikki (coachnikki.com.au), hosted on Netlify, content edited by Nikki via Decap CMS at `/admin`.

## Local dev

```
npm install
npm run dev      # http://localhost:4321
npm run build    # writes to ./dist
npm run preview  # serves ./dist locally
```

## Editing content

- **Nikki (non-technical):** visit `https://<your-netlify-domain>/admin`, log in, edit. Changes commit to GitHub; Netlify rebuilds in ~60 seconds.
- **Richie (structural):** edit files in `src/` directly; commit and push.

## Layout

```
site/
├── public/
│   ├── admin/          # Decap CMS (config.yml + index.html)
│   └── uploads/        # CMS-uploaded images land here
├── src/
│   ├── components/     # Astro components (Nav, Footer, etc.)
│   ├── content/        # Markdown content (collections defined in config.ts)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route → file
│   └── styles/global.css   # Tropical Punch palette + primitives
├── astro.config.mjs
├── netlify.toml
└── package.json
```

## Stack

- **Astro 5** — static site, zero JS by default
- **Decap CMS** — git-backed content editing at `/admin`
- **Netlify** — hosting, forms, identity (for CMS auth)
- **Acuity Scheduling** — booking embed (added in later session)

See `GITHUB_SETUP.md` for first-time repo creation steps.
