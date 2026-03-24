import request from "@/request/request.js";

export function getDetailInfos(houseId) {
    return request.get({
        url: "/detail/infos",
        params: {
            houseId
        }
    });
}
