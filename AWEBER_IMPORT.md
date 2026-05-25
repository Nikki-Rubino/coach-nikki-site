# Importing Aweber newsletters into the blog

Quick reference for porting Nikki's existing Aweber newsletter content into the
Astro blog. Three routes depending on how much you want to bulk-import.

## Option A — manual paste (recommended for ≤10 posts)

For a handful of newsletters this is faster than any export dance.

1. Log into Aweber, open the past broadcasts list
2. Open a newsletter, copy the body text (the article itself, not Aweber's
   wrapper or footer)
3. In Decap CMS at `/admin`, go to **Blog posts → New post**
4. Fill in:
   - Title (the newsletter subject line is usually a good start)
   - Date (use the date it was sent)
   - Excerpt (one or two sentences from the opening — used as the listing preview)
   - Tags (whatever fits — recovery, animal flow, over 50, etc.)
   - Cover image (optional — upload from your computer)
   - **Draft: off** when ready to publish
   - Body: paste your newsletter content, format it up
5. Save and publish

Decap's markdown editor handles bold, italics, lists, links, headings and
images out of the box. The CSS will style it the same as the existing posts.

## Option B — Aweber HTML export → batch convert (good for 10–30 posts)

If you've got a backlog of newsletters worth saving:

1. In Aweber, go to **Broadcasts → Show archived broadcasts** (or similar — the
   UI moves around). For each broadcast you want, use the **View Web Version**
   link to get the full HTML page
2. Save each as `.html` to a folder on your computer (Right-click → Save Page
   As → "HTML, complete")
3. Send the folder to Claude with a message like "convert these Aweber HTML
   files to blog posts" — I'll write a script that:
   - Parses out the title, date, body
   - Strips Aweber's branding, tracking pixels, and unsubscribe footers
   - Outputs one markdown file per post in `src/content/blog/`
   - You review and publish from the CMS

## Option C — Aweber CSV export → bulk import (only if 30+ posts)

Aweber lets you export broadcast history as CSV (in their account settings,
varies by plan). The CSV gives subject + date + body. Same story as Option B —
send the CSV to Claude and I'll batch-convert.

## What to keep, what to drop

For all options, when converting:
- **Keep:** the actual article content, your voice, any images
- **Drop:** subject-line preheaders ("Hey [first name]…"), unsubscribe links,
  Aweber tracking pixels, anything that only makes sense in an email context
  ("scroll to the bottom for the link" etc.)
- **Add:** a closing sentence that fits the blog (e.g. a CTA to /get-started
  or a related post link)

## Image handling

Aweber images won't carry over automatically — they're hosted on Aweber's CDN
and might disappear when subscriptions lapse. For each post:
1. Right-click the original image in the Aweber broadcast, save to your
   computer
2. In Decap, upload it through the **Cover image** field or inline in the
   body via the markdown editor's image button
3. Images land in `/public/uploads/` and stay on the site permanently
