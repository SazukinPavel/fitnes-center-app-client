<template>
  <v-card>
    <v-card-actions v-if="props.delete" class="d-flex justify-end">
      <v-btn
        color="primary"
        variant="outlined"
        size="x-small"
        append-icon="mdi-basket"
        @click="deleteDiet"
        :loading="isDeleteLoading"
        icon
        ><v-icon size="small">mdi-delete</v-icon></v-btn
      >
    </v-card-actions>
    <v-card-title>{{ props.diet.name }}</v-card-title>
    <v-expansion-panels v-if="props.diet?.description">
      <v-expansion-panel :title="t('description')">
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
import Diet from "@/types/entitys/Diet";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();

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
      message: `${t("diet")} ${props.diet?.name} ${t("deleteSuccessShe")}`,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `${t("errors.deleteDiet")} ${props.diet?.name}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<style scoped></style>
