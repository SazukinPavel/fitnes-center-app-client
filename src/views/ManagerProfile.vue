<template>
  <v-card
    variant="text"
    :loading="isUserLoading || !localUser.auth?.login"
    class="d-flex jsutify-start"
  >
    <v-container v-if="localUser.auth?.login" class="profile">
      <profile-avatar :user="user" />
      <v-text-field
        class="readonly"
        variant="outlined"
        :label="t('login')"
        readonly
        v-model="localUser.auth.login"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        :label="t('fio')"
        append-inner-icon="mdi-pencil"
        v-model="localUser.auth.fio"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        :label="t('birthDate')"
        readonly
        :model-value="formatDate(localUser.auth.birthDate)"
      ></v-text-field>
      <v-text-field
        class="my-2"
        :label="t('telephoneNumber')"
        :rules="[requiredRule, telephoneRule]"
        v-model="localUser.auth.telephone"
      />
      <v-textarea
        variant="outlined"
        :label="t('О себе')"
        append-inner-icon="mdi-pencil"
        v-model="localUser.description"
      ></v-textarea>
      <div class="buttons d-flex justify-end">
        <v-btn
          size="small"
          class="mr-5"
          color="primary"
          @click="changePassDialog = true"
          >{{ t("changePass") }}</v-btn
        >
        <v-btn
          size="small"
          :loading="isUpdateLoading"
          class="mr-5"
          color="primary"
          @click="update"
          >{{ t("edit") }}</v-btn
        >
      </div>
    </v-container>
  </v-card>
  <change-password v-model="changePassDialog" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Manager from "@/types/entitys/Manager";
import api from "@/api";
import UpdateManagerDto from "@/types/dto/managers/UpdateManagerDto";
import ChangePassword from "@/components/changePassword.vue";
import useFormaters from "@/hooks/useFormaters";
import useValidators from "@/hooks/useValidators";
import ProfileAvatar from "@/components/profileAvatar.vue";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const { requiredRule, telephoneRule } = useValidators();
const { formatDate } = useFormaters();

const isUserLoading = ref(false);
const isUpdateLoading = ref(false);
const localUser = ref<Manager>({});
const changePassDialog = ref(false);

const user = computed<Manager>(() => store.getters["auth/user"]);

const update = async () => {
  isUpdateLoading.value = true;
  const dto: UpdateManagerDto = {
    fio: localUser.value.auth?.fio,
    description: localUser.value.description,
    id: localUser.value.id,
    authId: localUser.value.auth?.id.toString(),
    telephone: localUser.value.auth?.telephone.toString(),
  };

  try {
    await api.managers.update(dto);
    store.commit("snackbar/showSnackbarSuccess", {
      message: t("success.saveManager"),
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: t("errors.saveManager"),
    });
  } finally {
    isUpdateLoading.value = false;
  }
};

onMounted(async () => {
  localUser.value = user.value;
});
</script>
