<script setup>
import useScroll from "@/hooks/useScroll.js";
import {useHomeStore} from "@/stores/useHomeStore.js";
import HomeCategories from "@/views/home/components/HomeCategories.vue";
import HomeContent from "@/views/home/components/HomeContent.vue";
import HomeNavBar from "@/views/home/components/HomeNavBar.vue";
import HomeSearch from "@/views/home/components/HomeSearch.vue";
import SearchBar from "@/views/home/components/SearchBar.vue";
import {computed, onActivated, ref, watch} from "vue";

const homeStore = useHomeStore();
homeStore.fetchHotSuggestsData();
homeStore.fetchCategoriesData();
homeStore.fetchHouseListData();

const homeRef = ref();

const {isReachBottom, scrollTop} = useScroll(homeRef);

watch(isReachBottom, (newVal, oldVal) => {
  if (newVal) {
    homeStore.fetchHouseListData().then((res) => {
      isReachBottom.value = false;
    });
  }
});

const showSearchBar = computed(() => {
  return scrollTop.value >= 360;
});

onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  });
});
</script>

<template>
  <div class="home" ref="homeRef">
    <HomeNavBar/>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <HomeSearch/>
    <HomeCategories/>
    <div class="search-bar" v-if="showSearchBar">
      <SearchBar/>
    </div>
    <HomeContent/>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}

.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>