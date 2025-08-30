# DataCleanup Pro — GitHub Pages Site

Static landing site + upload UI. Designed to run on GitHub Pages and talk to a separate backend API.

## Quick start
1. Edit `js/config.js` and set `API_BASE` to your backend domain (e.g., `https://api.chatlogic.xyz`).
2. Commit & push to your repo.
3. In **Repo → Settings → Pages**, choose branch (`main` or `gh-pages`) and folder (root).
4. (Optional) Custom domain: add it in Pages settings and configure your DNS CNAME.

## Files
- `index.html` — Landing page
- `pricing.html` — Pricing
- `upload.html` — Upload UI (POSTs to `${API_BASE}/v1/clean`)
- `success.html` / `cancel.html` — Stripe redirects
- `css/` — Styles
- `js/config.js` — API base configuration
- `js/payment.js` — Starts Stripe Checkout via `${API_BASE}/billing/create-checkout-session`
- `js/upload.js` — Uploads CSV/XLSX and downloads cleaned CSV
- `404.html` — Direct-link compatibility on Pages
- `.nojekyll` — Disables Jekyll processing on Pages

## Security
- No secrets in frontend code.
- Backend must enforce CORS to allowed origins.
- Use short‑lived job tokens for uploads.
