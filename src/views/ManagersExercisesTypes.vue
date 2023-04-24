<template>
  <v-card :loading="isExerciseLoading" variant="text">
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

const store = useStore();
const searchParam = ref("");

onMounted(() => {
  store.dispatch("exerciseInfo/fetch");
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

const isExerciseLoading = computed(() => store.getters["clients/isLoading"]);
</script>

<style scoped></style>
