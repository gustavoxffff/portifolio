import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("about-section")
export class AboutSection extends LitElement {
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

    p {
      font-family: var(--font-body);
      font-size: 1rem;
      line-height: 1.7;
      color: var(--color-bone);
    }
  `;

  render() {
    return html`
      <section>
        <div class="label">// sobre</div>
        <p>
          Comecei com C e ponteiros, migrei para web full-stack, e hoje construo
          agentes de IA que pensam antes de agir. As três camadas do software são
          onde eu vivo.
        </p>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "about-section": AboutSection;
  }
}
