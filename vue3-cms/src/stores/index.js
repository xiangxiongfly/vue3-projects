import useLoginStore from "@/stores/loginStore.js";
import {createPinia} from "pinia";

function registerStore(app) {
    const pinia = createPinia();

    app.use(pinia);
    const loginStore = useLoginStore();
    loginStore.loadLocalCache();
}

export default registerStore;