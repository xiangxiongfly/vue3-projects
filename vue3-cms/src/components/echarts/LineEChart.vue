<script setup>
import BaseEChart from "@/components/echarts/BaseEChart.vue";
import {computed} from "vue";

const props = defineProps({
  labels: {
    type: Array,
    default: () => []
  },
  values: {
    type: Array,
    default: () => []
  }
});

const option = computed(() => {
  return {
    title: {
      text: "销售额"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: props.labes,
      }
    ],
    yAxis: [
      {
        type: "value",
      }
    ],
    series: [
      {
        name: "分类销量统计",
        type: "line",
        stack: "总量",
        areaStyle: {},
        emphasis: {
          font: "series"
        },
        data: props.values
      }
    ]
  };
});

</script>

<template>
  <div class="line-echart">
    <BaseEChart :option="option"/>
  </div>
</template>

<style scoped lang="scss">

</style>