import axios from "axios";
import {useUserStore} from "@/stores/index.js";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";

const baseURL = "http://big-event-vue-api-t.itheima.net";
const timeout = 10000;

const instance = axios.create({
    baseURL,
    timeout,
});

// 请求拦截器
instance.interceptors.request.use(
    config => {
        const userStore = useUserStore();
        if (userStore.token) {
            config.headers.Authorization = userStore.token;
        }
        return config;
    },
    error => Promise.reject(error)
);
// 响应拦截器
instance.interceptors.response.use(
    response => {
        if (response.data.code === 0) {
            // 请求成功
            return response;
        } else {
            // 请求失败
            ElMessage.error(response.data.message || "服务器异常");
            return Promise.reject(response.data);
        }
    },
    error => {
        console.log("error:", error);
        if (error.response && error.response.status === 401) {
            router.push("/login");
        }
        ElMessage.error(error.response.data.message || "服务器异常");
        return Promise.reject(error);
    }
);

export default instance;
export {baseURL};