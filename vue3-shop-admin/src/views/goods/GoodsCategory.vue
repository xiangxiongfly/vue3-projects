<script setup>
import {ref} from "vue";
import {ElMessageBox} from "element-plus";

const categoryList = ref([
  {id: 1, name: "男装", manager: "管理员1号"},
  {id: 2, name: "女装", manager: "管理员2号"},
  {id: 3, name: "男裤", manager: "管理员3号"},
  {id: 4, name: "女裤", manager: "管理员4号"},
]);

function deleteCategory(index) {
  categoryList.value.splice(index, 1);
}

function addCategory() {
  ElMessageBox.prompt("请输入分类名", "新增分类", {
    confirmButtonText: "确定",
    cancelButtonText: "取消"
  }).then((result) => {
    categoryList.value.push({
      id: categoryList.value.length + 1,
      name: result.value,
      manager: "管理员5号"
    });
  });
}
</script>

<template>
  <div class="content-container">
    <el-container class="content-row">
      <el-button type="primary" @click="addCategory">添加分类</el-button>
    </el-container>
    <div>
      <el-table :data="categoryList" tooltip-effect="dark" style="width: 100%">
        <el-table-column label="分类ID" width="100" prop="id"/>
        <el-table-column label="分类名称" width="100" prop="name"/>
        <el-table-column label="分类负责人" width="500" prop="manager"/>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="deleteCategory(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>

</style>