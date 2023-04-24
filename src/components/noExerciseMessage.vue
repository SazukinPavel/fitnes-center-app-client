<template>
  <div class="d-flex justify-center align-center flex-column pt-10">
    <v-icon size="100"> mdi-emoticon-sad-outline </v-icon>
    <span class="text-h6 text-center">На дату {{ date }} нету занятий(</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue";

const props = defineProps({
  date: { type: String, required: true },
});

const { date } = toRefs(props);
</script>

<style scoped></style>
