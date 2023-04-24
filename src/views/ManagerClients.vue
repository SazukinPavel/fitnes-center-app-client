<template>
  <div class="d-flex justify-end align-center">
    <search class="ml-5" v-model="searchParam" />
    <add-btn :to="{ name: 'AddClient' }"></add-btn>
  </div>
  <v-card :loading="isClientsLoading" variant="text">
    <client-card
      v-for="client in filtredClients"
      :key="client.id"
      :client="client"
    />
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ClientCard from "@/components/clientCard.vue";
import Search from "@/components/search.vue";
import Client from "@/types/entitys/Client";
import AddBtn from "@/components/ui/addBtn.vue";

const store = useStore();

const searchParam = ref("");
const isClientsLoading = ref(false);

onMounted(async () => {
  isClientsLoading.value = true;
  try {
    await store.dispatch("clients/fetch");
    await store.dispatch("diets/fetch");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при получение клиентов",
    });
  } finally {
    isClientsLoading.value = false;
  }
});

const clients = computed<Client[]>(() => store.getters["clients/clients"]);
const filtredClients = computed<Client[]>(() => {
  if (!searchParam.value) {
    return clients.value;
  }
  return clients.value.filter(
    (c) =>
      c.auth?.fio.toLowerCase().startsWith(searchParam.value.toLowerCase()) ||
      c.auth?.login.toLowerCase().startsWith(searchParam.value.toLowerCase())
  );
});
</script>
