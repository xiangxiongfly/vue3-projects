<script setup>
import {useUserStore} from "@/stores/userStore.js";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import {useRouter} from "vue-router";
import "element-plus/theme-chalk/el-message.css";

const router = useRouter();
const formRef = ref();
const userStore = useUserStore();

// 表单对象
const userModel = ref({
  account: "",
  password: "",
  agree: true
});

// 规则对象
const rules = {
  account: [
    {required: true, message: "用户名不能为空", trigger: "blur"}
  ],
  password: [
    {required: true, message: "密码不能为空", trigger: "blur"},
    {min: 6, max: 24, message: "密码长度要求6~24位"}
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error("请勾选协议"));
        }
      }
    }
  ]
};

function doLogin() {
  const {account, password} = userModel.value;
  formRef.value.validate(async (valid) => {
    // 验证全部通过
    if (valid) {
      await userStore.getUserInfo(account, password);
      ElMessage({type: "success", message: "登录成功"});
      await router.replace({path: "/"});
    }
  });
}
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <router-link to="/">小兔鲜</router-link>
        </h1>
        <router-link to="/" class="entry">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </router-link>
      </div>
    </header>

    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:">账号登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="formRef" :model="userModel" :rules="rules"
                     label-position="right"
                     label-width="60px">
              <el-form-item label="账户" prop="account">
                <el-input v-model="userModel.account"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="userModel.password"/>
              </el-form-item>
              <el-form-item label-width="22px" prop="agree">
                <el-checkbox size="large" v-model="userModel.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="sub-btn" @click="doLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:">关于我们</a>
          <a href="javascript:">帮助中心</a>
          <a href="javascript:">售后服务</a>
          <a href="javascript:">配送与验收</a>
          <a href="javascript:">商务合作</a>
          <a href="javascript:">搜索推荐</a>
          <a href="javascript:">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      width: 100%;
      height: 132px;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $primaryColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url("@/assets/images/login-bg.png") no-repeat center center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        margin-bottom: 28px;

        .input {
          position: relative;
          height: 36px;

          > i {
            width: 34px;
            height: 34px;
            background: #cfcdcd;
            color: #fff;
            position: absolute;
            left: 1px;
            top: 1px;
            text-align: center;
            line-height: 34px;
            font-size: 18px;
          }

          input {
            padding-left: 44px;
            border: 1px solid #cfcdcd;
            width: 100%;
            height: 36px;
            line-height: 36px;

            &.error {
              border-color: $priceColor
            }

            &.active,
            &:focus {
              border-color: $primaryColor
            }
          }
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }

      .agree {
        a {
          color: #069;
        }
      }

      .btn {
        display: block;
        width: 100%;
        height: 40px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        background: $primaryColor;

        &.disabled {
          background: #cfcdcd;
        }
      }
    }

    .action {
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .url {
        a {
          color: #999;
          margin-left: 10px;
        }
      }
    }
  }
}

.sub-btn {
  background: $primaryColor;
  width: 100%;
  color: #fff;
}
</style>
