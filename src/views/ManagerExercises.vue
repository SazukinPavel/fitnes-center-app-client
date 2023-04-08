<template>
  <div class="d-flex jsutify-start my-7">
    <v-btn @click="download" class="mx-5" color="primary">Отчёты </v-btn>
    <v-btn :loading="isExerciseAddLoading" class="mx-5" color="primary"
      >Добавить
      <v-dialog v-model="addExerciseDialog" activator="parent" width="auto">
        <v-card class="px-15 py-10">
          <v-card-title>Новое занятие:</v-card-title>
          <v-form ref="exerciseForm">
            <v-text-field
              class="my-2"
              :rules="requiredRule"
              variant="outlined"
              label="Дата"
              type="datetime-local"
              color="primary"
              v-model="addExerciseDto.date"
            />
            <v-select
              variant="outlined"
              color="primary"
              :rules="requiredRule"
              label="Тип тренировки"
              item-value="id"
              item-title="name"
              :items="exercisesInfo"
              v-model="addExerciseDto.exerciseId"
            />
            <v-select
              variant="outlined"
              color="primary"
              :rules="requiredRule"
              label="Клиент"
              item-value="id"
              item-title="auth.fio"
              :items="clients"
              v-model="addExerciseDto.clientId"
            />
          </v-form>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              variant="outlined"
              color="primary"
              @click="addExerciseDialog = false"
              >Закрыть</v-btn
            >
            <v-btn
              variant="outlined"
              class="mx-5"
              color="primary"
              @click="addExercise"
              >Добавить</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
    <v-btn
      :loading="isExerciseDeleteLoading"
      color="primary"
      @click="deleteExercises"
      >Удалить</v-btn
    >
  </div>
  <exercises-table
    @refresh="refreshExercises"
    v-model:selected="selectedExercises"
    show-select
    :loading="isExerciseLoading"
    :items="exercises"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AddExerciseDto from "@/types/dto/exercises/AddExerciseDto";
import XlsxService from "@/services/XlsxService";
import { useStore } from "vuex";
import ExercisesTable from "@/components/tables/ExercisesTable.vue";

const store = useStore();
const requiredRule: any = [(val: string) => !!val || "Поле обязательно!"];

const selectedExercises = ref<string[]>([]);
const exerciseForm = ref<any | null>(null);

const addExerciseDialog = ref(false);

const addExerciseDto = ref<AddExerciseDto>({
  clientId: "",
  date: new Date(Date.now()),
  description: "",
  exerciseId: "",
});

onMounted(() => {
  store.dispatch("exercises/fetch");
  store.dispatch("clients/fetch");
  store.dispatch("exerciseInfo/fetch");
});

const addExercise = async () => {
  if (!(await exerciseForm.value?.validate()).valid) {
    return;
  }

  try {
    await store.dispatch("exercises/add", addExerciseDto.value);
  } finally {
    refreshExercises();
    addExerciseDto.value = {
      clientId: "",
      date: new Date(Date.now()),
      description: "",
      exerciseId: "",
    };
    addExerciseDialog.value = false;
  }
};

const refreshExercises = () => {
  store.dispatch("exercises/refresh");
};

const deleteExercises = () => {
  store.dispatch("exercises/deleteExercises", selectedExercises.value);
};

const exercises = computed(() => store.getters["exercises/exercises"]);
const clients = computed(() => store.getters["clients/clients"]);
const exercisesInfo = computed(
  () => store.getters["exerciseInfo/exercisesInfos"]
);

const isExerciseDeleteLoading = computed(
  () => store.getters["exercises/isDeleteLoading"]
);
const isExerciseAddLoading = computed(
  () => store.getters["clients/isAddLoading"]
);
const isExerciseLoading = computed(() => store.getters["clients/isLoading"]);

const download = () => {
  XlsxService.downloadXlsx(exercises.value);
};
</script>

<style scoped></style>
