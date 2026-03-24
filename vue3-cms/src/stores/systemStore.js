import {getAllRoles} from "@/network/api/main.js";
import {
    requestCreateDepartment, requestCreateRole,
    requestCreateUser, requestDeleteDepartmentById, requestDeleteRoleById,
    requestDeleteUserById,
    requestDepartments, requestEditDepartment, requestEditRole,
    requestEditUser,
    requestUsers
} from "@/network/api/system.js";
import {defineStore} from "pinia";
import {ref} from "vue";

/**
 * 系统管理
 */
const useSystemStore = defineStore("systemStore", () => {
    const users = ref([]);
    const usersTotalCount = ref(0);
    const departments = ref([]);
    const departmentTotalCount = ref(0);
    const roles = ref([]);
    const roleTotalCount = ref(0);

    // 获取用户列表
    const getUsers = async (queryInfo = {offset: 0, size: 10}) => {
        const res = await requestUsers(queryInfo);
        const {list, totalCount} = res.data;
        users.value = list;
        usersTotalCount.value = totalCount;
    };

    // 删除用户
    const deleteUserById = async (id) => {
        const res = await requestDeleteUserById(id);
        // 刷新列表
        await getUsers();
    };

    // 创建新用户
    const createUser = async (user) => {
        const res = requestCreateUser(user);
        getUsers();
    };

    // 编辑用户
    const editUser = async (id, user) => {
        const res = await requestEditUser(id, user);
        getUsers();
    };

    // 获取部门列表
    const getDepartments = async (queryInfo = {offset: 0, size: 10}) => {
        const res = await requestDepartments(queryInfo);
        const {list, totalCount} = res.data;
        departments.value = list;
        departmentTotalCount.value = totalCount;
    };

    // 删除部门
    const deleteDepartmentById = async (id) => {
        const res = await requestDeleteDepartmentById(id);
        // 刷新列表
        await getDepartments();
    };

    // 创建新用户
    const createDepartment = async (department) => {
        const res = requestCreateDepartment(department);
        await getDepartments();
    };

    // 编辑用户
    const editDepartment = async (id, department) => {
        const res = await requestEditDepartment(id, department);
        await getDepartments();
    };

    // 获取所有角色
    const getRoles = async () => {
        const res = await getAllRoles();
        const {list, totalCount} = res.data;
        roles.value = list;
        roleTotalCount.value = totalCount;
    };

    // 创建角色
    const createRole = async (role) => {
        const res = await requestCreateRole(role);
        await getRoles();
    };

    // 删除角色
    const deleteRoleById = async (id) => {
        const res = await requestDeleteRoleById(id);
        // 刷新列表
        await getRoles();
    };

    // 编辑角色
    const editRole = async (id, role) => {
        const res = await requestEditRole(id, role);
        await getRoles();
    };

    return {
        users, usersTotalCount, getUsers, deleteUserById, createUser, editUser,
        departments, departmentTotalCount, getDepartments, deleteDepartmentById, createDepartment, editDepartment,
        roles, roleTotalCount, getRoles, createRole, deleteRoleById, editRole
    };
});

export default useSystemStore;