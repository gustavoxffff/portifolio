import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { stack } from "../data/stack.js";

@customElement("stack-section")
export class StackSection extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    section {
      max-width: 800px;
      margin: 0 auto;
      padding: 4rem 1.5rem;
    }

    .label {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      color: var(--color-muted);
      margin-bottom: 1.5rem;
    }

    .layer {
      margin-bottom: 2rem;
    }

    .layer-name {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--color-purple-secondary);
      text-transform: lowercase;
      margin-bottom: 0.75rem;
    }

    .tech-list {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      color: var(--color-bone);
      line-height: 1.8;
    }
  `;

  render() {
    return html`
      <section>
        <div class="label">// stack</div>
        ${stack.map(
          (layer) => html`
            <div class="layer">
              <div class="layer-name">${layer.layer}</div>
              <div class="tech-list">${layer.technologies.join(" · ")}</div>
            </div>
          `
        )}
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "stack-section": StackSection;
  }
}
