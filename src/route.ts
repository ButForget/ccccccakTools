import BiologyPlayer from './views/BiologyPlayer.vue';
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {path: '/', component: BiologyPlayer}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export {router};