// src/index.js
import { Router } from '@vaadin/router';
import './src/app'
import './src/pages/home-page';
import './src/pages/about-page';
import './src/pages/accommodations-page';

const routes = [
  { path: '/', component: 'home-page' },
  { path: '/about', component: 'about-page' },
  { path: '/accommodations', component: 'accommodations-page'}
];

document.addEventListener('DOMContentLoaded', () => {
  const myApp = document.querySelector('app-root');
// @ts-ignore
  const shadowRoot = myApp.shadowRoot;
// @ts-ignore
  const outlet = shadowRoot.getElementById('outlet');
  const router = new Router(outlet);
  router.setRoutes(routes);
});
