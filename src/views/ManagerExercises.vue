<template>
  <div class="d-flex justify-space-between align-start mt-5">
    <exercise-date-select :exercises="exercises" v-model="selectedDate" />
    <add-btn class="mt-2" :to="{ name: 'AddExercise' }" />
  </div>
  <v-card :loading="isExerciseLoading" variant="text">
    <template v-if="filtredExercises.length">
      <exercise-card
        v-for="exercise in filtredExercises"
        :key="exercise.id"
        :exercise="exercise"
        :client="getClient(exercise.client.id)"
      />
    </template>
    <no-exercise-message v-else :date="selectedDate" />
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ExerciseCard from "@/components/exerciseCard.vue";
import { Exercise } from "@/types/entitys/Exercise";
import AddBtn from "@/components/ui/addBtn.vue";
import ExerciseDateSelect from "@/components/exerciseDateSelect.vue";
import useFormaters from "@/hooks/useFormaters";
import NoExerciseMessage from "@/components/noExerciseMessage.vue";
import Client from "@/types/entitys/Client";

const store = useStore();

const { formatDate } = useFormaters();

const selectedDate = ref<string>("");
const isExerciseLoading = ref(false);

onMounted(() => {
  isExerciseLoading.value = true;
  try {
    store.dispatch("exercises/fetch");
    store.dispatch("clients/fetch");
    store.dispatch("exerciseInfo/fetch");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при получение занятий",
    });
  } finally {
    isExerciseLoading.value = false;
  }
});

const getClient = (id?: string) => {
  return clients.value.find((c) => c.id == id);
};

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
const clients = computed<Client[]>(() => store.getters["clients/clients"]);
</script>

<style scoped></style>
