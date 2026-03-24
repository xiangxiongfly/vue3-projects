<script setup>
import BarEChart from "@/components/echarts/BarEChart.vue";
import LineEChart from "@/components/echarts/LineEChart.vue";
import MapEChart from "@/components/echarts/MapEChart.vue";
import PieEChart from "@/components/echarts/PieEChart.vue";
import RoseEChart from "@/components/echarts/RoseEChart.vue";
import useAnalysisStore from "@/stores/analysisStore.js";
import CountCard from "@/views/main/analysis/dashboard/components/CountCard.vue";
import EChartCard from "@/views/main/analysis/dashboard/components/EChartCard.vue";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const analysisStore = useAnalysisStore();
analysisStore.getAllData();
const {
  amountList,
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale,
} = storeToRefs(analysisStore);

// 分类数量
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map(item => ({name: item.name, value: item.goodsCount}));
});

// 分类销量
const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map(item => item.name);
  const values = goodsCategorySale.value.map(item => item.goodsCount);
  return {labels, values};
});

const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map(item => ({name: item.address, value: item.count}));
});

</script>

<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <CountCard v-bind="item"/>
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="7">
        <EChartCard header="饼图">
          <PieEChart :pieData="showGoodsCategoryCount"/>
        </EChartCard>
      </el-col>
      <el-col :span="10">
        <EChartCard header="地图">
          <MapEChart :mapData="showGoodsAddressSale"/>
        </EChartCard>
      </el-col>
      <el-col :span="7">
        <EChartCard header="玫瑰图">
          <RoseEChart :roseData="showGoodsCategoryCount"/>
        </EChartCard>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <EChartCard header="折线图">
          <LineEChart v-bind="showGoodsCategorySale"/>
        </EChartCard>
      </el-col>
      <el-col :span="12">
        <EChartCard header="柱状图">
          <BarEChart v-bind="showGoodsCategorySale"/>
        </EChartCard>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  color: red;

  .el-row {
    margin-bottom: 10px;
  }
}
</style>