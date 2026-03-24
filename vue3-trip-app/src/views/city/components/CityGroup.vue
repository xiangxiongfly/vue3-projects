<script setup>
import {useCityStore} from "@/stores/useCityStore.js";
import {computed} from "vue";
import {useRouter} from "vue-router";

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
});

const indexList = computed(() => {
  const list = props.groupData.cities.map(item => item.group);
  list.unshift("#");
  return list;
});

const router = useRouter();
const cityStore = useCityStore();
const clickCity = (city) => {
  cityStore.currentCity = city;
  router.back();
};
</script>

<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="indexList">
      <van-index-anchor index="热门"/>
      <div class="list">
        <template v-for="(city,index) in groupData.hotCities">
          <div class="city" @click="clickCity(city)">{{ city.cityName }}</div>
        </template>
      </div>
      <template v-for="(group,index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group"/>
        <template v-for="(city,i) in group.cities" :key="i">
          <van-cell :title="city.cityName" @click="clickCity(city)"/>
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px 25px 10px 10px;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 6px 0;
  }
}
</style>