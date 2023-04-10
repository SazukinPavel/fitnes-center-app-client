<template>
  <v-card class="ma-4">
    <v-card-actions class="d-flex justify-end ma-0 pa-0">
      <v-btn
        :loading="isDeleteLoading"
        color="primary"
        @click="deleteExercise"
        icon
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-title>{{ props.exercise.exerciseInfo.name }}</v-card-title>
    <v-card-title>Дата: {{ formatDateTime(props.exercise.date) }}</v-card-title>
    <v-card-title>Клиент: {{ props.client?.auth?.fio }}</v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import { Exercise } from "@/types/Exercise";
import { useStore } from "vuex";
import Client from "@/types/Client";
import useFormmaters from "@/hooks/useFormaters";

const props = defineProps({
  exercise: { type: Object as PropType<Exercise>, required: true },
  client: { type: Object as PropType<Client>, required: true },
});

const store = useStore();
const { formatDateTime } = useFormmaters();

const isDeleteLoading = ref(false);

const deleteExercise = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch("exercises/deleteExercise", props.exercise?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: `Занятие успешно удалёно`,
    });
  } catch {
    store.commit("snackbar/showSnackbarSuccess", {
      message: `Произошла ошибка при удалении занятия`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<style scoped></style>
