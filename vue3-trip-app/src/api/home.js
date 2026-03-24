import request from "@/request/request.js";

export function getHomeHotSuggests() {
    return request.get({
        url: "/home/hotSuggests",
    });
}

export function getHomeCategories() {
    return request.get({
        url: "/home/categories",
    });
}

export function getHomeHouseList(currentPage) {
    return request.get({
        url: "/home/houselist",
        params: {
            page: currentPage,
        }
    });
}
