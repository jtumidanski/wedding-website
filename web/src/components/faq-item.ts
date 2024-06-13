// mobile-header.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

@customElement('faq-item')
export class LogoIcon extends LitElement {
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

  _separator = false;
  @property({ type: Boolean })
  get separator() {
    return this._separator;
  }

  set separator(value) {
    const oldValue = this._separator;
    this._separator = value;
    this.requestUpdate('separator', oldValue);
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
      .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          align-self: stretch;
      }
      
      .normal-text {
          color: #FFF;
          text-align: center;
          font-family: Avenir, sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 1.3px;
      }
      
      .normal-text.desktop {
          font-size: 18px;
          letter-spacing: 0.9px;
      }

      .normal-text.bold {
          font-weight: 900;
      }

      .normal-text a {
          color: #FFF;
          font-family: Avenir, sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 1.3px;
          text-decoration-line: underline;
      }
      
      .normal-text.desktop a {
          font-size: 18px;
          letter-spacing: 0.9px;
      }
      
      .separator {
          fill: #FFF;
          stroke-width: 1px;
          stroke: #FFF;
      }
  `;

  render() {
    return html`
      <div class="content">
        <div class="normal-text bold ${this._desktop ? 'desktop' : ''}">${this.key}</div>
        <div class="normal-text ${this._desktop ? 'desktop' : ''}">${unsafeHTML(this.value)}</div>
        ${this.separator ? html`<div class="separator">
          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
            <circle cx="3" cy="3" r="2" fill="white" stroke="white"/>
          </svg>
        </div>` : html``}
      </div>
    `;
  }
}
