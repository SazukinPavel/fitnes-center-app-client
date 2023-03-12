<template>
  <my-table
      :selected="selected"
      @update:selected="emit('update:selected', $event)"
      :headers="trainersHeaders"
      :loading="loading"
      :items="items"
      @refresh="emit('refresh')"
      show-refresh-button
      show-expand
  >
    <template v-slot:[`expanded-row`]="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <span>{{ item.raw.description }}</span>
        </td>
      </tr>
    </template>
  </my-table>
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

const trainersHeaders: any = [
  { title: "Логин", value: "login" },
  { title: "Фио", value: "fio" },
  { title: "Возвраст", value: "age" },
];
</script>

<style scoped></style>
