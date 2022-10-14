import App from './App.vue';
import { createSSRApp } from 'vue';
import { createRouter } from './router';
import pinia from './stores' // importing Pinia
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  app.use(router);
  app.use(pinia);
  app.use(FloatingVue)

  return { app, router, pinia };
}
