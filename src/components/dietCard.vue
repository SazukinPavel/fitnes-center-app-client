<template>
  <v-card>
    <v-card-actions v-if="props.delete" class="d-flex justify-end">
      <v-btn size="small" icon @click="deleteDiet" :loading="isDeleteLoading"
        ><v-icon>mdi-delete</v-icon></v-btn
      >
    </v-card-actions>
    <v-card-title>{{ props.diet.name }}</v-card-title>
    <v-expansion-panels v-if="props.diet?.description">
      <v-expansion-panel title="Описание">
        <v-expansion-panel-text>
          {{ props.diet.description }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
  <v-divider />
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { defineProps, PropType, ref } from "vue";
import Diet from "@/types/Diet";

const store = useStore();

const props = defineProps({
  diet: { type: Object as PropType<Diet>, required: true },
  delete: { type: Boolean, default: false },
});

const isDeleteLoading = ref(false);

const deleteDiet = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch("diets/deleteDiet", props.diet?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: `Диета ${props.diet?.name} успещно удалена`,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `Произошла ошибка при удалении диеты ${props.diet?.name}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<style scoped></style>
