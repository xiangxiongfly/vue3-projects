<script setup>
import {ref, watch, onMounted} from "vue";
import {useRoute} from "vue-router";

// 导入图片
import tabHome from "@/assets/img/tabbar/tab_home.png";
import tabHomeActive from "@/assets/img/tabbar/tab_home_active.png";
import tabFavor from "@/assets/img/tabbar/tab_favor.png";
import tabFavorActive from "@/assets/img/tabbar/tab_favor_active.png";
import tabOrder from "@/assets/img/tabbar/tab_order.png";
import tabOrderActive from "@/assets/img/tabbar/tab_order_active.png";
import tabMessage from "@/assets/img/tabbar/tab_message.png";

const route = useRoute();
const currentIndex = ref(0);

const tabBarData = [
  {
    text: "首页",
    icon: tabHome,
    iconActive: tabHomeActive,
    path: "/home"
  },
  {
    text: "收藏",
    icon: tabFavor,
    iconActive: tabFavorActive,
    path: "/favor"
  },
  {
    text: "订单",
    icon: tabOrder,
    iconActive: tabOrderActive,
    path: "/order"
  },
  {
    text: "消息",
    icon: tabMessage,
    iconActive: tabMessage,
    path: "/message"
  }
];

// 监听路由变化
watch(route, (newRoute) => {
  const index = tabBarData.findIndex(item => item.path === newRoute.path);
  if (index === -1) return;
  currentIndex.value = index;
});
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item,index) in tabBarData">
        <van-tabbar-item :to="item.path">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <template #icon>
            <img v-if="currentIndex === index" :src="item.iconActive" alt="">
            <img v-else :src="item.icon" alt="">
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
.tab-bar {
  :deep(.van-tabbar-item__icon) {
    font-size: 50px;
    height: 26px;
    width: 26px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
</style>