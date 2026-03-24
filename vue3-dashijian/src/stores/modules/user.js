import {defineStore} from "pinia";
import {ref} from "vue";
import {getUserInfo} from "@/api/user.js";

export const useUserStore = defineStore("user",
    () => {
        const token = ref("");
        const setToken = (newToken) => {
            token.value = newToken;
        };
        const removeToken = () => {
            token.value = "";
        };

        const user = ref({});
        const setUser = (newUser) => {
            user.value = newUser;
        };
        const getUser = async () => {
            const res = await getUserInfo();
            user.value = res.data.data;
        };

        return {
            token, setToken, removeToken,
            user, setUser, getUser
        };
    },
    {persist: true}
);