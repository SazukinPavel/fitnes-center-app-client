<template>
  <v-card
    :loading="isPayedLoading"
    :variant="isCanceled ? 'outlined' : 'flat'"
    :color="isCanceled ? 'red' : ''"
    border
    class="ma-4"
  >
    <v-card-actions class="d-flex justify-end">
      <v-btn
        color="primary"
        variant="outlined"
        size="x-small"
        append-icon="mdi-basket"
        @click="deleteExercise"
        :loading="isDeleteLoading"
        icon
        ><v-icon size="small">mdi-delete</v-icon></v-btn
      >
    </v-card-actions>
    <v-card-title class="text-wrap">{{
      props.exercise.exerciseInfo.name
    }}</v-card-title>
    <v-card-title class="text-wrap"
      >{{ t("date") }}: {{ formatDateTime(props.exercise.date) }}</v-card-title
    >
    <v-card-title class="text-wrap"
      >{{ t("client") }}: {{ props.client?.auth?.fio }}</v-card-title
    >
    <v-card-title class="text-wrap"
      >{{ t("duration") }}: {{ props.exercise.duration }}
      {{ t("minuts") }}</v-card-title
    >
    <v-expansion-panels v-if="isCanceled">
      <v-expansion-panel
        :title="`${t('canceledUser')} ${props.exercise?.cancellation.by}, ${t(
          'reason'
        )}:`"
      >
        <v-expansion-panel-text>
          {{ props.exercise.cancellation.reason }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-card-actions v-else>
      <v-switch
        :label="
          props.exercise?.isPayed
            ? t('paymentStatus.payed')
            : t('paymentStatus.noPayed')
        "
        :model-value="props.exercise?.isPayed"
        @update:modelValue="changeIsPayed"
      />
      <v-btn @click="cancelDialog = true" icon
        ><v-icon>mdi-cancel</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
  <v-divider />
  <add-cancellation :exercise-id="props.exercise?.id" v-model="cancelDialog" />
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, ref } from "vue";
import { Exercise } from "@/types/entitys/Exercise";
import { useStore } from "vuex";
import Client from "@/types/entitys/Client";
import useFormmaters from "@/hooks/useFormaters";
import AddCancellation from "@/components/addCancellation.vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  exercise: { type: Object as PropType<Exercise>, required: true },
  client: { type: Object as PropType<Client>, required: true },
});

const store = useStore();
const { t } = useI18n();
const { formatDateTime } = useFormmaters();

const isDeleteLoading = ref(false);
const isPayedLoading = ref(false);
const cancelDialog = ref(false);

const deleteExercise = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch("exercises/deleteExercise", props.exercise?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: t("success.deleteExercise"),
    });
  } catch {
    store.commit("snackbar/showSnackbarSuccess", {
      message: t("errors.deleteExercise"),
    });
  } finally {
    isDeleteLoading.value = false;
  }
};

const changeIsPayed = async (val: boolean) => {
  isPayedLoading.value = true;
  try {
    await store.dispatch("exercises/changeIsPayed", {
      id: props.exercise.id.toString(),
      isPayed: !!val,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: t("errors.changeIsPayed"),
    });
  } finally {
    isPayedLoading.value = false;
  }
};

const isCanceled = computed(() => props.exercise?.cancellation);
</script>

<style scoped></style>
