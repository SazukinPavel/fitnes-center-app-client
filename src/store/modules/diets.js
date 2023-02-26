import api from "@/api";

export default {
  namespaced: true,
  state: {
    isFetched: false,
    isLoading: false,
    isAddLoading: false,
    isDeleteLoading: false,
    exercisesInfo: [],
  },
  mutations: {
    setExercises(state, exercisesInfo) {
      state.exercisesInfo = exercisesInfo;
    },
    pushDiet(state, exerciseInfo) {
      state.exercisesInfo.push(exerciseInfo);
    },
    deleteDiet(state, id) {
      state.exercisesInfo = state.exercisesInfo.filter((m) => m.id !== id);
    },
    setIsFetched(state, val) {
      state.isFetched = val;
    },
    setIsLoading(state, val) {
      state.isLoading = val;
    },
    setIsAddLoading(state, val) {
      state.isAddLoading = val;
    },
    setIsDeleteLoading(state, val) {
      state.isDeleteLoading = val;
    },
  },
  actions: {
    async fetch({ commit, state }) {
      if (state.isFetched) {
        return;
      }

      commit("setIsLoading", true);
      try {
        const exercisesInfo = await api.exercisesInfo.list();

        commit("setExercises", exercisesInfo.data);
        commit("setIsFetched", true);
      } finally {
        commit("setIsLoading", false);
      }
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addExerciseInfoDto) {
      commit("setIsAddLoading", true);
      let exerciseInfo = addExerciseInfoDto;
      try {
        const res = await api.exercisesInfo.add(addExerciseInfoDto);
        exerciseInfo = res.data;
      } finally {
        commit("setIsAddLoading", false);
        commit("pushExerciseInfo", exerciseInfo);
      }
    },
    async deletediets({ commit }, exercisesInfo) {
      commit("setIsDeleteLoading", true);
      try {
        await Promise.all(
          exercisesInfo.forEach(async (id) => {
            await api.exercisesInfo.drop(id);
            commit("deleteExerciseInfo", id);
          })
        );
      } finally {
        commit("setIsDeleteLoading", false);
      }
    },
  },
  getters: {
    isFetched(state) {
      return state.isFetched;
    },
    isLoading(state) {
      return state.isLoading;
    },
    isAddLoading(state) {
      return state.isAddLoading;
    },
    isDeleteLoading(state) {
      return state.isDeleteLoading;
    },
    exercisesInfo(state) {
      return state.exercisesInfo;
    },
  },
};
