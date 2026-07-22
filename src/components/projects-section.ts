import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { projects } from "../data/projects.js";
import "./project-card.js";

@customElement("projects-section")
export class ProjectsSection extends LitElement {
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

    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    @media (min-width: 640px) {
      .grid {
        grid-template-columns: 1fr 1fr;
      }
    }
  `;

  render() {
    return html`
      <section>
        <div class="label">// projetos</div>
        <div class="grid">
          ${projects.map(
            (p) => html`
              <project-card
                name="${p.name}"
                description="${p.description}"
                stack="${p.stack.join(" · ")}"
                link="${p.link}"
              ></project-card>
            `
          )}
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "projects-section": ProjectsSection;
  }
}
