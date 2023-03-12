<template>
  <div class="d-flex jsutify-start my-7">
    <v-btn :loading="isDietsAddLoading" class="mx-5" color="primary"
      >Добавить
      <v-dialog v-model="addDietDialog" activator="parent" width="auto">
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
    <v-btn :loading="isDietsDeleteLoading" color="primary" @click="deleteDiets"
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
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Diet from "@/types/Diet";
import AddDietDto from "@/types/dto/diets/AddDietDto";
import { useStore } from "vuex";
import DietsTypeTable from "@/components/tables/DietsTypeTable.vue";

const store = useStore();

const selectedDiets = ref<Diet[]>([]);
const dietForm = ref<any | null>(null);
const addDietDialog = ref(false);
const addDietDto = ref<AddDietDto>({
  name: "",
  description: "",
});
const requiredRule: any = [(val: string) => !!val || "Поле обязательно!"];

const refreshDiets = () => {
  store.dispatch("diets/refresh");
};

const deleteDiets = () => {
  store.dispatch("diets/deletediets", selectedDiets.value);
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

onMounted(() => {
  store.dispatch("diets/fetch");
});

const diets = computed(() => store.getters["diets/diets"]);
const isDietsDeleteLoading = computed(
  () => store.getters["diets/isDeleteLoading"]
);
const isDietsAddLoading = computed(() => store.getters["diets/isAddLoading"]);
const isDietsLoading = computed(() => store.getters["diets/isLoading"]);
</script>
