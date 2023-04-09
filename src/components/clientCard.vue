<template>
  <v-card class="ma-4">
    <v-card-actions class="d-flex justify-end">
      <v-btn
        color="primary"
        variant="outlined"
        size="x-small"
        append-icon="mdi-basket"
        @click="deleteClient"
        :loading="isDeleteLoading"
        icon
        ><v-icon size="small">mdi-delete</v-icon></v-btn
      >
    </v-card-actions>
    <v-card-title>Логин: {{ props.client.auth.fio }}</v-card-title>
    <v-card-title>ФИО: {{ props.client.auth.login }}</v-card-title>
    <v-card-title>
      <div class="d-flex justify-space-between align-center">
        <span> Диета: {{ props.client.diet?.name || "-" }} </span>
        <v-btn variant="outlined" size="x-small" icon>
          <v-icon size="small">mdi-pencil</v-icon>
          <v-dialog activator="parent" width="auto" v-model="setDietDialog">
            <v-card class="pa-15">
              <v-card-title>Установить диету</v-card-title>
              <v-form ref="dietForm">
                <v-select
                  variant="outlined"
                  color="primary"
                  :rules="[requiredRule]"
                  label="Диета"
                  item-value="id"
                  item-title="name"
                  :items="diets"
                  v-model="setDietDto.dietId"
                />
              </v-form>
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  variant="outlined"
                  color="primary"
                  @click="setDietDialog = false"
                  >Закрыть</v-btn
                >
                <v-btn
                  variant="outlined"
                  class="mx-5"
                  color="primary"
                  @click="setDiet"
                  >Добавить</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
      </div>
    </v-card-title>
    <v-expansion-panels>
      <v-expansion-panel title="Больше информации">
        <v-expansion-panel-text>
          <v-card variant="plain">
            <v-card-title>Вес: {{ props.client?.weight }}</v-card-title>
            <v-card-title>Рост: {{ props.client?.height }}</v-card-title>
            <v-card-title>Дата рождения: {{ props.client?.age }}</v-card-title>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
<script setup lang="ts">
import Client from "@/types/Client";
import { PropType, defineProps, ref, computed } from "vue";
import { useStore } from "vuex";
import SetDietDto from "@/types/dto/clients/SetDietDto";
import api from "@/api";
import useValidators from "@/hooks/useValidators";

const store = useStore();

const props = defineProps({
  client: { type: Object as PropType<Client>, required: true },
});

const { requiredRule } = useValidators();

const isDeleteLoading = ref(false);
const setDietDialog = ref(false);
const dietForm = ref<any | null>(null);

const setDietDto = ref<SetDietDto>({
  dietId: "",
  clientId: "",
});

const deleteClient = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch("clients/deleteClient", props.client?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: `Клиент ${props.client?.auth?.fio} успешно удалён`,
    });
  } catch {
    store.commit("snackbar/showSnackbarSuccess", {
      message: `Произошла ошибка при удалении клиента ${props.client?.auth?.fio}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};

const setDiet = async () => {
  if (!(await dietForm.value?.validate()).valid) {
    return;
  }

  try {
    await api.clients.setDiet({
      ...setDietDto.value,
      clientId: props.client?.id,
    });
  } finally {
    setDietDto.value = {
      dietId: "",
      clientId: "",
    };
    setDietDialog.value = false;
  }
};

const diets = computed(() => store.getters["diets/diets"]);
</script>

<style scoped></style>
