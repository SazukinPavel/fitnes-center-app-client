<template>
  <v-card max-width="800" variant="text" class="px-5 py-5 ma-auto">
    <v-card-title class="text-center text-wrap">{{
      t("newClient")
    }}</v-card-title>
    <v-form ref="clientForm">
      <v-text-field
        class="my-2"
        :rules="[requiredRule, emailRule]"
        :label="t('login')"
        v-model.trim="addClientDto.login"
      />
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        :label="t('fio')"
        v-model="addClientDto.fio"
      />
      <v-text-field
        class="my-2"
        :rules="[requiredRule]"
        :label="t('password')"
        v-model="addClientDto.password"
      />
      <date-picker
        type="BirthDate"
        placeholder="Дата рождения"
        :rules="[requiredRule]"
        :label="t('birthDate')"
        v-model:value="addClientDto.birthDate"
      />
      <v-text-field
        class="my-2"
        :label="t('telephoneNumber')"
        :rules="[telephoneRule]"
        v-model="addClientDto.telephone"
      />
      <height-input class="my-2" v-model.number="addClientDto.height" />
      <weight-input class="my-2" v-model.number="addClientDto.weight" />
    </v-form>

    <div class="d-flex justify-end">
      <v-btn :disabled="isClientAddLoading" @click="goBack">{{
        t("back")
      }}</v-btn>
      <v-btn :loading="isClientAddLoading" class="mx-5" @click="addClient">{{
        t("add")
      }}</v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import DatePicker from "@/components/ui/datePicker.vue";
import useValidators from "@/hooks/useValidators";
import { ref } from "vue";
import { useStore } from "vuex";
import AddClientDto from "@/types/dto/clients/AddClientDto";
import useGoTo from "@/hooks/useGoTo";
import useGoBack from "@/hooks/goBack";
import HeightInput from "@/components/ui/HeightInput.vue";
import WeightInput from "@/components/ui/WeightInput.vue";
import { useI18n } from "vue-i18n";

const { requiredRule, telephoneRule, emailRule } = useValidators();
const store = useStore();
const goTo = useGoTo();
const { t } = useI18n();
const goBack = useGoBack();

const clientForm = ref<any | null>(null);
const isClientAddLoading = ref(false);

const addClientDto = ref<AddClientDto>(getDefaultDto());

const addClient = async () => {
  if (!(await clientForm.value?.validate()).valid) {
    return;
  }
  isClientAddLoading.value = true;

  try {
    await store.dispatch("clients/add", {
      ...addClientDto.value,
      login: addClientDto.value.login.toLowerCase(),
    });
    addClientDto.value = getDefaultDto();
    store.commit("snackbar/showSnackbarSuccess", {
      message: t("success.addClient"),
    });
    goTo({ name: "ManagerClients" });
  } catch (e: any) {
    store.commit("snackbar/showSnackbarError", {
      message: e?.response?.data?.message || t("errors.addClient"),
    });
  } finally {
    isClientAddLoading.value = false;
  }
};

function getDefaultDto(): AddClientDto {
  return {
    password: "",
    fio: "",
    login: "",
  };
}
</script>

<style scoped></style>
