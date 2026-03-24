<script setup>
import BaseEChart from "@/components/echarts/BaseEChart.vue";
import {computed} from "vue";

const props = defineProps({
  pieData: {
    type: Array,
    default: () => []
  }
});

const option = computed(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      left: "left",
      top: "top",
    },
    series: [
      {
        // name: "访问来源",
        type: "pie",
        radius: "50%",
        bottom: "-10%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          }
        }
      }
    ]
  };
});
</script>

<template>
  <div class="pie-echart">
    <BaseEChart :option="option"/>
  </div>
</template>

<style scoped lang="scss">
.pie-echart {
  color: red;
}
</style>