// src/home-page.ts
import {css, html, PropertyValues} from 'lit';
import {customElement} from 'lit/decorators.js';
import '../components/mobile-header';
import '../components/desktop-header';
import '../components/styled-button';
import '../components/itinerary-item';
import '../components/footer-item';
import '../components/digit-input';
import '../components/name-input';
import '../components/attendance-item';
import '../components/entree-item';
import '../components/allergy-prompt-item';
import '../components/allergy-detail-item';
import '../components/navigate-styled-button';
import {BasePage} from './base-page';
import {GetParty, PartyResponse, updateAllMemberResponse} from '../services/party-service';


@customElement('rsvp-page')
export class HomePage extends BasePage {
  static styles = css`
      .content {
          z-index: 1;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100vh;
          width: 100vw;
          box-sizing: border-box;
          overflow-x: hidden;
          overflow-y: auto;
      }

      .content.mobile {
          justify-content: space-between;
          padding: 20px;
          gap: 20px;
      }

      .content.desktop {
          gap: 30px;
          padding: 50px;
      }

      .main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
      }

      .main-content.desktop {
          gap: 50px;
      }

      .main-content.mobile {
          gap: 20px;
      }

      .title-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
      }

      .page-title {
          font-family: 'Bodoni 72 Smallcaps', serif;
          font-style: normal;
          font-weight: 400;
          font-size: 52px;
          line-height: 47px;
          text-align: center;
          letter-spacing: 0.13em;
          color: #FFFFFF;
      }

      .page-title.desktop {
          font-size: 72px;
          line-height: 72px; /* 100% */
          letter-spacing: 9.36px;
      }

      .joy-message {
          font-family: 'Avenir', sans-serif;
          font-style: normal;
          font-weight: 900;
          font-size: 14px;
          line-height: 19px;
          text-align: center;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #FFFFFF;
      }

      .joy-message.desktop {
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 1.8px;
          text-transform: uppercase;
      }

      .member-response-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          gap: 20px;
      }

      .member-response-container.mobile {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 20px;
      }

      .buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          gap: 30px;
          width: 100%;
      }

      .separator {
          font-family: "Bodoni 72 Smallcaps", serif;
      }

      .separator.desktop {
          font-size: 45px;
          font-style: normal;
          font-weight: 900;
          text-transform: uppercase;
      }

      .separator.mobile {
          font-weight: 700;
          font-size: 32px;
          line-height: 24px;
          text-transform: uppercase;
      }

      digit-input.desktop {
          --magic-number: 100px;
      }

      digit-input.mobile {
          --magic-number: 60px;
      }

      name-input.desktop {
          --magic-number: 100px;
      }

      name-input.mobile {
          --magic-number: 60px;
      }

      .single-button.desktop {
          width: 400px;
      }

      .single-button.mobile {
          width: 320px;
      }

      .double-button.desktop {
          width: 400px;
      }

      .double-button.mobile {
          width: 100%
      }
      
      .happy-image.desktop {
          height: 250px;
          width: 250px;
      }

      .happy-image.mobile {
          height: 160px;
          width: 160px;
      }
      
      .footer.desktop {
          margin-top: auto;
      }
  `;

  static get properties() {
    return {
      code: {type: String},
    };
  }

  render() {
    switch (this._state) {
      case -2:
        return this.renderThankYou();
      case -1:
        return this.renderCodeBad();
      case 0:
        return this.renderCodeInput();
      case 1:
        return this.renderAttendance();
      case 2:
        return this.renderEntree();
      case 3:
        return this.renderAllergyPrompt();
      case 4:
        return this.renderAllergyDetail();
      case 999:
        return this.renderComplete();
      default:
        return html``;
    }
  }

  _state = -2;
  _nameValue = '';
  _party: PartyResponse = {'data': []};
  _allergyPrompt: string[] = [];
  _processedEntree = false;

  private _nameValueListener(e: CustomEvent) {
    this._nameValue = e.detail.value;
    this.requestUpdate();
  }

  private _attendanceChanged(e: CustomEvent) {
    this._updateAttendanceOfMember(e.detail.member_id, e.detail.attending);
    this._processedEntree = this._attendeesHaveEntree();
    this.requestUpdate();
  }

  private _updateAttendanceOfMember(memberId: string, value: boolean) {
    this._party = {
      ...this._party,
      data: this._party.data.map(party => ({
        ...party,
        attributes: {
          ...party.attributes,
          members: party.attributes.members.map(member => {
            if (member.id === memberId) {
              return {
                ...member,
                response: {
                  ...member.response,
                  attending: value,
                },
              };
            } else {
              return member;
            }
          }),
        },
      })),
    };
  }

  private _hasSomeoneAttending() {
    return this._party.data.flatMap(p => p.attributes.members).some(m => m.response.attending);
  }

  private _updateEntreeOfMember(memberId: string, value: string) {
    this._party = {
      ...this._party,
      data: this._party.data.map(party => ({
        ...party,
        attributes: {
          ...party.attributes,
          members: party.attributes.members.map(member => {
            if (member.id === memberId) {
              return {
                ...member,
                response: {
                  ...member.response,
                  entree: value,
                },
              };
            } else {
              return member;
            }
          }),
        },
      })),
    };
  }

  private _entreeChanged(e: CustomEvent) {
    this._updateEntreeOfMember(e.detail.member_id, e.detail.entree);
    this._processedEntree = this._attendeesHaveEntree();
    this.requestUpdate();
  }

  private _allergyPromptChanged(e: CustomEvent) {
    if (e.detail.allergy) {
      this._allergyPrompt.push(e.detail.member_id);
    } else {
      this._allergyPrompt = this._allergyPrompt.filter(val => val !== e.detail.member_id);
      this._updateMemberAllergy(e.detail.member_id, []);
    }
    this.requestUpdate();
  }

  private _allergyDetailChanged(e: CustomEvent) {
    this._updateMemberAllergy(e.detail.member_id, e.detail.allergies);
    this.requestUpdate();
  }

  private _updateMemberAllergy(memberId: string, value: string[]) {
    this._party = {
      ...this._party,
      data: this._party.data.map(party => ({
        ...party,
        attributes: {
          ...party.attributes,
          members: party.attributes.members.map(member => {
            if (member.id === memberId) {
              return {
                ...member,
                response: {
                  ...member.response,
                  allergies: value,
                },
              };
            } else {
              return member;
            }
          }),
        },
      })),
    };
  }

  private _attendeesHaveEntree() {
    return !this._party.data.flatMap(p => p.attributes.members).filter(m => m.response.attending).some(m => m.response.entree === '');
  }

  private _handleSearchConfirm(event: any) {
    GetParty(this._nameValue).then(this._checkPartyResult);
  }

  private _handleBadCodeBack(event: any) {
    this._state = 0;
    this.requestUpdate();
  }

  private _handleBack(event: any) {
    this._state -= 1;
    this.requestUpdate();
  }

  private _handleForward(event: any) {
    if ((this._state == 1 && !this._hasSomeoneAttending()) || this._state == 4 || (this._state == 3 && this._allergyPrompt.length == 0)) {
      let members = this._party.data.flatMap(p => p.attributes.members);
      updateAllMemberResponse(members).then(this._moveToConfirmState);
      return;
    } else {
      this._state += 1;
    }
    this.requestUpdate();
  }

  private _moveToConfirmState = () => {
    this._state = 999;
    this.requestUpdate();
  };

  private _checkPartyResult = (party: PartyResponse) => {
    if (party.data && party.data.length > 0) {
      this._party = party;
      this._processedEntree = this._attendeesHaveEntree();
      this._allergyPrompt = this._party.data.flatMap(p => p.attributes.members).filter(m => m.response.allergies.length > 0).map(m => m.id);
      this._state = 1;
    } else {
      this._state = -1;
    }
    this.requestUpdate();
  };

  private _allPartyMembers() {
    return this._party.data.flatMap(p => p.attributes.members);
  }

  private _allAttendingMembers() {
    return this._party.data.flatMap(p => p.attributes.members).filter(m => m.response.attending === undefined || m.response.attending);
  }

  handleKeyDown(event: any) {
    if (event.key === 'Enter') {
      this._handleSearchConfirm(event);
    }
  }

  renderCodeInput() {
    return html`
      <div class="content ${this.isMobile ? 'mobile' : 'desktop'}">
        ${this.isMobile ?
          html`
            <mobile-header></mobile-header>` :
          html`
            <desktop-header selected="0"></desktop-header>`}
        <div class="title-text">
          <div class="page-title ${this.isMobile ? 'mobile' : 'desktop'}">RSVP</div>
          <div class="joy-message ${this.isMobile ? 'mobile' : 'desktop'}">
            Please enter the first and last name of a member of your party
          </div>
          <name-input id="name-input" class="${this.isMobile ? 'mobile' : 'desktop'}"
                       @value-changed=${this._nameValueListener} @keydown=${this.handleKeyDown}></name-input>
          <styled-button text="confirm" class="single-button ${this.isMobile ? 'mobile' : 'desktop'}"
                         .enabled=${true}
                         @user-clicked=${this._handleSearchConfirm}></styled-button>
        </div>
        <footer-item class="footer ${this.isMobile ? 'mobile' : 'desktop'}"></footer-item>
      </div>
    `;
  }

  renderCodeBad() {
    return html`
      <div class="content ${this.isMobile ? 'mobile' : 'desktop'}">
        ${this.isMobile ?
          html`
            <mobile-header></mobile-header>` :
          html`
            <desktop-header selected="0"></desktop-header>`}
        <div class="main-content ${this.isMobile ? 'mobile' : 'desktop'}">
          <div class="title-text">
            <div class="page-title ${this.isMobile ? 'mobile' : 'desktop'}">RSVP</div>
            <div class="joy-message ${this.isMobile ? 'mobile' : 'desktop'}">
              RSVP Code Not Found
            </div>
          </div>
          <img src="/images/sad_image.svg" />
          <div class="joy-message ${this.isMobile ? 'mobile' : 'desktop'}">
            Please retry or contact us as tumidanski2024@gmail.com
          </div>
          <styled-button text="back" class="single-button ${this.isMobile ? 'mobile' : 'desktop'}" enabled
                         @user-clicked=${this._handleBadCodeBack}></styled-button>
        </div>
        <footer-item class="footer ${this.isMobile ? 'mobile' : 'desktop'}"></footer-item>
      </div>
    `;
  }

  renderThankYou() {
    return html`
      <div class="content ${this.isMobile ? 'mobile' : 'desktop'}">
        ${this.isMobile ?
          html`
            <mobile-header></mobile-header>` :
          html`
            <desktop-header selected="0"></desktop-header>`}
        <div class="main-content ${this.isMobile ? 'mobile' : 'desktop'}">
          <div class="title-text">
            <div class="page-title ${this.isMobile ? 'mobile' : 'desktop'}">RSVP</div>
            <div class="joy-message ${this.isMobile ? 'mobile' : 'desktop'}">
              The window to RSVP or adjust dinner selections has closed!
            </div>
          </div>
        </div>
        <footer-item class="footer ${this.isMobile ? 'mobile' : 'desktop'}"></footer-item>
      </div>
    `;
  }

  renderAttendance() {
    return html`
      <div class="content ${this.isMobile ? 'mobile' : 'desktop'}">
        ${this.isMobile ?
          html`
            <mobile-header></mobile-header>` :
          html`
            <desktop-header selected="0"></desktop-header>`}
        <div class="main-content  ${this.isMobile ? 'mobile' : 'desktop'}">
          <div class="title-text">
            <div class="page-title ${this.isMobile ? 'mobile' : 'desktop'}">RSVP</div>
            <div class="joy-message ${this.isMobile ? 'mobile' : 'desktop'}">
              Attendance
            </div>
          </div>
          <div>
            <div class="member-response-container ${this.isMobile ? 'mobile' : 'desktop'}">
              ${Array.from(this._allPartyMembers()).map((a, index, array) => html`
                <attendance-item member_id="${a.id}" first_name="${a['first-name']}" last_name="${a['last-name']}"
                                 ?attending=${a.response.attending}
                                 @value-changed=${this._attendanceChanged}></attendance-item>
                ${index < array.length - 1 ? html`
                  <div class="separator ${this.isMobile ? 'mobile' : 'desktop'}">&</div>` : html``}
              `)}
            </div>
          </div>
          <div class="buttons">
            <styled-button text="back" class="double-button ${this.isMobile ? 'mobile' : 'desktop'}" enabled
                           @user-clicked=${this._handleBack}></styled-button>
            <styled-button text="next" class="double-button ${this.isMobile ? 'mobile' : 'desktop'}"
                           enabled
                           @user-clicked=${this._handleForward}></styled-button>
          </div>
        </div>
        <footer-item class="footer ${this.isMobile ? 'mobile' : 'desktop'}"></footer-item>
      </div>
    `;
  }

  renderEntree() {
    return html`
      <div class="content ${this.isMobile ? 'mobile' : 'desktop'}">
        ${this.isMobile ?
          html`
            <mobile-header></mobile-header>` :
          html`
            <desktop-header selected="0"></desktop-header>`}
        <div class="main-content  ${this.isMobile ? 'mobile' : 'desktop'}">
          <div class="title-text">
            <div class="page-title ${this.isMobile ? 'mobile' : 'desktop'}">RSVP</div>
            <div class="joy-message ${this.isMobile ? 'mobile' : 'desktop'}">
              Dinner Selection
            </div>
          </div>
          <div>
            <div class="member-response-container ${this.isMobile ? 'mobile' : 'desktop'}">
              ${Array.from(this._allAttendingMembers()).map((a, index, array) => html`
                <entree-item member_id="${a.id}" first_name="${a['first-name']}" last_name="${a['last-name']}"
                             entree="${a.response.entree}"
                             ?attending=${a.response.attending} @value-changed=${this._entreeChanged}></entree-item>
                ${index < array.length - 1 ? html`
                  <div class="separator ${this.isMobile ? 'mobile' : 'desktop'}">&</div>` : html``}
              `)}
            </div>
          </div>
          <div class="buttons">
            <styled-button text="back" class="double-button ${this.isMobile ? 'mobile' : 'desktop'}" enabled
                           @user-clicked=${this._handleBack}></styled-button>
            <styled-button text="next" class="double-button ${this.isMobile ? 'mobile' : 'desktop'}"
                           .enabled=${this._processedEntree}
                           @user-clicked=${this._handleForward}></styled-button>
          </div>
        </div>
        <footer-item class="footer ${this.isMobile ? 'mobile' : 'desktop'}"></footer-item>
      </div>
    `;
  }

  renderAllergyPrompt() {
    return html`
      <div class="content ${this.isMobile ? 'mobile' : 'desktop'}">
        ${this.isMobile ?
          html`
            <mobile-header></mobile-header>` :
          html`
            <desktop-header selected="0"></desktop-header>`}
        <div class="main-content  ${this.isMobile ? 'mobile' : 'desktop'}">
          <div class="title-text">
            <div class="page-title ${this.isMobile ? 'mobile' : 'desktop'}">RSVP</div>
            <div class="joy-message ${this.isMobile ? 'mobile' : 'desktop'}">
              Food Allergies
            </div>
          </div>
          <div>
            <div class="member-response-container ${this.isMobile ? 'mobile' : 'desktop'}">
              ${Array.from(this._allAttendingMembers()).map((a, index, array) => html`
                <allergy-prompt-item member_id="${a.id}" first_name="${a['first-name']}" last_name="${a['last-name']}"
                                     ?allergy="${a.response.allergies.length > 0}"
                                     ?attending=${a.response.attending}
                                     @value-changed=${this._allergyPromptChanged}></allergy-prompt-item>
                ${index < array.length - 1 ? html`
                  <div class="separator ${this.isMobile ? 'mobile' : 'desktop'}">&</div>` : html``}
              `)}
            </div>
          </div>
          <div class="buttons">
            <styled-button text="back" class="double-button ${this.isMobile ? 'mobile' : 'desktop'}" enabled
                           @user-clicked=${this._handleBack}></styled-button>
            <styled-button text="next" class="double-button ${this.isMobile ? 'mobile' : 'desktop'}" enabled
                           @user-clicked=${this._handleForward}></styled-button>
          </div>
        </div>
        <footer-item class="footer ${this.isMobile ? 'mobile' : 'desktop'}"></footer-item>
      </div>
    `;
  }

  renderAllergyDetail() {
    return html`
      <div class="content ${this.isMobile ? 'mobile' : 'desktop'}">
        ${this.isMobile ?
          html`
            <mobile-header></mobile-header>` :
          html`
            <desktop-header selected="0"></desktop-header>`}
        <div class="main-content  ${this.isMobile ? 'mobile' : 'desktop'}">
          <div class="title-text">
            <div class="page-title ${this.isMobile ? 'mobile' : 'desktop'}">RSVP</div>
            <div class="joy-message ${this.isMobile ? 'mobile' : 'desktop'}">
              Food Allergies
            </div>
          </div>
          <div>
            <div class="member-response-container ${this.isMobile ? 'mobile' : 'desktop'}">
              ${Array.from(this._allAttendingMembers()).map((a, index, array) => html`
                <allergy-detail-item member_id="${a.id}" first_name="${a['first-name']}" last_name="${a['last-name']}"
                                     allergies="${a.response.allergies}"
                                     ?attending=${a.response.attending}
                                     @value-changed=${this._allergyDetailChanged}></allergy-detail-item>
                ${index < array.length - 1 ? html`
                  <div class="separator ${this.isMobile ? 'mobile' : 'desktop'}">&</div>` : html``}
              `)}
            </div>
          </div>
          <div class="buttons">
            <styled-button text="back" class="double-button ${this.isMobile ? 'mobile' : 'desktop'}" enabled
                           @user-clicked=${this._handleBack}></styled-button>
            <styled-button text="next" class="double-button ${this.isMobile ? 'mobile' : 'desktop'}" enabled
                           @user-clicked=${this._handleForward}></styled-button>
          </div>
        </div>
        <footer-item class="footer ${this.isMobile ? 'mobile' : 'desktop'}"></footer-item>
      </div>
    `;
  }

  renderComplete() {
    return html`
      <div class="content ${this.isMobile ? 'mobile' : 'desktop'}">
        ${this.isMobile ?
          html`
            <mobile-header></mobile-header>` :
          html`
            <desktop-header selected="0"></desktop-header>`}
        <div class="main-content ${this.isMobile ? 'mobile' : 'desktop'}">
          <div class="title-text">
            <div class="page-title ${this.isMobile ? 'mobile' : 'desktop'}">RSVP</div>
            <div class="joy-message ${this.isMobile ? 'mobile' : 'desktop'}">
              Thank you for your rsvp!
            </div>
          </div>
          <img class="happy-image ${this.isMobile ? 'mobile' : 'desktop'}" src="/images/happy_image.svg" />
          <div class="joy-message ${this.isMobile ? 'mobile' : 'desktop'}">
            If you need to change any of your answers, please contact us.
          </div>
          <navigate-styled-button class="single-button ${this.isMobile ? 'mobile' : 'desktop'}" text="done" url="/"
                                  enabled></navigate-styled-button>
        </div>
        <footer-item class="footer ${this.isMobile ? 'mobile' : 'desktop'}"></footer-item>
      </div>
    `;
  }
}
