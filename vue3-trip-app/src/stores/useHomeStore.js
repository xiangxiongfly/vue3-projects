import {getHomeCategories, getHomeHotSuggests, getHomeHouseList} from "@/api/home.js";
import {defineStore} from "pinia";
import {ref} from "vue";

export const useHomeStore = defineStore("homeStore", () => {
    const hotSuggests = ref([]);
    const categories = ref([]);
    const currentPage = ref(1);
    const houseList = ref([]);
    const fetchHotSuggestsData = async () => {
        const res = await getHomeHotSuggests();
        hotSuggests.value = res.data;
    };
    const fetchCategoriesData = async () => {
        const res = await getHomeCategories();
        categories.value = res.data;
    };
    const fetchHouseListData = async () => {
        const res = await getHomeHouseList(currentPage.value);
        houseList.value.push(...res.data);
        currentPage.value++;
    };
    return {
        hotSuggests,
        categories,
        currentPage,
        houseList,
        fetchHotSuggestsData,
        fetchCategoriesData,
        fetchHouseListData
    };
});