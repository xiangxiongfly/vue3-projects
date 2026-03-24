import {KEY_TOKEN} from "@/global/constants.js";
import {localCache} from "@/utils/cache.js";
import {firstRoute} from "@/utils/maps.js";
import NotFound from "@/views/not-found/NotFound.vue";
import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/main",
        },
        {
            path: "/login",
            component: () => import("@/views/login/Login.vue"),
        },
        {
            path: "/main",
            name: "main",
            component: () => import("@/views/main/Main.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            component: () => import("@/views/not-found/NotFound.vue"),
        }
    ],
});

router.beforeEach((to, from, next) => {
    const token = localCache.getCache(KEY_TOKEN);
    if (token && to.path === "/main") {
        next(firstRoute?.path);
    } else if (!token && to.path !== "/login") {
        next("/login");
    } else {
        next();
    }
});

export default router;
