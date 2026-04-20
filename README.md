# Autonode Website — Cinematic v3 (video)

Teaser site for OEM, NBFC, and investor partnership inquiries. Single-file HTML + video/poster assets, zero build step.

## Structure

```
autonode-site/
├── index.html                # the entire site
├── vercel.json               # deploy config + long-lived asset caching
├── README.md
└── assets/
    ├── hero-landscape.mp4    # signature cover — Cybertruck sunset
    ├── hero-landscape.jpg    # poster fallback
    ├── city-golden.mp4       # urban gap section
    ├── city-golden.jpg       # poster fallback
    ├── desert-sunset.mp4     # vision card 02
    ├── desert-sunset.jpg     # poster fallback
    ├── city-street.mp4       # vision card 03
    └── city-street.jpg       # poster fallback
```

Total video payload: ~3.8 MB across 4 clips (535 KB – 1.4 MB each). All ~6 sec loops.

## How videos behave

- **Autoplay:** all videos autoplay on page load (muted — browser requirement for autoplay)
- **Loop:** seamless ~6 sec loops
- **Poster fallback:** JPGs show instantly while MP4s load, so no black frames
- **Mobile:** `playsinline` prevents iOS from fullscreening them; `preload="metadata"` saves bandwidth on non-hero videos
- **No audio:** tracks are stripped — cinema silent, background motion only

## What was fixed from v1

**Image paths.** The previous build used absolute paths like `/assets/hero-landscape.jpg`. On GitHub Pages (where the site lives at `username.github.io/reponame/`), the leading slash makes the browser look at `username.github.io/assets/...` — which doesn't exist on that subdomain's root.

v2 uses **relative paths** (`assets/hero-landscape.jpg`, no leading slash). This works identically on:
- Vercel (custom domain or `*.vercel.app`)
- GitHub Pages (`*.github.io/reponame`)
- Netlify
- Local HTTP servers (`python3 -m http.server`)

## Deploy to Vercel

### Drag & drop (fastest, ~15 sec)
1. https://vercel.com/new
2. Drag the whole folder onto the drop zone
3. Click **Deploy**

### Vercel CLI
```bash
npm i -g vercel
cd autonode-site
vercel --prod
```

### GitHub → Vercel (best for iteration)
1. Push folder to a new GitHub repo
2. Vercel dashboard → **New Project** → import the repo
3. Every `git push` auto-deploys

## Custom domain (autonodelabs.com)

After first deploy:
1. Vercel project → **Settings** → **Domains**
2. Add `autonodelabs.com` and `www.autonodelabs.com`
3. Follow the DNS instructions Vercel gives you (usually one A record on the apex, one CNAME on `www`)

## Previewing locally

Never open `index.html` with `file://` — modern browsers block cross-origin image loading on that protocol and the site will look broken. Instead:

```bash
cd autonode-site
python3 -m http.server 8000
# then visit http://localhost:8000
```

Or use any static server:
```bash
npx serve .
```

## Replacing videos

Drop new MP4s into `assets/` with the **same filenames** (overwrite). Also regenerate the poster JPG so there's no lag on load:

```bash
# from the project folder
ffmpeg -i assets/hero-landscape.mp4 -ss 00:00:02 -vframes 1 -q:v 3 assets/hero-landscape.jpg
```

**If you have a new video from Grok/Runway/etc.** and want to prep it for web (compress, crop watermark, etc.), here's the one-liner I used:

```bash
# -vf "crop=iw:ih-60:0:0" strips 60px off the bottom (watermark zone)
# scale to 1280w, CRF 28 = good balance of size/quality, -an = no audio
ffmpeg -i source.mp4 \
  -vf "crop=iw:ih-60:0:0,scale=1280:-2" \
  -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p \
  -movflags +faststart -an \
  assets/new-video.mp4
```

**Performance target:** Keep each video under 1.5 MB. The hero is the only one set to `preload="auto"` (loads immediately). The other three use `preload="metadata"` so they only fully download when the user scrolls near them.

## Editing copy

All text lives inline in `index.html`. Search for these section comments to jump to the right place:
- `<!-- Hero -->` — headline, sub, CTAs
- `<!-- Stats -->` — the three problem stats (82%, ~5%, 0)
- `<!-- Marquee -->` — scrolling band of capability names
- `<!-- Gap -->` — "Every EV that can't be fairly financed"
- `<!-- Opportunity -->` — market sizing: 2W/4W/eLCV penetration today → 2030e, and the ₹164 Bn total
- `<!-- Vision -->` — three product cards (Residual Value Engine / Battery Risk Scorer / Lender API)
- `<!-- Stakeholders -->` — OEMs / NBFCs / investors cards
- `<!-- Credibility -->` — "Built by operators" band (no names, just credentials + companies)
- `<!-- Final CTA -->` — "Let's build India's EV intelligence layer"

## Updating market numbers

The Opportunity section uses data from FY25 (NITI Aayog, IBEF, JMK Research). Numbers to refresh periodically:
- 2W EV penetration: currently 6% (FY25: 1.14 Mn sold)
- 4W EV penetration: currently 2.5% (FY25: 106K sold)
- eLCV: <2% (3W already 60%+)
- 2030e total EV sales: 25 Mn units / $164 Bn market value

Sources worth checking quarterly: VAHAN portal, SMEV, JMK Research's EV Annual Report.
