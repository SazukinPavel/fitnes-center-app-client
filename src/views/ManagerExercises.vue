<template>
  <div class="d-flex justify-space-between align-start">
    <exercise-date-select :exercises="exercises" v-model="selectedDate" />
    <add-btn class="mt-2" :loading="isExerciseAddLoading">
      <v-dialog v-model="addExerciseDialog" activator="parent" width="auto">
        <v-card class="px-15 py-10">
          <v-card-title>Новое занятие:</v-card-title>
          <v-form ref="exerciseForm">
            <v-text-field
              class="my-2"
              :rules="[requiredRule]"
              variant="outlined"
              label="Дата"
              type="datetime-local"
              color="primary"
              v-model="addExerciseDto.date"
            />
            <v-select
              variant="outlined"
              color="primary"
              :rules="[requiredRule]"
              label="Тип тренировки"
              item-value="id"
              item-title="name"
              :items="exercisesInfo"
              v-model="addExerciseDto.exerciseId"
            />
            <v-select
              variant="outlined"
              color="primary"
              :rules="[requiredRule]"
              label="Клиент"
              item-value="id"
              item-title="auth.fio"
              :items="clients"
              v-model="addExerciseDto.clientId"
            />
          </v-form>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              variant="outlined"
              color="primary"
              @click="addExerciseDialog = false"
              >Закрыть</v-btn
            >
            <v-btn
              variant="outlined"
              class="mx-5"
              color="primary"
              @click="addExercise"
              >Добавить</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </add-btn>
  </div>
  <v-card :loading="isExerciseLoading" variant="plain">
    <template v-if="filtredExercises.length">
      <exercise-card
        v-for="exercise in filtredExercises"
        :key="exercise.id"
        :exercise="exercise"
        :client="getClient(exercise.client.id)"
      />
    </template>
    <no-exercise-message v-else :date="selectedDate" />
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AddExerciseDto from "@/types/dto/exercises/AddExerciseDto";
import { useStore } from "vuex";
import ExerciseCard from "@/components/exerciseCard.vue";
import Client from "@/types/Client";
import { Exercise } from "@/types/Exercise";
import ExerciseInfo from "@/types/ExerciseInfo";
import useValidators from "@/hooks/useValidators";
import AddBtn from "@/components/ui/addBtn.vue";
import ExerciseDateSelect from "@/components/exerciseDateSelect.vue";
import useFormaters from "@/hooks/useFormaters";
import NoExerciseMessage from "@/components/noExerciseMessage.vue";

const store = useStore();

const { requiredRule } = useValidators();
const { formatDate } = useFormaters();

const selectedDate = ref<string>("");

const exerciseForm = ref<any | null>(null);
const addExerciseDialog = ref(false);
const addExerciseDto = ref<AddExerciseDto>({
  clientId: "",
  date: new Date(Date.now()),
  description: "",
  exerciseId: "",
});

onMounted(() => {
  store.dispatch("exercises/fetch");
  store.dispatch("clients/fetch");
  store.dispatch("exerciseInfo/fetch");
});

const getClient = (id?: string) => {
  return clients.value.find((c) => c.id == id);
};

const addExercise = async () => {
  if (!(await exerciseForm.value?.validate()).valid) {
    return;
  }

  try {
    await store.dispatch("exercises/add", addExerciseDto.value);
  } finally {
    refreshExercises();
    addExerciseDto.value = {
      clientId: "",
      date: new Date(Date.now()),
      description: "",
      exerciseId: "",
    };
    addExerciseDialog.value = false;
  }
};

const refreshExercises = () => {
  store.dispatch("exercises/refresh");
};

const exercises = computed<Exercise[]>(
  () => store.getters["exercises/exercises"]
);

const filtredExercises = computed<Exercise[]>(() => {
  if (!selectedDate.value) {
    return exercises.value;
  }

  return exercises.value.filter(
    (e) => formatDate(e.date) === selectedDate.value
  );
});
const clients = computed<Client[]>(() => store.getters["clients/clients"]);
const exercisesInfo = computed<ExerciseInfo[]>(
  () => store.getters["exerciseInfo/exercisesInfos"]
);

const isExerciseAddLoading = computed(
  () => store.getters["clients/isAddLoading"]
);
const isExerciseLoading = computed(() => store.getters["clients/isLoading"]);
</script>

<style scoped></style>
