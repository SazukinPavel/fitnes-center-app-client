import api from "@/api";

export default {
  namespaced: true,
  state: {
    isFetched: false,
    isLoading: false,
    isAddLoading: false,
    isDeleteLoading: false,
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
        const managers = await api.managers.list();

        commit("setManagers", managers.data);
        commit("setIsFetched", true);
      } finally {
        commit("setIsLoading", false);
      }
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addManagerDto) {
      commit("setIsAddLoading", true);
      let manager = addManagerDto;
      try {
        const res = await api.managers.add(addManagerDto);
        manager = res.data;
      } finally {
        commit("setIsAddLoading", false);
        commit("pushManager", manager);
      }
    },
    async deleteManagers({ commit }, managers) {
      commit("setIsDeleteLoading", true);
      try {
        await Promise.all(
          managers.forEach(async (id) => {
            await api.managers.drop(id);
            commit("deleteManager", id);
          })
        );
      } finally {
        commit("setIsDeleteLoading", false);
      }
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
    isLoading(state) {
      return state.isLoading;
    },
    isAddLoading(state) {
      return state.isAddLoading;
    },
    isDeleteLoading(state) {
      return state.isDeleteLoading;
    },
    managers(state) {
      return state.managers;
    },
  },
};
