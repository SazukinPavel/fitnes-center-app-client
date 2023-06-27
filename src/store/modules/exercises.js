import api from "@/api";

export default {
  namespaced: true,
  state: {
    isFetched: false,
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
    replaceExercise(state, exercise) {
      state.exercises = state.exercises.map((e) => {
        if (e.id === exercise.id) {
          return exercise;
        }
        return e;
      });
    },
    updateExerciseIsPayed(state, { id, isPayed }) {
      const index=state.exercises.findIndex((e) => id == e.id)
      state.exercises[index].isPayed=isPayed
    },
  },
  actions: {
    async fetch({ commit, state }) {
      if (state.isFetched) {
        return;
      }

      const exercises = await api.exercises.list();

      commit("setExercises", exercises.data);
      commit("setIsFetched", true);
    },
    refresh({ dispatch, commit }) {
      commit("setIsFetched", false);
      dispatch("fetch");
    },
    async add({ commit }, addExerciseDto) {
      const res = await api.exercises.add(addExerciseDto);
      commit("pushExercise", res.data);
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
    exercises(state) {
      return state.exercises;
    },
  },
};
