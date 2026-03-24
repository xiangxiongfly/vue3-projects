import request from "@/network/request.js";

/**
 * 获取所有角色
 */
export function getAllRoles() {
    return request.post({url: "/role/list"});
}

/**
 * 获取所有部门
 */
export function getAllDepartments() {
    return request.post({url: "/department/list"});
}

/**
 * 获取所有菜单
 */
export function getAllMenus() {
    return request.post({url: "/menu/list"});
}