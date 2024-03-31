// mobile-header.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import './navigation-menu';
import './logo-icon';

@customElement('mobile-header')
export class MobileHeader extends LitElement {
  static styles = css`
      /* Styles for the navigation menu component */
      .mobile-header {
          height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
      }

      logo-icon {
          cursor: pointer;
      }
  `;

  handleClick() {
    document.location.href = "/";
  }

  render() {
    return html`
      <navigation-menu></navigation-menu>
      <div class="mobile-header">
        <logo-icon @click="${this.handleClick}"></logo-icon>
      </div>
    `;
  }
}
