import {KEY_USER_MENUS, KEY_TOKEN, KEY_USER_INFO} from "@/global/constants.js";
import {getMenusByRole, getUserInfo, loginByAccount} from "@/network/api/login.js";
import router from "@/router/index.js";
import useMainStore from "@/stores/mainStore.js";
import {localCache} from "@/utils/cache.js";
import {menusToPermissions, menusToRoutes} from "@/utils/maps.js";
import {defineStore} from "pinia";
import {ref} from "vue";

/**
 * 登录
 */
const useLoginStore = defineStore("loginStore", () => {
    const token = ref("");
    const userInfo = ref({});
    const userMenus = ref([]);
    const userPermissions = ref([]);

    const loginByAccountAction = async (name, password) => {
        // 登录
        const loginResult = await loginByAccount(name, password);
        const {id, token} = loginResult.data;
        localCache.setCache(KEY_TOKEN, token);

        // 获取用户信息
        const userInfoResult = await getUserInfo(id);
        userInfo.value = userInfoResult.data;

        // 通过用户角色获取权限
        const menusResult = await getMenusByRole(userInfo.value.role.id);
        userMenus.value = menusResult.data;

        // 缓存
        localCache.setCache(KEY_USER_INFO, userInfo.value);
        localCache.setCache(KEY_USER_MENUS, userMenus.value);

        const mainStore = useMainStore();
        mainStore.loadAllData();

        // 获取用户所有权限
        userPermissions.value = menusToPermissions(userMenus.value);

        // 动态加载路由
        loadRoutes(userMenus.value);

        // 跳转主页
        router.push("/main");
    };

    const loadLocalCache = () => {
        token.value = localCache.getCache(KEY_TOKEN);
        if (token.value) {
            userInfo.value = localCache.getCache(KEY_USER_INFO);
            userMenus.value = localCache.getCache(KEY_USER_MENUS);
            if (userInfo.value && userMenus.value) {
                // 请求所有数据（角色/部门/菜单）
                const mainStore = useMainStore();
                mainStore.loadAllData();
                // 获取所有权限
                userPermissions.value = menusToPermissions(userMenus.value);
                // 动态加载路由
                loadRoutes(userMenus.value);
            }
        }
    };

    // 动态加载路由
    const loadRoutes = (userMenus) => {
        const routes = menusToRoutes(userMenus);
        routes.forEach(route => {
            router.addRoute("main", route);
        });
    };

    return {token, userInfo, userMenus, userPermissions, loginByAccountAction, loadLocalCache};
});

export default useLoginStore;