// accommodations-page.ts
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BasePage} from './base-page';
import '../components/footer-item';
import '../components/bay-pointe-accommodation-link';
import '../components/expedia-accommodation-link';
import '../components/airbnb-accommodation-link';
import '../components/text-accommodation-link';
import '../components/vrbo-accommodation-link'

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

      .mobile-accommodations {
          padding: 10px;
          column-count: 2;
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

            Since our wedding date coincides with peak tourism season, we recommend you secure your lodging early as
            availability can be limited. To assist you, we’ve compiled a list of recommended lodging.
          </div>
        </div>
        <div class="mobile-accommodations">
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

  render() {
    return this.isMobile ? this.mobileRender() : html``;
  }
}
