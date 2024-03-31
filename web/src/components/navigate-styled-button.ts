// styled-button.ts
import { html } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {StyledButton} from './styled-button';

@customElement('navigate-styled-button')
export class NavigateStyledButton extends StyledButton {
  _url = '';
  @property({type: String})
  get url() {
    return this._url;
  }

  set url(value) {
    const oldValue = this._url;
    this._url = value;
    this.requestUpdate('url', oldValue);
  }

  handleClick() {
    if (this._enabled) {
      document.location.href = this._url;
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
