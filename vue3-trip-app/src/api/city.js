import request from "@/request/request.js";

export function getCityAll() {
    return request.get({
        url: "/city/all"
    });
}