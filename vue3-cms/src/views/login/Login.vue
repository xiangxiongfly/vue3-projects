<script setup>
import LoginWrap from "@/views/login/components/LoginWrap.vue";
</script>

<template>
  <div class="login">
    <LoginWrap></LoginWrap>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("@/assets/img/login_bg.svg");
}
</style>