// desktop-header.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import './logo-icon';
import './navigate-styled-button'

@customElement('desktop-header')
export class DesktopHeader extends LitElement {
  _selected = "-1";
  @property({ type: String })
  get selected() {
    return this._selected;
  }

  set selected(value) {
    const oldValue = this._selected;
    this._selected = value;
    this.requestUpdate('selected', oldValue);
  }

  static styles = css`
      /* Styles for the navigation menu component */
      .desktop-header {
          height: 150px;
          width: 100vw;
          display: flex;
          justify-content: space-around; /* Align children to the left and right edges */
          align-items: center;
      }
      
      navigate-styled-button {
          width: 290px;
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
      <div class="desktop-header">
        <navigate-styled-button text="rsvp" url="/rsvp" enabled .selected="${this._selected === "0"}"></navigate-styled-button>
        <navigate-styled-button text="accommodations" url="/accommodations" enabled .selected="${this._selected === "1"}"></navigate-styled-button>
        <logo-icon @click="${this.handleClick}"></logo-icon>
        <navigate-styled-button text="Q&A" url="/faq" enabled .selected="${this._selected === "2"}"></navigate-styled-button>
        <navigate-styled-button text="Registry" url="/registry" enabled .selected="${this._selected === "3"}"></navigate-styled-button>
      </div>
    `;
  }
}
