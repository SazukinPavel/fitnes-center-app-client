<template>
  <v-card class="ma-0 pa-0" variant="text" :loading="isLoading">
    <div class="mt-10">
      <exercise-date-select v-model="selectedDate" :exercises="exercises" />
    </div>
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
import { Exercise } from "@/types/entitys/Exercise";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import ClientExerciseCard from "@/components/clientExerciseCard.vue";
import ExerciseDateSelect from "@/components/exerciseDateSelect.vue";
import useFormaters from "@/hooks/useFormaters";
import NoExerciseMessage from "@/components/noExerciseMessage.vue";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const { formatDate } = useFormaters();

const selectedDate = ref("");
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    await store.dispatch("exercises/fetch");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: t("errors.fetchClientsExercises"),
    });
  } finally {
    isLoading.value = false;
  }
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
</script>

<style scoped></style>
