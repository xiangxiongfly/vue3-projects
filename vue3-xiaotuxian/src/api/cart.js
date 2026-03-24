import request from "@/utils/http.js";

export function addCartApi(skuId, count) {
  return request({
    url: "/member/cart",
    method: "POST",
    data: {
      skuId,
      count
    },
  });
}

export function delCartApi(ids) {
  return request({
    url: "/member/cart",
    method: "DELETE",
    data: {
      ids
    }
  });
}

export function findNewCartListApi() {
  return request({
    url: "/member/cart"
  });
}

export function mergeCartApi(data) {
  return request({
    url: "/member/cart/merge",
    method: "POST",
    data
  });
}
