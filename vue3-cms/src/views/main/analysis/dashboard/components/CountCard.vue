<script setup>
import {Warning} from "@element-plus/icons-vue";
import {CountUp} from "countup.js";
import {onMounted, ref} from "vue";

const props = defineProps({
  amount: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  tips: {
    type: String,
    default: ""
  },
  number1: {
    type: Number,
    default: 0
  },
  number2: {
    type: Number,
    default: 0
  },
  subtitle: {
    type: String,
    default: ""
  }
});

const num1Ref = ref();
const num2Ref = ref();

const countupOptions = {
  prefix: props.amount === "saleroom" ? "¥" : ""
};

onMounted(() => {
  const countup1 = new CountUp(num1Ref.value, props.number1, countupOptions);
  const countup2 = new CountUp(num2Ref.value, props.number2, countupOptions);
  countup1.start();
  countup2.start();
});
</script>

<template>
  <div class="count-card">
    <div class="header">
      <span class="title">{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="dark">
        <el-icon>
          <Warning/>
        </el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span ref="num1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <span ref="num2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }

  .content {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 0;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85)
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>