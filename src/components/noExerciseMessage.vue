<template>
  <div class="d-flex justify-center align-center flex-column pt-10">
    <v-icon size="100"> mdi-emoticon-sad-outline </v-icon>
    <span class="text-h6 text-center">
      {{ t("onDate") }} {{ date }} {{ t("noExercise") }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  date: { type: String, required: true },
});

const { date } = toRefs(props);

const { t } = useI18n();
</script>

<style scoped></style>
