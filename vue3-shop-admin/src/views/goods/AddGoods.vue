<script setup>
import {ref} from "vue";
import GoodsBaseSetting from "./GoodsBaseSetting.vue";
import GoodsPriceSetting from "./GoodsPriceSetting.vue";
import GoodsDetailSetting from "./GoodsDetailSetting.vue";

const activeTab = ref("1");

function handleClick(idx) {

}
</script>

<template>
  <div class="content-container">
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane label="基础配置" name="1">
        <GoodsBaseSetting/>
      </el-tab-pane>
      <el-tab-pane label="价格库存" name="2">
        <GoodsPriceSetting/>
      </el-tab-pane>
      <el-tab-pane label="商品详情" name="3">
        <GoodsDetailSetting/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>

</style>