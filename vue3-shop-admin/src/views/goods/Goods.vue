<script setup>
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import Mock from "../../mock/index.js";

const router = useRouter();
const route = useRoute();
const goodsList = ref([]);
const goodsCategory = ref(["全部", "男装", "女装"]);

const queryParams = ref({
  name: "",
  id: "",
  category: "",
  sellMode: 2, // 是否上架：0 否，1 是，2 全部
  expMode: 2 // 是否过期：0 否，1 是，2 全部
});

const sellModeStr = computed({
  get() {
    if (queryParams.value.sellMode === 0) {
      return "否";
    } else if (queryParams.value.sellMode === 1) {
      return "是";
    } else if (queryParams.value.sellMode === 2) {
      return "全部";
    }
  },
  set(value) {
    queryParams.value.sellMode = value;
  }
});

const expModeStr = computed({
  get() {
    if (queryParams.value.sellMode === 0) {
      return "否";
    } else if (queryParams.value.sellMode === 1) {
      return "是";
    } else if (queryParams.value.sellMode === 2) {
      return "全部";
    }
  },
  set(value) {
    queryParams.value.expMode = value;
  }
});

function requestData() {
  console.log("queryParams", queryParams);
  ElMessage({
    type: "success",
    message: "筛选参数：" + JSON.stringify(queryParams.value)
  });
  goodsList.value = Mock.getGoods(route.params.type);
}

function operate(goods) {
  goods.state = !goods.state;
}

function clear() {
  queryParams.value = {
    name: "",
    id: "",
    category: "",
    sellMode: 2,
    expMode: 2
  };
  goodsList.value = Mock.getGoods(route.params.type);
}

// 新增商品
function addGoods() {
  router.push({name: "addGoods", params: {type: route.params.type}});
}

onMounted(() => {
  goodsList.value = Mock.getGoods(route.params.type);
});

onBeforeRouteUpdate((to) => {
  goodsList.value = Mock.getGoods(to.params.type);
});

</script>

<template>
  <div class="content-container">
    <div>
      <el-container class="content-row">
        <div class="input-tip">商品名称：</div>
        <div class="input-field">
          <el-input v-model="queryParams.name"/>
        </div>
        <div class="input-tip">商品编号：</div>
        <div class="input-field">
          <el-input v-model="queryParams.id"/>
        </div>
        <div class="input-tip">商品分类：</div>
        <div class="input-field">
          <el-select style="width:150px" v-model="queryParams.category" placeholder="请选择分类">
            <el-option v-for="item in goodsCategory" :key="item" :label="item" :value="item"/>
          </el-select>
        </div>
      </el-container>
      <el-container class="content-row">
        <div class="input-tip">是否上架：</div>
        <div class="input-field">
          <el-select style="width:150px" v-model="sellModeStr" placeholder="请选择分类">
            <el-option key="0" label="否" :value="0"/>
            <el-option key="1" label="是" :value="1"/>
            <el-option key="2" label="全部" :value="2"/>
          </el-select>
        </div>
        <div class="input-tip">是否过期：</div>
        <div class="input-field">
          <el-select style="width:150px" v-model="expModeStr" placeholder="请选择分类">
            <el-option key="0" label="否" :value="0"/>
            <el-option key="1" label="是" :value="1"/>
            <el-option key="2" label="全部" :value="2"/>
          </el-select>
        </div>
      </el-container>
    </div>
    <div class="content-row">
      <el-container>
        <el-button type="primary" @click="requestData">筛选</el-button>
        <el-button type="primary" @click="clear">清空筛选</el-button>
        <el-button type="success" @click="addGoods">新增商品</el-button>
      </el-container>
    </div>

    <div>
      <el-table :data="goodsList" tooltip-effect="dark" style="width: 100%">
        <el-table-column label="商品" width="100">
          <template #default="scope">
            <div style="text-align:center">
              <el-image :src="scope.row.img" style="width:60px;height:100px"/>
            </div>
            <div style="text-align:center">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="100" prop="price"/>
        <el-table-column label="销量" width="100" prop="sellCount"/>
        <el-table-column label="库存" width="100" prop="count"/>
        <el-table-column label="退款数量" width="100" prop="refund"/>
        <el-table-column label="退款金额" width="100" prop="refundPrice"/>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button @click="operate(scope.row)" :type="scope.row.state?'success':'danger'">
              {{ scope.row.state ? "上架" : "下架" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="管理员" width="100" prop="owner"/>
        <el-table-column label="更新时间" width="200" prop="time"/>
      </el-table>
    </div>
  </div>
</template>

<style scoped>

</style>