<template>
  <v-card class="ma-0 pa-0" variant="plain" :loading="isExercisesLoading">
    <v-card-actions>
      <exercise-date-select v-model="selectedDate" :exercises="exercises" />
    </v-card-actions>
    <div>
      <template v-if="filtredExercises.length">
        <client-exercise-card
          v-for="exercise in filtredExercises"
          :key="exercise.id"
          :manager="exercise.manager"
          :exercise="exercise"
        />
      </template>
      <no-exercise-message v-else :date="selectedDate" />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { Exercise } from "@/types/Exercise";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import ClientExerciseCard from "@/components/clientExerciseCard.vue";
import ExerciseDateSelect from "@/components/exerciseDateSelect.vue";
import useFormaters from "@/hooks/useFormaters";
import NoExerciseMessage from "@/components/noExerciseMessage.vue";

const store = useStore();
const { formatDate } = useFormaters();

const selectedDate = ref("");

onMounted(() => {
  store.dispatch("exercises/fetch");
});

const exercises = computed<Exercise[]>(
  () => store.getters["exercises/exercises"]
);
const filtredExercises = computed<Exercise[]>(() => {
  if (!selectedDate.value) {
    return exercises.value;
  }
  return exercises.value.filter(
    (e) => formatDate(e.date) === selectedDate.value
  );
});
const isExercisesLoading = computed<boolean>(
  () => store.getters["exercises/isLoading"]
);
</script>

<style scoped></style>
