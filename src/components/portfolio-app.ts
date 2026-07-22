import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "./hero-section.js";
import "./layer-bar.js";
import "./about-section.js";
import "./projects-section.js";
import "./stack-section.js";
import "./contact-section.js";

@customElement("portfolio-app")
export class PortfolioApp extends LitElement {
  private observer: IntersectionObserver | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.updateComplete.then(() => {
      const sections = this.shadowRoot?.querySelectorAll(".fade-section");
      if (!sections?.length) return;

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              this.observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      sections.forEach((el) => this.observer!.observe(el));
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.observer?.disconnect();
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100svh;
    }

    .wrapper {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .fade-section {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }

    .fade-section.visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (max-width: 640px) {
      .wrapper {
        padding: 0 1rem;
      }
    }
  `;

  render() {
    return html`
      <div class="wrapper">
        <main>
          <div class="fade-section">
            <hero-section aria-label="Apresentação"></hero-section>
          </div>
          <layer-bar aria-hidden="true"></layer-bar>
          <div class="fade-section">
            <about-section aria-label="Sobre mim"></about-section>
          </div>
          <layer-bar aria-hidden="true"></layer-bar>
          <div class="fade-section">
            <projects-section aria-label="Projetos"></projects-section>
          </div>
          <layer-bar aria-hidden="true"></layer-bar>
          <div class="fade-section">
            <stack-section aria-label="Stack técnica"></stack-section>
          </div>
          <layer-bar aria-hidden="true"></layer-bar>
          <div class="fade-section">
            <contact-section aria-label="Contato"></contact-section>
          </div>
        </main>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "portfolio-app": PortfolioApp;
  }
}
