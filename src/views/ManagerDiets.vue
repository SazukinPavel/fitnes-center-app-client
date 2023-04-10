<template>
  <v-card class="ma-0 pa-0" variant="plain" :loading="isDietsLoading">
    <v-card-actions>
      <search v-model="searchParam" />
    </v-card-actions>
    <diet-card v-for="diet in filtredDiets" :diet="diet" :key="diet.id" />
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Diet from "@/types/Diet";
import { useStore } from "vuex";
import DietCard from "@/components/dietCard.vue";
import Search from "@/components/search.vue";

const store = useStore();
const searchParam = ref("");

onMounted(() => {
  store.dispatch("diets/fetch");
});

const diets = computed<Diet[]>(() => store.getters["diets/diets"]);
const filtredDiets = computed<Diet[]>(() => {
  if (!searchParam.value) {
    return diets.value;
  }
  return diets.value.filter((d) =>
    d.name.toLowerCase().startsWith(searchParam.value.toLocaleLowerCase())
  );
});
const isDietsLoading = computed(() => store.getters["diets/isLoading"]);
</script>
