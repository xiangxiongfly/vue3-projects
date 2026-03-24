<script setup>
import useMainStore from "@/stores/mainStore.js";
import {formatDate} from "@/utils/formatDate.js";
import {storeToRefs} from "pinia";

const mainStore = useMainStore();
const {allMenus} = storeToRefs(mainStore);
console.log("allMenus", allMenus);
</script>

<template>
  <div class="content">
    <div class="header">
      <h3 class="title">菜单列表</h3>
    </div>
    <div class="table">
      <el-table :data="allMenus" border style="width:100%;" rowKey='id'>
        <el-table-column align="center" label="菜单名称" prop="name"/>
        <el-table-column align="center" label="级别" prop="type" width="100px"/>
        <el-table-column align="center" label="菜单url" prop="url"/>
        <el-table-column align="center" label="菜单icon" prop="icon" width="150px"/>
        <el-table-column align="center" label="排序" prop="sort" width="80px"/>
        <el-table-column align="center" label="权限" prop="permission" width="150px"/>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatDate(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatDate(scope.row.updateAt) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10,20,30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="usersTotalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
    }
  }

  .table {
    :deep(.el-table__cell) {
      padding: 12px 0;
    }

    .el-button {
      margin-left: 0;
      padding: 5px 8px;
    }
  }

  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>