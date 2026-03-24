<script setup>
import {KEY_NAME, KEY_PASSWORD} from "@/global/constants.js";
import useLoginStore from "@/stores/loginStore.js";
import {localCache} from "@/utils/cache.js";
import {ref} from "vue";

const accountModel = ref({
  name: localCache.getCache(KEY_NAME),
  password: localCache.getCache(KEY_PASSWORD),
});
const accountRules = {
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

const loginStore = useLoginStore();
const formRef = ref();
const doLoginByAccount = (isRememberPwd) => {
  formRef.value.validate((valid) => {
    if (valid) {
      const name = accountModel.value.name;
      const password = accountModel.value.password;
      loginStore.loginByAccountAction(name, password);
      if (isRememberPwd) {
        localCache.setCache(KEY_NAME, name);
        localCache.setCache(KEY_PASSWORD, password);
      } else {
        localCache.removeCache(KEY_NAME);
        localCache.removeCache(KEY_PASSWORD);
      }
    } else {
      ElMessage.error("请输入正确格式");
    }
  });
};

defineExpose({
  doLoginByAccount
});
</script>

<template>
  <div class="account">
    <el-form :model="accountModel"
             :rules="accountRules"
             label-width="70px"
             size="large"
             status-icon
             ref="formRef">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="accountModel.name"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountModel.password" show-password/>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">

</style>