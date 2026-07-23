---
title: External Integrations
date: 2026-07-20
last_mapped_commit: b3da0ffd3977d7bbf9c0c92d224f4930b9acd509
---

# External Integrations

## APIs

None. This is a static portfolio site with no external API calls.

## Databases

None. No database client, ORM, or data layer detected.

## Authentication

None. No auth provider, session management, or login flow.

## Webhooks

None. No incoming or outgoing webhook handlers.

## CDN / Hosting

- **Static file hosting** — site builds to `dist/` via `pnpm build`; intended for deployment as static files (GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.)
- No hosting configuration files detected (no `netlify.toml`, `vercel.json`, `_redirects`, etc.)

## Analytics / Monitoring

None. No analytics SDK, error tracking, or observability tooling detected.

## External Assets

- `public/favicon.svg` — inline SVG favicon (Vite Lightning logo variant)
- `public/icons.svg` — SVG sprite sheet containing social media icons:
  - Bluesky (`#bluesky-icon`)
  - Discord (`#discord-icon`)
  - GitHub (`#github-icon`)
  - X/Twitter (`#x-icon`)
  - Documentation (`#documentation-icon`)
  - Social link (`#social-icon`)

  These are local SVG assets served from `/public/`, not fetched from external CDNs.

## Environment Configuration

No environment variables required. No `.env` files present.

---

*Integration audit: 2026-07-20*
