<template>
  <v-card variant="text">
    <v-card-title class="text-center">Тренер:</v-card-title>
    <v-card-title class="text-wrap">{{ manager.owner.auth.fio }}</v-card-title>
    <v-card-title class="text-wrap">Возраст: {{ managerAge }}</v-card-title>
    <v-card-title class="text-wrap"
      >Телефонный номер: {{ manager.owner.auth.telephone }}</v-card-title
    >
    <v-card-text>{{ manager.owner.description }}</v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import Client from "@/types/entitys/Client";
import moment from "moment";

const store = useStore();

const manager = computed<Client>(() => store.getters["auth/user"]);

const managerAge = computed(() => {
  return moment().diff(manager.value?.owner?.auth?.birthDate, "years");
});
</script>

<style scoped></style>
