<script setup>
import {KEY_NAME, KEY_PASSWORD} from "@/global/constants.js";
import useMainStore from "@/stores/mainStore.js";
import useSystemStore from "@/stores/systemStore.js";
import {localCache} from "@/utils/cache.js";
import {storeToRefs} from "pinia";
import {ref} from "vue";

const formRef = ref();
const dialogVisible = ref(false);
const isCreateRef = ref(false);
const mainStore = useMainStore();
const systemStore = useSystemStore();
const {allRoles, allDepartments} = storeToRefs(mainStore);
const editUserId = ref();

const formModel = ref({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: "",
});

const formRules = {
  name: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    },
    {
      pattern: /^[a-zA-Z0-9_]{6,20}$/,
      message: "用户名必须是6~20位数字或字母组成",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    },
    {
      pattern: /^[a-zA-Z0-9_]{3,}$/,
      message: "必须是3位以上的数字或字母组成",
      trigger: "blur"
    }
  ]
};

function showDialog(user) {
  dialogVisible.value = true;
  isCreateRef.value = !user;
  if (user) {
    // 编辑
    for (const key in formModel.value) {
      formModel.value[key] = user[key];
    }
    editUserId.value = user.id;
  } else {
    // 新建
    for (const key in formModel.value) {
      formModel.value[key] = "";
    }
    editUserId.value = null;
  }
}

const handleConfirm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      dialogVisible.value = false;
      if (isCreateRef.value) {
        // 新建
        systemStore.createUser(formModel.value);
      } else {
        // 编辑
        systemStore.editUser(editUserId.value, formModel.value);
      }
    } else {
      ElMessage.error("请输入正确格式");
    }
  });
};

defineExpose({showDialog});
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="isCreateRef?'新建用户':'编辑用户'" width="30%" center>
    <div class="form">
      <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="80px" size="large">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formModel.name" placeholder="请输入用户"/>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formModel.realname" placeholder="请输入真实姓名"/>
        </el-form-item>
        <el-form-item v-if="isCreateRef" label="密码" prop="password">
          <el-input v-model="formModel.password" placeholder="请输入密码" show-password/>
        </el-form-item>
        <el-form-item label="手机号" prop="cellphone">
          <el-input v-model="formModel.cellphone" placeholder="请输入手机号码" type="number"/>
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="formModel.roleId" placeholder="请选择角色" style="width:100%">
            <template v-for="item in allRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id"/>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select v-model="formModel.departmentId" placeholder="请选择部门" style="width:100%">
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