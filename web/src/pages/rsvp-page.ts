// src/home-page.ts
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import '../components/mobile-header';
import '../components/desktop-header';
import '../components/styled-button';
import '../components/itinerary-item';
import '../components/footer-item';
import '../components/digit-input';
import '../components/attendance-item';
import '../components/entree-item';
import '../components/allergy-prompt-item';
import '../components/allergy-detail-item';
import '../components/navigate-styled-button'
import {BasePage} from './base-page';
import {GetParty, PartyResponse} from '../services/party-service';


@customElement('rsvp-page')
export class HomePage extends BasePage {
  static styles = css`
      .content {
          z-index: 1;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          height: 100vh;
          width: 100vw;
          padding: 20px;
          box-sizing: border-box;
          overflow-x: hidden;
          overflow-y: auto;
      }

      .main-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          gap: 50px;
      }

      .title-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
      }

      .page-title {
          color: #FFF;
          text-align: center;
          font-family: "Bodoni 72 Smallcaps", serif;
          font-size: 40px;
          font-style: normal;
          font-weight: 400;
          line-height: 47px; /* 117.5% */
          letter-spacing: 2.8px;
      }

      .page-title.desktop {
          font-size: 72px;
          line-height: 72px; /* 100% */
          letter-spacing: 9.36px;
      }

      .joy-message {
          color: #FFF;
          text-align: center;
          font-family: Avenir, sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          white-space: pre-line;
      }

      .joy-message.desktop {
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 1.8px;
          text-transform: uppercase;
      }

      .accommodations-text {
          color: #FFF;
          text-align: center;
          font-family: Avenir, sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          white-space: pre-line;
      }

      .accommodations-text.desktop {
          font-size: 18px;
      }

      .accommodations.mobile {
          padding: 10px;
          column-count: 2;
      }

      .accommodations.desktop {
          padding: 100px;
          column-count: 4;
      }

      .member-response-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          gap: 20px;
      }

      .buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          gap: 30px;
      }

      .separator {
          font-family: "Bodoni 72 Smallcaps", serif;
          font-size: 45px;
          font-style: normal;
          font-weight: 900;
      }
  `;

  render() {
    return this.isMobile ? this.mobileRender() : this.desktopRender();
  }

  _state = 0;
  _hashValue = '';
  _fullHash = false;
  _party:PartyResponse = {"data": []};
  _allergyPrompt: string[] = [];
  _processedAttendance = false;
  _processedEntree = false;

  mobileRender() {
    return html`
      <div class="content">
        <mobile-header></mobile-header>
        <div class="title-text">
          <div class="page-title">Accommodations</div>
          <div class="joy-message">
            We are over the moon that you will be joining us to celebrate our wedding!
          </div>
          <div class="accommodations-text">
            Since our wedding date coincides with peak tourism season, we recommend you secure your lodging early as
            availability can be limited. To assist you, we’ve compiled a list of recommended lodging.
          </div>
        </div>
        <div class="accommodations mobile">
          <bay-pointe-accommodation-link></bay-pointe-accommodation-link>
          <airbnb-accommodation-link></airbnb-accommodation-link>
          <text-accommodation-link name="Castle in the Country Bed & Breakfast"
                                   url="https://www.castleinthecountry.com/"></text-accommodation-link>
          <text-accommodation-link name="Whisper Ridge Bed & Breakfast"
                                   url="https://www.allegandepot.com/"></text-accommodation-link>
          <expedia-accommodation-link></expedia-accommodation-link>
          <vrbo-accommodation-link></vrbo-accommodation-link>
          <text-accommodation-link name="Allegan Country Inn"
                                   url="https://www.allegancountryinn.com/"></text-accommodation-link>
          <text-accommodation-link name="Jade Estate Inn" url="https://jadeestateinn.com/"></text-accommodation-link>
        </div>
        <footer-item></footer-item>
      </div>
    `;
  }

  desktopRender() {
    switch (this._state) {
      case -1:
        return this.desktopRenderCodeBad();
      case 0:
        return this.desktopRenderCodeInput();
      case 1:
        return this.desktopRenderAttendance();
      case 2:
        return this.desktopRenderEntree();
      case 3:
        return this.desktopRenderAllergyPrompt();
      case 4:
        return this.desktopRenderAllergyDetail();
      case 999:
        return this.desktopRenderComplete();
      default:
        return html``;
    }
  }

  private _hashValueListener(e: CustomEvent) {
    this._hashValue = e.detail.value;
    this._fullHash = e.detail.value.length >= 4;
    this.requestUpdate();
  }

  private _attendanceChanged(e: CustomEvent) {
    this._updateAttendanceOfMember(e.detail.member_id, e.detail.attending);
    this._processedAttendance = this._hasSomeoneAttending();
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
                  attending: value
                }
              };
            } else {
              return member;
            }
          })
        }
      }))
    };
  }

  private _hasSomeoneAttending() {
    return this._party.data.flatMap(p => p.attributes.members).some(m => m.response.attending)
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
                  entree: value
                }
              };
            } else {
              return member;
            }
          })
        }
      }))
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
    }
    this.requestUpdate();
  }

  private _allergyDetailChanged(e: CustomEvent) {
    console.log(e.detail.allergies);
    this.requestUpdate();
  }
  private _attendeesHaveEntree() {
    return !this._party.data.flatMap(p => p.attributes.members).filter(m => m.response.attending).some(m => m.response.entree === '')
  }

  private _handleHashConfirm(event: any) {
    GetParty(this._hashValue).then(this._checkPartyResult);
  }

  private _handleBadCodeBack(event: any) {
    this._state = 0;
    this.requestUpdate();
  }

  private _handleBack(event: any) {
    this._state -=1;
    this.requestUpdate();
  }

  private _handleForward(event: any) {
    if (this._state == 4 || (this._state == 3 && this._allergyPrompt.length == 0)) {
      // send confirmation
      this._state = 999;
    } else {
      this._state +=1;
    }
    this.requestUpdate();
  }

  private _checkPartyResult = (party: PartyResponse) => {
    if (party.data && party.data.length > 0) {
      this._party = party;
      this._processedAttendance = this._hasSomeoneAttending();
      this._processedEntree = this._attendeesHaveEntree();
      this._allergyPrompt = this._party.data.flatMap(p => p.attributes.members).filter(m => m.response.allergies.length > 0).map(m => m.id);
      this._state = 1;
    } else {
      this._state = -1;
    }
    this.requestUpdate();
  };

  _keepFocus() {
    setTimeout(() => {
      const inputElement = this.shadowRoot!.querySelector('#hash-input') as HTMLInputElement;
      inputElement.focus();
    }, 0);
  }

  updated() {
    const inputElement = this.shadowRoot!.querySelector("#hash-input") as HTMLInputElement;
    inputElement.focus();
  }

  desktopRenderCodeInput() {
    return html`
      <div class="content">
        <desktop-header selected="0"></desktop-header>
        <div class="title-text">
          <div class="page-title desktop">RSVP</div>
          <div class="joy-message desktop">
            Please enter your RSVP code
          </div>
          <digit-input id="hash-input" @value-changed=${this._hashValueListener} @blur="${this._keepFocus}"></digit-input>
          <styled-button text="confirm" style="width: 400px" .enabled=${this._fullHash}
                         @user-clicked=${this._handleHashConfirm}></styled-button>
        </div>
        <div class="accommodations desktop">
        </div>
        <footer-item></footer-item>
      </div>
    `;
  }

  desktopRenderCodeBad() {
    return html`
      <div class="content">
        <desktop-header selected="0"></desktop-header>
        <div class="main-content">
          <div class="title-text">
            <div class="page-title desktop">RSVP</div>
            <div class="joy-message desktop">
              RSVP Code Not Found
            </div>
          </div>
          <img src="/images/sad_image.png" />
          <div class="joy-message desktop">
            Please retry or contact us as tumidanski2024@gmail.com
          </div>
          <styled-button text="back" style="width: 400px" enabled
                         @user-clicked=${this._handleBadCodeBack}></styled-button>
        </div>
        <div class="accommodations desktop">
        </div>
        <footer-item></footer-item>
      </div>
    `;
  }

  desktopRenderAttendance() {
    return html`
      <div class="content">
        <desktop-header selected="0"></desktop-header>
        <div class="main-content">
          <div class="title-text">
            <div class="page-title desktop">RSVP</div>
            <div class="joy-message desktop">
              Attendance
            </div>
          </div>
          <div>
            <div class="member-response-container">
              ${Array.from(this._party.data.flatMap(p => p.attributes.members).entries()).map(([q, a], index, array) => html`
                <attendance-item member_id="${a.id}" first_name="${a['first-name']}" last_name="${a['last-name']}"
                                 ?attending=${a.response.attending} @value-changed=${this._attendanceChanged}></attendance-item>
                ${index < array.length - 1 ? html`
                  <div class="separator">&</div>` : html``}
              `)}
            </div>
          </div>
          <div class="buttons">
            <styled-button text="back" style="width: 400px" enabled
                           @user-clicked=${this._handleBack}></styled-button>
            <styled-button text="next" style="width: 400px" .enabled=${this._processedAttendance}
                           @user-clicked=${this._handleForward}></styled-button>
          </div>
        </div>
        <div>
        </div>
        <footer-item></footer-item>
      </div>
    `;
  }

  desktopRenderEntree() {
    return html`
      <div class="content">
        <desktop-header selected="0"></desktop-header>
        <div class="main-content">
          <div class="title-text">
            <div class="page-title desktop">RSVP</div>
            <div class="joy-message desktop">
              Dinner Selection
            </div>
          </div>
          <div>
            <div class="member-response-container">
              ${Array.from(this._party.data.flatMap(p => p.attributes.members).entries()).map(([q, a], index, array) => html`
                <entree-item member_id="${a.id}" first_name="${a['first-name']}" last_name="${a['last-name']}"
                             entree="${a.response.entree}"
                                 ?attending=${a.response.attending} @value-changed=${this._entreeChanged}></entree-item>
                ${index < array.length - 1 ? html`
                <div class="separator">&</div>` : html``}
              `)}
            </div>
          </div>
          <div class="buttons">
            <styled-button text="back" style="width: 400px" enabled
                           @user-clicked=${this._handleBack}></styled-button>
            <styled-button text="next" style="width: 400px" .enabled=${this._processedEntree}
                           @user-clicked=${this._handleForward}></styled-button>
          </div>
        </div>
        <div>
        </div>
        <footer-item></footer-item>
      </div>
    `;
  }

  desktopRenderAllergyPrompt() {
    return html`
      <div class="content">
        <desktop-header selected="0"></desktop-header>
        <div class="main-content">
          <div class="title-text">
            <div class="page-title desktop">RSVP</div>
            <div class="joy-message desktop">
              Food Allergies
            </div>
          </div>
          <div>
            <div class="member-response-container">
              ${Array.from(this._party.data.flatMap(p => p.attributes.members).entries()).map(([q, a], index, array) => html`
                <allergy-prompt-item member_id="${a.id}" first_name="${a['first-name']}" last_name="${a['last-name']}"
                                     ?allergy="${a.response.allergies.length > 0}"
                                     ?attending=${a.response.attending}
                                     @value-changed=${this._allergyPromptChanged}></allergy-prompt-item>
                ${index < array.length - 1 ? html`
                  <div class="separator">&</div>` : html``}
              `)}
            </div>
          </div>
          <div class="buttons">
            <styled-button text="back" style="width: 400px" enabled
                           @user-clicked=${this._handleBack}></styled-button>
            <styled-button text="next" style="width: 400px" enabled
                           @user-clicked=${this._handleForward}></styled-button>
          </div>
        </div>
        <div>
        </div>
        <footer-item></footer-item>
      </div>
    `;
  }

  desktopRenderAllergyDetail() {
    return html`
      <div class="content">
        <desktop-header selected="0"></desktop-header>
        <div class="main-content">
          <div class="title-text">
            <div class="page-title desktop">RSVP</div>
            <div class="joy-message desktop">
              Food Allergies
            </div>
          </div>
          <div>
            <div class="member-response-container">
              ${Array.from(this._party.data.flatMap(p => p.attributes.members).entries()).map(([q, a], index, array) => html`
                <allergy-detail-item member_id="${a.id}" first_name="${a['first-name']}" last_name="${a['last-name']}"
                                     allergies="${a.response.allergies}"
                                     ?attending=${a.response.attending}
                                     @value-changed=${this._allergyDetailChanged}></allergy-detail-item>
                ${index < array.length - 1 ? html`
                  <div class="separator">&</div>` : html``}
              `)}
            </div>
          </div>
          <div class="buttons">
            <styled-button text="back" style="width: 400px" enabled
                           @user-clicked=${this._handleBack}></styled-button>
            <styled-button text="next" style="width: 400px" enabled
                           @user-clicked=${this._handleForward}></styled-button>
          </div>
        </div>
        <div>
        </div>
        <footer-item></footer-item>
      </div>
    `;
  }

  desktopRenderComplete() {
    return html`
      <div class="content">
        <desktop-header selected="0"></desktop-header>
        <div class="main-content">
          <div class="title-text">
            <div class="page-title desktop">RSVP</div>
            <div class="joy-message desktop">
              Thank you for your rsvp!
            </div>
          </div>
          <img src="/images/happy_image.png" />
          <div class="joy-message desktop">
            If you need to change any of your answers, please contact us.
          </div>
          <navigate-styled-button text="done" url="/" style="width: 400px" enabled></navigate-styled-button>
        </div>
        <div class="accommodations desktop">
        </div>
        <footer-item></footer-item>
      </div>
    `;
  }
}
