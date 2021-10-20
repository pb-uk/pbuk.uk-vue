// src/index.js
import * as Vue from 'vue';

import { version } from '../package.json';
import HelloWorld from './HelloWorld.vue';

import AppAlert from './components/AppAlert.vue';
import AppButton from './components/AppButton.vue';
import AppIcon from './components/AppIcon.vue';
import DynamicPlot from './components/dynamic-plot/DynamicPlot.vue';

// Import the application defined in the page.
const application = Vue.createApp(window.app);

application.component('HelloWorld', HelloWorld);
application.component('AppAlert', AppAlert);
application.component('AppButton', AppButton);
application.component('AppIcon', AppIcon);
application.component('DynamicPlot', DynamicPlot);

application.mount(window.app.mount || '#app');

export { HelloWorld };
export { version };
