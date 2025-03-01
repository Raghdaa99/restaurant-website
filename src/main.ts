import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import piniaPersistedState from 'pinia-plugin-persistedstate';
import 'leaflet/dist/leaflet.css'; 
import Swal from 'sweetalert2';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import setupI18n from "./plugins/i18n";

import { darkClass } from '@/utils/theme';


const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersistedState);
app.use(pinia);

const i18n = setupI18n();
app.use(i18n);
app.use(router);
window.Swal = Swal;
window.toastr = toastr;


app.config.globalProperties.$darkClass = darkClass;

app.mount('#app');
