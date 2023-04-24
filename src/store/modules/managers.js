import api from "@/api";

export default {
  namespaced: true,
  state: {
    isFetched: false,
    managers: [],
  },
  mutations: {
    setManagers(state, managers) {
      state.managers = managers;
    },
    pushManager(state, manager) {
      state.managers.push(manager);
    },
    deleteManager(state, id) {
      state.managers = state.managers.filter((m) => m.id !== id);
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

      const managers = await api.managers.list();

      commit("setManagers", managers.data);
      commit("setIsFetched", true);
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addManagerDto) {
      const res = await api.managers.add(addManagerDto);
      commit("pushManager", res.data);
    },
    async delete({ commit }, id) {
      await api.managers.drop(id);
      commit("deleteManager", id);
    },
  },
  getters: {
    isFetched(state) {
      return state.isFetched;
    },
    managers(state) {
      return state.managers;
    },
  },
};
