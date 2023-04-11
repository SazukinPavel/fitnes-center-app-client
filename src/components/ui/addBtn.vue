<template>
  <v-btn
    :loading="props.loading"
    color="primary"
    icon
    size="small"
    class="mx-5"
  >
    <v-icon>mdi-plus</v-icon>
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps(["loading"]);
</script>

<style scoped></style>
