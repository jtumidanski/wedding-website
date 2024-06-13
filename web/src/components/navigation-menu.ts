// navigation-menu.ts
import { css, html, LitElement } from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('navigation-menu')
export class NavigationMenu extends LitElement {
  static styles = css`
      /* Styles for the navigation menu component */
      .menu-background img {
          position: absolute;
          top: 0;
          left: 0;
          transition: width 0.3s, opacity 0.3s;
          opacity: 1; /* Fade out */
      }
      
      .menu-background img.visible {
          opacity: 0; /* Fade out */
      }

      .menu-background {
          background: linear-gradient(157.07deg, #AD9961 6.81%, #806824 85.14%);
          width: 55px;
          height: 55px;
          overflow: hidden;
          transition: width 0.3s, height 0.3s;
          position: fixed;
          top: 0;
          right: 0;
          z-index: 1000;
      }

      .menu-background.visible {
          width: 100vw;
          height: 100vh;
      }
      
      .menu-container {
          display: flex;
          justify-content: center; /* Center horizontally */
          align-items: center; /* Center vertically */
          width: 0;
          height: 100vh;
          transition: width 0.3s, opacity 0.3s;
          position: fixed;
          top: 0;
          right: 0;
          z-index: 1001;
      }

      .menu-container.visible {
          width: 100vw;
      }

      .menu {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          overflow: hidden;
          opacity: 0;
      }

      .menu.visible {
          opacity: 1;
      }

      .menu a {
          text-decoration: none;
          margin-bottom: 10px;
          transition: opacity 0.3s;

          color: #FFF;
          text-align: center;
          font-family: Avenir,sans-serif;
          font-size: 18px;
          font-style: normal;
          font-weight: 900;
          line-height: normal;
          letter-spacing: 2.7px;
          text-transform: uppercase;
      }

      .menu a:hover {
          opacity: 0.7;
      }
      
      .menu-background img:hover {
          cursor: pointer;
          width: 55px; /* Adjust size as needed */
          height: 55px;
      }
      
      .menu-close {
          position: absolute;
          top: 0;
          right: 0;
          opacity: 0;
          padding: 10px;
      }
      
      .menu-close.visible {
          opacity: 1;
      }
  `;

  menuVisible = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    this.requestUpdate();
  }

  closeMenu() {
    this.menuVisible = false;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="menu-background ${this.menuVisible ? 'visible' : ''}">
        <img class="menu-img ${this.menuVisible ? 'visible' : ''}" @click="${this.toggleMenu}" src="/images/menu.png" alt="Menu">
      </div>
      <!-- Navigation links -->
      <div class="menu-container ${this.menuVisible ? 'visible' : ''}">
        <div class="menu-close ${this.menuVisible ? 'visible' : ''}" @click="${this.toggleMenu}">
          <svg width="35px" height="35px">
            <line x1="5" y1="5" x2="30" y2="30" style="stroke:#000; stroke-width:2" />
            <line x1="30" y1="5" x2="5" y2="30" style="stroke:#000; stroke-width:2" />
          </svg>
        </div>
        <div class="menu ${this.menuVisible ? 'visible' : ''}">
          <a href="/" @click="${this.closeMenu}">HOME</a>
          <a href="/rsvp" @click="${this.closeMenu}">RSVP</a>
          <a href="/accommodations" @click="${this.closeMenu}">ACCOMMODATIONS</a>
          <a href="/faq" @click="${this.closeMenu}">Q&A</a>
          <a href="/registry" @click="${this.closeMenu}">REGISTRY</a>
          <!-- Add more links as needed -->
        </div>
      </div>
    `;
  }
}
