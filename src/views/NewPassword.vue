<template>
  <v-form style="margin-top: 20vh" ref="newPasswordForm">
    <v-card
      :loading="isCheckLoading"
      class="ma-auto pa-4"
      variant="text"
      max-width="600px"
    >
      <v-card-title class="text-center text-h4 mb-5 ma-auto text-wrap">{{
        t("recreatePass")
      }}</v-card-title>
      <v-card-title class="text-wrap">{{ t("newPass") }}</v-card-title>
      <password-input
        v-model="newPasswordDto.password"
        :rules="newPasswordRules"
      />
      <v-card-title class="text-wrap">{{ t("repeatPass") }}</v-card-title>
      <password-input
        v-model="newPasswordRepeat"
        :rules="newPasswordRepeatRules"
      />
      <div class="d-flex justify-end">
        <v-btn
          :loading="isLoading"
          class="mx-3"
          color="primary"
          @click="changePass"
          >{{ t("restore") }}</v-btn
        >
      </div>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import PasswordInput from "@/components/ui/passwordInput.vue";
import useValidators from "@/hooks/useValidators";
import { useRoute } from "vue-router";
import useGoTo from "@/hooks/useGoTo";
import NewPasswordDto from "@/types/dto/auth/NewPasswordDto";
import api from "@/api";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const { requiredRule, passwordLengthRule } = useValidators();
const route = useRoute();
const goTo = useGoTo();
const store = useStore();
const { t } = useI18n();

const newPasswordRules = ref([requiredRule.value, passwordLengthRule.value]);
const newPasswordRepeatRules = computed(() => [
  (val: string) => val === newPasswordDto.value.password || t("passwordRule"),
]);
const newPasswordDto = ref<NewPasswordDto>({ token: "", password: "" });
const newPasswordRepeat = ref("");
const isLoading = ref(false);
const isCheckLoading = ref(false);
const newPasswordForm = ref<any | null>(null);

const changePass = async () => {
  if (!(await newPasswordForm.value.validate()).valid) {
    return;
  }

  isLoading.value = true;
  try {
    await api.auth.newPassword(newPasswordDto.value);
    store.commit("snackbar/showSnackbarSuccess", {
      message: t("success.newPassword"),
    });

    setTimeout(() => {
      redirectToLogin();
    }, 6000);
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: t("errors.newPassword"),
    });
  } finally {
    isLoading.value = false;
  }
};

const redirectToLogin = () => {
  goTo({ name: "Login" });
};

onMounted(async () => {
  const token = route.query.token?.toString();
  isCheckLoading.value = true;
  try {
    if (!token || token.length < 20) {
      return redirectToLogin();
    }
    newPasswordDto.value.token = token;
    await api.auth.checkToken(token);
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: t("errors.notValidToken"),
    });
    redirectToLogin();
  } finally {
    isCheckLoading.value = false;
  }
});
</script>

<style scoped></style>
