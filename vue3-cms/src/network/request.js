import {KEY_TOKEN} from "@/global/constants.js";
import {BASE_URL, TIME_OUT} from "@/network/config.js";
import NetworkRequest from "@/network/NetworkRequest.js";
import {localCache} from "@/utils/cache.js";

const request = new NetworkRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    requestInterceptor: {
        requestSuccessFn: (config) => {
            const token = localCache.getCache(KEY_TOKEN);
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        requestFailureFn: null
    }
});

export default request;