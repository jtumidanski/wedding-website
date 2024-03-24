// itinerary-item.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('itinerary-item')
export class StyledButton extends LitElement {
  _key = '';
  @property({ type: String })
  get key() {
    return this._key;
  }

  set key(value) {
    const oldValue = this._key;
    this._key = value;
    this.requestUpdate('key', oldValue);
  }

  _value = '';
  @property({ type: String })
  get value() {
    return this._value;
  }

  set value(value) {
    const oldValue = this._value;
    this._value = value;
    this.requestUpdate('value', oldValue);
  }

  static styles = css`
      .item {
          display: flex;
          justify-content: space-between; /* Align children to the left and right edges */
          width: 100%;
          color: #FFF;
          font-family: Avenir, sans-serif;
          font-size: 14px;
          text-align: right;
          font-style: normal;
          line-height: normal;
          letter-spacing: 1.4px;
          text-transform: uppercase;
      }

      .key {
          font-weight: 900;
          display: flex;
          justify-content: center;
          align-items: center;
      }

      .value {
          font-weight: 400;
          display: flex;
          justify-content: center;
          align-items: center;
      }
  `;

  render() {
    return html`
      <div class="item">
        <div class="key">
          ${this._key}
        </div>
        <div class="value">
          ${this._value}
        </div>
      </div>
    `;
  }
}
