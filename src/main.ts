import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import vuetify from "@/vuetify";
import i18n from "@/i18n";

const app = createApp(App);

app.use(vuetify);
app.use(i18n);
app.use(router);
app.use(store);

app.mount("#app");
