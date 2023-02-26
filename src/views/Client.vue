<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="8">
        <v-card>
          <v-card class="my-2">
            <v-card-title class="text-center text-black"
              >{{ client.fio }}
            </v-card-title>
            <v-card-title class="text-center text-black"
              >Рост: {{ client.height }}
            </v-card-title>
            <v-card-title class="text-center text-black"
              >Вес: {{ client.weight }}
            </v-card-title>
          </v-card>
          <v-card
            style="cursor: pointer"
            variant="outlined"
            color="primary"
            class="my-2"
            @click="router.push({ name: 'Diet page' })"
          >
            <v-card-title class="text-center text-black">Питание</v-card-title>
            <v-card-title class="mb-5 text-black"
              >{{ client.diet?.name }} :
              {{ client.diet?.description }}</v-card-title
            >
          </v-card>
          <v-card
            @click="router.push({ name: 'Trainer page' })"
            variant="outlined"
            style="cursor: pointer"
            color="primary"
            class="my-2"
          >
            <v-card-title class="text-center text-black">Тренер</v-card-title>
            <v-card-title class="mb-5 text-black"
              >{{ client.owner?.fio }} :
              {{ client.owner?.description }}</v-card-title
            >
          </v-card>
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
                <v-card-title
                  >Тренировка : {{ ex.exerciseInfo?.name }}</v-card-title
                >

                <v-card-text class="text-h6"
                  >Описание : {{ ex.exerciseInfo?.description }}</v-card-text
                >
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ComputedRef, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Client from "@/types/Client";
import { DatePicker } from "v-calendar";
import { Exercise } from "@/types/Exercise";
import moment from "moment";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

onMounted(() => {
  store.dispatch("exercises/fetch");
});

const client = computed<Client>(() => store.getters["auth/user"]);
const selectedDate = ref<null | Date>(null);

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
