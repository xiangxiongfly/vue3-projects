<script setup>
import useLoginStore from "@/stores/loginStore.js";
import {pathToMenu} from "@/utils/maps.js";
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();
const clickMenuItem = (item) => {
  const path = item.url;
  router.push(path);
};

const loginStore = useLoginStore();
const userMenus = loginStore.userMenus;
const route = useRoute();
const defaultActive = computed(() => {
  const menuItem = pathToMenu(route.path, userMenus);
  return String(menuItem.id);
});
</script>

<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="" class="img">
      <h2 v-show="!isFold" class="title">管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
          :default-active="defaultActive"
          :collapse="isFold"
          text-color="#b7bdc3"
          active-text-color="#fff"
          background-color="#001529">
        <template v-for="menu in userMenus" :key="menu.id">
          <el-sub-menu :index="String(menu.id)">
            <template #title>
              <el-icon>
                <component :is="menu.icon.split('-icon-')[1]"/>
              </el-icon>
              <span>{{ menu.name }}</span>
            </template>
            <template v-for="menuItem in menu.children" :key="menuItem.id">
              <el-menu-item :index="String(menuItem.id)" @click="clickMenuItem(menuItem)">
                {{ menuItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 28px;
    padding: 12px 10px 8px 10px;
    overflow: hidden;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      white-space: nowrap;
    }
  }

  .menu {
    .el-menu {
      border-right: none;
      user-select: none; // 防止鼠标文本选中

      .el-sub-menu {
        .el-menu-item {
          padding-left: 50px;
          background-color: #0c2135;

          &:hover {
            color: #fff;
          }

          &.is-active {
            background-color: dodgerblue;
          }
        }
      }
    }
  }
}
</style>