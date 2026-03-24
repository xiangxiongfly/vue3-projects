import request from "../request.js";

// 用户
export function requestUsers(queryInfo) {
    return request.post({
        url: "/users/list", data: queryInfo
    });
}

export function requestDeleteUserById(id) {
    return request.delete({
        url: `/users/${id}`,
    });
}

export function requestCreateUser(userInfo) {
    return request.post({
        url: "/users", data: userInfo
    });
}

export function requestEditUser(id, userInfo) {
    return request.patch({
        url: `/users/${id}`, data: userInfo
    });
}

// 部门
export function requestDepartments(queryInfo) {
    return request.post({
        url: "/department/list", data: queryInfo
    });
}

export function requestDeleteDepartmentById(id) {
    return request.delete({
        url: `/department/${id}`,
    });
}

export function requestCreateDepartment(departmentInfo) {
    return request.post({
        url: "/department", data: departmentInfo
    });
}

export function requestEditDepartment(id, departmentInfo) {
    return request.patch({
        url: `/department/${id}`, data: departmentInfo
    });
}

// 角色
export function requestCreateRole(roleInfo) {
    return request.post({
        url: "/role", data: roleInfo
    });
}

export function requestDeleteRoleById(id) {
    return request.delete({
        url: `/role/${id}`,
    });
}

export function requestEditRole(id, roleInfo) {
    return request.patch({
        url: `/role/${id}`, data: roleInfo
    });
}