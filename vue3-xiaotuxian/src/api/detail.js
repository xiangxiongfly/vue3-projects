import request from "@/utils/http.js";

export function getGoods(id) {
  return request({
    url: "goods",
    params: {
      id
    }
  });
}

export function getHotGoodsApi(id, type, limit = 3) {
  return request({
    url: "/goods/hot",
    params: {
      id,
      type,
      limit
    }
  });
}
