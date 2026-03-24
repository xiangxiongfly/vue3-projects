import request from "@/network/request.js";

export function requestAmountList() {
    return request.get({url: "/goods/amount/list"});
}

export function requestGoodsCategoryCount() {
    return request.get({url: `/goods/category/count`});
}

export function requestGoodsCategorySale() {
    return request.get({url: `/goods/category/sale`});
}

export function requestGoodsCategoryFavor() {
    return request.get({url: `/goods/category/favor`});
}

export function requestGoodsAddressSale() {
    return request.get({url: `/goods/address/sale`});
}