<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {ElMessage} from "element-plus";

const router = useRouter();
const queryParams = ref({
  name: "",
  desc: "",
  timeRange: "",
  category: 0
});

function cancel() {
  router.go(-1);
}

function submit() {
  ElMessage({
    type: "success",
    message: "提交商品基本信息：" + JSON.stringify(queryParams.value)
  });
}
</script>

<template>
  <div>
    <el-container class="content-row">
      <div class="input-tip">商品名称：</div>
      <div class="input-field">
        <el-input v-model="queryParams.name"/>
      </div>
    </el-container>
    <el-container class="content-row">
      <div class="input-tip">商品简介：</div>
      <div class="input-field">
        <el-input type="textarea" :rows="3" v-model="queryParams.desc"/>
      </div>
    </el-container>
    <el-container class="content-row">
      <div class="input-tip">商品封面：</div>
      <el-upload :auto-upload="false" :limit="1" list-type="picture-card">
        <el-icon>
          <Plus/>
        </el-icon>
      </el-upload>
    </el-container>
    <el-container class="content-row">
      <div class="input-tip">列表图片：</div>
      <el-upload :auto-upload="false" :limit="5" list-type="picture-card">
        <el-icon>
          <Plus/>
        </el-icon>
      </el-upload>
    </el-container>
    <el-container class="content-row">
      <div class="input-tip">上架日期：</div>
      <div class="input-field">
        <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        v-model="queryParams.timeRange"/>
      </div>
    </el-container>
    <el-container class="content-row">
      <div class="input-tip">商品分类：</div>
      <div class="input-field">
        <el-select style="width: 150px" v-model="queryParams.category">
          <el-option key="0" label="男装" :value="0"/>
          <el-option key="1" label="女装" :value="1"/>
          <el-option key="2" label="裤子" :value="2"/>
        </el-select>
      </div>
    </el-container>
    <el-container class="content-row">
      <el-button type="success" plain @click="submit">提交</el-button>
      <el-button type="warning" plain @click="cancel">取消</el-button>
    </el-container>
  </div>
</template>

<style scoped>

</style>