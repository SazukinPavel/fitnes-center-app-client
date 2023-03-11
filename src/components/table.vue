<template>
  <v-data-table
    :model-value="selected"
    @update:modelValue="emit('update:selected', $event)"
    :items="items"
    :headers="headers"
    :loading="loading"
    :show-select="showSelect"
  >
    <template v-for="(_, slotName) in $slots" v-slot:[slotName]="data">
      <slot :name="slotName" v-bind="data" />
    </template>
    <template v-slot:[`footer.prepend`]>
      <v-btn
        v-if="showRefreshButton"
        @click="emit('refresh')"
        color="primary"
        density="comfortable"
        class="mx-5"
        append-icon="mdi-refresh"
        >Обновить</v-btn
      >
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, toRefs } from "vue";

const props = defineProps({
  items: { type: Array, required: true },
  headers: { type: Array, required: true },
  selected: { type: Array, required: true },
  showSelect: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  showRefreshButton: { type: Boolean, default: false },
});

const { items, headers, loading, showSelect, selected, showRefreshButton } =
  toRefs(props);

const emit = defineEmits(["update:selected", "refresh"]);
</script>
