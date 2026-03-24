<script setup>
import {useCategoryStore} from "@/stores/categoryStore";
import Footer from "@/views/layout/components/Footer.vue";
import Header from "@/views/layout/components/Header.vue";
import StickyHeader from "@/views/layout/components/StickyHeader.vue";
import TopBar from "@/views/layout/components/TopBar.vue";
import {onMounted} from "vue";

const categoryStore = useCategoryStore();
onMounted(() => {
  categoryStore.getCategoryList();
});
</script>

<template>
  <StickyHeader/>
  <TopBar/>
  <Header/>
  <RouterView/>
  <Footer/>
</template>

<style scoped lang="scss">

</style>
