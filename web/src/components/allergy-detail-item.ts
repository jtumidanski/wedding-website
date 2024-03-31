// mobile-header.ts
import {html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {BaseResponseItem} from './base-response-item';

@customElement('allergy-detail-item')
export class AllergyDetailItem extends BaseResponseItem {
  @property({type: String}) allergies = '';
  @state() private _allergies: string[] = [];

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('allergies')) {
      this._updateAllergiesArray();
    }
  }

  private _updateAllergiesArray(): void {
    this._allergies = this.allergies.split(',').map(a => a.trim());
    this.showOther = this.findNonStandardAllergy() !== undefined;
  }

  handleOptionChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const checkboxId = target.id;
    const isChecked = target.checked;
    if (checkboxId === 'other') {
      let newAllergiesSet = this._allergies.filter(i => this.items.includes(i));
      if (isChecked) {
        newAllergiesSet.push('');
      }
      this.allergies = newAllergiesSet.join(',');
      this._updateAllergiesArray();
      const options = {
        detail: {member_id: this._member_id, allergies: this._allergies},
        bubbles: true,
        composed: true,
      };
      this.dispatchEvent(new CustomEvent('value-changed', options));

      this.showOther = isChecked;
      this.requestUpdate();
      return;
    }

    let newAllergiesSet = new Set(this._allergies);

    if (isChecked) {
      newAllergiesSet.add(checkboxId);
    } else {
      newAllergiesSet.delete(checkboxId);
    }

    this.allergies = Array.from(newAllergiesSet).join(',');
    this._updateAllergiesArray();
    const options = {
      detail: {member_id: this._member_id, allergies: this._allergies},
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('value-changed', options));
  };

  private onNotesChange(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    // this.notes = textarea.value;
    let filteredArray = this._allergies.filter(i => this.items.includes(i));
    let newAllergiesSet = [...new Set(filteredArray)]
    newAllergiesSet.push(textarea.value.split(",").join(""));
    this.allergies = newAllergiesSet.join(',');
    this._updateAllergiesArray();
    const options = {
      detail: {member_id: this._member_id, allergies: this._allergies},
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('value-changed', options));
  }

  private findNonStandardAllergy() {
    if (this.allergies.length == 0) {
      return undefined;
    }
    return this.allergies.split(',').find(a => !this.items.includes(a));
  }

  private hasNonStandardAllergy() {
    return this.findNonStandardAllergy() !== undefined;
  }

  showOther: boolean = false;
  items = ['eggs', 'fish', 'milk', 'peanuts', 'shellfish', 'soybeans', 'tree nuts', 'wheat'];

  render() {
    return html`
      <div class="content ${this.isMobile ? 'mobile' : 'desktop'}">
        <div class="names">
          <div class="name">${this.first_name}</div>
          <div class="name">${this.last_name}</div>
        </div>
        <div class="allergy-questions ${this.isMobile ? 'mobile' : 'desktop'}">
          ${this.items.map(i => html`
            <div class="custom-checkbox">
              <input type="checkbox" id="${i}" name="drone" value="${i}" @change=${this.handleOptionChange}
                     ?checked=${this.allergies.split(',').some(a => a === i)}/>
              <label class="${this.isMobile ? 'mobile' : 'desktop'}" for="${i}">${i}</label>
            </div>
          `)}
          <div class="custom-checkbox">
            <input type="checkbox" id="other" name="drone" value="other" @change=${this.handleOptionChange}
                   ?checked=${this.hasNonStandardAllergy()}/>
            <label class="${this.isMobile ? 'mobile' : 'desktop'}" for="other">other</label>
          </div>
        </div>
        ${this.hasNonStandardAllergy() || this.showOther ? html`<textarea
          id="other-allergies" class="${this.isMobile ? 'mobile' : 'desktop'}"
          @input=${this.onNotesChange}>${this.findNonStandardAllergy()}</textarea>` : html``}
      </div>
    `;
  }
}
