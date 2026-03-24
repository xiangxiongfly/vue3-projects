// 引入全局插件
import {componentPlugin} from "@/components/index.js";

// 引入懒加载指令插件
import {lazyPlugin} from "@/directives/index.js";

// 引入全局样式
import "@/styles/common.scss";

import {createPinia} from "pinia";
import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);
app.mount("#app");
