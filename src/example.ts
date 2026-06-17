import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("example-element")
export class ExampleElement extends LitElement {
  static style = css``;

  @property() count = 0;

  render() {
    return html`
      <div>
        <p>Count: ${this.count}</p>
        <button @click=${() => this.increment()}>Click me!</button>
      </div>
    `;
  }

  increment() {
    this.count++;
  }
}
