<template>
  <v-card variant="text">
    <v-card-title class="text-center">{{ t("diet") }}:</v-card-title>
    <v-card-title class="text-wrap">{{ client.diet?.name }}</v-card-title>
    <v-card-text>{{ client.diet?.description }}</v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import Client from "@/types/entitys/Client";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();

const client = computed<Client>(() => store.getters["auth/user"]);
</script>

<style scoped></style>
