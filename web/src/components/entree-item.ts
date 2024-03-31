// mobile-header.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BaseResponseItem} from './base-response-item';

@customElement('entree-item')
export class EntreeItem extends BaseResponseItem {
  _entree = '';
  @property({ type: String })
  get entree() {
    return this._entree;
  }

  set entree(value) {
    const oldValue = this._entree;
    this._entree = value;
    const options = {
      detail: {member_id: this._member_id, entree: this._entree},
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('value-changed', options));
    this.requestUpdate('entree', oldValue);
  }

  handleOptionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.id === 'chicken') {
      this.entree = 'chicken';
    } else if (target.id === 'steak') {
      this.entree = 'steak';
    } else if (target.id === 'cauliflower') {
      this.entree = 'cauliflower';
    }
  }

  items = [{
    name: 'chicken',
    label: 'Tuscan Chicken'
  },{
    name: 'steak',
    label: 'NY Strip Steak'
  },{
    name: 'cauliflower',
    label: 'Cauliflower Steak'
  }];

  render() {
    return html`
      <div class="content">
        <div class="names">
          <div class="name">${this.first_name}</div>
          <div class="name">${this.last_name}</div>          
        </div>
        <div class="questions">
          ${this.items.map(i => html`
            <div class="custom-radio">
              <input type="radio" id="${i.name}" name="drone" value="${i.name}" @change=${this.handleOptionChange}
                     ?checked=${this.entree === i.name}/>
              <label for="${i.name}">${i.label}</label>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}
