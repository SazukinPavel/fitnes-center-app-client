<template>
  <v-card variant="flat" class="d-flex jsutify-start">
    <v-container v-if="localUser.auth?.login" class="profile">
      <v-text-field
        class="readonly"
        variant="outlined"
        label="Логин"
        readonly
        v-model="localUser.auth.login"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="ФИО"
        append-inner-icon="mdi-pencil"
        v-model="localUser.auth.fio"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="Дата рождения"
        readonly
        :model-value="formatDate(localUser.auth.birthDate)"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="Вес"
        append-inner-icon="mdi-pencil"
        type="number"
        v-model.number="localUser.weight"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="Рост"
        append-inner-icon="mdi-pencil"
        type="number"
        v-model.number="localUser.height"
      ></v-text-field>
      <div class="buttons d-flex justify-end">
        <v-btn
          @click="isChangePasswordDialog = true"
          class="mr-5"
          color="primary"
          size="small"
          >Сменить пароль</v-btn
        >
        <v-btn
          :loading="isUpdateLoading"
          color="primary"
          @click="update"
          size="small"
          >Изменить</v-btn
        >
      </div>
    </v-container>
  </v-card>
  <change-password v-model="isChangePasswordDialog" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import api from "@/api";
import UpdateClientDto from "@/types/dto/clients/UpdateClientDto";
import Client from "@/types/Client";
import ChangePassword from "@/components/changePassword.vue";
import useFormaters from "@/hooks/useFormaters";

const store = useStore();
const { formatDate } = useFormaters();

const isUpdateLoading = ref(false);
const localUser = ref<Client>({});
const isChangePasswordDialog = ref(false);

const user = computed<Client>(() => store.getters["auth/user"]);

const update = async () => {
  isUpdateLoading.value = true;
  const dto: UpdateClientDto = {
    fio: localUser.value.auth?.fio,
    id: localUser.value.id,
    height: +(localUser.value.height || 0),
    weight: +(localUser.value.weight || 0),
    authId: localUser.value.auth?.id.toString(),
  };

  try {
    await api.clients.update(dto);
    store.commit("snackbar/showSnackbarSuccess", {
      message: "Пользователь успешно изменён",
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при изменение пользователя",
    });
  } finally {
    isUpdateLoading.value = false;
  }
};

onMounted(() => {
  localUser.value = user.value;
});
</script>
