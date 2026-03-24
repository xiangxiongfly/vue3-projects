import request from "@/utils/http.js";

export function getCategoryApi(id) {
  return request({
    url: "/category",
    params: {
      id
    }
  });
}

export function getCategoryFilterApi(id) {
  return request({
    url: "/category/sub/filter",
    params: {
      id
    }
  });
}

export function getSubCategoryApi(data) {
  return request({
    url: "/category/goods/temporary",
    method: "POST",
    data
  });
}
