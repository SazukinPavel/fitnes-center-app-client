<template>
  <v-card :loading="isLoading" variant="text">
    <v-card-actions>
      <search v-model="searchParam" />
    </v-card-actions>
    <exercise-info-card
      v-for="exerciseInfo in filtredExercisesInfo"
      :key="exerciseInfo.id"
      :exercise-info="exerciseInfo"
    />
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ExerciseInfoCard from "@/components/exerciseInfoCard.vue";
import ExerciseInfo from "@/types/entitys/ExerciseInfo";
import Search from "@/components/search.vue";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();
const searchParam = ref("");
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    await store.dispatch("exerciseInfo/fetch");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: t("errors.fetchExerciseTypes"),
    });
  } finally {
    isLoading.value = false;
  }
});

const exercisesInfos = computed<ExerciseInfo[]>(
  () => store.getters["exerciseInfo/exercisesInfos"]
);

const filtredExercisesInfo = computed(() => {
  if (!searchParam.value) {
    return exercisesInfos.value;
  }
  return exercisesInfos.value.filter((e) =>
    e.name.toLowerCase().startsWith(searchParam.value.toLowerCase())
  );
});
</script>

<style scoped></style>
