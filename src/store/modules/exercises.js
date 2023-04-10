import api from "@/api";

export default {
  namespaced: true,
  state: {
    isFetched: false,
    isLoading: false,
    isAddLoading: false,
    isDeleteLoading: false,
    exercises: [],
  },
  mutations: {
    setExercises(state, exercises) {
      state.exercises = exercises;
    },
    pushExercise(state, exercise) {
      state.exercises.push(exercise);
    },
    deleteExercise(state, id) {
      state.exercises = state.exercises.filter((m) => m.id !== id);
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
    updateExerciseIsPayed(state, { id, isPayed }) {
      state.exercises = state.exercises.map((e) => {
        if (id === e.id) {
          e.isPayed = isPayed;
        }
        return e;
      });
    },
  },
  actions: {
    async fetch({ commit, state }) {
      if (state.isFetched) {
        return;
      }

      commit("setIsLoading", true);
      try {
        const exercises = await api.exercises.list();

        commit("setExercises", exercises.data);
        commit("setIsFetched", true);
      } finally {
        commit("setIsLoading", false);
      }
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addExerciseDto) {
      commit("setIsAddLoading", true);
      let exercise = addExerciseDto;
      try {
        const res = await api.exercises.add(addExerciseDto);
        exercise = res.data;
      } finally {
        commit("setIsAddLoading", false);
        commit("pushExercise", exercise);
      }
    },
    async deleteExercise({ commit }, id) {
      await api.exercises.drop(id);
      commit("deleteExercise", id);
    },
    async changeIsPayed({ commit }, dto) {
      await api.exercises.updateIsPayed(dto);
      commit("updateExerciseIsPayed", dto);
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
    exercises(state) {
      return state.exercises;
    },
  },
};
