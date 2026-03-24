import request from "@/utils/http.js";

export function getOrderApi(id) {
  return request({
    url: `/member/order/${id}`
  });
}
