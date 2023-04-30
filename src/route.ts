import BiologyPlayer from './views/BiologyPlayer.vue';
import BiologySelector from './views/BiologySelector.vue';
import { createRouter } from "vue-router";
import { createWebHashHistory } from 'vue-router';
const routes = [
    {path: '/', component: BiologySelector}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export {router};