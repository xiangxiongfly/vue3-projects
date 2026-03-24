import {getAllDepartments, getAllMenus, getAllRoles} from "@/network/api/main.js";
import {defineStore} from "pinia";
import {ref} from "vue";

const useMainStore = defineStore("mainStore", () => {
    const allRoles = ref([]);
    const allDepartments = ref([]);
    const allMenus = ref([]);

    const requestAllRoles = async () => {
        const rolesResult = await getAllRoles();
        allRoles.value = rolesResult.data.list;
    };

    const requestAllDepartments = async () => {
        const departmentsResult = await getAllDepartments();
        allDepartments.value = departmentsResult.data.list;
    };

    const requestAllMenus = async () => {
        const menusResult = await getAllMenus();
        allMenus.value = menusResult.data.list;
    };

    const loadAllData = async () => {
        requestAllRoles();
        requestAllDepartments();
        requestAllMenus();
    };

    return {allRoles, allDepartments, allMenus, requestAllRoles, requestAllDepartments, requestAllMenus, loadAllData};
});

export default useMainStore;