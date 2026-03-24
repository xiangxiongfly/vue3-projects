import request from "@/utils/http.js";

export function getOrderInfoApi() {
  return request({
    url: "/member/order/pre"
  });
}

export function createOrderApi(data) {
  return request({
    url: "/member/order",
    method: "POST",
    data
  });
}
