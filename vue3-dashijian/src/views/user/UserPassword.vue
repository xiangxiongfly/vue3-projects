<script setup>
import {ref} from "vue";
import PageContainer from "@/components/PageContainer.vue";
import {updatePwd} from "@/api/user.js";
import {ElMessage} from "element-plus";
import {useUserStore} from "@/stores/index.js";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const formRef = ref();
const pwdForm = ref({
  oldPassword: "",
  newPassword: "",
  repeatPassword: "",
});

// 检查新旧密码是否相同
const checkDifference = (rule, value, callback) => {
  if (value === pwdForm.value.oldPassword) {
    callback(new Error("新密码不能与旧密码相同"));
  } else {
    callback();
  }
};

const checkSamePassword = (rule, value, callback) => {
  if (value !== pwdForm.value.newPassword) {
    callback(new Error("两次密码不相同"));
  } else {
    callback();
  }
};

const rules = ref({
  oldPassword: [
    {required: true, message: "请输入旧密码", trigger: "blur"},
    {min: 6, max: 15, message: "密码长度在6~15位", trigger: "blur"},
  ],
  newPassword: [
    {required: true, message: "请输入新密码", trigger: "blur"},
    {min: 6, max: 15, message: "密码长度在6~15位", trigger: "blur"},
    {validator: checkDifference, trigger: "blur"},
  ],
  repeatPassword: [
    {required: true, message: "请再次输入密码", trigger: "blur"},
    {min: 6, max: 15, message: "密码长度在6~15位", trigger: "blur"},
    {validator: checkSamePassword, trigger: "blur"},
  ]
});

const onReset = () => {
  formRef.value.resetFields();
};

const onSubmit = async () => {
  await formRef.value.validate();
  await updatePwd(pwdForm.value);
  ElMessage.success("密码修改成功");
  userStore.setToken("");
  userStore.setUser({});
  await router.push("/login");
};

</script>

<template>
  <page-container title="修改密码">
    <el-row>
      <el-col :span="12">
        <el-form ref="formRef" :model="pwdForm" :rules="rules" label-width="150px">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="pwdForm.oldPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="pwdForm.newPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="再次确认新密码" prop="repeatPassword">
            <el-input v-model="pwdForm.repeatPassword" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改密码</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>

<style scoped lang="scss">

</style>