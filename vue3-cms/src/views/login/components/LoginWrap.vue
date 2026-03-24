<script setup>
import Account from "@/views/login/components/Account.vue";
import Phone from "@/views/login/components/Phone.vue";
import {Cellphone, UserFilled} from "@element-plus/icons-vue";
import {ref} from "vue";

const isRememberPwd = ref(false);
const activeTab = ref("account");
const accountRef = ref();
const phoneRef = ref();

const clickLogin = () => {
  if (activeTab.value === "account") {
    console.log("账号密码登录");
    accountRef.value.doLoginByAccount(isRememberPwd.value);
  } else if (activeTab.value === "phone") {
    console.log("手机登录");
  }
};
</script>

<template>
  <div class="login-wrap">
    <h1 class="title">管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeTab">
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon>
                <UserFilled/>
              </el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <Account ref="accountRef"/>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon>
                <Cellphone/>
              </el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <Phone/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="bottom">
      <el-checkbox v-model="isRememberPwd" label="记住密码" size="large"/>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="btn-login" type="primary" size="large" @click="clickLogin">立即登录</el-button>
  </div>
</template>

<style scoped lang="scss">
.login-wrap {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .tabs {
    .label {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .text {
        margin-left: 5px;
      }
    }
  }

  .bottom {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .btn-login {
    width: 100%;
    margin-top: 10px;
  }
}
</style>