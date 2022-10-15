import App from './App.vue';
import { createSSRApp } from 'vue';
import { createRouter } from './router';
import pinia from './stores' // importing Pinia
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import PrimeVue from 'primevue/config';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Divider from 'primevue/divider';
import Toolbar from 'primevue/toolbar';
import Card from 'primevue/card';

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  app.use(router);
  app.use(pinia);
  app.use(FloatingVue)
  app.use(PrimeVue, {inputStyle: 'filled'});
  app.component('Textarea', Textarea);
  app.component('Button', Button);
  app.component('InputText', InputText);
  app.component('Splitter', Splitter);
  app.component('SplitterPanel', SplitterPanel);
  app.component('Divider', Divider);
  app.component('Toolbar', Toolbar);
  app.component('Card', Card);

  return { app, router, pinia };
}
