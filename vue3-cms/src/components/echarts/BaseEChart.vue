<script setup>
import {onMounted, ref, watchEffect} from "vue";
import * as echarts from "echarts";

const props = defineProps({
  option: {
    type: Object,
    default: () => ({})
  }
});

const echartRef = ref();

onMounted(() => {
  const echartInstance = echarts.init(echartRef.value);

  watchEffect(() => echartInstance.setOption(props.option));

  window.addEventListener("resize", () => {
    echartInstance.resize();
  });
});
</script>

<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<style scoped lang="scss">
.base-echart {
  color: red;

  .echart {
    height: 300px
  }
}
</style>