<script setup>
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import Mock from "../../mock/index.js";
import Tools from "../../utils/tools.js";

const router = useRoute();
const orders = ref([]);
const queryParams = ref({
  goods: "", // 商品名
  consignee: "", // 收货人
  phone: "", // 手机号
  name: "", // 姓名
  payTime: "", // 支付时间
  sendTime: "" // 发货时间
});
const selectedOrderList = ref([]);

/**
 * 请求模拟数据
 */
function requestData() {
  ElMessage({
    type: "success",
    message: "筛选请求参数：" + JSON.stringify(queryParams.value)
  });
  orders.value = Mock.getOrders(router.params.type);
}

/**
 * 处理tab切换
 */
function switchTab(tab) {
  ElMessage({
    type: "success",
    message: "切换tab刷新数据：" + tab.props.label
  });
  orders.value = Mock.getOrders(router.params.type);
}

/**
 * 清理筛选条件
 */
function clear() {
  queryParams.value = {
    goods: "",
    consignee: "",
    phone: "",
    name: "",
    payTime: "",
    sendTime: ""
  };
  orders.value = Mock.getOrders(router.params.type);
}

/**
 * 导出订单
 */
function exportOrder() {
  Tools.exportJson("订单.json", JSON.stringify(orders.value));
}

/**
 * 导出选中订单
 */
function exportSelectedOrder() {
  Tools.exportJson("发货单.json", JSON.stringify(selectedOrderList.value));
}

/**
 * 处理选中订单
 */
function handleSelectedOrder(orderList) {
  selectedOrderList.value = orderList;
}

/**
 * 批量发货
 */
function dispatchGoods() {
  ElMessage({
    type: "success",
    message: "发货商品：" + JSON.stringify(selectedOrderList.value)
  });
}

/**
 * 删除订单
 */
function deleteItem(index) {
  orders.value.splice(index, 1);
}

/**
 * 联系用户
 */
function callUser(order) {
  ElMessage({
    type: "success",
    message: "联系客户：" + order.phone
  });
}

onMounted(() => {
  console.log("onMounted");
  orders.value = Mock.getOrders(router.params.type);
});

onBeforeRouteUpdate((to, from) => {
  orders.value = Mock.getOrders(router.params.type);
});
</script>

<template>
  <div class="content-container">
    <!-- 筛选 -->
    <div>
      <div>{{ $route.params.type === "0" ? "普通订单" : "秒杀订单" }}</div>
      <el-container class="content-row">
        <div class="input-tip">商品名称：</div>
        <div class="input-field">
          <el-input v-model="queryParams.goods"/>
        </div>
        <div class="input-tip">收货人：</div>
        <div class="input-field">
          <el-input v-model="queryParams.consignee"/>
        </div>
        <div class="input-tip">支付时间：</div>
        <div class="input-field">
          <el-date-picker type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          v-model="queryParams.payTime"/>
        </div>
      </el-container>
      <el-container class="content-row">
        <div class="input-tip">用户名称：</div>
        <div class="input-field">
          <el-input v-model="queryParams.name"/>
        </div>
        <div class="input-tip">手机号：</div>
        <div class="input-field">
          <el-input v-model="queryParams.phone"/>
        </div>
        <div class="input-tip">发货时间：</div>
        <div class="input-field">
          <el-date-picker type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          v-model="queryParams.sendTime"/>
        </div>
      </el-container>
      <el-container class="content-row">
        <el-button type="primary" @click="requestData">筛选</el-button>
        <el-button type="danger" @click="clear">清空筛选</el-button>
        <el-button type="primary" @click="dispatchGoods">批量发货</el-button>
        <el-button type="primary" @click="exportOrder">导出当页订单</el-button>
        <el-button type="primary" @click="exportSelectedOrder">导出选中订单</el-button>
      </el-container>
    </div>
    <!--列表-->
    <div>
      <el-tabs type="card" @tab-click="switchTab">
        <el-tab-pane label="全部"></el-tab-pane>
        <el-tab-pane label="未支付"></el-tab-pane>
        <el-tab-pane label="已支付"></el-tab-pane>
        <el-tab-pane label="待发货"></el-tab-pane>
        <el-tab-pane label="已发货"></el-tab-pane>
        <el-tab-pane label="支付超时"></el-tab-pane>
      </el-tabs>
      <el-table :data="orders" tooltip-effect="dark" style="width:100%" @selection-change="handleSelectedOrder">
        <el-table-column type="selection" width="50"/>
        <el-table-column label="商品名" width="100" prop="name"/>
        <el-table-column label="总价/数量" width="120" :formatter="(row) => `${row.price}/${row.number}`"/>
        <el-table-column label="买家信息" width="80" prop="buyer"/>
        <el-table-column label="交易时间" width="200" prop="time"/>
        <el-table-column label="销售员" width="80">
          <template #default="scope">
            <el-tag size="default" :type="scope.row.role?'primary':'info'">
              {{ scope.row.role ? "经理" : "分销员" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="100">
          <template #default="scope">
            <el-tag size="default" :type="scope.row.state?'success':'danger'">
              {{ scope.row.state ? "已完成" : "未完成" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="small" type="danger" @click="deleteItem(scope.$index)">删除</el-button>
            <el-button size="small" type="primary" @click="callUser(scope.row)">联系客户</el-button>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" width="80">
          <template #default="scope">
            <el-tag size="default">{{ scope.row.payType ? "微信" : "支付宝" }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="来源" width="200" prop="source"/>
      </el-table>
    </div>
  </div>
</template>

<style scoped>

</style>