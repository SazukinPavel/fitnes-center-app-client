<template>
  <v-container fluid>
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="clients">Клиенты</v-tab>
        <v-tab value="exercises">Занятия</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item style="min-height: 50vh" value="clients">
            <div class="d-flex jsutify-start my-7">
              <v-btn @click="refreshClients" class="mx-5" color="primary"
                >Обновить</v-btn
              >
              <v-btn class="mx-5" color="primary">
                Добавить
                <v-dialog
                  activator="parent"
                  v-model="addClientDialog"
                  width="auto"
                >
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
            <v-data-table
              v-model="selectedClients"
              show-select
              :loading="isClientsLoading"
              :items="clients"
              :headers="clientsHeaders"
            >
            </v-data-table>

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
          </v-window-item>
          <v-window-item style="min-height: 50vh" value="exercises">
            <div class="d-flex jsutify-start my-7">
              <v-btn @click="refreshExercises" class="mx-5" color="primary"
                >Обновить</v-btn
              >
              <v-btn @click="download" class="mx-5" color="primary"
                >Отчёты
              </v-btn>
              <v-btn
                :loading="isExerciseAddLoading"
                class="mx-5"
                color="primary"
                >Добавить
                <v-dialog
                  v-model="addExerciseDialog"
                  activator="parent"
                  width="auto"
                >
                  <v-card class="px-15 py-10">
                    <v-card-title>Новое занятие:</v-card-title>
                    <v-form ref="exerciseForm">
                      <v-text-field
                        class="my-2"
                        :rules="requiredRule"
                        variant="outlined"
                        label="Дата"
                        type="datetime-local"
                        color="primary"
                        v-model="addExerciseDto.date"
                      />
                      <v-select
                        variant="outlined"
                        color="primary"
                        :rules="requiredRule"
                        label="Тип тренировки"
                        item-value="id"
                        item-title="name"
                        :items="exercisesInfo"
                        v-model="addExerciseDto.exerciseId"
                      />
                      <v-select
                        variant="outlined"
                        color="primary"
                        :rules="requiredRule"
                        label="Клиент"
                        item-value="id"
                        item-title="fio"
                        :items="clients"
                        v-model="addExerciseDto.clientId"
                      />
                    </v-form>

                    <v-card-actions class="d-flex justify-center">
                      <v-btn
                        variant="outlined"
                        color="primary"
                        @click="addExerciseDialog = false"
                        >Закрыть</v-btn
                      >
                      <v-btn
                        variant="outlined"
                        class="mx-5"
                        color="primary"
                        @click="addExercise"
                        >Добавить</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>
              <v-btn
                :loading="isExerciseDeleteLoading"
                color="primary"
                @click="deleteExercises"
                >Удалить</v-btn
              >
            </div>
            <v-data-table
              v-model="selectedExercises"
              show-select
              :loading="isExerciseLoading"
              :items="exercises"
              :headers="exerciseHeaders"
            >
              <template v-slot:[`item.date`]="{ item }">
                {{ moment(item.raw.date).utc().format("YYYY-MM-DD HH:mm") }}
              </template>
            </v-data-table>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import AddExerciseDto from "@/types/dto/exercises/AddExerciseDto";
import AddClientDto from "@/types/dto/clients/AddClientDto";
import moment from "moment";
import SetDietDto from "@/types/dto/clients/SetDietDto";
import api from "@/api";
import XlsxService from "@/services/XslxService";

const store = useStore();

const tab = ref(0);
const selectedClients = ref<string[]>([]);
const selectedExercises = ref<string[]>([]);
const exerciseForm = ref<any | null>(null);
const dietForm = ref<any | null>(null);
const clientForm = ref<any | null>(null);
const addClientDialog = ref(false);
const clientId = ref<string | null>(null);
const addExerciseDialog = ref(false);
const setDietDialog = ref(false);

const addExerciseDto = ref<AddExerciseDto>({
  clientId: "",
  date: new Date(Date.now()),
  description: "",
  exerciseId: "",
});

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

const clientsHeaders: any = [
  { title: "Логин", value: "login" },
  { title: "Фио", value: "fio" },
  { title: "Возвраст", value: "age" },
  { title: "Вес", value: "weight" },
  { title: "Рост", value: "height" },
  { title: "Питание", value: "diet.name" },
];

const exerciseHeaders: any = [
  { title: "Дата", value: "date", key: "date" },
  { title: "Клиент", value: "client.fio" },
  { title: "Тип тренировки", value: "exerciseInfo.name" },
];

const requiredRule: any = [(val: string) => !!val || "Поле обязательно!"];

onMounted(() => {
  store.dispatch("exercises/fetch");
  store.dispatch("clients/fetch");
  store.dispatch("exerciseInfo/fetch");
  store.dispatch("diets/fetch");
});

const addClient = async () => {
  if (!(await clientForm.value?.validate()).valid) {
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

const setDiet = async () => {
  if (!(await dietForm.value?.validate()).valid) {
    return;
  }

  try {
    await api.clients.setDiet({
      ...setDietDto.value,
      clientId: clientId.value,
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

const setDietClick = () => {
  if (Object.keys(selectedClients.value).length) {
    clientId.value = selectedClients.value[0];
    setDietDialog.value = true;
  }
};

const addExercise = async () => {
  if (!(await exerciseForm.value?.validate()).valid) {
    return;
  }

  try {
    await store.dispatch("exercises/add", addExerciseDto.value);
  } finally {
    refreshExercises();
    addExerciseDto.value = {
      clientId: "",
      date: new Date(Date.now()),
      description: "",
      exerciseId: "",
    };
    addExerciseDialog.value = false;
  }
};
const refreshClients = () => {
  store.dispatch("clients/refresh");
};

const refreshExercises = () => {
  store.dispatch("exercises/refresh");
};

const deleteExercises = () => {
  store.dispatch("exercises/deleteExercises", selectedExercises.value);
};

const deleteClients = () => {
  store.dispatch("clients/deleteClients", selectedClients.value);
};

const clients = computed(() => store.getters["clients/clients"]);
const exercises = computed(() => store.getters["exercises/exercises"]);
const diets = computed(() => store.getters["diets/diets"]);
const exercisesInfo = computed(
  () => store.getters["exerciseInfo/exercisesInfos"]
);

const isClientsDeleteLoading = computed(
  () => store.getters["clients/isDeleteLoading"]
);
const isClientAddLoading = computed(
  () => store.getters["clients/isAddLoading"]
);
const isClientsLoading = computed(() => store.getters["clients/isLoading"]);
const isExerciseDeleteLoading = computed(
  () => store.getters["exercises/isDeleteLoading"]
);
const isExerciseAddLoading = computed(
  () => store.getters["clients/isAddLoading"]
);
const isExerciseLoading = computed(() => store.getters["clients/isLoading"]);

const download = () => {
  XlsxService.downloadXlsx(exercises.value);
};
</script>

<style scoped></style>
