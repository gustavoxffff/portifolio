import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("project-card")
export class ProjectCard extends LitElement {
  @property() name: string = "";
  @property() description: string = "";
  @property() stack: string = "";
  @property() link: string = "#";

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: var(--color-card-bg);
      border: 0.5px solid var(--color-graphite);
      border-radius: 8px;
      padding: 1.5rem;
      text-decoration: none;
      display: block;
      transition: border-color 0.2s ease;
    }

    .card:hover {
      border-color: var(--color-purple-secondary);
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .name {
      font-family: var(--font-body);
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-bone);
      margin-bottom: 0.5rem;
    }

    .description {
      font-family: var(--font-body);
      font-size: 0.95rem;
      color: var(--color-muted);
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .stack {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--color-purple-secondary);
    }
  `;

  render() {
    return html`
      <article class="card">
        <a href="${this.link}" aria-label="${this.name}">
          <div class="name">${this.name}</div>
          <div class="description">${this.description}</div>
          <div class="stack">${this.stack}</div>
        </a>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "project-card": ProjectCard;
  }
}
