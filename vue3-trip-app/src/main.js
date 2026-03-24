import router from "@/router/index.js";
import pinia from "@/stores/index.js";
import {createApp} from "vue";
import App from "./App.vue";

import "normalize.css";
import "@/assets/css/index.css";

createApp(App)
    .use(pinia)
    .use(router)
    .mount("#app");
