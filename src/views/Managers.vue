<template>
  <v-card class="ma-0 pa-0" variant="text" :loading="isManagerLoading">
    <div class="d-flex justify-space-between align-center">
      <search class="ml-5" v-model="searchParam" />
      <add-btn :loading="isManagerAddLoading">
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
      </add-btn>
    </div>
    <div>
      <manager-card
        v-for="manager in filtredManagers"
        :manager="manager"
        :key="manager.id"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import AddManagerDto from "@/types/dto/managers/AddManagerDto";
import Manager from "@/types/Manager";
import useValidators from "@/hooks/useValidators";
import ManagerCard from "@/components/managerCard.vue";
import Search from "@/components/search.vue";
import AddBtn from "@/components/ui/addBtn.vue";

const store = useStore();
const { requiredRule } = useValidators();
const managerForm = ref<any | null>(null);
const addManagerDialog = ref(false);
const addManagerDto = ref<AddManagerDto>({
  birthDate: new Date(),
  fio: "",
  description: "",
  login: "",
  password: "",
});

const searchParam = ref("");

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
      birthDate: new Date(),
      description: "",
      password: "",
    };
    addManagerDialog.value = false;
  }
};
const managers = computed<Manager[]>(() => store.getters["managers/managers"]);
const filtredManagers = computed<Manager[]>(() => {
  if (!searchParam.value) {
    return managers.value;
  }

  return managers.value.filter(
    (m) =>
      m.auth?.login.toLowerCase().startsWith(searchParam.value.toLowerCase()) ||
      m.auth?.fio.startsWith(searchParam.value.toLowerCase()) ||
      m.id?.toLowerCase().startsWith(searchParam.value.toLowerCase())
  );
});

const isManagerAddLoading = computed(
  () => store.getters["managers/isAddLoading"]
);
const isManagerLoading = computed(() => store.getters["managers/isLoading"]);
</script>
