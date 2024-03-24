// base-page.ts
import { css, html, LitElement } from 'lit';

export class BasePage extends LitElement {
  isMobile = false;
  constructor() {
    super();
    this.isMobile = false; // Assume desktop by default
    this.updateDeviceType();
  }

  updateDeviceType() {
    // Check device width to determine if it's a mobile device
    this.isMobile = window.innerWidth <= 768;
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.updateDeviceType.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.updateDeviceType.bind(this));
  }
}
