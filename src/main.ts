import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import vuetify from "@/vuetify";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const app = createApp(App);

app.component("vue-date-picker", VueDatePicker);

app.use(vuetify);
app.use(router);
app.use(store);

app.mount("#app");
