import {defineStore} from "pinia";

const useUserStore = defineStore("userStore", {
    state: () => ({
        userName: "",
        userPassword: ""
    }),
    getters: {
        // 判断是否登录
        isLogin(state) {
            return state.userName.length > 0;
        },
    },
    actions: {
        // 退出登录
        clearUser() {
            this.userName = "";
            this.userPassword = "";
        },
        // 注册用户信息
        registerUser(uName, uPassword) {
            this.userName = uName;
            this.userPassword = uPassword;
        }
    },
    persist: true
});

export default useUserStore;