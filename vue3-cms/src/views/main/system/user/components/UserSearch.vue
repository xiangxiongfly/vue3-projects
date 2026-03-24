<script setup>
import {ref} from "vue";

const emit = defineEmits(["search", "reset"]);
const formRef = ref();
const searchModel = ref({
  name: "",
  realname: "",
  cellphone: "",
  enable: "",
  createAt: ""
});

const handleReset = () => {
  formRef.value.resetFields();
  emit("reset");
};

const handleSearch = () => {
  emit("search", searchModel.value);
};

</script>

<template>
  <div class="search">
    <el-form :model="searchModel" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchModel.name" placeholder="请输入用户名"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="searchModel.realname" placeholder="请输入真实姓名"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="searchModel.cellphone" placeholder="请输入手机号码" type="number"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="searchModel.enable"
                       placeholder="请选择状态"
                       style="width: 100%">
              <el-option label="启用" :value="1"/>
              <el-option label="禁用" :value="0"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker v-model="searchModel.createAt"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button icon="Refresh" @click="handleReset">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleSearch">查询</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>