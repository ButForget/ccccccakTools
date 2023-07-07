import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import { router } from "./route";
import { createVuetify } from "vuetify/lib/framework.mjs";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import { md3 } from "vuetify/blueprints"
import { SevenNetUser } from "./store";
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App);
const pinia = createPinia();

pinia.use(createPersistedState());
app.use(router);
app.use(createVuetify({ blueprint: md3 }));
app.use(pinia);
app.mount("#app");


const SevenNetUserStore = SevenNetUser();
router.beforeEach((to, from) => {
    speechSynthesis.cancel();
    switch (to.name) {
        case 'app': return { name: 'selector' };
        case '7net':
            if (SevenNetUserStore.token === '') return { name: '7Login' };
        case '7Login':
            if (from.name === "7net" && SevenNetUserStore.token !== '') return false;
    }

    return true;
});