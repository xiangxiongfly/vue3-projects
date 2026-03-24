import {
    requestAmountList,
    requestGoodsAddressSale,
    requestGoodsCategoryCount,
    requestGoodsCategoryFavor,
    requestGoodsCategorySale
} from "@/network/api/analysis.js";
import {defineStore} from "pinia";
import {ref} from "vue";

/**
 * 商品统计
 */
const useAnalysisStore = defineStore("analysisStore", () => {
    const amountList = ref([]);
    const goodsCategoryCount = ref([]);
    const goodsCategorySale = ref([]);
    const goodsCategoryFavor = ref([]);
    const goodsAddressSale = ref([]);

    const getAmountList = async () => {
        const res = await requestAmountList();
        amountList.value = res.data;
    };

    const getGoodsCategoryCount = async () => {
        const res = await requestGoodsCategoryCount();
        goodsCategoryCount.value = res.data;
    };

    const getGoodsCategorySale = async () => {
        const res = await requestGoodsCategorySale();
        goodsCategorySale.value = res.data;
    };

    const getGoodsCategoryFavor = async () => {
        const res = await requestGoodsCategoryFavor();
        goodsCategoryFavor.value = res.data;
    };

    const getGoodsAddressSale = async () => {
        const res = await requestGoodsAddressSale();
        goodsAddressSale.value = res.data;
    };

    const getAllData = () => {
        getAmountList();
        getGoodsCategoryCount();
        getGoodsCategorySale();
        getGoodsCategoryFavor();
        getGoodsAddressSale();
    };

    return {
        amountList,
        goodsCategoryCount,
        goodsCategorySale,
        goodsCategoryFavor,
        goodsAddressSale,
        getAllData
    };
});
export default useAnalysisStore;