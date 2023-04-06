<template>
  <v-card
    variant="flat"
    :loading="isUserLoading"
    class="d-flex jsutify-start my-7"
  >
    <v-container class="profile">
      <v-text-field
        class="readonly"
        variant="outlined"
        label="Логин"
        readonly
        v-model="localUser.login"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="ФИО"
        v-model="localUser.fio"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="Дата рождения"
        readonly
        v-model="localUser.age"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="Вес"
        type="number"
        v-model.number="localUser.weight"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="Рост"
        type="number"
        v-model.number="localUser.height"
      ></v-text-field>
      <div class="buttons d-flex justify-end">
        <v-btn class="mr-5" color="primary">Сменить пароль</v-btn>
        <v-btn class="mr-5" color="primary">Востановить пароль</v-btn>
        <v-btn
          :loading="isUpdateLoading"
          class="mr-5"
          color="primary"
          @click="update"
          >Изменить</v-btn
        >
      </div>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import api from "@/api";
import UpdateClientDto from "@/types/dto/clients/UpdateClientDto";
import Client from "@/types/Client";

const store = useStore();

const isUserLoading = ref(false);
const isUpdateLoading = ref(false);
const localUser = ref<Client>({});

const user = computed<Client>(() => store.getters["auth/fullUser"]);

const update = async () => {
  isUpdateLoading.value = true;
  const dto: UpdateClientDto = {
    fio: localUser.value.fio,
    id: localUser.value.id,
    height: localUser.value.height,
    weight: localUser.value.weight,
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

onMounted(async () => {
  isUpdateLoading.value = true;
  if (user.value == null) {
    await store.dispatch("auth/fetchUser");
  }
  isUpdateLoading.value = false;
  localUser.value = user.value;
});
</script>
