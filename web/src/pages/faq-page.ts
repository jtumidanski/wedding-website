// faq-page.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BasePage} from './base-page';
import '../components/footer-item'

@customElement('faq-page')
export class FaqPage extends BasePage {
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
  `;

  mobileRender() {
    return html`
      <div class="content">
        <mobile-header></mobile-header>
        <div class="mobile-title-text">
          <div class="page-title">Q&A</div>
        </div>
        <footer-item></footer-item>
      </div>
    `;
  }

  render() {
    return this.isMobile ? this.mobileRender() : html``
  }
}
