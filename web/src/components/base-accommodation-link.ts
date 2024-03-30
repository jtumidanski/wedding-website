// base-page.ts
import { css, html, LitElement } from 'lit';

export class BaseAccommodationLink extends LitElement {
  static styles = css`
      .content {
          display: flex;
          padding: 10px 0px;
          flex-direction: column;
          align-items: center;
          align-self: stretch;
          width: 140px;
          height:38px;
      }

      .content:hover {
          cursor: pointer;
      }
      
      .name {
          color: #FFF;
          text-align: center;
          font-family: "Bodoni 72 Smallcaps", serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
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
