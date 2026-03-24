<script setup>

</script>

<template>
  <div class="phone">
    <el-form label-width="70px" size="large">
      <el-form-item label="手机号">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input></el-input>
          <el-button class="btn-code" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.phone {
  .verify-code {
    display: flex;
    flex-direction: row;

    .btn-code {
      margin-left: 8px;
    }
  }
}
</style>