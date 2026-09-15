# YieldAtlas

Static site (GitHub Pages). Visual/CSS/JS cloned 1:1 from the competitor niche skin; **names, domains, Sheet, and Apps Script are ours**.

## Local preview

```bash
pnpm dlx serve .
# open http://localhost:3000
```

## Custom domain

`CNAME` → `yieldatlas.com`

GitHub Pages (user **marvinsmx**): Settings → Pages → Deploy from branch `main` / root (or `/docs`).

DNS:
- Apex `A` → GitHub Pages IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`)
- `www` `CNAME` → `marvinsmx.github.io`

## Data (Google Sheet CSV)

1. Create a Google Sheet with columns matching this site’s table (see `data/seed.csv`).
2. File → Share → **Publish to web** → CSV.
3. Replace `REPLACE_ME_*` in HTML `CSV_URL` with your publish URL:

```
data/seed.csv