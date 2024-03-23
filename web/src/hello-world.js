// src/hello-world.js
import { html, LitElement } from 'lit';

class HelloWorld extends LitElement {
  render() {
    return html`
      <h1>Hello, World!</h1>
    `;
  }
}

customElements.define('hello-world', HelloWorld);
