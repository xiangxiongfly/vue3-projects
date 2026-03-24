import {getBannerApi} from "@/api/home.js";
import {onMounted, ref} from "vue";

export function useBanner() {
  const bannerList = ref([]);

  async function getBanner() {
    const {result} = await getBannerApi({
      distributionSite: "2"
    });
    bannerList.value = result;
  }

  onMounted(() => {
    getBanner();
  });

  return {
    bannerList
  };
}
