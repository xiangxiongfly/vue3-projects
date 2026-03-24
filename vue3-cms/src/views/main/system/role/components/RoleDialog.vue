<script setup>
import useMainStore from "@/stores/mainStore.js";
import useSystemStore from "@/stores/systemStore.js";
import {menusToIds} from "@/utils/maps.js";
import {storeToRefs} from "pinia";
import {nextTick, ref} from "vue";

const treeRef = ref();
const dialogVisible = ref(false);
const isCreateRef = ref(false);
const mainStore = useMainStore();
const systemStore = useSystemStore();
const {allMenus} = storeToRefs(mainStore);
const editRoleId = ref();

const formModel = ref({
  name: "",
  intro: "",
});
const checkedMenuIds = ref([]);

function showDialog(role) {
  dialogVisible.value = true;
  isCreateRef.value = !role;

  if (role) {
    // 编辑
    for (const key in formModel.value) {
      formModel.value[key] = role[key];
    }
    editRoleId.value = role.id;
    nextTick(() => {
      const ids = menusToIds(role.menuList);
      treeRef.value?.setCheckedKeys(ids);
      checkedMenuIds.value = ids;
    });
  } else {
    // 新建
    for (const key in formModel.value) {
      formModel.value[key] = "";
    }
    editRoleId.value = null;
    nextTick(() => {
      treeRef.value?.setCheckedKeys([]);
    });
  }
}

const handleTreeCheck = (data1, data2) => {
  checkedMenuIds.value = [...data2.checkedKeys, ...data2.halfCheckedKeys];
};

const handleConfirm = () => {
  dialogVisible.value = false;
  if (isCreateRef.value) {
    // 新建
    const roleInfo = {menuList: checkedMenuIds.value, ...(formModel.value)};
    systemStore.createRole(roleInfo);
  } else {
    // 编辑
    const roleInfo = {menuList: checkedMenuIds.value, ...(formModel.value)};
    systemStore.editRole(editRoleId.value, roleInfo);
  }
};

defineExpose({showDialog});
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="isCreateRef?'新建角色':'编辑角色'" width="30%" center>
    <div class="form">
      <el-form :model="formModel" label-width="80px" size="large">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formModel.name" placeholder="请输入角色名称"/>
        </el-form-item>
        <el-form-item label="权限介绍" prop="intro">
          <el-input v-model="formModel.intro" placeholder="请输入权限介绍"/>
        </el-form-item>
        <el-form-item>
          <el-tree
              ref="treeRef"
              :data="allMenus"
              show-checkbox
              node-key="id"
              :props="{label:'name',children: 'children'}"
              @check="handleTreeCheck"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.form {
  padding: 0 20px;
}
</style>