import api from "@/api";

export default {
  namespaced: true,
  state: {
    isFetched: false,
    exercisesInfos: [],
  },
  mutations: {
    setExercisesInfo(state, exercisesInfos) {
      state.exercisesInfos = exercisesInfos;
    },
    pushExerciseInfo(state, diet) {
      state.exercisesInfos.push(diet);
    },
    deleteExerciseInfo(state, id) {
      state.exercisesInfos = state.exercisesInfos.filter((m) => m.id !== id);
    },
    setIsFetched(state, val) {
      state.isFetched = val;
    },
  },
  actions: {
    async fetch({ commit, state }) {
      if (state.isFetched) {
        return;
      }
      const exercisesInfos = await api.exercisesInfo.list();
      commit("setExercisesInfo", exercisesInfos.data);
      commit("setIsFetched", true);
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addExerciseInfoDto) {
      const res = await api.exercisesInfo.add(addExerciseInfoDto);
      commit("pushExerciseInfo", res.data);
    },
    async delete({ commit }, id) {
      await api.exercisesInfo.drop(id);
      commit("deleteExerciseInfo", id);
    },
  },
  getters: {
    isFetched(state) {
      return state.isFetched;
    },
    exercisesInfos(state) {
      return state.exercisesInfos;
    },
  },
};
