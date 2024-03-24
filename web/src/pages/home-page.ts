// src/home-page.ts
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import '../components/mobile-header';
import '../components/desktop-header'
import '../components/styled-button';
import '../components/itinerary-item';
import '../components/footer-item'
import {BasePage} from './base-page';


@customElement('home-page')
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

      .normal-text {
          color: #FFF;
          text-align: center;
          font-family: Avenir, sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 1.4px;
          text-transform: uppercase;
      }

      .normal-text.desktop {
          font-size: 21px;
          line-height: 137.8%; /* 28.938px */
          letter-spacing: 2.1px;
      }

      .normal-text.bold {
          font-weight: 800;
      }

      .date-text {
          font-family: "Bodoni 72 Smallcaps";
          font-size: 52px;
          font-weight: 400;
          line-height: 47px;
          text-align: center;
      }

      .hour-frame {
          display: flex;
          padding: 15px 20px;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          align-self: stretch;
          border-width: 1px;
          border-style: solid;
      }
      
      .hour-frame.desktop {
          width: 400px;
      }

      .wedding-intro {
          flex-shrink: 0;
          align-self: stretch;
          gap: 10px;
          display: flex;
          flex-direction: column;
      }

      .wedding-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          align-self: stretch;
      }

      .wedding-info.desktop {
          gap: 10px;
      }
      
      .mobile-button {
          width: 100%;
      }
      
      itinerary-item {
          width: 100%;
      }
      
      .desktop-info-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 50px;
          align-self: stretch;
      }
      
      .desktop-detail-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100vw;
          flex-direction: row;
          gap: 50px;
      }
  `;

  mobileRender() {
    return html`
      <div class="content">
        <mobile-header></mobile-header>
        <div class="wedding-intro">
          <div class="normal-text">Please join Abigail & Justin</div>
          <div class="date-text">August 30th 2024</div>
          <div class="normal-text">To celebrate their wedding</div>
        </div>
        <styled-button class="mobile-button" text="RSVP"></styled-button>
        <div class="wedding-info">
          <div class="normal-text">Ceremony & reception to be celebrated at</div>
          <div class="normal-text bold">Bay pointe woods</div>
          <div class="normal-text">5100 oarie dr, shelbyville, mi 49344</div>
          <div class="hour-frame">
            <itinerary-item key="Ceremony" value="00:00 pm"></itinerary-item>
            <itinerary-item key="Cocktail Hour" value="00:00 pm"></itinerary-item>
            <itinerary-item key="Dinner" value="00:00 pm"></itinerary-item>
            <itinerary-item key="Reception" value="00:00 pm"></itinerary-item>
          </div>
          <footer-item></footer-item>
        </div>
      </div>
    `;
  }

  desktopRender() {
    return html`
      <div class="content">
        <desktop-header></desktop-header>
        <div class="desktop-info-container">
          <div class="wedding-intro">
            <div class="normal-text desktop">Please join Abigail & Justin</div>
            <div class="date-text">August 30th 2024</div>
            <div class="normal-text desktop">To celebrate their wedding</div>
          </div>
          <div class="desktop-detail-container">
            <div class="desktop-address-container">
              <div class="normal-text desktop">Ceremony & reception to be celebrated at</div>
              <div class="normal-text bold desktop">Bay pointe woods</div>
              <div class="normal-text desktop">5100 oarie dr, shelbyville, mi 49344</div>
            </div>
            <div class="hour-frame desktop">
              <itinerary-item key="Ceremony" value="00:00 pm" desktop></itinerary-item>
              <itinerary-item key="Cocktail Hour" value="00:00 pm" desktop></itinerary-item>
              <itinerary-item key="Dinner" value="00:00 pm" desktop></itinerary-item>
              <itinerary-item key="Reception" value="00:00 pm" desktop></itinerary-item>
            </div>
          </div>
        </div>
        <footer-item></footer-item>
      </div>
    `;
  }

  render() {
    return this.isMobile ? this.mobileRender() : this.desktopRender()
  }
}
