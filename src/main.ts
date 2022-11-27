import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import App from './App.vue';
import router from './router';

import './style.css';

const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');
