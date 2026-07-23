---
title: Technology Stack
date: 2026-07-20
last_mapped_commit: b3da0ffd3977d7bbf9c0c92d224f4930b9acd509
---

# Technology Stack

## Languages

- **TypeScript** ^6.0.3 — primary language for all source code in `src/`

## Runtime

- **Node.js** — build-time only (Vite dev server and bundler)
- **Browser** — runtime target; `tsconfig.json` targets ES2021 with DOM libs

## Frameworks

- **Lit** ^3.3.2 — web component framework for building custom elements (`src/example.ts`)
- **Vite** ^8.0.12 (dev) — dev server and production bundler; no custom `vite.config.*` (uses defaults)
- **Tailwind CSS** ^4.3.1 — utility-first CSS; integrated via `@tailwindcss/postcss` (Tailwind v4 zero-config PostCSS plugin)
- **PostCSS** ^8.5.15 — CSS processing pipeline (required by Tailwind v4)

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| `lit` | 3.3.3 | Web component framework (LitElement, html, css, decorators) |
| `tailwindcss` | 4.3.1 | Utility CSS classes |
| `@tailwindcss/postcss` | 4.3.1 | Tailwind v4 PostCSS integration (replaces `tailwind.config.*`) |
| `postcss` | 8.5.15 | CSS transformer (required by Tailwind) |
| `typescript` | 6.0.3 | Type checking and compilation |

### Development

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | 8.0.16 | Dev server (`pnpm dev`) and production build (`pnpm build`) |

## Configuration

- `tsconfig.json` — TypeScript config; ES2021 target, ESNext modules, bundler resolution, `experimentalDecorators: true`, `useDefineForClassFields: false` (required for Lit decorators)
- `package.json` — project manifest; ESM (`"type": "module"`)
- `pnpm-lock.yaml` — lockfile (pnpm v9.0 format)
- No `vite.config.*` — Vite runs with defaults (SPA mode, serves `index.html` at root)
- No `tailwind.config.*` — Tailwind v4 uses zero-config PostCSS plugin
- No `postcss.config.*` — PostCSS configured implicitly via Vite's `@tailwindcss/postcss` integration
- No `.env` files present

## Build & Scripts

| Command | Action |
|---------|--------|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Production build to `dist/` |
| `pnpm preview` | Preview production build locally |

## Platform Requirements

- **Development:** Node.js (LTS recommended), pnpm
- **Production:** Static file hosting (output is `dist/` — pure HTML/CSS/JS, no server needed)

---

*Stack analysis: 2026-07-20*
