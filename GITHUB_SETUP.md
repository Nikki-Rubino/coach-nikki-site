# GitHub + Netlify first-time setup

One-time steps to get this `site/` folder onto Nikki's GitHub account and deployed to Netlify. After this is done, every push to `main` triggers a Netlify rebuild.

## 1. Create the GitHub repo

Sign in to GitHub as **Nikki** (the account you created on 2026-05-24 under her email), then either:

**Option A — via the web UI (easiest):**

1. Go to https://github.com/new
2. Repository name: `coach-nikki-site`
3. Owner: Nikki's account
4. Description: "Coach Nikki — Astro site, hosted on Netlify"
5. Visibility: **Private** (Decap CMS works fine with private repos via git-gateway)
6. **Do not** initialise with README, .gitignore, or licence — we already have those locally.
7. Click *Create repository*.

**Option B — via gh CLI (if you've authed `gh` as Nikki):**

```bash
gh repo create coach-nikki-site --private --description "Coach Nikki — Astro site, hosted on Netlify"
```

GitHub will show you the empty repo and a "push existing repository" snippet — ignore it, use the commands below instead so the initial commit is clean.

## 2. Push the local scaffold

From inside `/Coach Nikki/site/` on your machine:

```bash
cd "/Users/richieragel/Documents/Claude/Projects/Coach Nikki/site"

# Initialise git
git init -b main

# Stage everything (the .gitignore already excludes node_modules + .astro + dist)
git add .
git commit -m "Initial scaffold: Astro 5 + Decap CMS + Netlify config"

# Wire up Nikki's remote (replace <nikki-username> with her GitHub handle)
git remote add origin git@github.com:<nikki-username>/coach-nikki-site.git

# Push
git push -u origin main
```

If you're using HTTPS instead of SSH, the remote URL is:

```
https://github.com/<nikki-username>/coach-nikki-site.git
```

## 3. Add Richie as a collaborator

On the repo page on GitHub:

1. *Settings → Collaborators → Add people*
2. Add Richie's GitHub username with **Write** access.
3. Accept the invite from Richie's account.

This lets Richie push structural changes without going through Nikki.

## 4. Connect to Netlify

1. Sign in to https://app.netlify.com as Nikki (use the same email so the repo connection is clean).
2. *Add new site → Import an existing project*.
3. Choose **GitHub**, authorise Netlify on Nikki's account, pick `coach-nikki-site`.
4. Build settings (should auto-detect from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click *Deploy site*. First build ~2 minutes.
6. Once live, Netlify will give a `random-name-12345.netlify.app` URL. Rename it (Site settings → Site information → Change site name) to something like `coach-nikki`.

## 5. Wire up the CMS auth

Decap CMS needs a login mechanism. Easiest path is **Netlify Identity + Git Gateway**:

1. In Netlify: *Site configuration → Identity → Enable Identity*.
2. *Identity → Registration preferences → Invite only* (so randoms can't sign up).
3. *Identity → Services → Git Gateway → Enable Git Gateway*.
4. *Identity → Invite users → invite Nikki's email*. She'll get an email, click the link, set a password.
5. Test: visit `https://<your-netlify-domain>/admin` → log in → confirm the Pages/Blog/Testimonials/Sessions/FAQs collections load.

**Note:** Netlify Identity is in maintenance mode but still works. If/when Netlify retires it, we swap the backend in `public/admin/config.yml` to:

```yaml
backend:
  name: github
  repo: <nikki-username>/coach-nikki-site
  branch: main
```

…and set up a tiny OAuth proxy (Decap has a one-click Netlify function template for this). Not urgent.

## 6. Custom domain (later session)

Once the site looks good on the Netlify subdomain, we DNS-migrate `www.coachnikki.com.au` off Wix.

1. *Domain management → Add a domain* in Netlify.
2. Point Wix's DNS to Netlify (CNAME for `www`, A record for apex via Netlify's load-balancer IPs).
3. Wait for DNS propagation (~1 hour).
4. Netlify auto-issues a Let's Encrypt cert.
5. Set up 301 redirects from old Wix URLs in `netlify.toml`.

This is its own session — don't do it the same day as the launch in case anything goes sideways with DNS.

## Day-to-day workflow

- **Nikki edits content:** logs into `/admin`, edits a page or writes a blog post, hits Publish. Decap commits to `main`, Netlify rebuilds in ~60s, site updates.
- **Richie edits structure:** edits files in `src/`, commits, pushes. Same rebuild flow.
- **Local preview:** `cd site && npm install && npm run dev` → http://localhost:4321.

## Cancel the Squarespace trial

Before **2026-06-07**, log in to Squarespace at `springtail-squid-zkd2.squarespace.com` and cancel the trial to avoid the auto-charge. Memory note covers this.
