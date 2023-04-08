<template>
  <div class="d-flex jsutify-start my-7">
    <v-btn :loading="isExerciseTypeAddLoading" class="mx-5" color="primary"
      >Добавить
      <v-dialog v-model="addExerciseTypeDialog" activator="parent" width="auto">
        <v-card class="px-15 py-10">
          <v-card-title>Новое занятие:</v-card-title>
          <v-form ref="exerciseTypeForm">
            <v-text-field
              class="my-2"
              :rules="requiredRule"
              variant="outlined"
              label="Имя"
              color="primary"
              v-model="addExerciseTypeDto.name"
            />
            <v-textarea
              class="my-2"
              variant="outlined"
              color="primary"
              :rules="requiredRule"
              label="Описание"
              v-model="addExerciseTypeDto.description"
            />
          </v-form>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              variant="outlined"
              color="primary"
              @click="addExerciseTypeDialog = false"
              >Закрыть</v-btn
            >
            <v-btn
              variant="outlined"
              class="mx-5"
              color="primary"
              @click="addExerciseInfo"
              >Добавить</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
    <v-btn
      :loading="isExerciseTypeDeleteLoading"
      color="primary"
      @click="deleteExercisesInfo"
      >Удалить</v-btn
    >
  </div>
  <exercises-type-table
    @refresh="refreshExercisesType"
    v-model:selected="selectedExercisesType"
    :loading="isExerciseTypeLoading"
    :items="exercisesType"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ExerciseInfo from "@/types/ExerciseInfo";
import AddExerciseInfoDto from "@/types/dto/exerciseInfo/AddExerciseInfoDto";
import { useStore } from "vuex";
import ExercisesTypeTable from "@/components/tables/ExercisesTypeTable.vue";

const store = useStore();

const selectedExercisesType = ref<ExerciseInfo[]>([]);
const exerciseTypeForm = ref<any | null>(null);
const addExerciseTypeDialog = ref(false);
const addExerciseTypeDto = ref<AddExerciseInfoDto>({
  name: "",
  description: "",
});
const requiredRule: any = [(val: string) => !!val || "Поле обязательно!"];

const addExerciseInfo = async () => {
  if (!(await exerciseTypeForm.value?.validate())) {
    return;
  }

  try {
    await store.dispatch("exerciseInfo/add", addExerciseTypeDto.value);
  } finally {
    addExerciseTypeDto.value = {
      name: "",
      description: "",
    };
    addExerciseTypeDialog.value = false;
  }
};

const refreshExercisesType = () => {
  store.dispatch("exerciseInfo/fetch");
};

const deleteExercisesInfo = () => {
  store.dispatch("exerciseInfo/deletediets", selectedExercisesType.value);
};

onMounted(() => {
  store.dispatch("exerciseInfo/fetch");
});

const exercisesType = computed(
  () => store.getters["exerciseInfo/exercisesInfos"]
);

const isExerciseTypeDeleteLoading = computed(
  () => store.getters["exerciseInfo/isDeleteLoading"]
);
const isExerciseTypeAddLoading = computed(
  () => store.getters["exerciseInfo/isAddLoading"]
);
const isExerciseTypeLoading = computed(
  () => store.getters["exerciseInfo/isLoading"]
);
</script>
