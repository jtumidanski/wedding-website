// about-page.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {BasePage} from './base-page';

@customElement('about-page')
export class AboutPage extends BasePage {
  static styles = css`
      .container {
  `;

  render() {
    return html`about
    `;
  }
}
