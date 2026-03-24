<script setup>
import {ref} from "vue";

defineProps({
  titles: {
    type: Array,
    default: () => []
  }
});

defineExpose({
  setCurrentIndex,
});

const emits = defineEmits(["tabItemClick"]);

const currentIndex = ref(0);

function setCurrentIndex(index) {
  currentIndex.value = index;
}

const clickItem = (index) => {
  currentIndex.value = index;
  emits("tabItemClick", index);
};
</script>

<template>
  <div class="tab-control">
    <template v-for="(item,index) in titles" :key="item">
      <div class="tab-control-item" :class="{active:index === currentIndex}" @click="clickItem(index)">
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.tab-control {
  height: 44px;
  line-height: 44px;
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  text-align: center;
  background-color: #fff;

  .tab-control-item {
    flex: 1;

    &.active {
      color: var(--primary-color);
      font-weight: 700;

      span {
        border-bottom: 2px solid var(--primary-color);
        padding: 8px;
      }
    }
  }
}
</style>