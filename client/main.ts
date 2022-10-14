import App from './App.vue';
import { createSSRApp } from 'vue';
import { createRouter } from './router';
import pinia from './stores' // importing Pinia

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  app.use(router);
  app.use(pinia);
  return { app, router, pinia };
}
