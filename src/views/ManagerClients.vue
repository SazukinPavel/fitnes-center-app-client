<template>
  <div class="d-flex justify-end mt-3">
    <v-btn
      size="x-small"
      :loading="isClientAddLoading"
      class="mx-5"
      color="primary"
      icon
    >
      <v-icon>mdi-plus</v-icon>
      <v-dialog activator="parent" v-model="addClientDialog" width="auto">
        <v-card class="px-15 py-10">
          <v-card-title>Новый клиент</v-card-title>
          <v-form ref="clientForm">
            <v-text-field
              class="my-2"
              :rules="requiredRule"
              variant="outlined"
              label="Логин"
              color="primary"
              v-model="addClientDto.login"
            />
            <v-text-field
              class="my-2"
              :rules="requiredRule"
              variant="outlined"
              label="Фио"
              v-model="addClientDto.fio"
            />
            <v-text-field
              class="my-2"
              :rules="requiredRule"
              variant="outlined"
              label="Пароль"
              v-model="addClientDto.password"
            />
            <v-text-field
              class="my-2"
              variant="outlined"
              color="primary"
              type="number"
              label="Возвраст"
              v-model="addClientDto.age"
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
              :rules="requiredRule"
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
    </v-btn>
  </div>
  <v-card :loading="isClientsLoading" variant="plain">
    <client-card v-for="client in clients" :key="client.id" :client="client" />
  </v-card>

  <!--  <clients-table-->
  <!--    @refresh="refreshClients"-->
  <!--    v-model:selected="selectedClients"-->
  <!--    :loading="isClientsLoading"-->
  <!--    :items="clients"-->
  <!--  />-->
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
// import ClientsTable from "@/components/tables/ClientsTable.vue";
import ClientCard from "@/components/clientCard.vue";
// import SetDietDto from "@/types/dto/clients/SetDietDto";
import AddClientDto from "@/types/dto/clients/AddClientDto";

const store = useStore();
const requiredRule: any = [(val: string) => !!val || "Поле обязательно!"];

const clientForm = ref<any | null>(null);
const addClientDialog = ref(false);
// const clientId = ref<string | null>(null);
// const setDietDialog = ref(false);

const addClientDto = ref<AddClientDto>({
  password: "",
  age: 18,
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
      age: 18,
      fio: "",
      height: 180,
      login: "",
      weight: "",
    };
    addClientDialog.value = false;
  }
};

// const setDietClick = () => {
//   if (Object.keys(selectedClients.value).length) {
//     clientId.value = selectedClients.value[0];
//     setDietDialog.value = true;
//   }
// };

// const refreshClients = () => {
//   store.dispatch("clients/refresh");
// };

onMounted(() => {
  store.dispatch("clients/fetch");
  store.dispatch("diets/fetch");
});

const isClientAddLoading = computed(
  () => store.getters["clients/isAddLoading"]
);
const isClientsLoading = computed(() => store.getters["clients/isLoading"]);
const clients = computed(() => store.getters["clients/clients"]);
// const diets = computed(() => store.getters["diets/diets"]);
</script>
