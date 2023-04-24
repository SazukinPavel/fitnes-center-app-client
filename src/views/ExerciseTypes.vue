<template>
  <v-card class="ma-0 pa-0" variant="text" :loading="isExerciseTypeLoading">
    <div class="d-flex justify-end align-center">
      <search class="ml-5" v-model="searchParam" />
      <add-btn :to="{ name: 'AddExerciseType' }" />
    </div>
    <div>
      <exercise-info-card
        v-for="exerciseInfo in filtredExercisesInfo"
        :exercise-info="exerciseInfo"
        :key="exerciseInfo?.id"
        delete
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ExerciseInfo from "@/types/entitys/ExerciseInfo";
import { useStore } from "vuex";
import ExerciseInfoCard from "@/components/exerciseInfoCard.vue";
import Search from "@/components/search.vue";
import AddBtn from "@/components/ui/addBtn.vue";

const store = useStore();

const searchParam = ref("");
const isExerciseTypeLoading = ref(false);

onMounted(async () => {
  try {
    await store.dispatch("exerciseInfo/fetch");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: "Произошла ошибка при получение типов занятий",
    });
  } finally {
    isExerciseTypeLoading.value = false;
  }
});

const exercisesInfo = computed<ExerciseInfo[]>(
  () => store.getters["exerciseInfo/exercisesInfos"]
);

const filtredExercisesInfo = computed<ExerciseInfo[]>(() => {
  if (!searchParam.value) {
    return exercisesInfo.value;
  }
  return exercisesInfo.value.filter((e) =>
    e.name.toLowerCase().startsWith(searchParam.value.toLowerCase())
  );
});
</script>
