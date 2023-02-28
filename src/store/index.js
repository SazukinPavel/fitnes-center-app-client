import snackbar from "@/store/modules/snackbar";
import app from "@/store/modules/app";
import auth from "@/store/modules/auth";
import managers from "@/store/modules/managers";
import diets from "@/store/modules/diets";
import exerciseInfo from "@/store/modules/exercise-info";
import clients from "@/store/modules/clients";
import exercises from "@/store/modules/exercises";
import {createStore} from 'vuex-extensions'
import { Store } from "vuex";

export default createStore(Store,{
  modules: {
    app,
    auth,
    managers,
    diets,
    exerciseInfo,
    clients,
    exercises,
    snackbar,
  },
});
