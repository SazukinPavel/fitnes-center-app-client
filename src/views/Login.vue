<template>
  <v-form style="margin-top: 20vh" ref="loginForm">
    <v-card class="ma-auto pa-4" variant="text" max-width="600px">
      <v-card-title class="text-center text-h4 mb-5 ma-auto text-wrap"
        >Вход</v-card-title
      >
      <v-text-field
        class="my-5"
        color="primary"
        :rules="[requiredRule]"
        variant="outlined"
        label="Логин:"
        v-model.trim="loginDto.login"
      />
      <password-input
        class="my-5"
        label="Пароль:"
        color="primary"
        :rules="[requiredRule]"
        variant="outlined"
        v-model="loginDto.password"
      />
      <div class="d-flex justify-end">
        <v-btn
          variant="text"
          class="text-h6 mx-3"
          :to="{ name: 'ForgetPassword' }"
          >Забыли пароль?</v-btn
        >
        <v-btn class="mx-3" color="primary" @click="login">Войти</v-btn>
      </div>
    </v-card>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LoginDto from "@/types/dto/auth/LoginDto";
import { useStore } from "vuex";
import PasswordInput from "@/components/ui/passwordInput.vue";
import useValidators from "@/hooks/useValidators";

const loginForm = ref<any | null>(null);

const store = useStore();
const { requiredRule } = useValidators();

const loginDto = ref<LoginDto>({ login: "", password: "" });

const login = async () => {
  try {
    if (!(await loginForm.value?.validate()).valid) {
      return;
    }

    await store.dispatch("auth/login", loginDto.value);
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Такого пользователя нет",
    });
  }
};
</script>
