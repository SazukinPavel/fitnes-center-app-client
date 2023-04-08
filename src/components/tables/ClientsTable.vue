<template>
  <my-table
    :selected="selected"
    @update:selected="emit('update:selected', $event)"
    :headers="clientsHeaders"
    :loading="loading"
    :items="items"
    @refresh="emit('refresh')"
    show-refresh-button
  />
</template>

<script setup lang="ts">
import myTable from "@/components/table.vue";
import { defineProps, toRefs, defineEmits } from "vue";

const props = defineProps({
  items: { type: Array, required: true },
  selected: { type: Array, required: true },
  loading: { type: Boolean, default: false },
});

const { items, loading } = toRefs(props);

const emit = defineEmits(["update:selected", "refresh"]);

const clientsHeaders: any = [
  { title: "Логин", value: "auth.login" },
  { title: "Фио", value: "auth.fio" },
  { title: "Возвраст", value: "age" },
  { title: "Вес", value: "weight" },
  { title: "Рост", value: "height" },
  { title: "Питание", value: "diet.name" },
];
</script>

<style scoped></style>
