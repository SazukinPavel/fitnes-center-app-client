import api from "@/api";

export default {
  namespaced: true,
  state: {
    isFetched: false,
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
  },
  actions: {
    async fetch({ commit, state }) {
      if (state.isFetched) {
        return;
      }

      const diets = await api.diets.list();

      commit("setDiet", diets.data);
      commit("setIsFetched", true);
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addDietDto) {
      const res = await api.diets.add(addDietDto);
      commit("pushDiet", res.data);
    },
    async deleteDiet({ commit }, id) {
      await api.diets.drop(id);
      commit("deleteDiet", id);
    },
  },
  getters: {
    isFetched(state) {
      return state.isFetched;
    },
    diets(state) {
      return state.diets;
    },
  },
};
