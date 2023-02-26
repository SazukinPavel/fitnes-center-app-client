import api from "@/api";

export default {
  namespaced: true,
  state: {
    isFetched: false,
    isLoading: false,
    isAddLoading: false,
    isDeleteLoading: false,
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
        const exercisesInfos = await api.exercisesInfos.list();

        commit("setExercisesInfo", exercisesInfos.data);
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
      let diet = addExerciseInfoDto;
      try {
        const res = await api.exercisesInfo.add(addExerciseInfoDto);
        diet = res.data;
      } finally {
        commit("setIsAddLoading", false);
        commit("pushExerciseInfo", diet);
      }
    },
    async deletediets({ commit }, exercisesInfos) {
      commit("setIsDeleteLoading", true);
      try {
        await Promise.all(
          exercisesInfos.forEach(async (id) => {
            await api.exercisesInfos.drop(id);
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
    exercisesInfos(state) {
      return state.exercisesInfos;
    },
  },
};
