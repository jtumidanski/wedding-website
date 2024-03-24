// app.ts
import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('app-root')
export class App extends LitElement {
  static styles = css`
      #video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
      }
  `;

  render() {
    return html`
      <video id="video-background" autoplay muted loop>
        <source src="/videos/background-video.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div id="outlet"></div>
    `;
  }
}
