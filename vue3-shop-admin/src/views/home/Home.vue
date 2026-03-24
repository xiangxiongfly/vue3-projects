<script setup>
import {useRouter} from "vue-router";
import useUserStore from "../../stores/userStore.js";

const router = useRouter();
const userStore = useUserStore();

const selectItem = (path) => {
  router.push(path);
};

const logout = () => {
  userStore.clearUser();
  router.push("/login");
};
</script>

<template>
  <el-container class="container">
    <el-aside class="left-menu">
      <el-container class="top">
        <img class="logo" src="/public/logo.png" alt="">
        <div class="logo-title">
          电商后台管理
        </div>
      </el-container>
      <el-menu :default-active="$route.path"
               style="height: 100%"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               @select="selectItem">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <List/>
            </el-icon>
            <span>订单管理</span>
          </template>
          <el-menu-item index="/home/order/0">普通订单</el-menu-item>
          <el-menu-item index="/home/order/1">秒杀订单</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Shop/>
            </el-icon>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/home/goods/0">普通商品</el-menu-item>
          <el-menu-item index="/home/goods/1">秒杀商品</el-menu-item>
          <el-menu-item index="/home/goods/2">今日推荐</el-menu-item>
          <el-menu-item index="/home/goodsCategory">商品分类</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <Tools/>
            </el-icon>
            <span>管理</span>
          </template>
          <el-menu-item index="/home/dataStat">数据统计</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <el-header class="header">
        <el-container class="wrap">
          <div class="title">
            <h1>欢迎您登录后台管理系统，管理员:{{ userStore.userName }}</h1>
          </div>
          <div class="button-wrap">
            <el-button type="primary" @click="logout">注销</el-button>
          </div>
        </el-container>
      </el-header>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
}

.left-menu {
  width: 250px;
}

.left-menu .top {
  background-color: #545c64;
  margin-right: 1px;
  text-align: center;
  height: 60px;
}

.logo {
  width: 25px;
  height: 25px;
  margin: auto 0 auto auto;
}

.logo-title {
  margin: auto auto auto 10px;
  color: #fff;
  font-size: 17px
}

.main {
  padding: 0;
}

.main .header {
  height: 80px;
  margin: 0;
  padding: 0;
}

.main .header .wrap {
  height: 80px;
  margin: 0;
  padding: 0;
  background-color: blanchedalmond;
}

.main .header .wrap .title {
  margin: auto auto auto 100px;
}

.main .header .wrap .button-wrap {
  margin: auto 50px auto auto;
}
</style>