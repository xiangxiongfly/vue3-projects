import "./assets/css/index.scss";
import "normalize.css";
import registerIcons from "@/global/registerIcons.js";
import registerStore from "@/stores/index.js";

import {createApp} from "vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(registerStore);
app.use(registerIcons);
app.use(router);

app.mount("#app");
