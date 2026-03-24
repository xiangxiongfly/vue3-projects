<script setup>
import DetailSection from "@/views/detail/components/DetailSection.vue";
import {onMounted, ref} from "vue";

const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
});

const mapRef = ref();

onMounted(() => {
  const map = new BMapGL.Map(mapRef.value); // 创建地图实例
  const point = new BMapGL.Point(props.position.longitude, props.position.latitude); // 创建点坐标
  map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
  const marker = new BMapGL.Marker(point);
  map.addOverlay(marker);
});
</script>

<template>
  <div class="map">
    <DetailSection title="位置周边" more-text="查看更多周边细心">
      <div class="map-inner" ref="mapRef"></div>
    </DetailSection>
  </div>
</template>

<style scoped lang="scss">
.map-inner {
  height: 250px;
}
</style>