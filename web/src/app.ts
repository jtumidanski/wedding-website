// app.ts
import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('app-root')
export class App extends LitElement {
  static styles = css`
  `;

  render() {
    return html`
      <div id="outlet"></div>
    `;
  }
}
