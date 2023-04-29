import BiologyPlayer from './views/BiologyPlayer.vue';
import { createRouter } from "vue-router";
import { createWebHashHistory } from 'vue-router';
const routes = [
    {path: '/', component: BiologyPlayer}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export {router};