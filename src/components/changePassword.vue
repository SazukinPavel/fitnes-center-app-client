<template>
  <v-dialog
    v-model="modelValue"
    @change="emit('update:modelValue', $event)"
    persistent
    max-width="800"
    width="90%"
  >
    <v-form ref="changePassForm">
      <v-card class="pa-5">
        <v-container>
          <v-row justify="center">
            <v-card-title class="text-center">{{
              t("changePass")
            }}</v-card-title>
          </v-row>
          <v-card-title class="text-wrap">{{ t("oldPass") }}</v-card-title>
          <password-input v-model="oldPassword" :rules="oldPasswordRules" />
          <v-card-title class="text-wrap">{{ t("newPass") }}</v-card-title>
          <password-input v-model="newPassword" :rules="newPasswordRules" />
          <v-card-title class="text-wrap">{{
            t("repeatNewPass")
          }}</v-card-title>
          <password-input
            v-model="newPasswordRepeat"
            :rules="newPasswordRepeatRules"
          />
          <v-row justify="end" class="mt-4">
            <v-btn
              @click="emit('update:modelValue', false)"
              class="mx-3"
              :disabled="isPasswordChangeLoading"
              >{{ t("close") }}</v-btn
            >
            <v-btn
              :loading="isPasswordChangeLoading"
              @click="change"
              class="mx-3"
              >{{ t("edit") }}</v-btn
            >
          </v-row>
        </v-container>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import { toRefs, defineProps, defineEmits, ref, computed } from "vue";
import PasswordInput from "@/components/ui/passwordInput.vue";
import useValidators from "@/hooks/useValidators";
import { useStore } from "vuex";
import api from "@/api";
import { useI18n } from "vue-i18n";

const { requiredRule, passwordLengthRule } = useValidators();
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const store = useStore();
const { t } = useI18n();

const oldPassword = ref("");
const newPasswordRepeat = ref("");
const newPassword = ref("");

const isPasswordChangeLoading = ref(false);

const changePassForm = ref<any | null>(null);

const { modelValue } = toRefs(props);

const newPasswordRules = ref([requiredRule.value, passwordLengthRule.value]);
const oldPasswordRules = ref([requiredRule.value]);
const newPasswordRepeatRules = computed(() => [
  (val: string) => val === newPassword.value || t("passwordRule"),
]);

const change = async () => {
  if (!(await changePassForm.value?.validate()).valid) {
    return;
  }

  isPasswordChangeLoading.value = true;
  try {
    await api.auth.changePassword({
      newPassword: newPassword.value,
      oldPassword: oldPassword.value,
    });
    store.commit("snackbar/showSnackbarSuccess", {
      message: t("success.changePass"),
    });
    emit("update:modelValue", false);
  } catch (e: any) {
    store.commit("snackbar/showSnackbarError", {
      message: e.response.data.message || t("errors.changePass"),
    });
  } finally {
    isPasswordChangeLoading.value = false;
  }
};
</script>

<style scoped></style>
