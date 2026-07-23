import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("contact-section")
export class ContactSection extends LitElement {
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

    .links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    a {
      font-family: var(--font-body);
      font-size: 1rem;
      color: var(--color-purple-secondary);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    a:hover {
      color: var(--color-gold);
      text-decoration: underline;
    }

    a:focus-visible {
      outline: 2px solid var(--color-purple-secondary);
      outline-offset: 2px;
    }
  `;

  render() {
    return html`
      <section>
        <div class="label">$ contato</div>
        <div class="links">
          <a href="mailto:dev@example.com">dev@example.com</a>
          <a href="https://github.com/username" target="_blank" rel="noopener"
            >GitHub</a
          >
          <a
            href="https://linkedin.com/in/username"
            target="_blank"
            rel="noopener"
            >LinkedIn</a
          >
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "contact-section": ContactSection;
  }
}
