import {getCategoryApi} from "@/api/category.js";
import {onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";

export function useCategory() {
  const route = useRoute();
  const categoryData = ref({});

  async function getCategory(id = route.params.id) {
    const {result} = await getCategoryApi(id);
    categoryData.value = result;
  }

  onMounted(() => {
    getCategory();
  });

  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id);
  });

  return {categoryData};
}
