import BiologyPlayer from './views/BiologyPlayer.vue';
import BiologySelector from './views/BiologySelector.vue';
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        name: "player",
        path: '/player',
        component: BiologyPlayer,
    }, 
    {
        name: "selector",
        path: '/player/bioSelector',
        component: BiologySelector
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export {router};