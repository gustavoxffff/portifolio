---
title: Technical Concerns
date: 2026-07-20
last_mapped_commit: b3da0ffd3977d7bbf9c0c92d224f4930b9acd509
---

# Technical Concerns

## Technical Debt

| Issue | Location | Impact | Priority |
|-------|----------|--------|----------|
| Tailwind CSS v4 declared as dependency but never configured or used — no `postcss.config.*`, no `vite.config.*`, no `@import "tailwindcss"` in any CSS | `package.json:15`, `src/index.css` | Dead dependency bloat; developer may expect Tailwind utility classes but they won't work. Confusion for anyone joining the project. | High |
| No `vite.config.ts` file exists — Vite runs on zero-config defaults only | Project root | Build is opaque. Cannot customize output dir, base path, plugins, or assets. Will break when static hosting needs a non-root base path or asset optimization. | High |
| `README.md` is empty | `README.md` | No onboarding docs, no build/deploy instructions, no project description. | Medium |
| `src/assets/` directory exists but is empty | `src/assets/` | Unused directory. Either dead scaffolding or assets were never added. | Low |
| Project name is "lit-example" and "example-element" — generic scaffold names never replaced | `package.json:2`, `src/example.ts:4` | Signals unfinished boilerplate, not a real portfolio site. | High |
| No linting or formatting configuration (no `.eslintrc`, no `.prettierrc`, no `biome.json`) | Project root | No code quality enforcement. Inconsistent style as codebase grows. | Medium |
| No `tsconfig.build.json` or build-specific TS config | Project root | `skipLibCheck: true` in `tsconfig.json:10` suppresses type errors in dependencies silently. | Low |

## Bugs

| Issue | Location | Impact |
|-------|----------|--------|
| `index.html` loads `src/example.js` (line 9) — relies on Vite dev server TS resolution. In a static build without `vite.config`, the compiled output path may not match. | `index.html:9` | Page may show blank if built output doesn't land at expected path. |
| Global CSS (`src/index.css`) is linked in HTML `<head>` before the Lit component renders — Lit shadow DOM will NOT inherit these styles. Body-level styles work, but component-level styles won't cascade. | `index.html:8`, `src/example.ts:6` | Component internal styles (`static style = css\`\``) are empty, so the component renders unstyled content if shadow DOM isolation is active. Currently works by accident because the component has no visual styling needs. | 
| `<example-element>` is used in HTML but the component class only has a counter — not a portfolio site. | `index.html:12`, `src/example.ts` | Site displays nothing portfolio-related. Placeholder content only. |

## Security

| Concern | Location | Risk |
|---------|----------|------|
| No CSP (Content Security Policy) headers configured | `index.html` | XSS risk if dynamic content is added later. Static site has low risk currently since content is hardcoded. |
| No `rel="noopener"` on any external links (none exist yet, but SVG icons reference external social platforms) | `public/icons.svg` | Low risk now; relevant when links to Bluesky, Discord, GitHub, X are added. |

## Performance

| Issue | Location | Impact |
|-------|----------|--------|
| `index.css` is loaded as a render-blocking `<link>` in `<head>` | `index.html:8` | Blocks first paint. For a tiny CSS file this is negligible but sets a bad pattern for growth. |
| No build output directory configured — `vite build` defaults to `dist/` but no deploy config exists | Project root | No optimization pipeline for static hosting (minification, hashing, preloading). Vite handles some of this by default, but no control over it. |
| `package.json` declares TypeScript as a production dependency (`dependencies`) rather than `devDependencies` | `package.json:16` | TypeScript gets installed in production/deploy environments unnecessarily. Wastes space. |
| `@tailwindcss/postcss` (v4.3.1) is listed as production dependency — unused heavy package | `package.json:12` | ~2MB+ of unused node_modules shipped if not tree-shaken at deploy. |

## Fragile Areas

- `src/example.ts` — Single file, single component. Any refactor requires touching this only file. No separation of concerns, no component hierarchy. Will not scale to a portfolio.
- `index.html` — Hardcoded script path (`/src/example.js`) is coupled to Vite dev server behavior. A static export or different bundler would break this reference.
- `package.json` — Missing `devDependencies` classification for build tools. TypeScript in `dependencies` instead of `devDependencies` (`package.json:16`). No `engines` field to pin Node version. No `build` deploy script.
- Project root — No `.env.example`, no deploy config (Netlify/Vercel/Cloudflare Pages), no CI/CD. Deployment is undefined.

## Missing Critical Features

| Feature gap | Problem | Blocks |
|-------------|---------|--------|
| No actual portfolio components | Only a counter demo exists | The entire purpose of the site |
| No routing | Single page with one element | Multi-section portfolio (about, projects, contact) |
| No build/deploy configuration | No `vite.config.ts`, no hosting config | Cannot deploy to any static host |
| No testing setup | No test framework, no test files | Quality assurance, regression prevention |
| No linting/formatting | No ESLint/Prettier/Biome config | Code consistency as team/codebase grows |
| No dark mode toggle | `color-scheme: light dark` in CSS respects system preference, but no manual toggle | User control over theme |
| No favicon optimization | `favicon.svg` is 2KB+ with embedded filters/gradients | Slow favicon loads on slow connections (minor) |

## Test Coverage Gaps

| Untested area | What's not tested | Files | Risk | Priority |
|---------------|-------------------|-------|------|----------|
| Entire codebase | Zero test files exist anywhere in the project | `src/example.ts` | No regression protection. Any change could silently break. | High |
| Build pipeline | No build validation or smoke tests | `package.json` | Broken builds may ship undetected. | Medium |
| Component rendering | No tests for Lit component render output or behavior | `src/example.ts` | Counter logic (`increment()`) untested. | Medium |
