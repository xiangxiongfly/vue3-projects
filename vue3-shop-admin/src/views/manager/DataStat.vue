<script setup>
import {getCurrentInstance, onMounted, ref, watch} from "vue";
import Mock from '../../mock/index.js';
import * as echarts from 'echarts';

const xData = ["8月1日", "8月2日", "8月3日", "8月4日", "8月5日", "8月6日"];
const chartData = ref([]);
const type = ref("总交易额");
const data = ref({});

const instance = getCurrentInstance();

function refreshChart() {
  const data = chartData.value;
  let chart = echarts.init(instance.proxy.$refs.chart);
  chart.clear();
  chart.setOption({
    xAxis: {
      data: xData,
    },
    yAxis: {
      type: 'value',
    },
    series: {
      type: 'line',
      data: data,
    }
  });
}

function changeType() {
  chartData.value = Mock.getChartData();
}

watch(chartData, () => {
  refreshChart();
});

onMounted(() => {
  data.value = Mock.getTradeData();
  chartData.value = Mock.getChartData();
  refreshChart();
});
</script>

<template>
  <div class="content-container">
    <el-container class="content-row">
      <div class="info">总交易额：{{ data.allTrade }}</div>
      <div class="info">秒杀商品交易额：{{ data.speTrade }}</div>
      <div class="info">普通商品交易额：{{ data.norTrade }}</div>
      <div class="info">用户数量：{{ data.userCount }}</div>
      <div class="info">分销商数量：{{ data.managerCount }}</div>
    </el-container>
    <el-container class="content-row">
      <el-radio-group @change="changeType" v-model="type">
        <el-radio-button label="总交易额" value="总交易额"/>
        <el-radio-button label="商品交易额" value="商品交易额"/>
        <el-radio-button label="新用户销量" value="新用户销量"/>
        <el-radio-button label="方可转化率" value="方可转化率"/>
        <el-radio-button label="下单转化率" value="下单转化率"/>
        <el-radio-button label="付款转化率" value="付款转化率"/>
        <el-radio-button label="流水" value="流水"/>
      </el-radio-group>
    </el-container>
    <div ref="chart" id="chart"></div>
    <div class="real-time">
      <div class="info">更新时间：{{ data.time }}</div>
      <el-container class="content-row">
        <div class="block">
          <div class="title">付款金额：XXX</div>
          <div class="sub-title">当日：XX</div>
          <div class="sub-title">昨日：XX</div>
        </div>
        <div class="block">
          <div class="title">支付订单数：XXX</div>
          <div class="sub-title">当日：XX</div>
          <div class="sub-title">昨日：XX</div>
        </div>
        <div class="block">
          <div class="title">付款人数：XXX</div>
          <div class="sub-title">当日：XX</div>
          <div class="sub-title">昨日：XX</div>
        </div>
        <div class="block">
          <div class="title">付款转换率：XXX</div>
          <div class="sub-title">当日：XX</div>
          <div class="sub-title">昨日：XX</div>
        </div>
      </el-container>
      <el-container class="content-row">
        <div class="block">
          <div class="title">访客数：XXX</div>
          <div class="sub-title">当日：XX</div>
          <div class="sub-title">昨日：XX</div>
        </div>
        <div class="block">
          <div class="title">访客次数：XXX</div>
          <div class="sub-title">当日：XX</div>
          <div class="sub-title">昨日：XX</div>
        </div>
        <div class="block">
          <div class="title">新增用户：XXX</div>
          <div class="sub-title">当日：XX</div>
          <div class="sub-title">昨日：XX</div>
        </div>
        <div class="block">
          <div class="title">累计用户：XXX</div>
          <div class="sub-title">当日：XX</div>
          <div class="sub-title">昨日：XX</div>
        </div>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
#chart {
  width: 1200px;
  height: 400px;
}

.info {
  margin: 15px 40px;
  font-size: 20px;
  color: #777;
}

.real-time {
  border: #777 solid 1px;
  width: 1200px;
  height: 300px;
}

.block {
  margin: auto;
  width: 300px;
  padding: 10px 30px;
}

.title {
  font-size: 20px;
  color: #777;
  margin-bottom: 5px;
}

.sub-title {
  font-size: 18px;
  color: #777;
  margin-top: 3px;
}
</style>