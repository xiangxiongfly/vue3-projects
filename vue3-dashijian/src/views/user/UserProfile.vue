<script setup>
import {ref} from "vue";
import {useUserStore} from "@/stores/index.js";
import PageContainer from "@/components/PageContainer.vue";
import {updateUserInfo} from "@/api/user.js";
import {ElMessage} from "element-plus";

const formRef = ref();
const {user: {email, id, nickname, username}, getUser} = useUserStore();
const formModel = ref({
  id, username, nickname, email
});
const rules = ref({
  nickname: [
    {required: true, message: "请输入用户昵称", trigger: "blur"},
    {pattern: /^\S{2,10}/, message: "昵称长度在2~10个非空字符", trigger: "blur"},
  ],
  email: [
    {required: true, message: "请输入用户邮箱", trigger: "blur"},
    {type: "email", message: "请输入正确的邮箱格式", trigger: "blur"},
  ]
});

const onSubmit = async () => {
  await formRef.value.validate();
  await updateUserInfo(formModel.value);
  getUser();
  ElMessage.success("成功");
};
</script>

<template>
  <page-container title="基本资料">
    <el-form ref="formRef" :model="formModel" :rules="rules" label-width="100px">
      <el-form-item label="登录名">
        <el-input v-model="formModel.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formModel.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formModel.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped lang="scss">

</style>