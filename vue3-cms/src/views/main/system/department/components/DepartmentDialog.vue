<script setup>
import useMainStore from "@/stores/mainStore.js";
import useSystemStore from "@/stores/systemStore.js";
import {storeToRefs} from "pinia";
import {ref} from "vue";

const dialogVisible = ref(false);
const isCreateRef = ref(false);
const mainStore = useMainStore();
const systemStore = useSystemStore();
const {allDepartments} = storeToRefs(mainStore);
const editDepartmentId = ref();

const formModel = ref({
  name: "",
  leader: "",
  parentId: ""
});

function showDialog(department) {
  dialogVisible.value = true;
  isCreateRef.value = !department;
  if (department) {
    // 编辑
    for (const key in formModel.value) {
      formModel.value[key] = department[key];
    }
    editDepartmentId.value = department.id;
  } else {
    // 新建
    for (const key in formModel.value) {
      formModel.value[key] = "";
    }
    editDepartmentId.value = null;
  }
}

const handleConfirm = () => {
  dialogVisible.value = false;
  if (isCreateRef.value) {
    // 新建
    systemStore.createDepartment(formModel.value);
  } else {
    // 编辑
    systemStore.editDepartment(editDepartmentId.value, formModel.value);
  }
};

defineExpose({showDialog});
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="isCreateRef?'新建部门':'编辑部门'" width="30%" center>
    <div class="form">
      <el-form :model="formModel" label-width="80px" size="large">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formModel.name" placeholder="请输入部门名称"/>
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="formModel.leader" placeholder="请输入部门领导"/>
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
          <el-select v-model="formModel.parentId" placeholder="请选择角色" style="width:100%">
            <template v-for="item in allDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id"/>
            </template>
          </el-select>
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