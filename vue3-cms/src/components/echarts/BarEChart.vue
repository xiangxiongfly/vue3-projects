<script setup>
import BaseEChart from "@/components/echarts/BaseEChart.vue";
import * as echarts from "echarts";
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
    grid: {
      bottom: "5%"
    },
    xAxis: {
      data: props.labels,
      axisLabel: {
        inside: true,
        color: "#fff"
      },
      z: 10
    },
    yAxis: {
      axisLabel: {
        color: "#999"
      }
    },
    dataZoom: [
      {
        type: "inside",
      }
    ],
    series: [{
      type: "bar",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {offset: 0, color: "#d9e8f6"},
          {offset: 0.5, color: "#50a4ec"},
          {offset: 1, color: "#0889f6"}
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
            {offset: 0, color: "#2378f7"},
            {offset: 0.7, color: "#2378f7"},
            {offset: 1, color: "#83bff6"}
          ])
        }
      },
      data: props.values
    }]
  };
});
</script>

<template>
  <div class="bar-echart">
    <BaseEChart :option="option"/>
  </div>
</template>

<style scoped lang="scss">

</style>