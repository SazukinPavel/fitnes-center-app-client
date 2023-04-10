<template>
  <div class="d-flex jsutify-start my-7">
    <v-btn :loading="isManagerAddLoading" class="mx-5" color="primary"
      >Добавить
      <v-dialog v-model="addManagerDialog" activator="parent" width="auto">
        <v-card class="px-15 py-10">
          <v-card-title>Новый менеджер</v-card-title>
          <v-form ref="managerForm">
            <v-text-field
              class="my-2"
              :rules="[requiredRule]"
              variant="outlined"
              label="Логин"
              color="primary"
              v-model="addManagerDto.login"
            />
            <v-text-field
              class="my-2"
              :rules="[requiredRule]"
              variant="outlined"
              label="Фио"
              v-model="addManagerDto.fio"
            />
            <v-textarea
              class="my-2"
              variant="outlined"
              color="primary"
              label="Описание"
              v-model="addManagerDto.description"
            />
            <v-text-field
              class="my-2"
              variant="outlined"
              color="primary"
              type="date"
              label="Дата рождения"
              v-model="addManagerDto.birthDate"
            />
            <v-text-field
              class="my-2"
              :rules="[requiredRule]"
              variant="outlined"
              color="primary"
              label="Пароль"
              v-model="addManagerDto.password"
            />
          </v-form>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              variant="outlined"
              color="primary"
              @click="addManagerDialog = false"
              >Закрыть</v-btn
            >
            <v-btn
              variant="outlined"
              class="mx-5"
              color="primary"
              @click="addManager"
              >Добавить</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
    <v-btn
      :loading="isManagerDeleteLoading"
      color="primary"
      @click="deleteManagers"
      >Удалить</v-btn
    >
  </div>
  <trainers-table
    v-model:selected="selectedManagers"
    :loading="isManagerLoading"
    :items="managers"
    @refresh="refreshManagers"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import AddManagerDto from "@/types/dto/managers/AddManagerDto";
import Manager from "@/types/Manager";
import TrainersTable from "@/components/tables/TrainersTable.vue";
import useValidators from "@/hooks/useValidators";

const store = useStore();
const { requiredRule } = useValidators();
const selectedManagers = ref<Manager[]>([]);
const managerForm = ref<any | null>(null);
const addManagerDialog = ref(false);
const addManagerDto = ref<AddManagerDto>({
  birthDate: new Date(),
  fio: "",
  description: "",
  login: "",
  password: "",
});

onMounted(() => {
  store.dispatch("managers/fetch");
});

const addManager = async () => {
  if (!(await managerForm.value?.validate()).valid) {
    return;
  }

  try {
    await store.dispatch("managers/add", addManagerDto.value);
  } finally {
    addManagerDto.value = {
      login: "",
      fio: "",
      age: 18,
      description: "",
      password: "",
    };
    addManagerDialog.value = false;
  }
};
const refreshManagers = () => {
  store.dispatch("managers/refresh");
};

const deleteManagers = () => {
  store.dispatch("managers/deleteManagers", selectedManagers.value);
};

const managers = computed(() => store.getters["managers/managers"]);

const isManagerDeleteLoading = computed(
  () => store.getters["managers/isDeleteLoading"]
);
const isManagerAddLoading = computed(
  () => store.getters["managers/isAddLoading"]
);
const isManagerLoading = computed(() => store.getters["managers/isLoading"]);
</script>
