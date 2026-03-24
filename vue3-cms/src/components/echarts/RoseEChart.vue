<script setup>
import BaseEChart from "@/components/echarts/BaseEChart.vue";
import {computed, reactive} from "vue";

const props = defineProps({
  roseData: {
    type: Array,
    default: () => []
  }
});

const option = computed(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: [5, 120],
        center: ["50%", "50%"],
        bottom: "15%",
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: props.roseData,
        label: {
          show: false,
        }
      }
    ]
  };
});
</script>

<template>
  <div class="rose-echart">
    <BaseEChart :option="option"/>
  </div>
</template>

<style scoped lang="scss">
.rose-echart {
  color: red;
}
</style>