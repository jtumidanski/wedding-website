// faq-page.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BasePage} from './base-page';
import '../components/footer-item'
import '../components/faq-item'

interface Question {
  [question: string]: string
}
@customElement('faq-page')
export class FaqPage extends BasePage {
  static styles = css`
      .content {
          z-index: 1;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100dvh;
          width: 100dvw;
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

      .faq-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          align-self: stretch;
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
  `;



  items = new Map<string, string>([
    ["What date should I RSVP by?", "We must receive your reply by August 1st, 2024 to ensure we can reserve you a place."],
    ["Is there parking available near the wedding venue?", "Yes, there is plenty of parking available at the venue!"],
    ["Is there a dress code?", "The dress code for our wedding is formal attire. That generally means evening dresses, cocktail dresses, casual suits, slacks, button-downs, and sports coats (ties or no ties) are all perfect."],
    ["May I bring my children?", "Unfortunately, we cannot host children at our wedding. We appreciate you making arrangements ahead of time and leaving the kids at home so you can celebrate with us."],
    ["Am I allowed to bring a plus one?", "Our celebration is strictly RSVP only. We will only be able to accommodate those listed on your wedding invitation."],
    ["What type of food will be served?", "We'll be serving hors d'oeuvres at cocktail hour followed by a sit-down dinner."],
    ["Will there be meal options for guests with dietary restrictions or allergies?", "Yes, please let us know when you <a href='/rsvp'>RSVP</a>!"],
    ["Could you suggest places to eat, drink and see while I am in town for your wedding?", "Yes! Please feel free to visit <a href='/accommodations'>this link</a> for all local recommendations."],
    ["I have more questions about your wedding, who can I contact?", "Please send us an email at <u>tumidanski2024@gmail.com</u>"]
  ])

  render() {
    return html`
      <div class="content ${this.isMobile ? 'mobile' : 'desktop'}">
        ${this.isMobile ?
      html`<mobile-header></mobile-header>` :
      html`<desktop-header selected="2"></desktop-header>`}
        <div class="faq-content">
          <div class="page-title ${this.isMobile ? 'mobile' : 'desktop'}">Q&A</div>
          ${Array.from(this.items.entries()).map(([q, a], index, array) => html`
            <faq-item key="${q}" value="${a}" .separator="${index < array.length - 1}" ?desktop="${!this.isMobile}"></faq-item>
          `)}
        </div>
        <footer-item></footer-item>
      </div>
    `;
  }
}
