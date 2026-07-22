import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("layer-bar")
export class LayerBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .bar-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }

    .bar {
      display: flex;
      width: 100%;
      height: 2px;
    }

    .segment {
      flex: 1;
    }

    .labels {
      display: flex;
      justify-content: space-around;
      margin-top: 0.5rem;
    }

    .labels span {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-transform: lowercase;
      color: var(--color-muted);
    }
  `;

  render() {
    return html`
      <div class="bar-container">
        <div class="bar">
          <div class="segment" style="background: var(--color-graphite)"></div>
          <div class="segment" style="background: var(--color-purple-brand)"></div>
          <div class="segment" style="background: var(--color-purple-secondary)"></div>
          <div class="segment" style="background: var(--color-gold)"></div>
        </div>
        <div class="labels">
          <span>hardware</span>
          <span>sistema</span>
          <span>web</span>
          <span>agente</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "layer-bar": LayerBar;
  }
}
