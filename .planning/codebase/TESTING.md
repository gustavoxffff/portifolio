---
title: Testing Patterns
date: 2026-07-23
last_mapped_commit: 6db95a9
---

# Testing Patterns

**Analysis Date:** 2026-07-23

## Test Framework

**Runner (recommended):**
- **Vitest** — native Vite integration, ESM-first, fastest for Vite projects
- Config: `vitest.config.ts` (needs creation)
- Lit helper: `@open-wc/testing` for `fixture()`, `html`, `expect`

**Current state:**
- No test framework installed. No test files exist.
- No test scripts in `package.json`:
  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
  ```
- No test config files (`vitest.config.*`, `jest.config.*`, etc.)

### Required additions to `package.json`

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  },
  "devDependencies": {
    "vitest": "^3.x",
    "@vitest/coverage-v8": "^3.x",
    "@open-wc/testing": "^4.x",
    "jsdom": "^26.x"
  }
}
```

### Required `vitest.config.ts`

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts", "src/main.ts"],
    },
  },
});
```

**Why jsdom:** Components don't use `IntersectionObserver` or `ResizeObserver` in tests (those are mocked). jsdom provides DOM APIs for Shadow DOM rendering. No browser needed.

**Run commands:**
```bash
pnpm test              # Run all tests once
pnpm test:watch         # Watch mode
pnpm test:coverage      # Run with coverage report → ./coverage/
```

## Test File Organization

**Location:** Co-located with source files — `src/components/hero-section.test.ts` for `src/components/hero-section.ts`

**Naming:** `*.test.ts` (not `.spec.ts`)

**Structure:**
```
src/
├── components/
│   ├── portfolio-app.test.ts
│   ├── hero-section.test.ts
│   ├── about-section.test.ts
│   ├── stack-section.test.ts
│   ├── projects-section.test.ts
│   ├── project-card.test.ts
│   ├── contact-section.test.ts
│   ├── layer-bar.test.ts
├── data/
│   ├── projects.test.ts
│   ├── stack.test.ts
```

## Test Structure

### Suite Organization

Use `describe` per component, `it` per behavior:

```typescript
import { fixture, html, expect } from "@open-wc/testing";
import "./hero-section.js";
import type { HeroSection } from "./hero-section.js";

describe("hero-section", () => {
  it("renders the developer heading", async () => {
    const el = await fixture<HeroSection>(html`<hero-section></hero-section>`);
    const heading = el.shadowRoot?.querySelector("h1");
    expect(heading?.textContent).to.equal("Developer");
  });
});
```

## Component Test Patterns (by actual component)

### Static Presentational Components

These have **no reactive properties** — test rendered static content only.

#### `hero-section.ts` (`src/components/hero-section.ts`)

```typescript
import { fixture, html, expect } from "@open-wc/testing";
import "./hero-section.js";
import type { HeroSection } from "./hero-section.js";

describe("hero-section", () => {
  it("renders label, heading, tagline, and whoami", async () => {
    const el = await fixture<HeroSection>(html`<hero-section></hero-section>`);
    expect(el.shadowRoot?.querySelector(".label")?.textContent).to.equal("// sobre");
    expect(el.shadowRoot?.querySelector("h1")?.textContent).to.equal("Developer");
    expect(el.shadowRoot?.querySelector(".tagline")).to.exist;
    expect(el.shadowRoot?.querySelector(".whoami")).to.exist;
  });

  it("applies fade-in animation", async () => {
    const el = await fixture<HeroSection>(html`<hero-section></hero-section>`);
    const section = el.shadowRoot?.querySelector("section");
    const animation = section?.computedStyleMap?.()?.get?.("animation");
    // Verify animation is applied via CSS
    expect(section).to.exist;
  });
});
```

#### `about-section.ts` (`src/components/about-section.ts`)

```typescript
import { fixture, html, expect } from "@open-wc/testing";
import "./about-section.js";
import type { AboutSection } from "./about-section.js";

describe("about-section", () => {
  it("renders label and biography paragraph", async () => {
    const el = await fixture<AboutSection>(html`<about-section></about-section>`);
    expect(el.shadowRoot?.querySelector(".label")?.textContent).to.equal("// sobre");
    expect(el.shadowRoot?.querySelector("p")).to.exist;
  });

  it("renders non-empty biography text", async () => {
    const el = await fixture<AboutSection>(html`<about-section></about-section>`);
    const text = el.shadowRoot?.querySelector("p")?.textContent || "";
    expect(text.length).to.be.greaterThan(10);
  });
});
```

#### `contact-section.ts` (`src/components/contact-section.ts`)

```typescript
import { fixture, html, expect } from "@open-wc/testing";
import "./contact-section.js";
import type { ContactSection } from "./contact-section.js";

describe("contact-section", () => {
  it("renders label and contact links", async () => {
    const el = await fixture<ContactSection>(html`<contact-section></contact-section>`);
    expect(el.shadowRoot?.querySelector(".label")?.textContent).to.equal("$ contato");
  });

  it("renders email, GitHub, and LinkedIn links", async () => {
    const el = await fixture<ContactSection>(html`<contact-section></contact-section>`);
    const links = el.shadowRoot?.querySelectorAll("a");
    expect(links?.length).to.equal(3);
  });

  it("opens external links with target=_blank and rel=noopener", async () => {
    const el = await fixture<ContactSection>(html`<contact-section></contact-section>`);
    const links = el.shadowRoot?.querySelectorAll("a[target='_blank']");
    links?.forEach((link) => {
      expect(link.getAttribute("rel")).to.equal("noopener");
    });
  });
});
```

#### `layer-bar.ts` (`src/components/layer-bar.ts`)

```typescript
import { fixture, html, expect } from "@open-wc/testing";
import "./layer-bar.js";
import type { LayerBar } from "./layer-bar.js";

describe("layer-bar", () => {
  it("renders 4 segments and 4 labels", async () => {
    const el = await fixture<LayerBar>(html`<layer-bar></layer-bar>`);
    expect(el.shadowRoot?.querySelectorAll(".segment").length).to.equal(4);
    expect(el.shadowRoot?.querySelectorAll(".labels span").length).to.equal(4);
  });

  it("renders layer labels in order: hardware, sistema, web, agente", async () => {
    const el = await fixture<LayerBar>(html`<layer-bar></layer-bar>`);
    const labels = el.shadowRoot?.querySelectorAll(".labels span");
    const text = Array.from(labels!).map((s) => s.textContent);
    expect(text).to.deep.equal(["hardware", "sistema", "web", "agente"]);
  });
});
```

### Property-Driven Components

#### `project-card.ts` (`src/components/project-card.ts`)

Properties: `name: string`, `description: string`, `stack: string`, `link: string`

```typescript
import { fixture, html, expect } from "@open-wc/testing";
import "./project-card.js";
import type { ProjectCard } from "./project-card.js";

describe("project-card", () => {
  it("renders with default empty values", async () => {
    const el = await fixture<ProjectCard>(html`<project-card></project-card>`);
    expect(el.name).to.equal("");
    expect(el.description).to.equal("");
    expect(el.stack).to.equal("");
    expect(el.link).to.equal("#");
  });

  it("renders provided property values", async () => {
    const el = await fixture<ProjectCard>(html`
      <project-card
        name="agent-orchestrator"
        description="Multi-agent coordination framework"
        stack="TypeScript · LLM · RAG"
        link="https://github.com/user/agent-orchestrator"
      ></project-card>
    `);
    expect(el.shadowRoot?.querySelector(".name")?.textContent).to.equal("agent-orchestrator");
    expect(el.shadowRoot?.querySelector(".description")?.textContent).to.equal("Multi-agent coordination framework");
    expect(el.shadowRoot?.querySelector(".stack")?.textContent).to.equal("TypeScript · LLM · RAG");
  });

  it("wraps content in anchor with correct href", async () => {
    const el = await fixture<ProjectCard>(html`
      <project-card
        name="test"
        description="desc"
        stack="TS"
        link="https://example.com/project"
      ></project-card>
    `);
    const anchor = el.shadowRoot?.querySelector("a");
    expect(anchor?.getAttribute("href")).to.equal("https://example.com/project");
    expect(anchor?.getAttribute("aria-label")).to.equal("test");
  });

  it("updates render when properties change", async () => {
    const el = await fixture<ProjectCard>(html`<project-card></project-card>`);
    el.name = "changed-name";
    el.description = "changed-desc";
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".name")?.textContent).to.equal("changed-name");
    expect(el.shadowRoot?.querySelector(".description")?.textContent).to.equal("changed-desc");
  });

  it("uses default link (#) when none provided", async () => {
    const el = await fixture<ProjectCard>(html`<project-card></project-card>`);
    expect(el.shadowRoot?.querySelector("a")?.getAttribute("href")).to.equal("#");
  });
});
```

### Data-Importing Components

#### `projects-section.ts` (`src/components/projects-section.ts`)

Imports `projects` from `src/data/projects.ts`, renders `<project-card>` per project.

```typescript
import { fixture, html, expect } from "@open-wc/testing";
import "./projects-section.js";
import "./project-card.js";
import type { ProjectsSection } from "./projects-section.js";

describe("projects-section", () => {
  it("renders label and grid", async () => {
    const el = await fixture<ProjectsSection>(html`<projects-section></projects-section>`);
    expect(el.shadowRoot?.querySelector(".label")?.textContent).to.equal("// projetos");
    expect(el.shadowRoot?.querySelector(".grid")).to.exist;
  });

  it("renders one project-card per project in data", async () => {
    const el = await fixture<ProjectsSection>(html`<projects-section></projects-section>`);
    const cards = el.shadowRoot?.querySelectorAll("project-card");
    expect(cards?.length).to.equal(3);  // matches src/data/projects.ts
  });

  it("passes correct stack string to project-card", async () => {
    const el = await fixture<ProjectsSection>(html`<projects-section></projects-section>`);
    const cards = el.shadowRoot?.querySelectorAll("project-card");
    const firstCard = cards?.[0] as ProjectCard | undefined;
    expect(firstCard?.stack).to.contain("C");
  });
});
```

#### `stack-section.ts` (`src/components/stack-section.ts`)

Imports `stack` from `src/data/stack.ts`, renders layers with technologies.

```typescript
import { fixture, html, expect } from "@open-wc/testing";
import "./stack-section.js";
import type { StackSection } from "./stack-section.js";

describe("stack-section", () => {
  it("renders label", async () => {
    const el = await fixture<StackSection>(html`<stack-section></stack-section>`);
    expect(el.shadowRoot?.querySelector(".label")?.textContent).to.equal("// stack");
  });

  it("renders one layer entry per stack layer", async () => {
    const el = await fixture<StackSection>(html`<stack-section></stack-section>`);
    const layers = el.shadowRoot?.querySelectorAll(".layer");
    expect(layers?.length).to.equal(3);  // matches src/data/stack.ts
  });

  it("renders layer name and technologies for each layer", async () => {
    const el = await fixture<StackSection>(html`<stack-section></stack-section>`);
    const layers = el.shadowRoot?.querySelectorAll(".layer");
    const firstLayerName = layers?.[0]?.querySelector(".layer-name")?.textContent;
    expect(firstLayerName).to.equal("baixo nível");
  });
});
```

### Lifecycle-Intensive Components

#### `portfolio-app.ts` (`src/components/portfolio-app.ts`)

Uses `IntersectionObserver` in `connectedCallback` — requires mocking.

```typescript
import { fixture, html, expect } from "@open-wc/testing";
import "./portfolio-app.js";
import "./hero-section.js";
import "./layer-bar.js";
import "./about-section.js";
import "./projects-section.js";
import "./project-card.js";
import "./stack-section.js";
import "./contact-section.js";
import type { PortfolioApp } from "./portfolio-app.js";

describe("portfolio-app", () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  before(() => {
    // Mock IntersectionObserver since it's not available in jsdom
    originalIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver = class MockIntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = "";
      readonly thresholds: ReadonlyArray<number> = [];
      constructor(
        public callback: IntersectionObserverCallback,
        _options?: IntersectionObserverInit
      ) {}
      observe(_target: Element): void {
        // Immediately trigger visibility for all observed elements
        this.callback(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver
        );
      }
      unobserve(_target: Element): void {}
      disconnect(): void {}
      takeRecords(): IntersectionObserverEntry[] { return []; }
    } as unknown as typeof IntersectionObserver;
  });

  after(() => {
    window.IntersectionObserver = originalIntersectionObserver;
  });

  it("renders all child sections", async () => {
    const el = await fixture<PortfolioApp>(html`<portfolio-app></portfolio-app>`);
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("hero-section")).to.exist;
    expect(el.shadowRoot?.querySelector("about-section")).to.exist;
    expect(el.shadowRoot?.querySelector("projects-section")).to.exist;
    expect(el.shadowRoot?.querySelector("stack-section")).to.exist;
    expect(el.shadowRoot?.querySelector("contact-section")).to.exist;
  });

  it("renders 4 layer-bar separators", async () => {
    const el = await fixture<PortfolioApp>(html`<portfolio-app></portfolio-app>`);
    await el.updateComplete;
    expect(el.shadowRoot?.querySelectorAll("layer-bar").length).to.equal(4);
  });

  it("wraps sections in fade-section divs", async () => {
    const el = await fixture<PortfolioApp>(html`<portfolio-app></portfolio-app>`);
    await el.updateComplete;
    expect(el.shadowRoot?.querySelectorAll(".fade-section").length).to.equal(5);
  });

  it("disconnects IntersectionObserver on disconnect", async () => {
    const el = await fixture<PortfolioApp>(html`<portfolio-app></portfolio-app>`);
    await el.updateComplete;
    let disconnected = false;
    // Override the observer's disconnect to track it
    const observer = (el as any).observer;
    if (observer) {
      const originalDisconnect = observer.disconnect.bind(observer);
      observer.disconnect = () => {
        disconnected = true;
        originalDisconnect();
      };
    }
    el.remove();
    expect(disconnected).to.be.true;
  });
});
```

## Key Testing Patterns

### Default property values (Lit `@property`)

Each `@property()` in Lit gets a default from the class field initializer. Test these:

```typescript
it("has correct default for each property", async () => {
  const el = await fixture<ProjectCard>(html`<project-card></project-card>`);
  expect(el.name).to.equal("");
  expect(el.link).to.equal("#");
});
```

### Updating properties and waiting for re-render

After changing a reactive property, `await el.updateComplete` before asserting:

```typescript
el.name = "new-value";
await el.updateComplete;
expect(el.shadowRoot?.querySelector(".name")?.textContent).to.equal("new-value");
```

### Shadow DOM querying

All components use Shadow DOM. Always query via `shadowRoot`:

```typescript
el.shadowRoot?.querySelector(".class-name");
el.shadowRoot?.querySelectorAll("child-element");
```

### Type-safe fixture

Always parameterize `fixture<>()` with the component class for typed access to properties and methods:

```typescript
const el = await fixture<ProjectCard>(html`<project-card></project-card>`);
el.name; // typed as string
```

## Mocking Framework: Vitest (`vi`)

**No mocking needed for current static content.** Mock only when:

| Scenario | Approach |
|----------|----------|
| `IntersectionObserver` | Mock class (see `portfolio-app.test.ts` above) |
| `ResizeObserver` | Mock class with `vi.fn()` |
| Fetch/XHR | `vi.fn()` or MSW for API calls |
| Date/timers | `vi.useFakeTimers()` |

**Mocking pattern:**

```typescript
import { vi } from "vitest";

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })));
});

afterEach(() => {
  vi.unstubAllGlobals();
});
```

## Data Module Tests (`src/data/`)

### `projects.ts` (`src/data/projects.ts`)

```typescript
import { describe, it, expect } from "vitest";
import { projects } from "./projects.js";

describe("projects data", () => {
  it("has 3 projects", () => {
    expect(projects).to.have.length(3);
  });

  it("each project has required fields", () => {
    projects.forEach((p) => {
      expect(p.name).to.be.a("string").that.is.not.empty;
      expect(p.description).to.be.a("string").that.is.not.empty;
      expect(p.stack).to.be.an("array").that.is.not.empty;
      expect(p.link).to.be.a("string");
    });
  });

  it("each project has at least one technology in stack", () => {
    projects.forEach((p) => {
      expect(p.stack.length).to.be.greaterThan(0);
    });
  });

  it("all project names are unique", () => {
    const names = projects.map((p) => p.name);
    expect(new Set(names).size).to.equal(names.length);
  });
});
```

### `stack.ts` (`src/data/stack.ts`)

```typescript
import { describe, it, expect } from "vitest";
import { stack } from "./stack.js";

describe("stack data", () => {
  it("has 3 layers", () => {
    expect(stack).to.have.length(3);
  });

  it("each layer has required fields", () => {
    stack.forEach((layer) => {
      expect(layer.layer).to.be.a("string").that.is.not.empty;
      expect(layer.technologies).to.be.an("array").that.is.not.empty;
    });
  });

  it("each layer has at least one technology", () => {
    stack.forEach((layer) => {
      expect(layer.technologies.length).to.be.greaterThan(0);
    });
  });

  it("layer names are unique", () => {
    const names = stack.map((l) => l.layer);
    expect(new Set(names).size).to.equal(names.length);
  });
});
```

## Fixtures and Factories

**No fixture/factory system needed.** Data is static in `src/data/`. For future dynamic data, place factories co-located or in `src/test/factories.ts`:

```
src/
├── test/
│   ├── factories.ts   # Reusable test data builders
│   └── setup.ts       # Global test setup (mocks, polyfills)
```

## Coverage

| Metric | Target |
|--------|--------|
| Lines | 80% (new components) |
| Branches | 70% (conditional render paths) |
| Functions | 90% (methods + lifecycle hooks) |

**View coverage:**
```bash
pnpm test:coverage
open coverage/index.html
```

**Coverage exclude list** in `vitest.config.ts`:
- `src/main.ts` — imports only, no logic to test
- `src/**/*.test.ts` — test files themselves

## Test Types

| Type | Scope | When |
|------|-------|------|
| **Unit** | Single component in isolation (component + data module) | Every component |
| **Integration** | Parent-child composition (`portfolio-app` + children) | `portfolio-app` |
| **E2E** | Full-page render in Playwright | Future (if site adds forms/API) |

### E2E recommendations (future)

For a portfolio site, E2E value is low. If added:

```typescript
import { test, expect } from "@playwright/test";

test("full page renders all sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("hero-section")).toBeVisible();
  await expect(page.locator("about-section")).toBeVisible();
  await expect(page.locator("projects-section")).toBeVisible();
  await expect(page.locator("stack-section")).toBeVisible();
  await expect(page.locator("contact-section")).toBeVisible();
});
```

## Missing Infrastructure

| Item | Status | Priority |
|------|--------|----------|
| Vitest installed | Not installed | High |
| `vitest.config.ts` | Not created | High |
| `@open-wc/testing` installed | Not installed | High |
| Test scripts in `package.json` | Not configured | High |
| `jsdom` installed | Not installed | High |
| Component test files (8 files) | None exist | High |
| Data module test files (2 files) | None exist | High |
| IntersectionObserver mock | Not created | Medium |
| Coverage config | Not configured | Medium |
| E2E framework (Playwright) | None | Low |

---

*Testing analysis: 2026-07-23*
