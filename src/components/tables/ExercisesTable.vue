<template>
  <my-table
    :selected="selected"
    @update:selected="emit('update:selected', $event)"
    :headers="exerciseHeaders"
    :loading="loading"
    :items="items"
    @refresh="emit('refresh')"
    show-refresh-button
  >
    <template v-slot:[`item.date`]="{ item }">
      {{ moment(item.raw.date).utc().format("YYYY-MM-DD HH:mm") }}
    </template>
  </my-table>
</template>

<script setup lang="ts">
import myTable from "@/components/table.vue";
import moment from "moment";
import { defineProps, toRefs, defineEmits } from "vue";

const props = defineProps({
  items: { type: Array, required: true },
  selected: { type: Array, required: true },
  loading: { type: Boolean, default: false },
});

const { items, loading } = toRefs(props);

const emit = defineEmits(["update:selected", "refresh"]);

const exerciseHeaders: any = [
  { title: "Дата", value: "date", key: "date" },
  { title: "Клиент", value: "client.fio" },
  { title: "Тип тренировки", value: "exerciseInfo.name" },
];
</script>

<style scoped></style>
