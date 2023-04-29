import { createApp } from 'vue'
import App from './App.vue'

import {router} from './route.js'
import { createPinia } from 'pinia'
import {createPersistedState} from "pinia-plugin-persistedstate"

const pinia = createPinia();
pinia.use(createPersistedState());

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App);
app.use(router);
app.use(createVuetify());
app.use(pinia);
app.mount('#app');