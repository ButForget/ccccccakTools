import BiologyPlayer from './views/BiologyPlayer.vue';
import BooksSelector from './views/BooksSelector.vue';
import Questions from './views/Questions.vue';
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        name: "app",
        path: "/",
        component: App
    },
    {
        name: "player",
        path: '/player',
        component: BiologyPlayer,
    },
    {
        name: "selector",
        path: '/selector',
        component: BooksSelector,
        meta: {isRoot: true}
    },
    {
        name: "questions",
        path: '/selector/questions/:name',
        component: Questions
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
router.beforeEach((to, from)=>{
    speechSynthesis.cancel();


    return true;
})
export { router };