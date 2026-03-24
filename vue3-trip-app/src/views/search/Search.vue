<script setup>

</script>

<template>
  <div class="search">
    <p>开始时间：{{ $route.query.startDate }}</p>
    <p>结束时间：{{ $route.query.endDate }}</p>
    <p>当前城市：{{ $route.query.currentCity }}</p>
  </div>
</template>

<style lang="scss" scoped>

</style>