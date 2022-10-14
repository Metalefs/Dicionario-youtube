import App from './App.vue';
import { createSSRApp } from 'vue';
import { createRouter } from './router';
import pinia from './stores' // importing Pinia
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  app.use(router);
  app.use(pinia);
  app.use(FloatingVue)
  app.use(PrimeVue, {inputStyle: 'filled'});
  app.component('Textarea', Textarea);
  app.component('Button', Button);

  return { app, router, pinia };
}
