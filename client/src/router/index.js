import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/stock",
            name: "stock",
            component: () => import("../views/StockView.vue")
        },
        {
            path: "/auth",
            name: "auth",
            component: () => import("../views/AuthView.vue")
        },
        {
            path: "/profile",
            name: "profile",
            component: () => import("../views/ProfileView.vue")
        },
        {
            path: "/about",
            name: "about",
            component: () => import("../views/AboutView.vue")
        }
    ]
});

export default router;
