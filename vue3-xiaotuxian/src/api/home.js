import request from "@/utils/http.js";

export function getBannerApi(params = {}) {
  const {distributionSite = "1"} = params;
  return request({
    url: "/home/banner",
    params: {
      distributionSite
    }
  });
}

export function findNewApi() {
  return request({
    url: "/home/new"
  });
}

export function getHotApi() {
  return request({
    url: "/home/hot"
  });
}

export function getGoodsApi() {
  return request({
    url: "/home/goods"
  });
}
