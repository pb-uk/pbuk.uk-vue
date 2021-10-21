// src/index.js

import * as Vue from 'vue';

export { version } from '../package.json';
export { Visualize2d } from './visualize/index';

import AppAlert from './components/AppAlert.vue';
import AppButton from './components/AppButton.vue';
import AppIcon from './components/AppIcon.vue';
import VisualizeDom from './components/VisualizeDom.vue';

// Import the application defined in the page.
const mount = () => {
  const application = Vue.createApp(window.app);

  application.component('HelloWorld', HelloWorld);
  application.component('AppAlert', AppAlert);
  application.component('AppButton', AppButton);
  application.component('AppIcon', AppIcon);
  application.component('VisualizeDom', VisualizeDom);

  application.mount(window.app.mount || '#app');
};

// Need to wait until the next tick so exports are set on the window.
setTimeout(mount);
