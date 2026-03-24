import {BASE_URL, TIMEOUT} from "@/request/config.js";
import {useMainStore} from "@/stores/useMainStore.js";
import axios from "axios";

const mainStore = useMainStore();

class NetworkRequest {
    constructor(baseURL, timeout = 10000) {
        this.instance = axios.create({
            baseURL,
            timeout,
        });

        // 请求拦截器
        this.instance.interceptors.request.use(config => {
            mainStore.isLoading = true;
            return config;
        }, err => {
            return err;
        });
        // 响应拦截器
        this.instance.interceptors.response.use(res => {
            mainStore.isLoading = false;
            return res;
        }, err => {
            mainStore.isLoading = false;
            return err;
        });
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.instance.request(config)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    get(config) {
        return this.request({...config, method: "GET"});
    }

    post(config) {
        return this.request({...config, method: "POST"});
    }
}

export default new NetworkRequest(BASE_URL, TIMEOUT);