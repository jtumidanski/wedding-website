// mobile-header.ts
import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseResponseItem} from './base-response-item';

@customElement('allergy-detail-item')
export class AllergyDetailItem extends BaseResponseItem {
  _allergies: string[] = [];
  @property({type: String})
  get allergies() {
    return this._allergies.join(',');
  }

  set allergies(value) {
    const oldValue = this._allergies;
    if (value === '') {
      this._allergies = [];
    } else {
      this._allergies = value.split(',');
    }
    const options = {
      detail: {member_id: this._member_id, allergies: this._allergies},
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('value-changed', options));
    this.requestUpdate('allergies', oldValue);
  }

  handleOptionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const checkboxId = target.id;
    const isChecked = target.checked;
    if (checkboxId === 'other') {
      this.showOther = isChecked;
      this.requestUpdate();
      return;
    }

    // if (isChecked) {
    //   this.allergies = this.allergies + "," + checkboxId;
    // } else {
    //   this.allergies = this._allergies.filter(id => id === checkboxId).join(",");
    // }
  }

  showOther: boolean = false;
  items = ['eggs', 'fish', 'milk', 'peanuts', 'shellfish', 'soybeans', 'tree nuts', 'wheat'];

  render() {
    return html`
      <div class="content">
        <div class="names">
          <div class="name">${this.first_name}</div>
          <div class="name">${this.last_name}</div>
        </div>
        <div class="allergy-questions">
          ${this.items.map(i => html`
            <div class="custom-checkbox">
              <input type="checkbox" id="${i}" name="drone" value="${i}" @change=${this.handleOptionChange}
                     ?checked=${this.allergies.split(',').some(a => a === i)}/>
              <label for="${i}">${i}</label>
            </div>
          `)}
          <div class="custom-checkbox">
            <input type="checkbox" id="other" name="drone" value="other" @change=${this.handleOptionChange}
                   ?checked=${this.allergies.split(',').some(a => a === 'other')}/>
            <label for="other">other</label>
          </div>
        </div>
        ${this.showOther ? html`<textarea name="other-allergies"></textarea>` : html``}
      </div>
    `;
  }
}
