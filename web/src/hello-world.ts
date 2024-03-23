// src/hello-world.ts
import { html, css, LitElement } from 'lit';

class HelloWorld extends LitElement {
  static styles = css`
      :host {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
      }

      #video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
      }

      #content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: white;
          font-size: 2rem;
          padding: 20px;
      }
  `;

  render() {
    return html`
      <video id="video-background" autoplay muted loop>
        <source src="/videos/background-video.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div id="content">
        <h1>Hello, World!</h1>
      </div>
    `;
  }
}

customElements.define('hello-world', HelloWorld);
