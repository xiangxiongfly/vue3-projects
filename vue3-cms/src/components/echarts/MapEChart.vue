<script setup>
import ChinaJSON from "@/assets/map/china.json";
import BaseEChart from "@/components/echarts/BaseEChart.vue";
import {convertMapData} from "@/utils/convertMapData.js";
import * as echarts from "echarts";
import {computed} from "vue";

echarts.registerMap("china", ChinaJSON);

const props = defineProps({
  mapData: {
    type: Array,
    default: () => []
  }
});

const option = computed(() => {
  return {
    backgroundColor: "#fff",
    title: {
      text: "全国销量统计",
      left: "center",
      textStyle: {
        color: "#fff",
      }
    },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        return params.name + ":" + params.value[2];
      }
    },
    visualMap: {
      min: 0,
      max: 6000,
      left: 10,
      bottom: 10,
      calculable: true,
      text: ["高", "低"],
      inRange: {
        color: ["rgb(70, 240, 252)", "rgb(250, 220, 46)", "rgb(245, 38, 186)"]
      },
      textStyle: {
        color: "black",
      },
    },
    geo: {
      map: "china",
      roam: "scale", // 鼠标缩放
      emphasis: {
        itemStyle: {
          areaColor: "#f4cccc"
        }
      }
    },
    series: [
      {
        name: "销量",
        type: "scatter",
        coordinateSystem: "geo",
        data: convertMapData(props.mapData),
        symbolSize: 12,
      }
    ]
  };
});
</script>

<template>
  <BaseEChart :option="option"/>
</template>

<style scoped lang="scss">

</style>