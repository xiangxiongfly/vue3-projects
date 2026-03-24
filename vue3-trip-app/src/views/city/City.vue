<script setup>
import {useCityStore} from "@/stores/useCityStore.js";
import CityGroup from "@/views/city/components/CityGroup.vue";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const searchValue = ref("");
const clickCancel = () => {
  router.back();
};

const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const {allCities} = storeToRefs(cityStore);

const tabActive = ref();

</script>

<template>
  <div class="city full-page">
    <div class="top">
      <van-search
          v-model="searchValue"
          placeholder="城市/区域/位置"
          shape="round"
          show-action
          @cancel="clickCancel"
      />

      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
        <template v-for="(value,key,index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <div class="content">
      <template v-for="(value,key,index) in allCities">
        <CityGroup v-show="tabActive === key" :group-data="value"/>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.city {

  .top {
    position: relative;
    //z-index: 9;
  }

  .content {
    //height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>