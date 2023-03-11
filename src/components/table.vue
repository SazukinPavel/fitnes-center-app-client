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
});

const { items, headers, loading, showSelect, selected } = toRefs(props);

const emit = defineEmits(["update:selected"]);
</script>
