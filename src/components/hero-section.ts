import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("hero-section")
export class HeroSection extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    section {
      max-width: 800px;
      margin: 0 auto;
      padding: 6rem 1.5rem 4rem;
    }

    .label {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      color: var(--color-muted);
      margin-bottom: 1.5rem;
    }

    .name {
      font-family: var(--font-display);
      font-size: 4rem;
      font-weight: 600;
      color: var(--color-bone);
      line-height: 1.1;
    }

    .tagline {
      font-family: var(--font-body);
      font-size: 1.25rem;
      line-height: 1.7;
      color: var(--color-bone);
      margin-top: 1.5rem;
    }

    .whoami {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      color: var(--color-muted);
      margin-top: 2rem;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    section {
      animation: fadeIn 0.8s ease-out;
    }
  `;

  render() {
    return html`
      <section>
        <div class="label">// sobre</div>
        <h1 class="name">Developer</h1>
        <p class="tagline">
          De registradores a agentes — construo nas três camadas do software.
        </p>
        <div class="whoami">
          $ whoami<br />
          sistemista · webdev · agent builder
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hero-section": HeroSection;
  }
}
