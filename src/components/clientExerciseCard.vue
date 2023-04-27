<template>
  <v-card>
    <v-card-title class="text-wrap">{{
      props.exercise.exerciseInfo?.name
    }}</v-card-title>
    <v-card-title class="text-wrap"
      >Дата: {{ formatDateTime(props.exercise?.date) }}</v-card-title
    >
    <v-card-title class="text-wrap"
      >Тренер: {{ props.manager.auth?.fio }}</v-card-title
    >
    <v-card-title class="text-wrap"
      >Длительность: {{ props.manager.auth?.fio }} минут</v-card-title
    >
    <v-expansion-panels v-if="props.exercise?.exerciseInfo?.description">
      <v-expansion-panel title="Описание">
        <v-expansion-panel-text>
          {{ props.exercise.exerciseInfo?.description }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
  <v-divider />
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Exercise } from "@/types/entitys/Exercise";
import useFormmaters from "@/hooks/useFormaters";
import Manager from "@/types/entitys/Manager";

const props = defineProps({
  exercise: { type: Object as PropType<Exercise>, required: true },
  manager: { type: Object as PropType<Manager>, required: true },
});

const { formatDateTime } = useFormmaters();
</script>

<style scoped></style>
