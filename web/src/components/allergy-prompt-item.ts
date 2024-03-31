// mobile-header.ts
import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseResponseItem} from './base-response-item';

@customElement('allergy-prompt-item')
export class AllergyItem extends BaseResponseItem {
  _allergy = false;
  @property({type: Boolean})
  get allergy() {
    return this._allergy;
  }

  set allergy(value) {
    const oldValue = this._allergy;
    this._allergy = value;
    const options = {
      detail: {member_id: this._member_id, allergy: this._allergy},
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('value-changed', options));
    this.requestUpdate('allergy', oldValue);
  }

  handleOptionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.id === 'none') {
      this.allergy = false;
    } else if (target.id === 'some') {
      this.allergy = true;
    }
  }

  render() {
    return html`
      <div class="content ${this.isMobile ? 'mobile' : 'desktop'}">
        <div class="names">
          <div class="name">${this.first_name}</div>
          <div class="name">${this.last_name}</div>
        </div>
        <div class="questions ${this.isMobile ? 'mobile' : 'desktop'}">
          <div class="custom-radio">
            <input type="radio" id="none" name="drone" value="none" @change=${this.handleOptionChange}
                   ?checked=${!this.allergy}/>
            <label class="${this.isMobile ? 'mobile' : 'desktop'}" for="none">No food allergies</label>
          </div>
          <div class="custom-radio">
            <input type="radio" id="some" name="drone" value="some" @change=${this.handleOptionChange}
                   ?checked=${this.allergy}/>
            <label class="${this.isMobile ? 'mobile' : 'desktop'}" for="some">Yes, I have food allergies</label>
          </div>
        </div>
      </div>
    `;
  }
}
