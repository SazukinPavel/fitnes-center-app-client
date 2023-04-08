<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="8">
        <v-card class="my-2">
          <v-card-title class="text-center text-black"
            >{{ client.auth.fio }}
          </v-card-title>
          <v-card-title class="text-center text-black"
            >Рост: {{ client.height }}
          </v-card-title>
          <v-card-title class="text-center text-black"
            >Вес: {{ client.weight }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import Client from "@/types/Client";

const store = useStore();

const client = computed<Client>(() => store.getters["auth/user"]);
</script>

<style scoped></style>
