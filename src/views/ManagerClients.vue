<template>
  <div class="d-flex justify-end align-center">
    <search class="ml-5" v-model="searchParam" />
    <add-btn :loading="isClientAddLoading">
      <v-dialog activator="parent" v-model="addClientDialog" width="auto">
        <v-card class="px-15 py-10">
          <v-card-title>Новый клиент</v-card-title>
          <v-form ref="clientForm">
            <v-text-field
              class="my-2"
              :rules="[requiredRule]"
              variant="outlined"
              label="Логин"
              color="primary"
              v-model="addClientDto.login"
            />
            <v-text-field
              class="my-2"
              :rules="[requiredRule]"
              variant="outlined"
              label="Фио"
              v-model="addClientDto.fio"
            />
            <v-text-field
              class="my-2"
              :rules="[requiredRule]"
              variant="outlined"
              label="Пароль"
              v-model="addClientDto.password"
            />
            <v-text-field
              class="my-2"
              variant="outlined"
              color="primary"
              type="date"
              label="Возвраст"
              v-model="addClientDto.birthDate"
            />
            <v-text-field
              class="my-2"
              variant="outlined"
              color="primary"
              type="number"
              label="Рост"
              v-model="addClientDto.height"
            />
            <v-text-field
              class="my-2"
              :rules="[requiredRule]"
              type="number"
              variant="outlined"
              color="primary"
              label="Вес"
              v-model="addClientDto.weight"
            />
          </v-form>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              variant="outlined"
              color="primary"
              @click="addClientDialog = false"
              >Закрыть</v-btn
            >
            <v-btn
              variant="outlined"
              class="mx-5"
              color="primary"
              @click="addClient"
              >Добавить</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </add-btn>
  </div>
  <v-card :loading="isClientsLoading" variant="plain">
    <client-card
      v-for="client in filtredClients"
      :key="client.id"
      :client="client"
    />
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ClientCard from "@/components/clientCard.vue";
import AddClientDto from "@/types/dto/clients/AddClientDto";
import useValidators from "@/hooks/useValidators";
import Search from "@/components/search.vue";
import Client from "@/types/Client";
import AddBtn from "@/components/ui/addBtn.vue";

const { requiredRule } = useValidators();

const store = useStore();

const clientForm = ref<any | null>(null);
const addClientDialog = ref(false);

const searchParam = ref("");

const addClientDto = ref<AddClientDto>({
  password: "",
  birthDate: new Date(),
  fio: "",
  height: 180,
  login: "",
  weight: "",
});

const addClient = async () => {
  if (!(await clientForm.value?.validate())) {
    return;
  }

  try {
    await store.dispatch("clients/add", addClientDto.value);
  } finally {
    addClientDto.value = {
      password: "",
      birthDate: new Date(),
      fio: "",
      height: 180,
      login: "",
      weight: "",
    };
    addClientDialog.value = false;
  }
};

onMounted(() => {
  store.dispatch("clients/fetch");
  store.dispatch("diets/fetch");
});

const isClientAddLoading = computed(
  () => store.getters["clients/isAddLoading"]
);
const isClientsLoading = computed(() => store.getters["clients/isLoading"]);
const clients = computed<Client[]>(() => store.getters["clients/clients"]);
const filtredClients = computed<Client[]>(() => {
  if (!searchParam.value) {
    return clients.value;
  }
  return clients.value.filter(
    (c) =>
      c.auth?.fio.toLowerCase().startsWith(searchParam.value.toLowerCase()) ||
      c.auth?.login.toLowerCase().startsWith(searchParam.value.toLowerCase())
  );
});
// const diets = computed(() => store.getters["diets/diets"]);
</script>
