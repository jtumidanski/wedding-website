// registry-page.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BasePage} from './base-page';
import '../components/footer-item'
import '../components/honey-fund-registry-link'
import '../components/amazon-registry-link'

@customElement('registry-page')
export class RegistryPage extends BasePage {
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
          align-items: center;
          gap: 10px;
          align-self: stretch;
      }

      .title-text.desktop {
          gap: 20px;
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

      .registry-text {
          color: #FFF;
          text-align: center;
          font-family: Avenir, sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          white-space: pre-line;
      }
      
      .registry-text.desktop {
          max-width: 875px;
      }
      
      honey-fund-registry-link {
          width: 100%;
      }

      honey-fund-registry-link.desktop {
          width: 400px;
      }

      amazon-registry-link {
          width: 100%;
      }

      amazon-registry-link.desktop {
          width: 400px;
      }
  `;

  render() {
    return html`
      <div class="content">
        ${this.isMobile ?
      html`<mobile-header></mobile-header>` :
      html`<desktop-header selected="3"></desktop-header>`}
        <div class="title-text ${this.isMobile ? 'mobile' : 'desktop'}">
          <div class="page-title ${this.isMobile ? 'mobile' : 'desktop'}">Registry</div>
          <div class="registry-text ${this.isMobile ? 'mobile' : 'desktop'}">
            As we celebrate the beginning of our life together, your presence at our wedding is the most meaningful gift we could receive.

            Nevertheless, should you wish to offer a token of your congratulations, we would be grateful for your contribution to our honeymoon fund. Your kindness will assist us in creating memories that will last a lifetime.
          </div>
          <honey-fund-registry-link class="${this.isMobile ? 'mobile' : 'desktop'}"></honey-fund-registry-link>
          <amazon-registry-link class="${this.isMobile ? 'mobile' : 'desktop'}"></amazon-registry-link>
        </div>
        <footer-item></footer-item>
      </div>
    `;
  }
}
