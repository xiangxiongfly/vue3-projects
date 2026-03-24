import axios from "axios";

class NetworkRequest {

    constructor(config) {
        this.instance = axios.create(config);

        this.instance.interceptors.request.use(
            (config) => {
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (res) => {
                return res.data;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        if (config.requestInterceptor) {
            this.instance.interceptors.request.use(
                config.requestInterceptor.requestSuccessFn,
                config.requestInterceptor.requestFailureFn
            );
        }
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.instance.request(config)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
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

    delete(config) {
        return this.request({...config, method: "DELETE"});
    }

    patch(config) {
        return this.request({...config, method: "PATCH"});
    }
}

export default NetworkRequest;