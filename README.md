# Autonode Website

Static teaser site for OEM, NBFC, and investor partnership inquiries.

## Structure

```
autonode-site/
├── index.html          # the site
├── vercel.json         # deploy config + asset caching
└── assets/
    ├── hero-landscape.jpg
    ├── city-golden.jpg
    ├── desert-sunset.jpg
    └── city-street.jpg
```

## Deploy to Vercel — three options

### Option 1: Drag & Drop (fastest)

1. Go to https://vercel.com/new
2. Drag the entire `autonode-site` folder onto the page
3. Click **Deploy**. Done in ~15 seconds.

### Option 2: Vercel CLI

```bash
npm i -g vercel
cd autonode-site
vercel
```

Follow the prompts. Deploy to production with `vercel --prod`.

### Option 3: GitHub → Vercel (best for iteration)

1. Push the folder to a new GitHub repo
2. In Vercel, click **New Project** → import the repo
3. Every future `git push` auto-deploys

## Custom Domain (autonodelabs.com)

After deploying:
1. In Vercel project → **Settings** → **Domains**
2. Add `autonodelabs.com` and `www.autonodelabs.com`
3. Update your domain registrar's DNS as Vercel instructs (usually an A record + CNAME)

## Why images weren't loading locally

Browsers block image loads when you open an HTML file directly via `file://` — it's a security restriction, not a broken path. On Vercel (or any HTTP server), this goes away. If you want to preview locally before deploying:

```bash
cd autonode-site
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing copy

All text lives inside `index.html`. Search for the section headings (`HERO`, `THE GAP`, `VISION`, `STAKEHOLDERS`, `FINAL CTA`) to find what you want to change.

## Replacing images

Drop new JPGs into `assets/` with the same filenames, or edit the `src="/assets/..."` paths in `index.html`. Keep images under 500 KB for fast load — use [squoosh.app](https://squoosh.app) if you need to compress.
