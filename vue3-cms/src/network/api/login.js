import request from "@/network/request.js";

/**
 * 根据账号密码登录
 */
export function loginByAccount(name, password) {
    return request.post({
        url: "/login",
        data: {
            name,
            password
        }
    });
}

/**
 * 获取用户信息
 */
export function getUserInfo(id) {
    return request.get({
        url: `/users/${id}`,
    });
}

/**
 * 获取用户的菜单列表
 */
export async function getMenusByRole(id) {
    return request.get({
        url: `/role/${id}/menu`
    });
}