import {getCategoryApi} from "@/api/layout.js";
import {defineStore} from "pinia";
import {ref} from "vue";

export const useCategoryStore = defineStore("categoryStore", () => {
  const categoryList = ref([]);

  async function getCategoryList() {
    const {result} = await getCategoryApi();
    categoryList.value = result;
  }

  return {
    categoryList, getCategoryList
  };
});
