// mobile-header.ts
import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

export class BaseResponseItem extends LitElement {
  static styles = css`
      /* Styles for the navigation menu component */

      .content {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 25px;
          gap: 25px;
          width: 500px;
          max-width: 500px;
          border: 1px dashed #FFFFFF;
      }

      .names {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0px;
      }

      .name {
          font-family: "Bodoni 72 Smallcaps", serif;
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 29px;
          text-align: center;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #FFFFFF;
      }
      
      .allergy-questions {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          align-content: center;
          padding: 0px;
          gap: 20px;
      }
      
      label {
          font-family: Avenir, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 16px;
          /* identical to box height, or 89% */
          letter-spacing: 0.1em;
          text-transform: uppercase;

          color: #FFFFFF;
      }

      /* Hide the default radio button */
      .custom-radio input[type="radio"] {
          display: none;
      }

      /* Custom radio button and label styling */
      .custom-radio label {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          position: relative;
      }

      /* Outer circle (border) styling */
      .custom-radio label::before {
          content: '';
          display: inline-block;
          margin-right: 8px; /* Space between the custom radio button and the text */
          border: 2px solid #AD9961;
          border-radius: 50%; /* Make it circular */
          width: 20px; /* Adjust size as needed */
          height: 20px; /* Adjust size as needed */
          background-color: transparent;
      }

      /* Inner circle styling */
      .custom-radio label::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 6px; /* Adjust left value to center the inner circle */
          transform: translate(0, -50%);
          border-radius: 50%;
          width: 12px; /* Adjust inner circle size as needed */
          height: 12px; /* Adjust inner circle size as needed */
          background: #AD9961;
          opacity: 0; /* Initially hidden */
      }

      /* Change inner circle style when radio is checked */
      .custom-radio input[type="radio"]:checked + label::after {
          opacity: 1;
      }
      /* Hide the default checkbox */
      .custom-checkbox input[type="checkbox"] {
          display: none;
      }

      /* Custom checkbox label styling */
      .custom-checkbox label {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          position: relative;
      }

      /* Custom checkbox square border */
      .custom-checkbox label::before {
          content: '';
          display: inline-block;
          margin-right: 8px; /* Space between the custom radio button and the text */
          width: 20px; /* Adjust size as needed */
          height: 20px; /* Adjust size as needed */
          border: 2px solid #AD9961;
          border-radius: 4px; /* Adjust for rounded corners */
          background-color: transparent;
      }

      /* Custom checkbox checkmark */
      .custom-checkbox input[type="checkbox"]:checked + label::after {
          content: '✔'; /* Checkmark */
          position: absolute;
          left: 6px;
          color: white;
          font-size: 18px; /* Adjust size as needed */
      }

      /* Change background on check */
      .custom-checkbox input[type="checkbox"]:checked + label::before {
          background-color: #AD9961;
      }
      
      textarea {
          box-sizing: border-box;

          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 10px 15px;
          gap: 10px;

          width: 400px;
          max-width: 400px;
          height: 150px;
          max-height: 150px;

          background: rgba(0, 0, 0, 0.1);
          border: 1px solid #FFFFFF;
          resize: none;

          font-family: Avenir, sans-serif;
          font-weight: 350;
          font-size: 18px;
          line-height: 25px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #FFFFFF;
      }
  `;

  _member_id = '';
  @property({type: String})
  get member_id() {
    return this._member_id;
  }

  set member_id(value) {
    const oldValue = this._member_id;
    this._member_id = value;
    this.requestUpdate('member_id', oldValue);
  }

  _first_name = '';
  @property({type: String})
  get first_name() {
    return this._first_name;
  }

  set first_name(value) {
    const oldValue = this._first_name;
    this._first_name = value;
    this.requestUpdate('first_name', oldValue);
  }

  _last_name = '';
  @property({type: String})
  get last_name() {
    return this._last_name;
  }

  set last_name(value) {
    const oldValue = this._last_name;
    this._last_name = value;
    this.requestUpdate('last_name', oldValue);
  }

  _attending = false;
  @property({type: Boolean})
  get attending() {
    return this._attending;
  }

  set attending(value) {
    const oldValue = this._attending;
    this._attending = value;
    this.requestUpdate('attending', oldValue);
  }
}
