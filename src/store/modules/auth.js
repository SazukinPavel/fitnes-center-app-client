import CookiesService from "@/services/CookiesService";
import api from "@/api";

export default {
  namespaced: true,
  state: {
    isLogedIn: false,
    user: null,
    fullUser: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsLogedIn(state, val) {
      state.isLogedIn = val;
    },
    logout(state) {
      CookiesService.resetToken();
      state.isLogedIn = false;
      state.user = null;
    },
    applyToken(_, token) {
      api.applyToken(token);
    },
    setFullUser(state, fullUser) {
      state.fullUser = fullUser;
    },
  },
  actions: {
    async login({ dispatch }, loginDto) {
      const data = await api.auth.login(loginDto);
      CookiesService.setToken(data.data.token);

      await dispatch("init");
    },
    async init({ commit, dispatch }) {
      const tokenCookie = CookiesService.getToken();

      if (tokenCookie === "") {
        throw new Error("Token is empty!");
      }

      try {
        commit("applyToken", tokenCookie);

        const me = await api.auth.me();

        CookiesService.setToken(me.data.token);
        commit("applyToken", me.data.token);

        commit("setUser", me.data.user);
        dispatch("fetchUser");
        commit("setIsLogedIn", true);
      } catch {
        commit("setIsLogedIn", false);
        CookiesService.resetToken();
        throw new Error();
      }
    },
    async fetchUser({ state, commit }) {
      let fullUser = {};
      const id = state.user.id;
      switch (state.user.role) {
        case "client": {
          fullUser = await api.clients.find(id);
          break;
        }
        case "manager": {
          fullUser = await api.managers.find(id);
          break;
        }
        default: {
          return;
        }
      }

      commit("setFullUser", fullUser.data);
    },
  },
  getters: {
    isLogedIn(state) {
      return state.isLogedIn;
    },
    user(state) {
      return state.user;
    },
    role(state) {
      return state.user?.role;
    },
    fullUser(state) {
      return state.fullUser;
    },
  },
};
