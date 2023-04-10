<template>
  <v-card class="ma-0 pa-0" :loading="isExercisesLoading">
    <v-card-actions> </v-card-actions>
    <div>
      <client-exercise-card
        v-for="exercise in exercises"
        :key="exercise.id"
        :manager="exercise.manager"
        :exercise="exercise"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { Exercise } from "@/types/Exercise";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import ClientExerciseCard from "@/components/clientExerciseCard.vue";

const store = useStore();

onMounted(() => {
  store.dispatch("exercises/fetch");
});

const exercises = computed<Exercise[]>(
  () => store.getters["exercises/exercises"]
);
const isExercisesLoading = computed<boolean>(
  () => store.getters["exercises/isLoading"]
);
</script>

<style scoped></style>
