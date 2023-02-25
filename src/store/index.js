import { createStore } from "vuex";
import snackbar from "@/store/modules/snackbar";
import app from "@/store/modules/app";
export default createStore({
  modules: {
    snackbar,
    app,
  },
});
