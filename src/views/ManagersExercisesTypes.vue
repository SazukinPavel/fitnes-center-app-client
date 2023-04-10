<template>
  <v-card :loading="isExerciseLoading" variant="plain">
    <exercise-info-card
      v-for="exerciseInfo in exercisesInfos"
      :key="exerciseInfo.id"
      :exercise-info="exerciseInfo"
    />
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import ExerciseInfoCard from "@/components/exerciseInfoCard.vue";
import ExerciseInfo from "@/types/ExerciseInfo";

const store = useStore();

onMounted(() => {
  store.dispatch("exerciseInfo/fetch");
});

const exercisesInfos = computed<ExerciseInfo[]>(
  () => store.getters["exerciseInfo/exercisesInfos"]
);
const isExerciseLoading = computed(() => store.getters["clients/isLoading"]);
</script>

<style scoped></style>
