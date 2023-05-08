<template>
  <v-card variant="text" class="px-5 py-5 ma-auto" max-width="800">
    <v-card-title class="text-center">Новый менеджер</v-card-title>
    <v-form ref="managerForm">
      <v-text-field
        class="my-2"
        :rules="[requiredRule, emailRule]"
        label="Логин"
        v-model.trim="addManagerDto.login"
      />
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        label="Фио"
        v-model="addManagerDto.fio"
      />
      <date-picker
        class="my-2"
        type="BirthDate"
        placeholder="Дата рождения"
        v-model="addManagerDto.birthDate"
        :rules="[requiredRule]"
      />
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        label="Пароль"
        v-model="addManagerDto.password"
      />
      <v-text-field
        class="my-2"
        label="Номер телефона"
        :rules="[requiredRule, telephoneRule]"
        v-model="addManagerDto.telephone"
      />
      <v-textarea
        class="my-2"
        label="Описание"
        v-model="addManagerDto.description"
      />
    </v-form>

    <div class="d-flex justify-center">
      <v-btn @click="goBack" :disabled="isAddLoading">Назад</v-btn>
      <v-btn :loading="isAddLoading" class="mx-5" @click="addManager"
        >Добавить</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import useValidators from "@/hooks/useValidators";
import { ref } from "vue";
import AddManagerDto from "@/types/dto/managers/AddManagerDto";
import { useStore } from "vuex";
import DatePicker from "@/components/ui/datePicker.vue";
import useGoBack from "@/hooks/goBack";
import useGoTo from "@/hooks/useGoTo";

const { requiredRule, telephoneRule, emailRule } = useValidators();
const store = useStore();
const goBack = useGoBack();
const goTo = useGoTo();

const managerForm = ref<any | null>(null);
const addManagerDto = ref<AddManagerDto>(getDefaultDto());
const isAddLoading = ref(false);
const addManager = async () => {
  if (!(await managerForm.value?.validate()).valid) {
    return;
  }

  isAddLoading.value = true;

  try {
    await store.dispatch("managers/add", {
      ...addManagerDto.value,
      login: addManagerDto.value.login.toLowerCase(),
    });
    addManagerDto.value = getDefaultDto();
    store.commit("snackbar/showSnackbarSuccess", {
      message: "Тренер успешно добавлен",
    });
    goTo({ name: "Managers" });
  } catch (e: any) {
    store.commit("snackbar/showSnackbarError", {
      message:
        e?.response?.data?.message || "Произошла ошибка при создание тренера",
    });
  } finally {
    isAddLoading.value = false;
  }
};

function getDefaultDto(): AddManagerDto {
  return {
    fio: "",
    description: "",
    login: "",
    password: "",
  };
}
</script>

<style scoped></style>
