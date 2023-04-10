<template>
  <v-card class="ma-0 pa-0" variant="plain" :loading="isDietsLoading">
    <diet-card v-for="diet in diets" :diet="diet" :key="diet.id" />
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import Diet from "@/types/Diet";
import { useStore } from "vuex";
import DietCard from "@/components/dietCard.vue";

const store = useStore();

onMounted(() => {
  store.dispatch("diets/fetch");
});

const diets = computed<Diet[]>(() => store.getters["diets/diets"]);
const isDietsLoading = computed(() => store.getters["diets/isLoading"]);
</script>
