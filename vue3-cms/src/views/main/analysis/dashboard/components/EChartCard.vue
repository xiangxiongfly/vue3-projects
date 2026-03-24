<script setup>
const props = defineProps({
  header: {
    type: String,
    default: "",
  }
});
</script>

<template>
  <div class="echart-card">
    <el-card class="card" :header="header">
      <slot>默认内容</slot>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.echart-card {
  color: red;
}
</style>