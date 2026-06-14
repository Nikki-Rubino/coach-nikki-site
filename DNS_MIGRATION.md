# DNS migration: coachnikki.com.au from Wix to Netlify

Goal: point the domain at the Netlify-hosted Astro site, with `www.coachnikki.com.au`
as the primary address (apex redirects to www, matching `astro.config.mjs`).

## Current state (verified 2026-06-13)

- **Nameservers:** ns6.wixdns.net, ns7.wixdns.net (DNS is run by Wix)
- **Apex `coachnikki.com.au`:** A records to Wix hosting (185.230.63.107 / .171 / .186)
- **www:** CNAME to cdn1.wixdns.net (Wix CDN)
- **MX (email):** none — there is no domain email to protect, so this move can't break email
- **TXT:** none at apex
- **Registrar of record:** Tucows / OpenSRS — this is Wix's domain backend, so the domain
  was almost certainly bought through Wix and is managed in your Wix account.
- **Target:** coach-nikki.netlify.app (live, serving the new site)

## Approach: move nameservers to Netlify DNS

Netlify becomes the full DNS host. It auto-creates the apex + www records and the SSL
certificate. Because there are no other records (no email, no TXT), nothing else needs
recreating — this is a clean switch.

Note: changing nameservers is NOT a domain transfer. The domain stays registered with
Wix (you keep paying the Wix renewal) unless you choose to transfer it later. Moving NS
just changes who answers DNS queries.

---

## Step 1 — Netlify side (do this FIRST, before touching Wix)

1. Log in to Netlify → open the **coach-nikki** site.
2. **Site configuration → Domain management → Add a domain.**
3. Enter `coachnikki.com.au` and add it. Netlify will detect the domain is not yet on
   Netlify DNS and offer **"Set up Netlify DNS" / "Activate Netlify DNS"** — choose that.
4. Netlify creates a DNS zone for the domain and shows you **4 nameservers** that look like:
   - `dns1.p0X.nsone.net`
   - `dns2.p0X.nsone.net`
   - `dns3.p0X.nsone.net`
   - `dns4.p0X.nsone.net`
   (the `p0X` number is assigned to your zone — copy the exact 4 it shows you.)
5. Make sure both `coachnikki.com.au` and `www.coachnikki.com.au` are listed on the site.
   Set **`www.coachnikki.com.au` as the primary domain** — Netlify then auto-creates a
   301 redirect from the apex to www.
6. Copy those 4 Netlify nameservers for the next step.

## Step 2 — Wix side (the actual cutover)

1. Go to your Wix account domains: **wix.com/account/domains** → click **coachnikki.com.au**.
2. Open **Advanced** (sometimes "Manage DNS records" / "Domain settings").
3. Find **Nameservers**. Choose the option to use **custom / external nameservers**
   (Wix wording varies: "Connect to a different DNS provider", "Point to external
   nameservers", or "Use external nameservers").
4. Replace the two Wix nameservers (`ns6.wixdns.net`, `ns7.wixdns.net`) with the **4
   Netlify nameservers** from Step 1. Save.
5. Wix may warn that the domain will disconnect from your Wix site — **this is expected
   and intended.** You're moving hosting off Wix.

## Step 3 — Wait for propagation

- Nameserver changes typically take 1–4 hours, occasionally up to 48 hours.
- Once Netlify sees itself as authoritative, it automatically provisions a free
  Let's Encrypt SSL certificate (usually minutes, can be up to ~24h).

## Step 4 — Verify before cleanup

Confirm all of these before cancelling anything on Wix:
- `www.coachnikki.com.au` loads the new Netlify site over **https** (padlock, valid cert).
- `coachnikki.com.au` (apex) **redirects** to `https://www.coachnikki.com.au`.
- In Netlify, the domain shows "Netlify DNS" and SSL = green/active.

(Claude can verify the nameservers, apex/www resolution, SSL issuance, and the
apex→www redirect for you once you've flipped it.)

## Step 5 — Cleanup (only after verifying)

- Cancel the Wix **website/hosting** subscription (keep the **domain** registration with
  Wix unless you deliberately transfer it elsewhere later).
- Don't let the domain registration lapse — that's separate from hosting.

---

## Gotchas / notes

- **Email:** none today, so no impact. If Nikki ever adds domain email (e.g. Google
  Workspace) later, the MX/TXT records must be created in **Netlify DNS**, not Wix.
- **Transfer vs nameservers:** we're only changing nameservers. The 60-day transfer lock
  doesn't apply. Registration stays at Wix/Tucows.
- **Old Wix URLs / SEO:** the old Wix blog used `/post/<slug>`; the new site uses
  `/blog/<dated-slug>`. Most imported posts are still `draft: true`, so few old URLs are
  live yet. If you want clean 301s from old Wix paths, that's a `public/_redirects` file
  in the repo (a code change, not a dashboard action) — ask Claude to build it.
- **Rollback:** if anything looks wrong during propagation, set the Wix nameservers back
  to `ns6.wixdns.net` / `ns7.wixdns.net` and the old Wix site returns.
