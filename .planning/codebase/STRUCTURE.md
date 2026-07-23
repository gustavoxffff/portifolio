---
title: Directory Structure
date: 2026-07-23
last_mapped_commit: 6db95a9e054d162ce10c1b901e948c5a2aaccbdf
---

# Codebase Structure

## Directory Layout

```
portifolio/
├── index.html              # HTML shell — entry point, SEO/OG meta, fonts, structured data
├── package.json            # Dependencies, scripts (dev/build/preview)
├── tsconfig.json           # TypeScript config (ES2021, decorators, strict)
├── postcss.config.js       # PostCSS plugin config (@tailwindcss/postcss)
├── pnpm-lock.yaml          # Dependency lockfile
├── .gitignore              # Git ignore rules
├── README.md               # Project readme
├── public/                 # Static assets served as-is (copied to build output)
│   ├── favicon.svg         # Browser tab icon
│   ├── icons.svg           # SVG sprite/icon collection
│   ├── robots.txt          # Crawler directives
│   └── sitemap.xml         # SEO sitemap
├── src/                    # Application source code
│   ├── main.ts             # App entry — imports all components
│   ├── index.css           # Global styles — Tailwind v4 import + theme tokens + resets
│   ├── components/         # Lit web components (one per file)
│   │   ├── portfolio-app.ts    # Root component: <portfolio-app>, wraps all sections
│   │   ├── hero-section.ts     # Hero section: <hero-section>
│   │   ├── layer-bar.ts        # Layer/animation bar: <layer-bar>
│   │   ├── about-section.ts    # About section: <about-section>
│   │   ├── projects-section.ts # Projects listing: <projects-section>
│   │   ├── project-card.ts     # Project card: <project-card>
│   │   ├── stack-section.ts    # Tech stack: <stack-section>
│   │   └── contact-section.ts  # Contact section: <contact-section>
│   ├── data/               # Static data modules
│   │   ├── projects.ts     # Project[] array + Project interface
│   │   └── stack.ts        # StackLayer[] array + StackLayer interface
│   └── assets/             # Static assets directory (currently empty)
└── dist/                   # Vite build output (gitignored)
    ├── assets/             # Hashed bundle files
    ├── favicon.svg
    ├── icons.svg
    ├── robots.txt
    ├── sitemap.xml
    └── index.html
```

## Directory Purposes

**`src/components/`:**
- Purpose: All LitElement web components, one per file
- Contains: 8 Lit components (root + 7 sections/children)
- Key files: `portfolio-app.ts` (root component), `hero-section.ts` (entry section)

**`src/data/`:**
- Purpose: Static data and type definitions used by components
- Contains: TypeScript modules exporting typed arrays
- Key files: `projects.ts` (Project interface + projects[]), `stack.ts` (StackLayer interface + stack[])

**`public/`:**
- Purpose: Static assets copied verbatim to build output without Vite processing
- Contains: Favicon, SVG sprite, robots.txt, sitemap.xml

**`src/assets/`:**
- Purpose: Directory for build-processed static assets (images, fonts)
- Status: Currently empty — reserved for future use

## Key File Locations

**Entry Points:**
- `index.html`: HTML shell — loads Tailwind via `src/index.css`, triggers Lit app via `src/main.ts`
- `src/main.ts`: JavaScript entry — imports all component modules for registration; no application logic
- `src/components/portfolio-app.ts`: Root Lit component — orchestrates all sections, manages IntersectionObserver for fade-in

**Configuration:**
- `package.json`: Scripts (`dev`/`build`/`preview`), dependencies (lit, tailwindcss, postcss, typescript, vite)
- `tsconfig.json`: Target ES2021, ESNext modules, bundler resolution, experimentalDecorators
- `postcss.config.js`: Single plugin — `@tailwindcss/postcss`

**Core Logic:**
- `src/components/portfolio-app.ts`: Root layout, section ordering, IntersectionObserver for scroll animations
- `src/components/hero-section.ts`: Hero/landing section with name, tagline, whoami
- `src/components/layer-bar.ts`: Visual layer indicator bar (hardware/sistema/web/agente)
- `src/components/about-section.ts`: About/bio section
- `src/components/projects-section.ts`: Renders project grid from `projects` data array
- `src/components/project-card.ts`: Individual project card with name, description, stack, link
- `src/components/stack-section.ts`: Renders technology layers from `stack` data array
- `src/components/contact-section.ts`: Contact links (email, GitHub, LinkedIn)

**Data:**
- `src/data/projects.ts`: Exports `Project` interface and `projects` array (3 entries)
- `src/data/stack.ts`: Exports `StackLayer` interface and `stack` array (3 layers)

**Testing:**
- No test infrastructure detected. No test files, config, or runner.

## Naming Conventions

**Files:**
- Component files: `kebab-case.ts` matching the custom element tag name (e.g., `hero-section.ts` → `<hero-section>`)
- Data files: `kebab-case.ts` (e.g., `projects.ts`, `stack.ts`)
- Style files: `kebab-case.css` (e.g., `index.css`)
- Entry point: `main.ts`

**Directories:**
- `src/components/` for Lit web components
- `src/data/` for static data modules
- `src/assets/` for processed static assets
- `public/` for unprocessed static assets

**Components:**
- Tag name: `kebab-case` (e.g., `<project-card>`, `<hero-section>`)
- Class name: `PascalCase` matching tag converted (e.g., `ProjectCard`, `HeroSection`)
- File name: `kebab-case.ts` matching the tag name exactly
- All components use `@customElement` decorator for registration

**Types/Interfaces:**
- PascalCase (e.g., `Project`, `StackLayer`)
- Co-located in the data file that defines them (`src/data/projects.ts`, `src/data/stack.ts`)

**Imports:**
- Relative imports with `.js` extension per ESM convention (e.g., `import "../data/projects.js"`)
- Components import each other with `.js` extension

## Where to Add New Code

**New Lit Component:**
1. Create file: `src/components/[kebab-name].ts`
2. Follow established pattern:

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("component-name")
export class ComponentName extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    /* component styles */
  `;

  render() {
    return html`<!-- template -->`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "component-name": ComponentName;
  }
}
```

3. Import in `src/main.ts` (or in the parent component that uses it)
4. If it accepts data via properties, use `@property()` decorator
5. All components must declare the global `HTMLElementTagNameMap` interface augmentation

**New Section/Page:**
- Currently single-page scroll; no routing
- Add a new component in `src/components/`
- Insert into `portfolio-app.ts` render template with a `.fade-section` wrapper
- Add a `<layer-bar>` separator as needed

**New Data Module:**
- Create file: `src/data/[kebab-name].ts`
- Export interface + data array following `projects.ts` / `stack.ts` pattern
- Import in the consuming component with `.js` extension

**New Global Styles:**
- Add to `src/index.css`
- Use Tailwind v4 `@theme` directive for design tokens
- Component-specific styles stay in component `static styles` (CSS template literal)

**New Static Assets (images, fonts, SVGs):**
- Place in `src/assets/` if they need build processing (Vite will hash and bundle)
- Place in `public/` if served as-is (favicons, sprites, robots.txt)

**New Config Files:**
- Build config: modify `postcss.config.js` (PostCSS plugins)
- TypeScript config: modify `tsconfig.json`
- Vite config: add `vite.config.ts` if Vite customization is needed (none currently)

## Special Directories

**`dist/`:**
- Purpose: Vite production build output
- Generated: Yes (by `vite build`)
- Committed: No (gitignored)
- Deploy contents to any static host (Netlify, Vercel, GitHub Pages)

**`node_modules/`:**
- Purpose: Installed dependencies
- Generated: Yes (`pnpm install`)
- Committed: No (gitignored)

**`src/assets/`:**
- Purpose: Reserved for build-processed static assets
- Generated: No
- Committed: Yes (currently empty)

## Import Dependency Graph

```
index.html
 └─ src/main.ts              # Entry — registers all components
     ├─ src/components/portfolio-app.ts
     │   ├─ src/components/hero-section.ts
     │   ├─ src/components/layer-bar.ts
     │   ├─ src/components/about-section.ts
     │   ├─ src/components/projects-section.ts
     │   │   ├─ src/data/projects.ts
     │   │   └─ src/components/project-card.ts
     │   ├─ src/components/stack-section.ts
     │   │   └─ src/data/stack.ts
     │   └─ src/components/contact-section.ts
     ├─ src/components/hero-section.ts       (same, registered again — no double-reg issue)
     ├─ src/components/layer-bar.ts
     ├─ src/components/about-section.ts
     ├─ src/components/projects-section.ts
     ├─ src/components/project-card.ts
     ├─ src/components/stack-section.ts
     └─ src/components/contact-section.ts
```

Data flows one-way: `src/data/` → `src/components/` → `src/components/portfolio-app.ts`. No circular dependencies.

---

*Structure analysis: 2026-07-23*
