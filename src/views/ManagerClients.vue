<template>
  <div class="d-flex jsutify-start my-7">
    <v-btn class="mx-5" color="primary">
      Добавить
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
    <v-btn
      :loading="isClientsDeleteLoading"
      color="primary"
      @click="deleteClients"
      >Удалить</v-btn
    >
    <v-btn
      @click="setDietClick"
      :loading="isClientAddLoading"
      class="mx-5"
      color="primary"
      >Сменить диету</v-btn
    >
  </div>
  <clients-table
    @refresh="refreshClients"
    v-model:selected="selectedClients"
    :loading="isClientsLoading"
    :items="clients"
  />
  <v-btn variant="flat">
    <v-dialog activator="parent" width="auto" v-model="setDietDialog">
      <v-card class="pa-15">
        <v-card-title>Установить диету</v-card-title>
        <v-form ref="dietForm">
          <v-select
            variant="outlined"
            color="primary"
            :rules="requiredRule"
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
            @click="setDiet(value)"
            >Добавить</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AddClientDto from "@/types/dto/clients/AddClientDto";
import { useStore } from "vuex";
import api from "@/api";
import SetDietDto from "@/types/dto/clients/SetDietDto";
import ClientsTable from "@/components/tables/ClientsTable.vue";

const store = useStore();
const requiredRule: any = [(val: string) => !!val || "Поле обязательно!"];

const selectedClients = ref<string[]>([]);
const clientForm = ref<any | null>(null);
const addClientDialog = ref(false);
const clientId = ref<string | null>(null);
const setDietDialog = ref(false);
const dietForm = ref<any | null>(null);

const addClientDto = ref<AddClientDto>({
  password: "",
  age: 18,
  fio: "",
  height: 180,
  login: "",
  weight: "",
});

const setDietDto = ref<SetDietDto>({
  dietId: "",
  clientId: "",
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

const setDietClick = () => {
  if (Object.keys(selectedClients.value).length) {
    clientId.value = selectedClients.value[0];
    setDietDialog.value = true;
  }
};

const setDiet = async () => {
  if (!(await dietForm.value?.validate()).valid) {
    return;
  }

  try {
    await api.clients.setDiet({
      ...setDietDto.value,
      clientId: clientId.value || "",
    });
    clientId.value = null;
    await refreshClients();
  } finally {
    setDietDto.value = {
      dietId: "",
      clientId: "",
    };
    setDietDialog.value = false;
  }
};

const refreshClients = () => {
  store.dispatch("clients/refresh");
};

const deleteClients = () => {
  store.dispatch("clients/deleteClients", selectedClients.value);
};

onMounted(() => {
  store.dispatch("clients/fetch");
  store.dispatch("diets/fetch");
});

const isClientsDeleteLoading = computed(
  () => store.getters["clients/isDeleteLoading"]
);
const isClientAddLoading = computed(
  () => store.getters["clients/isAddLoading"]
);
const isClientsLoading = computed(() => store.getters["clients/isLoading"]);
const clients = computed(() => store.getters["clients/clients"]);
const diets = computed(() => store.getters["diets/diets"]);
</script>
