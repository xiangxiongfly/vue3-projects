<script setup>

import HomeCategory from "@/views/home/components/HomeCategory.vue";
import HomeBanner from "@/views/home/components/HomeBanner.vue";
import HomeGood from "@/views/home/components/HomeGood.vue";
import HomeRecommend from "@/views/home/components/HomeRecommend.vue";
import HomeProduct from "@/views/home/components/HomeProduct.vue";
</script>

<template>
  <div class="container">
    <HomeCategory/>
    <HomeBanner/>
  </div>
  <HomeGood/>
  <HomeRecommend/>
  <HomeProduct/>
</template>

<style scoped>

</style>
