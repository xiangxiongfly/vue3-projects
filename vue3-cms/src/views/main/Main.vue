<script setup>
import MainHeader from "@/components/MainHeader.vue";
import MainMenu from "@/components/MainMenu.vue";
import {ref} from "vue";

const isFold = ref(false);

const handleFoldMenu = (isFlag) => {
  isFold.value = isFlag;
};
</script>

<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold?'60px':'210px'">
        <MainMenu :isFold="isFold"></MainMenu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @handleFoldMenu="handleFoldMenu"></MainHeader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.main {
  height: 100%;

  .main-content {
    height: 100%;

    .el-aside {
      scrollbar-width: none;
      transition: width 0.2s ease;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>