<template>
  <v-container fluid>
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="trainers">Тренера</v-tab>
        <v-tab value="diets">Диеты</v-tab>
        <v-tab value="exercises">Занятия</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item style="min-height: 50vh" value="trainers">
            <div class="d-flex jsutify-start my-7">
              <v-btn :loading="isManagerAddLoading" class="mx-5" color="primary"
                >Добавить
                <v-dialog
                  v-model="addManagerDialog"
                  activator="parent"
                  width="auto"
                >
                  <v-card class="px-15 py-10">
                    <v-card-title>Новый менеджер</v-card-title>
                    <v-form ref="managerForm">
                      <v-text-field
                        class="my-2"
                        :rules="requiredRule"
                        variant="outlined"
                        label="Логин"
                        color="primary"
                        v-model="addManagerDto.login"
                      />
                      <v-text-field
                        class="my-2"
                        :rules="requiredRule"
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
                        type="number"
                        label="Возвраст"
                        v-model="addManagerDto.age"
                      />
                      <v-text-field
                        class="my-2"
                        :rules="requiredRule"
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
          </v-window-item>
          <v-window-item style="min-height: 50vh" value="diets">
            <div class="d-flex jsutify-start my-7">
              <v-btn :loading="isDietsAddLoading" class="mx-5" color="primary"
                >Добавить
                <v-dialog
                  v-model="addDietDialog"
                  activator="parent"
                  width="auto"
                >
                  <v-card class="px-15 py-10">
                    <v-card-title>Новое питание:</v-card-title>
                    <v-form ref="dietForm">
                      <v-text-field
                        class="my-2"
                        :rules="requiredRule"
                        variant="outlined"
                        label="Имя"
                        color="primary"
                        v-model="addDietDto.name"
                      />
                      <v-textarea
                        class="my-2"
                        variant="outlined"
                        color="primary"
                        :rules="requiredRule"
                        label="Описание"
                        v-model="addDietDto.description"
                      />
                    </v-form>

                    <v-card-actions class="d-flex justify-center">
                      <v-btn
                        variant="outlined"
                        color="primary"
                        @click="addDietDialog = false"
                        >Закрыть</v-btn
                      >
                      <v-btn
                        variant="outlined"
                        class="mx-5"
                        color="primary"
                        @click="addDiet"
                        >Добавить</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>
              <v-btn
                :loading="isDietsDeleteLoading"
                color="primary"
                @click="deleteDiets"
                >Удалить</v-btn
              >
            </div>
            <diets-type-table
              @refresh="refreshDiets"
              v-model:selected="selectedDiets"
              :loading="isDietsLoading"
              :items="diets"
            >
              <template v-slot:[`expanded-row`]="{ columns, item }">
                <tr>
                  <td :colspan="columns.length">
                    <span>{{ item.raw.description }}</span>
                  </td>
                </tr>
              </template>
            </diets-type-table>
          </v-window-item>
          <v-window-item style="min-height: 50vh" value="exercises">
            <div class="d-flex jsutify-start my-7">
              <v-btn
                :loading="isExerciseInfoAddLoading"
                class="mx-5"
                color="primary"
                >Добавить
                <v-dialog
                  v-model="addExerciseInfoDialog"
                  activator="parent"
                  width="auto"
                >
                  <v-card class="px-15 py-10">
                    <v-card-title>Новое занятие:</v-card-title>
                    <v-form ref="exerciseInfoForm">
                      <v-text-field
                        class="my-2"
                        :rules="requiredRule"
                        variant="outlined"
                        label="Имя"
                        color="primary"
                        v-model="addExerciseInfoDto.name"
                      />
                      <v-textarea
                        class="my-2"
                        variant="outlined"
                        color="primary"
                        :rules="requiredRule"
                        label="Описание"
                        v-model="addExerciseInfoDto.description"
                      />
                    </v-form>

                    <v-card-actions class="d-flex justify-center">
                      <v-btn
                        variant="outlined"
                        color="primary"
                        @click="addExerciseInfoDialog = false"
                        >Закрыть</v-btn
                      >
                      <v-btn
                        variant="outlined"
                        class="mx-5"
                        color="primary"
                        @click="addExerciseInfo"
                        >Добавить</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>
              <v-btn
                :loading="isExerciseInfoDeleteLoading"
                color="primary"
                @click="deleteExercisesInfo"
                >Удалить</v-btn
              >
            </div>
            <exercises-type-table
              @refresh="refreshExercisesType"
              v-model:selected="selectedExercisesInfo"
              :loading="isExerciseInfoLoading"
              :items="exercisesInfo"
            />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import AddManagerDto from "@/types/dto/managers/AddManagerDto";
import Manager from "@/types/Manager";
import AddDietDto from "@/types/dto/diets/AddDietDto";
import Diet from "@/types/Diet";
import AddExerciseInfoDto from "@/types/dto/exerciseInfo/AddExerciseInfoDto";
import ExerciseInfo from "@/types/ExerciseInfo";
import TrainersTable from "@/components/tables/TrainersTable.vue";
import ExercisesTypeTable from "@/components/tables/ExercisesTypeTable.vue";
import DietsTypeTable from "@/components/tables/DietsTypeTable.vue";

const store = useStore();

const tab = ref(0);
const selectedManagers = ref<Manager[]>([]);
const selectedDiets = ref<Diet[]>([]);
const selectedExercisesInfo = ref<ExerciseInfo[]>([]);
const managerForm = ref<any | null>(null);
const dietForm = ref<any | null>(null);
const exerciseInfoForm = ref<any | null>(null);
const addManagerDialog = ref(false);
const addDietDialog = ref(false);
const addExerciseInfoDialog = ref(false);

const addManagerDto = ref<AddManagerDto>({
  age: 18,
  fio: "",
  description: "",
  login: "",
  password: "",
});

const addDietDto = ref<AddDietDto>({
  name: "",
  description: "",
});

const addExerciseInfoDto = ref<AddExerciseInfoDto>({
  name: "",
  description: "",
});

const requiredRule: any = [(val: string) => !!val || "Поле обязательно!"];

onMounted(() => {
  store.dispatch("managers/fetch");
  store.dispatch("diets/fetch");
  store.dispatch("exerciseInfo/fetch");
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

const addDiet = async () => {
  if (!(await dietForm.value?.validate()).valid) {
    return;
  }

  try {
    await store.dispatch("diets/add", addDietDto.value);
  } finally {
    addDietDto.value = {
      name: "",
      description: "",
    };
    addDietDialog.value = false;
  }
};

const addExerciseInfo = async () => {
  if (!(await exerciseInfoForm.value?.validate()).valid) {
    return;
  }

  try {
    await store.dispatch("exerciseInfo/add", addExerciseInfoDto.value);
  } finally {
    addExerciseInfoDto.value = {
      name: "",
      description: "",
    };
    addExerciseInfoDialog.value = false;
  }
};

const refreshManagers = () => {
  store.dispatch("managers/refresh");
};

const refreshDiets = () => {
  store.dispatch("diets/refresh");
};

const refreshExercisesType = () => {
  store.dispatch("exerciseInfo/fetch");
};

const deleteManagers = () => {
  store.dispatch("managers/deleteManagers", selectedManagers.value);
};

const deleteDiets = () => {
  store.dispatch("diets/deletediets", selectedDiets.value);
};

const deleteExercisesInfo = () => {
  store.dispatch("exerciseInfo/deletediets", selectedExercisesInfo.value);
};

const managers = computed(() => store.getters["managers/managers"]);
const diets = computed(() => store.getters["diets/diets"]);
const exercisesInfo = computed(
  () => store.getters["exerciseInfo/exercisesInfos"]
);
const isManagerDeleteLoading = computed(
  () => store.getters["managers/isDeleteLoading"]
);
const isManagerAddLoading = computed(
  () => store.getters["managers/isAddLoading"]
);
const isManagerLoading = computed(() => store.getters["managers/isLoading"]);
const isDietsDeleteLoading = computed(
  () => store.getters["diets/isDeleteLoading"]
);
const isDietsAddLoading = computed(() => store.getters["diets/isAddLoading"]);
const isDietsLoading = computed(() => store.getters["diets/isLoading"]);
const isExerciseInfoDeleteLoading = computed(
  () => store.getters["exerciseInfo/isDeleteLoading"]
);
const isExerciseInfoAddLoading = computed(
  () => store.getters["exerciseInfo/isAddLoading"]
);
const isExerciseInfoLoading = computed(
  () => store.getters["exerciseInfo/isLoading"]
);
</script>

<style scoped></style>
