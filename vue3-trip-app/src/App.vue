<script setup>
import Loading from "@/components/loading/Loading.vue";
import TabBar from "@/components/tabbar/TabBar.vue";
import {useRoute} from "vue-router";

const route = useRoute();
</script>

<template>
  <router-view v-slot="props">
    <keep-alive include="Home">
      <component :is="props.Component"></component>
    </keep-alive>
  </router-view>
  <TabBar v-show="!route.meta.hideTabBar"/>
  <Loading/>
</template>

<style scoped>

</style>