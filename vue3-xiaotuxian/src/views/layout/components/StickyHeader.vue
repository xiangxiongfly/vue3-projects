<script setup>
import HeaderNav from "@/views/layout/components/HeaderNav.vue";
import {useScroll} from "@vueuse/core";

const {y} = useScroll(window);
</script>

<template>
  <div class="app-sticky-header" :class="{show:y>78}">
    <div class="container">
      <RouterLink class="logo" to="/"/>
      <!-- 导航区 -->
      <HeaderNav/>
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-sticky-header {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 默认隐藏（透明+上移）
  transform: translateY(-100%);
  opacity: 0;

  // 显示
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;

    .logo {
      width: 200px;
      height: 80px;
      background: url("@/assets/images/logo.png") no-repeat right 2px;
      background-size: 160px auto;
    }

    .right {
      width: 220px;
      display: flex;
      text-align: center;
      padding-left: 40px;
      border-left: 2px solid $primaryColor;

      a {
        width: 38px;
        margin-right: 40px;
        font-size: 16px;
        line-height: 1;

        &:hover {
          color: $primaryColor;
        }
      }
    }

    .app-top-bar {
      width: 820px;
      display: flex;
      padding-left: 40px;
      position: relative;
      z-index: 998;

      li {
        margin-right: 40px;
        width: 38px;
        text-align: center;

        a {
          font-size: 16px;
          height: 32px;
          line-height: 32px;
          display: inline-block;

          &:hover {
            color: $primaryColor;
            border-bottom: 1px solid $primaryColor;
          }
        }

        .active {
          color: $primaryColor;
          border-bottom: 1px solid $primaryColor;
        }
      }
    }
  }
}

</style>
