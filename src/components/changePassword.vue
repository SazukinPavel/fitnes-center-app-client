<template>
  <v-dialog
    v-model="modelValue"
    @change="emit('update:modelValue', $event)"
    persistent
    width="60%"
  >
    <v-form ref="changePassForm">
      <v-card class="pa-5">
        <v-container>
          <v-row justify="center">
            <v-card-title class="text-center">Смена пароля</v-card-title>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-card-title>Старый пароль</v-card-title>
            </v-col>
            <v-col cols="8">
              <password-input v-model="oldPassword" :rules="oldPasswordRules" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-card-title>Новый пароль</v-card-title>
            </v-col>
            <v-col cols="8">
              <password-input v-model="newPassword" :rules="newPasswordRules" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-card-title>Повторите новый пароль</v-card-title>
            </v-col>
            <v-col cols="8">
              <password-input
                v-model="newPasswordRepeat"
                :rules="newPasswordRepeatRules"
              />
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-btn
              @click="emit('update:modelValue', false)"
              class="mx-3"
              :disabled="isPasswordChangeLoading"
              >Закрыть</v-btn
            >
            <v-btn
              :loading="isPasswordChangeLoading"
              @click="change"
              class="mx-3"
              >Изменить</v-btn
            >
          </v-row>
        </v-container>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import { toRefs, defineProps, defineEmits, ref } from "vue";
import PasswordInput from "@/components/ui/passwordInput.vue";
import useValidators from "@/hooks/useValidators";
import { useStore } from "vuex";
import api from "@/api";

const { requiredRule, passwordLengthRule } = useValidators();
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const store = useStore();

const oldPassword = ref("");
const newPasswordRepeat = ref("");
const newPassword = ref("");

const isPasswordChangeLoading = ref(false);

const changePassForm = ref<any | null>(null);

const { modelValue } = toRefs(props);

const newPasswordRules = ref([requiredRule.value, passwordLengthRule.value]);
const oldPasswordRules = ref([requiredRule.value]);
const newPasswordRepeatRules = ref([
  (val: string) => val === newPassword.value || "Пароли должны совпадать.",
]);

const change = async () => {
  if (!(await changePassForm.value?.validate())) {
    return;
  }

  isPasswordChangeLoading.value = true;
  try {
    await api.auth.changePassword({
      newPassword: newPassword.value,
      oldPassword: oldPassword.value,
    });
    store.commit("snackbar/showSnackbarSuccess", {
      message: "Пароль успешно изменён.",
    });
  } catch (e) {
    console.log(e);
    store.commit("snackbar/showSnackbarError", {
      message: e.response.data.message,
    });
  } finally {
    isPasswordChangeLoading.value = false;
  }
};
</script>

<style scoped></style>
