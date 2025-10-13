import CartList from "@/views/cartlist/CartList.vue";
import Category from "@/views/category/Category.vue";
import Checkout from "@/views/checkout/Checkout.vue";
import GoodsDetail from "@/views/detail/GoodsDetail.vue";
import Home from "@/views/home/Home.vue";
import Layout from "@/views/layout/Layout.vue";
import Login from "@/views/login/Login.vue";
import UserInfo from "@/views/member/components/UserInfo.vue";
import UserOrder from "@/views/member/components/UserOrder.vue";
import Member from "@/views/member/Member.vue";
import Pay from "@/views/pay/Pay.vue";
import SubCategory from "@/views/subcategory/SubCategory.vue";
import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        component: Layout,
        children: [
          {path: "", redirect: "/home"},
          {path: "home", component: Home},
          {path: "category/:id", component: Category},
          {path: "category/sub/:id", component: SubCategory},
          {path: "detail/:id", component: GoodsDetail},
          {path: "cartlist", component: CartList},
          {path: "checkout", component: Checkout},
          {path: "pay", component: Pay},
          {
            path: "member", component: Member, redirect: "member/info",
            children: [
              {path: "info", component: UserInfo},
              {path: "order", component: UserOrder},
            ]
          }
        ]
      },
      {
        path: "/login", component: Login
      }
    ],
    scrollBehavior() {
      return {top: 0};
    }
  },
);

export default router;
