// mobile-header.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('footer-item')
export class LogoIcon extends LitElement {
  static styles = css`
      .small-text {
          color: #FFF;
          text-align: center;
          font-family: Avenir, sans-serif;
          font-size: 10px;
          font-style: normal;
          font-weight: 900;
          line-height: 14px; /* 140% */
          letter-spacing: 1px;
          text-transform: uppercase;
      }

      .small-text a {
          color: #FFF;
          font-family: Avenir, sans-serif;
          font-size: 10px;
          font-style: normal;
          font-weight: 900;
          line-height: 14px;
          letter-spacing: 1px;
          text-decoration-line: underline;
          text-transform: uppercase;
      }
  `;

  render() {
    return html`
      <div>
        <div class="small-text">Designed by <a href="https://titan.tumidanski.com/">TitanSoftware™</a></div>
        <div class="small-text">Hosted in <a
          href="https://www.google.com/maps/place/The+Grand+Castle+Apartments/@42.914816,-85.7575441,17.52z/data=!4m6!3m5!1s0x8819b0716a45d2c3:0x65bf1613081932ef!8m2!3d42.9159046!4d-85.7601452!16s%2Fg%2F11c554ths1?entry=tts">Titan
          Castle</a></div>
      </div>
    `;
  }
}
