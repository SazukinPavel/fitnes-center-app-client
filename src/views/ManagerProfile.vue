<template>
  <v-card
    variant="flat"
    :loading="isUserLoading || !localUser.auth?.login"
    class="d-flex jsutify-start my-7"
  >
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
        v-model="localUser.auth.fio"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="Дата рождения"
        readonly
        v-model="localUser.age"
      ></v-text-field>
      <v-textarea
        variant="outlined"
        label="О себе"
        v-model="localUser.description"
      ></v-textarea>
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
import Manager from "@/types/Manager";
import api from "@/api";
import UpdateManagerDto from "@/types/dto/managers/UpdateManagerDto";

const store = useStore();

const isUserLoading = ref(false);
const isUpdateLoading = ref(false);
const localUser = ref<Manager>({});

const user = computed<Manager>(() => store.getters["auth/user"]);

const update = async () => {
  isUpdateLoading.value = true;
  const dto: UpdateManagerDto = {
    fio: localUser.value.auth?.fio,
    description: localUser.value.description,
    id: localUser.value.id,
    authId: localUser.value.auth?.id.toString(),
  };

  try {
    await api.managers.update(dto);
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
  localUser.value = user.value;
});
</script>
