---
title: Code Conventions
date: 2026-07-20
last_mapped_commit: b3da0ffd3977d7bbf9c0c92d224f4930b9acd509
---

# Code Conventions

## Style

- **Formatter:** None configured. Code uses 2-space indentation (TypeScript) and 4-space indentation (HTML/CSS). Adopt a formatter (Prettier or Biome) to enforce consistency.
- **Quotes:** Double quotes in TypeScript — `import { LitElement, html, css } from "lit";` (`src/example.ts:1`)
- **Semicolons:** Always present at end of statements
- **Trailing commas:** Not used in current code
- **CSS:** Global styles in `src/index.css` use 4-space indentation

## Naming

- **Files:** lowercase kebab-case — `example.ts`, `index.css`
- **Custom elements:** lowercase kebab-case with hyphens — `@customElement("example-element")` (`src/example.ts:4`)
- **Classes:** PascalCase — `ExampleElement` (`src/example.ts:5`)
- **Properties:** camelCase — `count: number = 0` (`src/example.ts:9`)
- **Methods:** camelCase — `increment()` (`src/example.ts:20`)

## Patterns

- **Lit component structure:** Class extends `LitElement`, uses `@customElement` decorator, static `style` property, `render()` method returning `html` template literal (`src/example.ts:4-23`)
- **Decorator imports:** Imported from `lit/decorators.js` — `customElement`, `property` (`src/example.ts:2`)
- **Template literals:** Use `html` tagged template for markup, `css` tagged template for styles (`src/example.ts:6,12`)
- **Event binding:** Inline arrow functions in templates — `@click=${() => this.increment()}` (`src/example.ts:15`)
- **No barrel files:** Single-file components, no `index.ts` re-exports
- **TypeScript strict mode:** Enabled in `tsconfig.json` with `strict: true`
- **ESM only:** `"type": "module"` in `package.json`, `"module": "ESNext"` in tsconfig

## Error Handling

- **Not implemented.** No error boundaries, try/catch blocks, or error callbacks exist. For a static portfolio site, errors will be caught at the browser console level. Consider adding basic error handling for async operations if added later.

## Component Patterns

- **Single-file components:** Each Lit component lives in its own `.ts` file in `src/`
- **Static styles:** Use `static style = css\`\`` for component-scoped CSS (Shadow DOM) (`src/example.ts:6`)
- **Reactive properties:** Use `@property()` decorator for reactive state (`src/example.ts:8-9`)
- **No state management library:** Component-local state only. If shared state needed later, use Lit's `ReactiveController` pattern or a lightweight store.
- **Template structure:** `render()` returns a single `html` template with semantic HTML elements

## Import Organization

1. Third-party imports first: `lit`, `lit/decorators.js`
2. No internal imports yet (single-file project)
3. Path aliases: None configured

## File Structure Conventions

- **Components:** `src/{component-name}.ts` — one component per file
- **Styles:** `src/index.css` for global styles; component styles in static `style` property
- **Assets:** `public/` for static assets (SVG icons, favicon)
- **Entry point:** `index.html` at project root, loads `src/example.js` as module script

## Build & Dev

- **Dev server:** `pnpm dev` → Vite dev server
- **Build:** `pnpm build` → Vite production build
- **Package manager:** pnpm (lockfile present: `pnpm-lock.yaml`)
- **No lint or format scripts** configured in `package.json`
