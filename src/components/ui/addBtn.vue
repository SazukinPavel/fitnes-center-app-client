<template>
  <v-btn color="primary" icon size="small" class="mx-5" :to="props.to">
    <v-icon>mdi-plus</v-icon>
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { RouteLocation } from "vue-router";
const props = defineProps({
  to: { type: Object as PropType<RouteLocation | undefined>, required: true },
});
</script>

<style scoped></style>
