import BiologyPlayer from './views/BiologyPlayer.vue';
import BooksSelector from './views/BooksSelector.vue';
import Questions from './views/Questions.vue';
import SevenLogin from './views/SevenLogin.vue';
import SevenNet from './views/SevenNet.vue';
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
        meta: { isRoot: true }
    },
    {
        name: "questions",
        path: '/selector/questions/:name',
        component: Questions
    },
    {
        name: "7Login",
        path: '/7net/login',
        component: SevenLogin,
        meta: { isRoot: true }
    },
    {
        name: '7net',
        path: '/7net',
        component: SevenNet,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export { router };