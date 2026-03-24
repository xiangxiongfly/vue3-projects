<script setup>
import useUserStore from "../../stores/userStore.js";
import {computed, ref} from "vue";
import {ElMessage} from "element-plus";
import router from "../../router/index.js";

const userStore = useUserStore();

const name = ref("");
const password = ref("");

const disabled = computed(() => {
  return name.value.length === 0 || password.value.length === 0;
});

const login = () => {
  userStore.registerUser(name.value, password.value);
  ElMessage({
    message: "登录成功",
    type: "success",
    duration: 2000,
  });
  setTimeout(() => {
    router.push({name: "home"});
  }, 1000);
};
</script>

<template>
  <div class="login-container">
    <div class="login-title">
      <h1>电商后台管理系统</h1>
    </div>
    <div class="input">
      <el-input v-model="name" prefix-icon="User" placeholder="请输入用户名"/>
    </div>
    <div class="input">
      <el-input v-model="password" prefix-icon="Lock" placeholder="请输入密码" auto-complate="new-password"
                show-password/>
    </div>
    <div class="input">
      <el-button @click="login" type="primary" :disabled="disabled" class="login-button">登录</el-button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  background-color: #595959;
  background-image: url("/public/login_bg.jpg");
  width: 100%;
  height: 100%;
  position: absolute;
}

.login-title {
  text-align: center;
  color: azure;
  margin-top: 200px;
}

.input {
  margin: 20px auto;
  width: 500px;
}

.login-button {
  width: 500px;
}
</style>