<template>
  <v-layout full-height>
    <v-container>
      <v-card class="ma-5 pa-5">
        <v-card-title class="text-center">Тренер:</v-card-title>
        <v-card-title>{{ client.owner.fio }}</v-card-title>
        <v-card-title>Возраст:{{ client.owner.age }}</v-card-title>
        <v-card-text>{{ client.owner.description }}</v-card-text>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, onMounted, onUnmounted } from "vue";
import Client from "@/types/Client";

const store = useStore();

const client = computed<Client>(() => store.getters["auth/user"]);

onMounted(() => {
  store.commit("app/setIsBackButtonShow", true);
});

onUnmounted(() => {
  store.commit("app/setIsBackButtonShow", false);
});
</script>

<style scoped></style>
