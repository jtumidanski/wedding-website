// accommodations-page.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BasePage} from './base-page';
import '../components/footer-item'

@customElement('accommodations-page')
export class AccommodationsPage extends BasePage {
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
          border: 1px solid #ccc;
      }
      
      .mobile-title-text {
          gap: 10px;
      }
      
      .page-title {
          color: #FFF;
          text-align: center;
          font-family: "Bodoni 72 Smallcaps";
          font-size: 40px;
          font-style: normal;
          font-weight: 400;
          line-height: 47px; /* 117.5% */
          letter-spacing: 2.8px;
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
  `;

  mobileRender() {
    return html`
      <div class="content">
        <mobile-header></mobile-header>
        <div class="mobile-title-text">
          <div class="page-title">Accommodations</div>
          <div class="accommodations-text">
            We are over the moon that you will be joining us to celebrate our wedding!

            Since our wedding date coincides with peak tourism season, we recommend you secure your lodging early as availability can be limited. To assist you, we’ve compiled a list of recommended lodging.
          </div>
        </div>
        <div class="mobile-accommodations"></div>
        <footer-item></footer-item>
      </div>
    `;
  }

  render() {
    return this.isMobile ? this.mobileRender() : html``
  }
}
