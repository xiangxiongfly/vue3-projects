<script setup>
import {useHomeStore} from "@/stores/useHomeStore.js";
import HouseItemV3 from "@/views/home/components/HouseItemV3.vue";
import HouseItemV9 from "@/views/home/components/HouseItemV9.vue";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const router = useRouter();
const homeStore = useHomeStore();
const {houseList} = storeToRefs(homeStore);

const itemClick = (item) => {
  router.push(`/detail/${item.houseId}`);
};
</script>

<template>
  <div class="content">
    <h2 class="title">
      热门精选
    </h2>
    <div class="list">
      <template v-for="(item,index) in houseList" :key="item.data.houseId">
        <HouseItemV9
            v-if="item.discoveryContentType === 9"
            :item-data="item.data"
            @click="itemClick(item.data)"
        />
        <HouseItemV3
            v-else-if="item.discoveryContentType === 3"
            :item-data="item.data"
            @click="itemClick(item.data)"
        />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>