<template>
  <v-card class="ma-0 pa-0" variant="plain" :loading="isDietsLoading">
    <div class="d-flex justify-end">
      <v-btn
        :loading="isDietsAddLoading"
        color="primary"
        icon
        size="small"
        class="mx-5"
        ><v-icon>mdi-plus</v-icon>
        <v-dialog v-model="addDietDialog" activator="parent" width="auto">
          <v-card class="px-15 py-10">
            <v-card-title>Новое питание:</v-card-title>
            <v-form ref="dietForm">
              <v-text-field
                class="my-2"
                :rules="[requiredRule]"
                variant="outlined"
                label="Имя"
                color="primary"
                v-model="addDietDto.name"
              />
              <v-textarea
                class="my-2"
                variant="outlined"
                color="primary"
                :rules="[requiredRule]"
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
    </div>
    <div>
      <diet-card v-for="diet in diets" :diet="diet" :key="diet.id" />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Diet from "@/types/Diet";
import AddDietDto from "@/types/dto/diets/AddDietDto";
import { useStore } from "vuex";
import useValidators from "@/hooks/useValidators";
import DietCard from "@/components/dietCard.vue";

const store = useStore();
const { requiredRule } = useValidators();

const dietForm = ref<any | null>(null);
const addDietDialog = ref(false);
const addDietDto = ref<AddDietDto>({
  name: "",
  description: "",
});

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

const diets = computed<Diet[]>(() => store.getters["diets/diets"]);
const isDietsAddLoading = computed(() => store.getters["diets/isAddLoading"]);
const isDietsLoading = computed(() => store.getters["diets/isLoading"]);
</script>
