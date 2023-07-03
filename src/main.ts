import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import { router } from "./route";
import { createVuetify } from "vuetify/lib/framework.mjs";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import {md3} from "vuetify/blueprints"
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
const app = createApp(App);
const pinia = createPinia();
pinia.use(createPersistedState());
router.beforeEach((to, from)=>{
    speechSynthesis.cancel();


    return true;
});


app.use(router);
app.use(createVuetify({blueprint: md3}));
app.use(pinia);
router.push({name: "selector"});
app.mount("#app");
