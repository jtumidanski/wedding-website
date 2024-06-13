import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('name-input')
export class NameInput extends LitElement {
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

      .name-input {
          height: var(--magic-number);
          width: calc(5 * var(--magic-number));
          font-size: calc(0.4 * var(--magic-number));

          font-family: 'Bodoni 72 Smallcaps', serif;
          font-style: normal;
          font-weight: 400;
          text-align: center;
          letter-spacing: 0.13em;

          box-sizing: border-box;
          overflow: hidden;
          background-color: transparent;
          border: 1px solid;
      }

      .name-input:focus {
          height: var(--magic-number);
          width: calc(5 * var(--magic-number));
          font-size: calc(0.4 * var(--magic-number));

          font-family: 'Bodoni 72 Smallcaps', serif;
          font-style: normal;
          font-weight: 400;
          text-align: center;
          letter-spacing: 0.13em;

          box-sizing: border-box;
          overflow: hidden;
          background-color: transparent;
          outline: none; /* Ensuring no outline appears */
          border: 1px solid;
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
        <input class="name-input" required type="text" inputmode="text"
               .value="${this.value}"
               @input="${(e: any) => this.value = e.target.value}" autofocus
        />
      </div>
    `;
  }
}
