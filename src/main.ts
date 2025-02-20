import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.css';
import piniaPersistedState from "pinia-plugin-persistedstate";
import 'leaflet/dist/leaflet.css'; 
const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPersistedState);
app.use(pinia);
app.use(router);

app.mount('#app')
