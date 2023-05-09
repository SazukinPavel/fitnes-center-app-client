<template>
  <v-card variant="text" class="px-5 py-5 ma-auto" max-width="800">
    <v-card-title class="text-center text-wrap">Новая диета</v-card-title>
    <v-form ref="dietForm">
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        variant="outlined"
        label="Имя"
        color="primary"
        v-model="addDietDto.name"
      />
      <v-textarea
        class="my-2"
        variant="outlined"
        color="primary"
        :rules="[requiredRule]"
        label="Описание"
        v-model="addDietDto.description"
      />
    </v-form>

    <div class="d-flex justify-center">
      <v-btn :disabled="isAddLoading" @click="goBack">Назад</v-btn>
      <v-btn class="mx-5" :loading="isAddLoading" @click="addDiet"
        >Добавить</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AddDietDto from "@/types/dto/diets/AddDietDto";
import { useStore } from "vuex";
import useValidators from "@/hooks/useValidators";
import useGoTo from "@/hooks/useGoTo";
import useGoBack from "@/hooks/goBack";

const store = useStore();
const { requiredRule } = useValidators();
const goBack = useGoBack();
const goTo = useGoTo();

const dietForm = ref<any | null>(null);
const isAddLoading = ref(false);
const addDietDto = ref<AddDietDto>(getDefaultDto());

const addDiet = async () => {
  if (!(await dietForm.value?.validate()).valid) {
    return;
  }

  isAddLoading.value = true;

  try {
    await store.dispatch("diets/add", addDietDto.value);

    addDietDto.value = getDefaultDto();
    store.commit("snackbar/showSnackbarSuccess", {
      message: "Диета создана успешно",
    });
    goTo({ name: "Diets" });
  } catch (e: any) {
    store.commit("snackbar/showSnackbarError", {
      message:
        e?.response?.data?.message || "Произошла ошибка при создание диеты",
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
