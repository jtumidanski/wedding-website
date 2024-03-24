// mobile-header.ts
import {html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseAccommodationLink} from './base-accommodation-link';

@customElement('text-accommodation-link')
export class TextAccommodationLink extends BaseAccommodationLink {
  _name = '';
  @property({type: String})
  get name() {
    return this._name;
  }

  set name(value) {
    const oldValue = this._name;
    this._name = value;
    this.requestUpdate('name', oldValue);
  }

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
    document.location.href = this._url;
  }

  renderLogo(): TemplateResult<1> {
    return html`
      <div class="name">
        ${this._name}
      </div>
    `;
  }
}
