<template>
  <div class="d-flex justify-end mt-3">
    <v-btn
      size="small"
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
    </v-btn>
  </div>
  <v-card :loading="isClientsLoading" variant="plain">
    <client-card v-for="client in clients" :key="client.id" :client="client" />
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ClientCard from "@/components/clientCard.vue";
import AddClientDto from "@/types/dto/clients/AddClientDto";
import useValidators from "@/hooks/useValidators";

const { requiredRule } = useValidators();

const store = useStore();

const clientForm = ref<any | null>(null);
const addClientDialog = ref(false);

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
const clients = computed(() => store.getters["clients/clients"]);
// const diets = computed(() => store.getters["diets/diets"]);
</script>
