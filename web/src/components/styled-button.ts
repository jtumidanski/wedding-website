// styled-button.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('styled-button')
export class StyledButton extends LitElement {
  _text = '';
  @property({ type: String })
  get text() {
    return this._text;
  }

  set text(value) {
    const oldValue = this._text;
    this._text = value;
    this.requestUpdate('text', oldValue);
  }

  _enabled = false;
  @property({ type: Boolean })
  get enabled() {
    return this._enabled;
  }

  set enabled(value) {
    const oldValue = this._enabled;
    this._enabled = value;
    this.requestUpdate('enabled', oldValue);
  }

  _selected = false;
  @property({ type: Boolean })
  get selected() {
    return this._selected;
  }

  set selected(value) {
    const oldValue = this._selected;
    this._selected = value;
    this.requestUpdate('selected', oldValue);
  }

  static styles = css`
      .container {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          transition: background-color 0.3s ease;
          padding: 10px;
          text-align: center;
          font-family: Avenir, sans-serif;
          font-size: 18px;
          font-style: normal;
          font-weight: 900;
          line-height: normal;
          letter-spacing: 2.7px;
          text-transform: uppercase;
          border: 1px solid white;
          color: #FFF;
      }
      
      .container.enabled {
          opacity: 1;
      }

      .container.disabled {
          opacity: 0.25;
      }

      .container.enabled:hover {
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white on hover */
          color: #FFF;
      }
      
      .container.selected {
          border: 1px solid #FFF;
          background: #FFF;
          color: #000;
      }
  `;

  handleClick() {
    if (this._enabled) {
      const options = {
        detail: {},
        bubbles: true,
        composed: true
      };
      this.dispatchEvent(new CustomEvent('user-clicked', options));
    }
  }

  render() {
    return html`
      <div class="container ${this._enabled ? 'enabled' : 'disabled'} ${this._selected ? 'selected' : ''}" @click="${this.handleClick}">
        ${this._text}
      </div>
    `;
  }
}
