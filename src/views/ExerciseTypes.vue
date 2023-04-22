<template>
  <v-card class="ma-0 pa-0" variant="text" :loading="isExerciseTypeLoading">
    <div class="d-flex justify-end align-center">
      <search class="ml-5" v-model="searchParam" />
      <add-btn :loading="isExerciseTypeAddLoading">
        <v-dialog
          v-model="addExerciseTypeDialog"
          activator="parent"
          width="auto"
        >
          <v-card class="px-15 py-10">
            <v-card-title>Новое занятие:</v-card-title>
            <v-form ref="exerciseTypeForm">
              <v-text-field
                class="my-2"
                :rules="[requiredRule]"
                variant="outlined"
                label="Имя"
                color="primary"
                v-model="addExerciseTypeDto.name"
              />
              <v-textarea
                class="my-2"
                variant="outlined"
                color="primary"
                :rules="[requiredRule]"
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
      </add-btn>
    </div>
    <div>
      <exercise-info-card
        v-for="exerciseInfo in filtredExercisesInfo"
        :exercise-info="exerciseInfo"
        :key="exerciseInfo?.id"
        delete
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ExerciseInfo from "@/types/ExerciseInfo";
import AddExerciseInfoDto from "@/types/dto/exerciseInfo/AddExerciseInfoDto";
import { useStore } from "vuex";
import useValidators from "@/hooks/useValidators";
import ExerciseInfoCard from "@/components/exerciseInfoCard.vue";
import Search from "@/components/search.vue";
import AddBtn from "@/components/ui/addBtn.vue";

const store = useStore();

const exerciseTypeForm = ref<any | null>(null);
const addExerciseTypeDialog = ref(false);
const addExerciseTypeDto = ref<AddExerciseInfoDto>({
  name: "",
  description: "",
});

const searchParam = ref("");

const { requiredRule } = useValidators();

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

onMounted(() => {
  store.dispatch("exerciseInfo/fetch");
});

const exercisesInfo = computed<ExerciseInfo[]>(
  () => store.getters["exerciseInfo/exercisesInfos"]
);

const filtredExercisesInfo = computed<ExerciseInfo[]>(() => {
  if (!searchParam.value) {
    return exercisesInfo.value;
  }
  return exercisesInfo.value.filter((e) =>
    e.name.toLowerCase().startsWith(searchParam.value.toLowerCase())
  );
});
const isExerciseTypeAddLoading = computed(
  () => store.getters["exerciseInfo/isAddLoading"]
);
const isExerciseTypeLoading = computed(
  () => store.getters["exerciseInfo/isLoading"]
);
</script>
