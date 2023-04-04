<template>
  <v-row class="d-flex justify-center flex-column mt-5">
    <v-card-title class="text-center">Занятия:</v-card-title>
    <DatePicker
      class="my-5 mx-auto"
      @dayclick="selectDay"
      :attributes="exercises"
      color="blue"
    ></DatePicker>
  </v-row>
  <v-expansion-panels variant="popout" class="my-4">
    <v-expansion-panel v-for="ex in selectedExercises" :key="ex.id">
      <v-expansion-panel-title>
        <v-card-title
          >{{ moment(ex.date).format("HH-MM") }} ||
          {{ ex.exerciseInfo?.name }}</v-card-title
        >
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card-title
          >Время : {{ moment(ex.date).format("HH-MM") }}</v-card-title
        >
        <v-card-title>Тренировка : {{ ex.exerciseInfo?.name }}</v-card-title>

        <v-card-text class="text-h6"
          >Описание : {{ ex.exerciseInfo?.description }}</v-card-text
        >
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { DatePicker } from "v-calendar";
import { computed, ComputedRef, onMounted, ref } from "vue";
import { Exercise } from "@/types/Exercise";
const selectedDate = ref<null | Date>(null);
import moment from "moment";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("exercises/fetch");
});

const selectDay = (val: any) => {
  const selected: any = exercises.value.find((e) => {
    return moment(e.dates).format("YYYY-MM-DD") == val.id;
  });

  if (selected) {
    selectedDate.value = selected.dates;
  }
};

const exercises: ComputedRef<any> = computed(() => {
  return store.getters["exercises/exercises"].map((e: Exercise) => ({
    highlight: {
      color: "blue",
      fillMode: "outline",
    },
    dates: e.date,
  }));
});

const selectedExercises = computed(() => {
  return store.getters["exercises/exercises"].filter((e: any) => {
    return (
      moment(e.date).format("DD-MM-YY") ===
      moment(selectedDate.value).format("DD-MM-YY")
    );
  });
});
</script>

<style scoped></style>
