<template>
  <v-card class="px-5 py-5 ma-auto" max-width="800" variant="text">
    <v-card-title class="text-center">Новое занятие:</v-card-title>
    <v-form ref="exerciseForm">
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        label="Дата"
        type="datetime-local"
        v-model="addExerciseDto.date"
      />
      <v-autocomplete
        :rules="[requiredRule]"
        label="Тип тренировки"
        item-value="id"
        item-title="name"
        :items="exercisesInfo"
        v-model="addExerciseDto.exerciseId"
      />
      <v-autocomplete
        :rules="[requiredRule]"
        label="Клиент"
        item-value="id"
        item-title="auth.fio"
        :items="clients"
        v-model="addExerciseDto.clientId"
      />
    </v-form>

    <div class="d-flex justify-center">
      <v-btn @click="goBack" :disabled="isAddLoading">Назад</v-btn>
      <v-btn class="mx-5" @click="addExercise" :loading="isAddLoading"
        >Добавить</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import useValidators from "@/hooks/useValidators";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import AddExerciseDto from "@/types/dto/exercises/AddExerciseDto";
import ExerciseInfo from "@/types/entitys/ExerciseInfo";
import Client from "@/types/entitys/Client";
import useGoTo from "@/hooks/useGoTo";
import useGoBack from "@/hooks/goBack";

const { requiredRule } = useValidators();
const store = useStore();
const goTo = useGoTo();
const goBack = useGoBack();

const exerciseForm = ref<any | null>(null);
const isAddLoading = ref(false);
const addExerciseDto = ref<AddExerciseDto>(getDefaultDto());

const addExercise = async () => {
  if (!(await exerciseForm.value?.validate()).valid) {
    return;
  }

  isAddLoading.value = true;

  try {
    await store.dispatch("exercises/add", addExerciseDto.value);

    addExerciseDto.value = getDefaultDto();

    store.commit("snackbar/showSnackbarSuccess", {
      message: "Занятие создано успешно",
    });
    goTo({ name: "ManagerExercises" });
  } catch (e: any) {
    store.commit("snackbar/showSnackbarError", {
      message:
        e?.response?.data?.message || "Произошла ошибка при создание занятия",
    });
  } finally {
    isAddLoading.value = false;
  }
};

const exercisesInfo = computed<ExerciseInfo[]>(
  () => store.getters["exerciseInfo/exercisesInfos"]
);
const clients = computed<Client[]>(() => store.getters["clients/clients"]);

function getDefaultDto(): AddExerciseDto {
  return {
    clientId: "",
    description: "",
    exerciseId: "",
  };
}
</script>

<style scoped></style>
