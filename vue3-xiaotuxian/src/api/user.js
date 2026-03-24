import request from "@/utils/http.js";

export function loginApi(account, password) {
  return request({
    url: "/login",
    method: "POST",
    data: {
      account,
      password
    }
  });
}

export function getLikeListApi(limit = 4) {
  return request({
    url: "/goods/relevant",
    params: {
      limit
    }
  });
}
