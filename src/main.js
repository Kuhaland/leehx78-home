import { createApp } from 'vue'
import './assets/scss/import.scss'
import App from './App.vue'
import router from './router'
console.log('등록된 라우트:', router.getRoutes().map(r => r.path))

createApp(App).use(router).mount('#app');
