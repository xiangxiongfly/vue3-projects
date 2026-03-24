<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {ElMessage} from "element-plus";

const router = useRouter();
const queryParams = ref({
  marketPrice: 0,
  showPrice: 0,
  coin: 0,
  price: 0,
  limit: 0,
  count: 0,
  sellCount: 0,
  viewCount: 0,
});

function cancel() {
  router.go(-1);
}

function submit() {
  ElMessage({
    type: "success",
    message: "设置价格和库存:" + JSON.stringify(queryParams.value)
  });
}
</script>

<template>
  <div>
    <div class="title">价格设置</div>
    <el-container class="content-row">
      <div class="input-tip">市场价：</div>
      <div class="input-field">
        <el-input v-model="queryParams.marketPrice"/>
      </div>
    </el-container>
    <el-container class="content-row">
      <div class="input-tip">展示价：</div>
      <div class="input-field">
        <el-input v-model="queryParams.showPrice"/>
      </div>
    </el-container>
    <el-container class="content-row">
      <div class="input-tip">积分数：</div>
      <div class="input-field">
        <el-input v-model="queryParams.coin"/>
      </div>
    </el-container>
    <el-container class="content-row">
      <div class="input-tip">成本价：</div>
      <div class="input-field">
        <el-input v-model="queryParams.price"/>
      </div>
    </el-container>
    <el-container class="content-row">
      <div class="input-tip">限购数：</div>
      <div class="input-field">
        <el-input v-model="queryParams.limit"/>
      </div>
    </el-container>
    <div class="title">库存设置</div>
    <el-container class="content-row">
      <div class="input-tip">库存数量：</div>
      <div class="input-field">
        <el-input v-model="queryParams.count"/>
      </div>
    </el-container>
    <el-container class="content-row">
      <div class="input-tip">基础数量：</div>
      <div class="input-field">
        <el-input v-model="queryParams.sellCount"/>
      </div>
    </el-container>
    <el-container class="content-row">
      <div class="input-tip">浏览数量：</div>
      <div class="input-field">
        <el-input v-model="queryParams.viewCount"/>
      </div>
    </el-container>
    <el-container class="content-row">
      <el-button type="success" plain @click="submit">提交</el-button>
      <el-button style="margin-left: 40px;" type="warning" plain @click="cancel">取消</el-button>
    </el-container>
  </div>
</template>

<style scoped>
.title {
  background-color: #e1e1e1;
  height: 35px;
  margin-bottom: 15px;
  line-height: 35px;
  padding-left: 20px;
}
</style>