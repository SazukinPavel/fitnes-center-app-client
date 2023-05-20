<template>
  <v-card class="ma-0 pa-0" variant="text" :loading="isLoading">
    <v-card-actions>
      <search v-model="searchParam" />
    </v-card-actions>
    <diet-card v-for="diet in filtredDiets" :diet="diet" :key="diet.id" />
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Diet from "@/types/entitys/Diet";
import { useStore } from "vuex";
import DietCard from "@/components/dietCard.vue";
import Search from "@/components/search.vue";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const searchParam = ref("");
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    await store.dispatch("diets/fetch");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: t("errors.fetchDiets"),
    });
  } finally {
    isLoading.value = false;
  }
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
</script>
