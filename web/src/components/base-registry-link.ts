// base-page.ts
import { css, html, LitElement } from 'lit';

export class BaseRegistryLink extends LitElement {
  static styles = css`
      .content {
          border-radius: 4px;
          border: 1px solid #FFF;
          display: flex;
          max-width: 400px;
          padding: 10px 0px;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          align-self: stretch;
      }

      .content:hover {
          cursor: pointer;
      }
  `;

  handleClick() {
  }

  renderLogo() {
    return html`
    `;
  }
  render() {
    return html`
      <div class="content" @click="${this.handleClick}">
        ${this.renderLogo()}
      </div>
    `;
  }
}
