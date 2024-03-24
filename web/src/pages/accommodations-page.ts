// accommodations-page.ts
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BasePage} from './base-page';
import '../components/mobile-header'
import '../components/desktop-header'
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
          overflow-x: hidden;
          overflow-y: auto;
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
          font-family: "Bodoni 72 Smallcaps";
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
  `;

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
    return html`
      <div class="content">
        <desktop-header selected="1"></desktop-header>
        <div class="title-text">
          <div class="page-title desktop">Accommodations</div>
          <div class="joy-message desktop">
            We are over the moon that you will be joining us to celebrate our wedding!
          </div>
          <div class="accommodations-text desktop">
            Since our wedding date coincides with peak tourism season, we recommend you secure your lodging early as
            availability can be limited. To assist you, we’ve compiled a list of recommended lodging.
          </div>
        </div>
        <div class="accommodations desktop">
          <bay-pointe-accommodation-link></bay-pointe-accommodation-link>
          <text-accommodation-link name="Castle in the Country Bed & Breakfast"
                                   url="https://www.castleinthecountry.com/"></text-accommodation-link>
          <expedia-accommodation-link></expedia-accommodation-link>
          <text-accommodation-link name="Allegan Country Inn"
                                   url="https://www.allegancountryinn.com/"></text-accommodation-link>
          <airbnb-accommodation-link></airbnb-accommodation-link>
          <text-accommodation-link name="Whisper Ridge Bed & Breakfast"
                                   url="https://www.allegandepot.com/"></text-accommodation-link>
          <vrbo-accommodation-link></vrbo-accommodation-link>
          <text-accommodation-link name="Jade Estate Inn" url="https://jadeestateinn.com/"></text-accommodation-link>
        </div>
        <footer-item></footer-item>
      </div>
    `;
  }

  render() {
    return this.isMobile ? this.mobileRender() : this.desktopRender();
  }
}
