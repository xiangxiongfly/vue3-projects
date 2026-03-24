<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import {RouterView} from "vue-router";
</script>

<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <RouterView/>
    </el-config-provider>
  </div>
</template>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
}

</style>
