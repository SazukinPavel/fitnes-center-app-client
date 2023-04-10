<template>
  <v-card>
    <v-card-actions v-if="props.delete" class="d-flex justify-end">
      <v-btn
        size="small"
        icon
        @click="deleteExerciseInfo"
        :loading="isDeleteLoading"
        ><v-icon>mdi-delete</v-icon></v-btn
      >
    </v-card-actions>
    <v-card-title>{{ props.exerciseInfo.name }}</v-card-title>
    <v-expansion-panels>
      <v-expansion-panel title="Описание">
        <v-expansion-panel-text>
          {{ props.exerciseInfo.description }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { defineProps, PropType, ref } from "vue";
import ExerciseInfo from "@/types/ExerciseInfo";

const store = useStore();

const props = defineProps({
  exerciseInfo: { type: Object as PropType<ExerciseInfo>, required: true },
  delete: { type: Boolean, default: false },
});

const isDeleteLoading = ref(false);

const deleteExerciseInfo = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch("exerciseInfo/delete", props.exerciseInfo?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: `Тип занятия ${props.exerciseInfo?.name} успешно удалён`,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при удаление ${props.exerciseInfo?.name}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<style scoped></style>
