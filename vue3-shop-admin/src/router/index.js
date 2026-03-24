import {createRouter, createWebHistory} from "vue-router";
import useUserStore from "../stores/userStore.js";
import Login from "../views/login/Login.vue";
import Home from "../views/home/Home.vue";
import Order from "../views/order/Order.vue";
import AddGoods from "../views/goods/AddGoods.vue";
import Goods from "../views/goods/Goods.vue";
import GoodsCategory from "../views/goods/GoodsCategory.vue";
import DataStat from "../views/manager/DataStat.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Login,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/home",
            name: "home",
            component: Home,
            redirect: "/home/order/0",
            children: [
                {
                    path: "order/:type", // 0 普通订单，1 秒杀订单
                    name: "order",
                    component: Order
                },
                {
                    path: "goods/:type", // 0 普通商品，1 秒杀商品，2 今日推荐
                    name: "goods",
                    component: Goods
                },
                {
                    path: "addGoods/:type", // 0 普通商品，1 秒杀商品，2 今日推荐
                    name: "addGoods",
                    component: AddGoods
                },
                {
                    path: "goodsCategory", // 0 普通商品，1 秒杀商品，2 今日推荐
                    name: "goodsCategory",
                    component: GoodsCategory
                },
                {
                    path: "dataStat",
                    name: "dataStat",
                    component: DataStat
                }
            ],
        }
    ],
});

router.beforeEach((to, from) => {
    const userStore = useUserStore();
    const isLogin = userStore.isLogin;
    if (to.name === "login") {
        console.log("login页面");
    } else if (isLogin) {
        console.log("已登录");
    } else {
        console.log("未登录");
        return {name: "login"};
    }
});

export default router;