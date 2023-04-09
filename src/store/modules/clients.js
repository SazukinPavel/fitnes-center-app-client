import api from "@/api";

export default {
  namespaced: true,
  state: {
    isFetched: false,
    isLoading: false,
    isAddLoading: false,
    isDeleteLoading: false,
    clients: [],
  },
  mutations: {
    setClients(state, clients) {
      state.clients = clients;
    },
    pushClient(state, client) {
      state.clients.push(client);
    },
    deleteClient(state, id) {
      state.clients = state.clients.filter((m) => m.id !== id);
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
        const clients = await api.clients.list();

        commit("setClients", clients.data);
        commit("setIsFetched", true);
      } finally {
        commit("setIsLoading", false);
      }
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addClientDto) {
      commit("setIsAddLoading", true);
      let client = addClientDto;
      try {
        const res = await api.clients.add(addClientDto);
        client = res.data;
      } finally {
        commit("setIsAddLoading", false);
        commit("pushClient", client);
      }
    },
    async deleteClients({ commit }, clients) {
      commit("setIsDeleteLoading", true);
      try {
        await Promise.all(
          clients.forEach(async (id) => {
            await api.clients.drop(id);
            commit("deleteClient", id);
          })
        );
      } finally {
        commit("setIsDeleteLoading", false);
      }
    },
    async deleteClient({ commit }, id) {
      commit("setIsDeleteLoading", true);
      try {
        await api.clients.drop(id);
        commit("deleteClient", id);
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
    clients(state) {
      return state.clients;
    },
  },
};
