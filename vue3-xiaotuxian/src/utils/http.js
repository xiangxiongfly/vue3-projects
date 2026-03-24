import {useUserStore} from "@/stores/userStore.js";
import axios from "axios";
import {ElMessage} from "element-plus";

const instance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => Promise.reject(err)
);

// 响应拦截器
instance.interceptors.response.use(
  res => res.data,
  err => {
    ElMessage({type: "warning", message: err.response.data.message});
    return Promise.reject(err);
  }
);

export default instance;
