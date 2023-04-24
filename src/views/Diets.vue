<template>
  <v-card class="ma-0 pa-0" variant="text" :loading="isDietsLoading">
    <div class="d-flex justify-end align-center">
      <search class="ml-5" v-model="searchParam" />
      <add-btn :to="{ name: 'AddDiet' }" />
    </div>
    <div>
      <diet-card
        delete
        v-for="diet in filtredDiets"
        :diet="diet"
        :key="diet.id"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Diet from "@/types/entitys/Diet";
import { useStore } from "vuex";
import DietCard from "@/components/dietCard.vue";
import Search from "@/components/search.vue";
import AddBtn from "@/components/ui/addBtn.vue";

const store = useStore();

const searchParam = ref("");
const isDietsLoading = ref(false);

onMounted(async () => {
  isDietsLoading.value = true;
  try {
    await store.dispatch("diets/fetch");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при получение диет",
    });
  } finally {
    isDietsLoading.value = false;
  }
});

const diets = computed<Diet[]>(() => store.getters["diets/diets"]);
const filtredDiets = computed<Diet[]>(() => {
  if (!searchParam.value) {
    return diets.value;
  }

  return diets.value.filter((d) =>
    d.name.toLowerCase().startsWith(searchParam.value.toLowerCase())
  );
});
</script>
