<template>
  <v-card variant="text" class="px-5 py-5 ma-auto" max-width="800">
    <v-card-title class="text-center text-wrap">Новый менеджер</v-card-title>
    <v-form ref="managerForm">
      <v-text-field
        class="my-2"
        :rules="[requiredRule, emailRule]"
        :label="t('login')"
        v-model.trim="addManagerDto.login"
      />
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        :label="t('fio')"
        v-model="addManagerDto.fio"
      />
      <date-picker
        class="my-2"
        type="BirthDate"
        :label="t('birthDate')"
        v-model="addManagerDto.birthDate"
        :rules="[requiredRule]"
      />
      <password-input
        class="my-2"
        :rules="[requiredRule, passwordLengthRule]"
        :label="t('password')"
        v-model="addManagerDto.password"
      />
      <v-text-field
        class="my-2"
        :label="t('telephoneNumber')"
        :rules="[requiredRule, telephoneRule]"
        v-model="addManagerDto.telephone"
      />
      <v-textarea
        class="my-2"
        :label="t('description')"
        v-model="addManagerDto.description"
      />
    </v-form>

    <div class="d-flex justify-center">
      <v-btn @click="goBack" :disabled="isAddLoading">{{ t("back") }}</v-btn>
      <v-btn :loading="isAddLoading" class="mx-5" @click="addManager">{{
        t("add")
      }}</v-btn>
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
import { useI18n } from "vue-i18n";
import PasswordInput from "@/components/ui/passwordInput.vue";

const { requiredRule, telephoneRule, emailRule, passwordLengthRule } =
  useValidators();
const store = useStore();
const goBack = useGoBack();
const { t } = useI18n();
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
      message: t("success.addManager"),
    });
    goTo({ name: "Managers" });
  } catch (e: any) {
    store.commit("snackbar/showSnackbarError", {
      message: e?.response?.data?.message || t("errors.addManager"),
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
