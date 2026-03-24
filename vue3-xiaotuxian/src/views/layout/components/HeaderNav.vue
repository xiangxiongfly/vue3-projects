<script setup>
import {useCategoryStore} from "@/stores/categoryStore";

const categoryStore = useCategoryStore();
</script>

<template>
  <ul class="app-top-bar">
    <li v-for="item in categoryStore.categoryList" :key="item.id">
      <RouterLink active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.app-top-bar {
  flex: 1;
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
      line-height: 32px;
      height: 32px;
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
</style>
