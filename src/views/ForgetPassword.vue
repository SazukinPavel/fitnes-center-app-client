<template>
  <v-form style="margin-top: 20vh" ref="forgetPasswordForm">
    <v-card class="ma-auto pa-4" variant="text" max-width="600px">
      <v-card-title class="text-center text-wrap text-h6 mb-5 ma-auto"
        >Введите ваш логин, что бы востановить пароль</v-card-title
      >
      <v-text-field
        class="my-5"
        color="primary"
        :rules="[requiredRule]"
        variant="outlined"
        label="Логин:"
        v-model="forgetPasswordDto.login"
      />
      <div class="d-flex justify-end">
        <v-btn class="mx-3" @click="goBack">Назад</v-btn>
        <v-btn
          :loading="isLoading"
          class="mx-3"
          color="primary"
          @click="recreatePassword"
          >Востановить</v-btn
        >
      </div>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ForgetPasswordDto from "@/types/dto/auth/ForgetPasswordDto";
import useValidators from "@/hooks/useValidators";
import useGoBack from "@/hooks/goBack";
import { useStore } from "vuex";
import api from "@/api";

const { requiredRule } = useValidators();
const goBack = useGoBack();
const store = useStore();

const forgetPasswordDto = ref<ForgetPasswordDto>({ login: "" });
const forgetPasswordForm = ref<any | null>(null);
const isLoading = ref(false);
const recreatePassword = async () => {
  if (!(await forgetPasswordForm.value.validate()).valid) {
    return;
  }

  isLoading.value = true;
  try {
    await api.auth.forgetPassword(forgetPasswordDto.value);
    store.commit("snackbar/showSnackbarSuccess", {
      message:
        "Вам на почту пришло письмо, с ссылкой на страницу сброса пароля. ",
    });
  } catch (e: any) {
    store.commit("snackbar/showSnackbarError", {
      message:
        e?.response?.data?.message ||
        "Произошла ошибка при востановление пароля",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
