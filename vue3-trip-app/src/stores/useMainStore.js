import {defineStore} from "pinia";
import {ref} from "vue";

export const useMainStore = defineStore("mainStore", () => {
    const token = ref("");
    const isLoading = ref(false);
    const startDate = ref(new Date());
    const endDate = ref(new Date());
    endDate.value.setDate(startDate.value.getDate() + 1);
    return {token, startDate, endDate, isLoading};
});