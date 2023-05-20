<template>
  <v-card>
    <v-card-actions v-if="props.delete" class="d-flex justify-end">
      <v-btn
        color="primary"
        variant="outlined"
        size="x-small"
        append-icon="mdi-basket"
        @click="deleteExerciseInfo"
        :loading="isDeleteLoading"
        icon
        ><v-icon size="small">mdi-delete</v-icon></v-btn
      >
    </v-card-actions>
    <v-card-title class="text-wrap">{{ props.exerciseInfo.name }}</v-card-title>
    <v-card-title class="text-wrap"
      >{{ t("duration") }}: {{ props.exerciseInfo.duration }}
      {{ t("minuts") }}</v-card-title
    >
    <v-expansion-panels v-if="props.exerciseInfo?.description">
      <v-expansion-panel :title="t('description')">
        <v-expansion-panel-text>
          {{ props.exerciseInfo.description }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
  <v-divider />
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { defineProps, PropType, ref } from "vue";
import ExerciseInfo from "@/types/entitys/ExerciseInfo";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();

const props = defineProps({
  exerciseInfo: { type: Object as PropType<ExerciseInfo>, required: true },
  delete: { type: Boolean, default: false },
});

const isDeleteLoading = ref(false);

const deleteExerciseInfo = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch("exerciseInfo/delete", props.exerciseInfo?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: `${t("exerciseType")} ${props.exerciseInfo?.name} ${t(
        "deleteSuccessHe"
      )}`,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `${t("deleteExerciseType")} ${props.exerciseInfo?.name}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<style scoped></style>
