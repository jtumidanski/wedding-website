// src/index.js
import {Router} from '@vaadin/router';
import './src/app';
import './src/pages/home-page';
import './src/pages/accommodations-page';
import './src/pages/faq-page';
import './src/pages/registry-page';
import './src/pages/rsvp-page';

const routes = [
  {path: '/', component: 'home-page'},
  {path: '/accommodations', component: 'accommodations-page'},
  {path: '/faq', component: 'faq-page'},
  {path: '/registry', component: 'registry-page'},
  {path: '/rsvp', component: 'rsvp-page'},
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
