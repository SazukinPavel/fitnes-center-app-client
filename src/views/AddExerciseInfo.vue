<template>
  <v-card variant="text" class="px-5 py-5 ma-auto" max-width="800">
    <v-card-title class="text-wrap">Новый тип занятия</v-card-title>
    <v-form ref="exerciseTypeForm">
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        label="Имя"
        v-model="addExerciseTypeDto.name"
      />
      <duration-input v-model="addExerciseTypeDto.duration" />
      <v-textarea
        class="my-2"
        :rules="[requiredRule]"
        label="Описание"
        v-model="addExerciseTypeDto.description"
      />
    </v-form>

    <div class="d-flex justify-center">
      <v-btn @click="goBack" :disabled="isAddLoading">Назад</v-btn>
      <v-btn class="mx-5" @click="addExerciseInfo" :loading="isAddLoading"
        >Добавить</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AddExerciseInfoDto from "@/types/dto/exerciseInfo/AddExerciseInfoDto";
import useValidators from "@/hooks/useValidators";
import { useStore } from "vuex";
import useGoTo from "@/hooks/useGoTo";
import useGoBack from "@/hooks/goBack";
import DurationInput from "@/components/ui/durationInput.vue";

const { requiredRule } = useValidators();
const goTo = useGoTo();
const goBack = useGoBack();
const store = useStore();

const exerciseTypeForm = ref<any | null>(null);
const isAddLoading = ref(false);
const addExerciseTypeDto = ref<AddExerciseInfoDto>(getDefaultDto());

const addExerciseInfo = async () => {
  if (!(await exerciseTypeForm.value?.validate()).valid) {
    return;
  }
  isAddLoading.value = true;

  try {
    await store.dispatch("exerciseInfo/add", addExerciseTypeDto.value);
    addExerciseTypeDto.value = getDefaultDto();

    store.commit("snackbar/showSnackbarSuccess", {
      message: "Тип занятия успешно добавлен",
    });
    goTo({ name: "ExerciseTypes" });
  } catch (e: any) {
    store.commit("snackbar/showSnackbarError", {
      message:
        e?.response?.data?.message ||
        "Произошла ошибка при создание типа занятия",
    });
  } finally {
    isAddLoading.value = false;
  }
};

function getDefaultDto() {
  return {
    name: "",
    description: "",
  };
}
</script>

<style scoped></style>
