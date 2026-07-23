---
title: Architecture
date: 2026-07-20
last_mapped_commit: b3da0ffd3977d7bbf9c0c92d224f4930b9acd509
---

# Architecture

## Pattern

- **Web Components (Lit)** — Custom elements with Shadow DOM, declarative rendering via `html` template literals, scoped styles via `css` template literals
- **Static SPA** — No server-side rendering, no routing; single HTML entry point loads all JS modules

## Layers

```
┌─────────────────────────────────────────────┐
│  index.html — Entry Point                   │
│  Loads CSS (src/index.css) + JS (src/*.js) │
├─────────────────────────────────────────────┤
│  Lit Components — UI Layer                  │
│  src/example.ts (and future components)     │
│  Self-contained: render() + styles + state  │
├─────────────────────────────────────────────┤
│  Build — Vite                               │
│  Dev server, bundling, TS→JS transform      │
│  Tailwind v4 via PostCSS                    │
└─────────────────────────────────────────────┘
```

1. **Entry Layer** — `index.html` bootstraps the app; `<script type="module">` loads JS; `<example-element>` is the root Lit component
2. **Component Layer** — Lit components in `src/` own their own rendering, styling, and local state via decorators (`@property`, `@customElement`)
3. **Build Layer** — Vite handles dev server, bundling, TS compilation, and PostCSS/Tailwind integration

## Data Flow

### Component Mount & Render

1. Browser loads `index.html` (`index.html:1-14`)
2. Vite resolves `/src/example.js` (compiled from `src/example.ts`)
3. `@customElement("example-element")` registers the custom element (`src/example.ts:4`)
4. `<example-element>` in the DOM triggers `connectedCallback` → `render()` (`src/example.ts:11-18`)
5. Shadow DOM injects scoped HTML + styles

### User Interaction

1. User clicks button → `@click` handler fires `increment()` (`src/example.ts:15`)
2. `this.count++` mutates `@property` (`src/example.ts:9`)
3. Lit's reactivity system triggers re-render (`src/example.ts:11-18`)

### Build Pipeline (dev)

1. `pnpm dev` → `vite` starts dev server
2. Vite serves `index.html`, resolves module imports on-the-fly
3. TypeScript compiled via Vite's esbuild integration
4. PostCSS processes CSS through Tailwind v4 plugin

## Abstractions

- **`LitElement`** — Base class for all components; provides Shadow DOM, lifecycle, reactivity
  - Location: `lit` package (external)
- **`@customElement` decorator** — Registers a class as a custom HTML element with a given tag name
  - Usage: `src/example.ts:4`
- **`@property` decorator** — Declares a reactive property; triggers re-render on mutation
  - Usage: `src/example.ts:8-9`
- **`html` / `css` tagged templates** — Lit's template literal functions for safe HTML and scoped CSS
  - Usage: `src/example.ts:6, 11`

## Entry Points

| Entry Point | Location | Purpose |
|---|---|---|
| HTML shell | `index.html` | Loads styles, scripts, contains root `<example-element>` |
| Component module | `src/example.ts` | Defines and registers the Lit custom element |
| Global styles | `src/index.css` | Resets, body layout, color scheme |

## Component Registration Pattern

All components follow this pattern:

```typescript
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("tag-name")
export class TagName extends LitElement {
  static style = css`/* scoped styles */`;

  @property()
  propName: Type = defaultValue;

  render() {
    return html`<div>...</div>`;
  }
}
```

**Rules:**
- Each component gets its own file in `src/`
- Tag names use kebab-case (e.g., `example-element`)
- Class names use PascalCase matching the tag (e.g., `ExampleElement`)
- Component file name matches the class name in kebab-case (e.g., `example-element.ts` → `ExampleElement`)
- Styles are always scoped via Shadow DOM (`static style = css\`\``)

## Styling Architecture

**Two-layer approach:**
1. `src/index.css` — Global resets and body layout (loaded via `<link>` in HTML)
2. Component `static style` — Scoped styles via Shadow DOM (never escapes)

**Tailwind CSS v4** is configured via PostCSS (`@tailwindcss/postcss`), available in global styles and component templates.

## Architectural Constraints

- **No routing** — Single-page, single-view static site; no client-side router needed
- **No API calls** — Static portfolio; all content is hardcoded in components
- **No state management library** — Local component state via `@property` decorators
- **ES Modules** — `"type": "module"` in `package.json`; all imports use ESM syntax
- **Shadow DOM** — Component styles are encapsulated; global CSS does not penetrate
- **Build-time TS** — TypeScript compiled to JS by Vite (esbuild); no runtime TS

## Anti-Patterns to Avoid

| Anti-Pattern | Why It's Wrong | Correct Approach |
|---|---|---|
| Inline styles on elements | Breaks Shadow DOM encapsulation | Use `static style = css\`\`` in component |
| Direct DOM manipulation (`document.querySelector`) | Bypasses Lit's reactivity | Use `@property` + reactive render |
| Global CSS targeting component internals | Shadow DOM blocks it anyway | Use scoped `static style` |
| Mixing `@property` and `@state` incorrectly | `@property` = public API; `@state` = internal | Use `@property()` for attributes, `@state()` for internal |

## Error Handling

- **No global error boundary** — Individual component errors surface in console
- **Pattern:** Let Lit's built-in error handling catch render failures; add try/catch only for async operations if introduced later

## Cross-Cutting Concerns

- **Styling:** Tailwind v4 utility classes in templates + scoped Shadow DOM styles
- **Accessibility:** No ARIA patterns yet; add `role`, `aria-*` as components grow
- **Responsiveness:** Tailwind responsive prefixes; body uses `min-height: 100svh`
- **Theming:** `color-scheme: light dark` in `src/index.css:2`; expand with CSS custom properties as needed
