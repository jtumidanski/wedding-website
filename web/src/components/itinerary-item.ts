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

  _desktop = false;
  @property({ type: Boolean })
  get desktop() {
    return this._desktop;
  }

  set desktop(value) {
    const oldValue = this._desktop;
    this._desktop = value;
    this.requestUpdate('desktop', oldValue);
  }

  static styles = css`
      .item {
          display: flex;
          //justify-content: space-between; /* Align children to the left and right edges */
          width: 100%;
          color: #FFF;
          font-family: Avenir, sans-serif;
          font-size: 14px;
          font-style: normal;
          line-height: normal;
          letter-spacing: 1.3px;
          text-transform: uppercase;
          gap:10px;
      }
      
      .item.desktop {
          font-size: 21px;
          letter-spacing: 2.1px;
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
          margin-left: auto;
      }

      .divider {
          flex-grow: 1;             /* Makes the divider grow and fill the space */
          height: 1px;              /* Set the thickness of the divider */
          background: repeating-linear-gradient(
                  to right,
                  #AD9961,                      /* Color of the dashes */
                  #AD9961 2px,                /* Length of each dash */
                  transparent 2px,         /* Length of each gap */
                  transparent 5px          /* Resets at this point */
          );
          align-self: center;         /* Center the divider vertically within the flex container */
      }
  `;

  render() {
    return html`
      <div class="item ${this._desktop ? 'desktop' : ''}">
        <div class="key">
          ${this._key}
        </div>
        <div class="divider"></div>
        <div class="value">
          ${this._value}
        </div>
      </div>
    `;
  }
}
