import { createStore } from "vuex";
import snackbar from "@/store/modules/snackbar";
import app from "@/store/modules/app";
import auth from "@/store/modules/auth";
import managers from "@/store/modules/managers";
import diets from "@/store/modules/diets";
import exerciseInfo from "@/store/modules/exercise-info.ts";

export default createStore({
  modules: {
    snackbar,
    app,
    auth,
    managers,
    diets,
    exerciseInfo,
  },
});
