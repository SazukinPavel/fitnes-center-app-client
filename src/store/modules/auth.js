import CookiesService from "@/services/CookiesService";

export default {
  namespaced: true,
  state: {
    isLogedIn: false,
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      CookiesService.resetToken();
      state.isLogedIn = false;
    },
    applyToken(_, token) {
      api.applyToken(token);
    },
  },
  actions: {
    async login({ dispatch }, { email, password, saveLong }) {
      const token = (
        await crmApi.accounts.getUserToken({ login: email, password })
      ).token;
      CookiesService.setToken(token, saveLong);
      await dispatch("init");
    },
    async init({ dispatch, commit }) {
      const tokenCookie = CookiesService.getToken();

      if (tokenCookie === "") {
        throw new Error("Token is empty!");
      }

      commit("applyToken", tokenCookie);
      await dispatch("fetchCrmMe");
      commit("setRole", 1);
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
      return state.user.role;
    },
  },
};
