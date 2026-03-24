<script setup>
import usePermissions from "@/hooks/usePermissions.js";
import useSystemStore from "@/stores/systemStore.js";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import {formatDate} from "@/utils/formatDate.js";

const emit = defineEmits(["createUser", "editUser"]);

const isCreate = usePermissions("users:create");
const isDelete = usePermissions("users:delete");
const isUpdate = usePermissions("users:update");
const isQuery = usePermissions("users:query");

const systemStore = useSystemStore();
const {users, usersTotalCount} = storeToRefs(systemStore);

const currentPage = ref(1);
const pageSize = ref(10);

const getUsers = (query) => {
  if (!isQuery) {
    return;
  }
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const queryInfo = {size, offset, ...query};
  systemStore.getUsers(queryInfo);
};

getUsers();

const handleCreateUser = () => {
  emit("createUser");
};

const handleEditUser = (user) => {
  emit("editUser", user);
};

const handleDeleteUser = (id) => {
  systemStore.deleteUserById(id);
};

const handleSizeChange = () => {
  getUsers();
};

const handleCurrentChange = () => {
  getUsers();
};

defineExpose({getUsers});
</script>

<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button v-if="isCreate" type="primary" @click="handleCreateUser">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="users" border style="width:100%;">
        <el-table-column align="center" type="selection" width="60px"/>
        <el-table-column align="center" type="index" label="序号" width="60px"/>
        <el-table-column align="center" label="用户名" prop="name" width="150px"/>
        <el-table-column align="center" label="真实姓名" prop="realname" width="150px"/>
        <el-table-column align="center" label="手机号码" prop="cellphone" width="150px"/>
        <el-table-column align="center" label="状态" prop="enable" width="100px">
          <template #default="scope">
            <el-button size="small" plain :type="scope.row.enable?'primary':'danger'">
              {{ scope.row.enable ? "启用" : "禁止" }}
            </el-button>
          </template>
        </el-table-column>
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
            <el-button v-if="isUpdate" size="small" icon="Edit" type="primary" text @click="handleEditUser(scope.row)">
              编辑
            </el-button>
            <el-button v-if="isDelete" size="small" icon="Delete" type="primary" text
                       @click="handleDeleteUser(scope.row.id)">
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