<script setup>
import usePermissions from "@/hooks/usePermissions.js";
import useSystemStore from "@/stores/systemStore.js";
import {formatDate} from "@/utils/formatDate.js";
import {storeToRefs} from "pinia";
import {ref} from "vue";

const emit = defineEmits(["createRole", "editRole"]);

const isCreate = usePermissions("role:create");
const isDelete = usePermissions("role:delete");
const isUpdate = usePermissions("role:update");
const isQuery = usePermissions("role:query");

const systemStore = useSystemStore();
const {roles, roleTotalCount} = storeToRefs(systemStore);

const currentPage = ref(1);
const pageSize = ref(10);

const getRoles = (query) => {
  if (!isQuery) {
    return;
  }
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const queryInfo = {size, offset, ...query};
  systemStore.getRoles(queryInfo);
};

getRoles();

const handleCreateRole = () => {
  emit("createRole");
};

const handleEditRole = (role) => {
  emit("editRole", role);
};

const handleDeleteRole = (id) => {
  systemStore.deleteRoleById(id);
};

const handleSizeChange = () => {
  getRoles();
};

const handleCurrentChange = () => {
  getRoles();
};

defineExpose({getRoles});
</script>

<template>
  <div class="content">
    <div class="header">
      <h3 class="title">角色列表</h3>
      <el-button v-if="isCreate" type="primary" @click="handleCreateRole">新建角色</el-button>
    </div>
    <div class="table">
      <el-table :data="roles" border style="width:100%;">
        <el-table-column align="center" type="selection" width="60px"/>
        <el-table-column align="center" type="index" label="序号" width="60px"/>
        <el-table-column align="center" label="角色名称" prop="name" width="150px"/>
        <el-table-column align="center" label="权限介绍" prop="intro" width="150px"/>
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
        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button v-if="isUpdate" size="small" icon="Edit" type="primary" text
                       @click="handleEditRole(scope.row)">
              编辑
            </el-button>
            <el-button v-if="isDelete" size="small" icon="Delete" type="danger" text
                       @click="handleDeleteRole(scope.row.id)">
              删除
            </el-button>
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
          :total="roleTotalCount"
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