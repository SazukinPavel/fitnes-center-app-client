<template>
  <v-card>
    <v-card-actions class="d-flex justify-end" v-if="!isCanceled">
      <v-btn @click="cancelDialog = true" icon
        ><v-icon>mdi-cancel</v-icon></v-btn
      >
    </v-card-actions>
    <v-card-title class="text-wrap">{{
      props.exercise.exerciseInfo?.name
    }}</v-card-title>
    <v-card-title class="text-wrap"
      >{{ t("date") }}: {{ formatDateTime(props.exercise?.date) }}</v-card-title
    >
    <v-card-title class="text-wrap"
      >{{ t("trainer") }}: {{ props.manager.auth?.fio }}</v-card-title
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
    <v-expansion-panels v-else-if="props.exercise?.exerciseInfo?.description">
      <v-expansion-panel :title="t('description')">
        <v-expansion-panel-text>
          {{ props.exercise.exerciseInfo?.description }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
  <v-divider />
  <add-cancellation :exercise-id="props.exercise?.id" v-model="cancelDialog" />
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, ref } from "vue";
import { Exercise } from "@/types/entitys/Exercise";
import useFormmaters from "@/hooks/useFormaters";
import Manager from "@/types/entitys/Manager";
import AddCancellation from "@/components/addCancellation.vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  exercise: { type: Object as PropType<Exercise>, required: true },
  manager: { type: Object as PropType<Manager>, required: true },
});

const { formatDateTime } = useFormmaters();
const { t } = useI18n();

const cancelDialog = ref(false);

const isCanceled = computed(() => props.exercise?.cancellation);
</script>

<style scoped></style>
