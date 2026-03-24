import {getCityAll} from "@/api/city.js";
import {defineStore} from "pinia";
import {ref} from "vue";

export const useCityStore = defineStore("cityStore", () => {
    const allCities = ref({});
    const currentCity = ref({cityName: "北京"});
    const fetchAllCitiesData = async () => {
        const res = await getCityAll();
        allCities.value = res.data;
    };
    return {allCities, currentCity, fetchAllCitiesData};
});