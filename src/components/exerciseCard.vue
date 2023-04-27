<template>
  <v-card :loading="isPayedLoading" class="ma-4">
    <v-card-actions class="d-flex justify-end">
      <v-btn
        color="primary"
        variant="outlined"
        size="x-small"
        append-icon="mdi-basket"
        @click="deleteExercise"
        :loading="isDeleteLoading"
        icon
        ><v-icon size="small">mdi-delete</v-icon></v-btn
      >
    </v-card-actions>
    <v-card-title class="text-wrap">{{
      props.exercise.exerciseInfo.name
    }}</v-card-title>
    <v-card-title class="text-wrap"
      >Дата: {{ formatDateTime(props.exercise.date) }}</v-card-title
    >
    <v-card-title class="text-wrap"
      >Клиент: {{ props.client?.auth?.fio }}</v-card-title
    >
    <v-card-title class="text-wrap"
      >Длительность: {{ props.exercise.duration }} минут</v-card-title
    >
    <v-expansion-panels v-if="isCanceled">
      <v-expansion-panel
        :title="`Отменено пользователем ${props.exercise?.cancellation.by}, причина:`"
      >
        <v-expansion-panel-text>
          {{ props.exercise.cancellation.reason }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-card-actions v-else>
      <v-switch
        :label="props.exercise?.isPayed ? 'Оплачено' : 'Не оплачено'"
        :model-value="props.exercise?.isPayed"
        @update:modelValue="changeIsPayed"
      />
      <v-btn @click="cancelDialog = true" icon
        ><v-icon>mdi-cancel</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
  <v-divider />
  <add-cancellation :exercise-id="props.exercise?.id" v-model="cancelDialog" />
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, ref } from "vue";
import { Exercise } from "@/types/entitys/Exercise";
import { useStore } from "vuex";
import Client from "@/types/entitys/Client";
import useFormmaters from "@/hooks/useFormaters";
import AddCancellation from "@/components/addCancellation.vue";

const props = defineProps({
  exercise: { type: Object as PropType<Exercise>, required: true },
  client: { type: Object as PropType<Client>, required: true },
});

const store = useStore();
const { formatDateTime } = useFormmaters();

const isDeleteLoading = ref(false);
const isPayedLoading = ref(false);
const cancelDialog = ref(false);

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

const changeIsPayed = async (val: boolean) => {
  isPayedLoading.value = true;
  try {
    await store.dispatch("exercises/changeIsPayed", {
      id: props.exercise.id.toString(),
      isPayed: !!val,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при обновлениие занятия`,
    });
  } finally {
    isPayedLoading.value = false;
  }
};

const isCanceled = computed(() => props.exercise?.cancellation);
</script>

<style scoped></style>
