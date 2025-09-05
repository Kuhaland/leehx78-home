import { createApp } from 'vue'
import './assets/scss/import.scss'
import App from './App.vue'
import router from "./router";

createApp(App).use(router).mount('#app');
