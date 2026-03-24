<script setup>
import {getDetailInfos} from "@/api/getDetailInfos.js";
import useScroll from "@/hooks/useScroll.js";
import DetailComment from "@/views/detail/components/DetailComment.vue";
import DetailFacility from "@/views/detail/components/DetailFacility.vue";
import DetailInfo from "@/views/detail/components/DetailInfo.vue";
import DetailIntro from "@/views/detail/components/DetailIntro.vue";
import DetailLandlord from "@/views/detail/components/DetailLandlord.vue";
import DetailMap from "@/views/detail/components/DetailMap.vue";
import DetailNotice from "@/views/detail/components/DetailNotice.vue";
import DetailSwipe from "@/views/detail/components/DetailSwipe.vue";
import TabControl from "@/views/detail/components/TabControl.vue";
import {computed, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const houseId = route.params.id;
const tabControlRef = ref();
const detailRef = ref();

const {scrollTop} = useScroll(detailRef);

const detailData = ref({});
const mainPart = computed(() => detailData.value.mainPart);
getDetailInfos(houseId).then((res) => {
  detailData.value = res.data;
});

const showTabControl = computed(() => {
  return scrollTop.value >= 300;
});
const sectionEls = ref({});
const names = computed(() => {
  return Object.keys(sectionEls.value);
});
const getSectionRef = (value) => {
  if (!value) return;
  const name = value.$el.getAttribute("name");
  sectionEls.value[name] = value.$el;
};

const clickLeft = () => {
  router.back();
};

let isClick = false;
let currentDistance = -1;
const tabItemClick = (index) => {
  const key = Object.keys(sectionEls.value)[index];
  const el = sectionEls.value[key];
  let distance = el.offsetTop;
  if (index !== 0) {
    distance -= 44;
  }

  isClick = true;
  currentDistance = distance;

  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth"
  });
};

watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false;
  }
  if (isClick) return;

  const els = Object.values(sectionEls.value);
  const tops = els.map(el => el.offsetTop);

  let index = 0;
  for (let i = 0; i < tops.length; i++) {
    if (tops[i] > newValue + 44) {
      console.log("i", i);
      index = i - 1;
      break;
    }
  }

  tabControlRef.value?.setCurrentIndex(index);
});
</script>

<template>
  <div class="detail full-page" ref="detailRef">
    <TabControl ref="tabControlRef" v-if="showTabControl" :titles="names" @tabItemClick="tabItemClick"/>
    <van-nav-bar title="房屋详情" left-text="返回" left-arrow @click-left="clickLeft"/>
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <DetailSwipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
      <DetailInfo name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"/>
      <DetailFacility name="设施" :ref="getSectionRef"
                      :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
      <DetailLandlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>
      <DetailComment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
      <DetailNotice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <DetailMap name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/>
      <DetailIntro :price-intro="mainPart.introductionModule"/>
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">hello world</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>