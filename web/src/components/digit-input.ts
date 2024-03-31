import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('digit-input')
export class DigitInput extends LitElement {
  _value = '';
  @property({ type: String })
  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.requestUpdate('value', value);
  }

  static styles = css`
      :host {
          --magic-number: 100px;
      }

      .input-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          height: 150px;
      }

      input {
          color: white;
          text-transform: uppercase;
      }

      .hash-input {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='100' viewBox='0 0 500 100'%3E%3Crect x='0' y='0' width='500' height='100' fill='transparent' /%3E%3Cline x1='10' y1='90' x2='90' y2='90' stroke='white' stroke-width='5' /%3E%3Cline x1='110' y1='90' x2='190' y2='90' stroke='white' stroke-width='5' /%3E%3Cline x1='210' y1='90' x2='290' y2='90' stroke='white' stroke-width='5' /%3E%3Cline x1='310' y1='90' x2='390' y2='90' stroke='white' stroke-width='5' /%3E%3C/svg%3E");
          background-size: calc(5 * var(--magic-number));
          background-position-x: left;
          background-repeat: no-repeat;
          border: 0;
          height: var(--magic-number);
          width: calc(5 * var(--magic-number));
          font-size: calc(0.6 * var(--magic-number));
          font-family: monospace;
          letter-spacing: calc(0.64 * var(--magic-number));
          padding-inline-start: calc(0.3 * var(--magic-number));
          box-sizing: border-box;
          overflow: hidden;
          transform: translatex(calc(0.5 * var(--magic-number)));
          background-color: transparent;
      }

      .hash-input:focus {
          outline: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='100' viewBox='0 0 500 100'%3E%3Crect x='0' y='0' width='500' height='100' fill='transparent' /%3E%3Cline x1='10' y1='90' x2='90' y2='90' stroke='white' stroke-width='5' /%3E%3Cline x1='110' y1='90' x2='190' y2='90' stroke='white' stroke-width='5' /%3E%3Cline x1='210' y1='90' x2='290' y2='90' stroke='white' stroke-width='5' /%3E%3Cline x1='310' y1='90' x2='390' y2='90' stroke='white' stroke-width='5' /%3E%3C/svg%3E");
          background-size: calc(5 * var(--magic-number));
          background-position-x: left;
          background-repeat: no-repeat;
      }
  `;

  updated(changedProperties: any) {
    if (changedProperties.has('value')) {
      const options = {
        detail: {value: this.value},
        bubbles: true,
        composed: true
      };
      this.dispatchEvent(new CustomEvent('value-changed', options));
    }
  }

  render() {
    return html`
      <div class="input-container">
        <input class="hash-input" required type="text" autocomplete="one-time-code" inputmode="text" maxlength="4"
               .value="${this.value}"
               @input="${(e: any) => this.value = e.target.value}" autofocus
        />
      </div>
    `;
  }
}
