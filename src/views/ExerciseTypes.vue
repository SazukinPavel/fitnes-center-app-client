<template>
  <v-card class="ma-0 pa-0" variant="text" :loading="isLoading">
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
