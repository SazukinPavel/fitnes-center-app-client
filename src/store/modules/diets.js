import api from "@/api";

export default {
  namespaced: true,
  state: {
    isFetched: false,
    isLoading: false,
    isAddLoading: false,
    isDeleteLoading: false,
    diets: [],
  },
  mutations: {
    setDiet(state, diets) {
      state.diets = diets;
    },
    pushDiet(state, diet) {
      state.diets.push(diet);
    },
    deleteDiet(state, id) {
      state.diets = state.diets.filter((m) => m.id !== id);
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
        const diets = await api.diets.list();

        commit("setDiet", diets.data);
        commit("setIsFetched", true);
      } finally {
        commit("setIsLoading", false);
      }
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addDietDto) {
      commit("setIsAddLoading", true);
      let diet = addDietDto;
      try {
        const res = await api.diets.add(addDietDto);
        diet = res.data;
      } finally {
        commit("setIsAddLoading", false);
        commit("pushDiet", diet);
      }
    },
    async deletediets({ commit }, diets) {
      commit("setIsDeleteLoading", true);
      try {
        await Promise.all(
          diets.forEach(async (id) => {
            await api.diets.drop(id);
            commit("deleteDiet", id);
          })
        );
      } finally {
        commit("setIsDeleteLoading", false);
      }
    },
    async deleteDiet({ commit }, id) {
      commit("setIsDeleteLoading", true);
      try {
        await api.diets.drop(id);
        commit("deleteDiet", id);
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
    diets(state) {
      return state.diets;
    },
  },
};
