<script setup>
import {getCategoryFilterApi, getSubCategoryApi} from "@/api/category.js";
import GoodsItem from "@/views/home/components/GoodsItem.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

// 获取面包屑数据
const filterData = ref({});

async function getFilterData() {
  const {result} = await getCategoryFilterApi(route.params.id);
  filterData.value = result;
}

const requestData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime"
});

// 获取商品列表数据
const goodsList = ref([]);

async function getGoodsList() {
  const {result} = await getSubCategoryApi(requestData.value);
  goodsList.value = result.items;
}

const onTabChange = () => {
  requestData.value.page = 1;
  getGoodsList();
};

// 加载更多
const disabled = ref(false);
const onLoad = async () => {
  requestData.value.page++;
  const {result} = await getSubCategoryApi(requestData.value);
  goodsList.value = [...goodsList.value, ...result.items];
  if (result.items.length === 0) {
    disabled.value = true;
  }
};

onMounted(() => {
  getFilterData();
  getGoodsList();
});
</script>

<template>
  <div class="container">
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:`/category/${filterData.parentId}`}">
          {{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="requestData.sortField" @tab-change="onTabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="onLoad" :infinite-scroll-disabled="disabled">
        <GoodsItem v-for="goods in goodsList" :goods="goods" :key="goods.id"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }
}
</style>
