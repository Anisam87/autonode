# Autonode Website — Cinematic v2

Teaser site for OEM, NBFC, and investor partnership inquiries. Single-file HTML + four image assets, zero build step.

## Structure

```
autonode-site/
├── index.html          # the entire site
├── vercel.json         # deploy config + long-lived asset caching
├── README.md
└── assets/
    ├── hero-landscape.jpg    # signature cover illustration
    ├── city-golden.jpg       # urban gap section
    ├── desert-sunset.jpg     # vision card 02
    └── city-street.jpg       # vision card 03
```

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

## Replacing images

Drop new JPGs into `assets/` with the **same filenames** (overwrite) and they pick up automatically. Or edit the `src="assets/..."` paths inside `index.html`.

**Performance note:** Keep each image under 500 KB. Use [squoosh.app](https://squoosh.app) to compress. The current images are already optimised (137 KB – 481 KB each).

## Generating more images in the same style

Stock sites don't carry this specific aesthetic (pastel AI-illustrated cars at sunset). If you want more in the exact style, regenerate with the same AI prompt you used — keywords like `pastel anime illustration car sunset atmospheric cinematic 80s retro studio ghibli`.

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
