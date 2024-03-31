// mobile-header.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseResponseItem} from './base-response-item';

@customElement('attendance-item')
export class AttendanceItem extends BaseResponseItem {
  _attending = false;
  @property({ type: Boolean })
  get attending() {
    return this._attending;
  }

  set attending(value) {
    const oldValue = this._attending;
    this._attending = value;
    const options = {
      detail: {member_id: this._member_id, attending: this._attending},
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('value-changed', options));
    this.requestUpdate('attending', oldValue);
  }

  handleOptionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.id === 'accepts') {
      this.attending = true;
    } else if (target.id === 'declines') {
      this.attending = false;
    }
  }

  render() {
    return html`
      <div class="content">
        <div class="names">
          <div class="name">${this.first_name}</div>
          <div class="name">${this.last_name}</div>          
        </div>
        <div class="questions">
          <div class="custom-radio">
            <input type="radio" id="accepts" name="drone" value="accepts" @change=${this.handleOptionChange} ?checked=${this.attending}/>
            <label for="accepts">Joyfully Accepts</label>
          </div>
          <div class="custom-radio">
            <input type="radio" id="declines" name="drone" value="declines" @change=${this.handleOptionChange} ?checked=${!this.attending}/>
            <label for="declines">Regretfully Declines</label>
          </div>
        </div>
      </div>
    `;
  }
}
