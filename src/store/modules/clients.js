import api from "@/api";

export default {
  namespaced: true,
  state: {
    isFetched: false,
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
    setClientDiet(state, { id, diet }) {
      state.clients = state.clients.map((c) => {
        if (c.id === id) {
          c.diet = diet;
        }
        return c;
      });
    },
  },
  actions: {
    async fetch({ commit, state }) {
      if (state.isFetched) {
        return;
      }

      const clients = await api.clients.list();

      commit("setClients", clients.data);
      commit("setIsFetched", true);
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addClientDto) {
      const res = await api.clients.add(addClientDto);
      commit("pushClient", res.data);
    },
    async deleteClient({ commit }, id) {
      await api.clients.drop(id);
      commit("deleteClient", id);
    },
  },
  getters: {
    isFetched(state) {
      return state.isFetched;
    },
    clients(state) {
      return state.clients;
    },
  },
};
