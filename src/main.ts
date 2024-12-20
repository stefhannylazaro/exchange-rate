import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia";
import './assets/styles/styles.scss';

const app = createApp(App);
// config pinia
const pinia = createPinia();
app.use(pinia);
app.mount("#app");