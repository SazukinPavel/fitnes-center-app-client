<template>
  <v-card class="px-5 py-5 ma-auto" max-width="800" variant="text">
    <v-card-title class="text-center text-wrap"
      >{{ t("newExercise") }}:</v-card-title
    >
    <v-form ref="exerciseForm">
      <date-picker
        class="my-2"
        :rules="[requiredRule]"
        :label="t('date')"
        type="Meeting"
        v-model="addExerciseDto.date"
      />
      <v-autocomplete
        :rules="[requiredRule]"
        :label="t('exerciseType')"
        item-value="id"
        item-title="name"
        class="my-2"
        :items="exercisesInfo"
        return-object
        v-model="exercise"
      />
      <duration-input v-model="addExerciseDto.duration" />
      <v-autocomplete
        :rules="[requiredRule]"
        :label="t('client')"
        item-value="id"
        item-title="auth.fio"
        :items="clients"
        class="my-2"
        v-model="addExerciseDto.clientId"
      />
    </v-form>

    <div class="d-flex justify-center">
      <v-btn @click="goBack" :disabled="isAddLoading">{{ t("back") }}</v-btn>
      <v-btn class="mx-5" @click="addExercise" :loading="isAddLoading">{{
        t("add")
      }}</v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import useValidators from "@/hooks/useValidators";
import { useStore } from "vuex";
import { computed, onMounted, ref, watch } from "vue";
import AddExerciseDto from "@/types/dto/exercises/AddExerciseDto";
import ExerciseInfo from "@/types/entitys/ExerciseInfo";
import Client from "@/types/entitys/Client";
import useGoTo from "@/hooks/useGoTo";
import useGoBack from "@/hooks/goBack";
import DatePicker from "@/components/ui/datePicker.vue";
import DurationInput from "@/components/ui/durationInput.vue";
import { useI18n } from "vue-i18n";

const { requiredRule } = useValidators();
const store = useStore();
const goTo = useGoTo();
const goBack = useGoBack();
const { t } = useI18n();

const exerciseForm = ref<any | null>(null);
const isAddLoading = ref(false);
const addExerciseDto = ref<AddExerciseDto>(getDefaultDto());
const exercise = ref<ExerciseInfo | null>(null);

const addExercise = async () => {
  if (!(await exerciseForm.value?.validate()).valid) {
    return;
  }

  isAddLoading.value = true;

  try {
    await store.dispatch("exercises/add", {
      ...addExerciseDto.value,
      exerciseId: exercise.value?.id,
    });

    addExerciseDto.value = getDefaultDto();

    store.commit("snackbar/showSnackbarSuccess", {
      message: t("success.addExercise"),
    });
    goTo({ name: "ManagerExercises" });
  } catch (e: any) {
    store.commit("snackbar/showSnackbarError", {
      message: e?.response?.data?.message || t("errors.addExercise"),
    });
  } finally {
    isAddLoading.value = false;
  }
};

const exercisesInfo = computed<ExerciseInfo[]>(
  () => store.getters["exerciseInfo/exercisesInfos"]
);
const clients = computed<Client[]>(() => store.getters["clients/clients"]);

onMounted(() => {
  store.dispatch("exerciseInfo/fetch");
  store.dispatch("clients/fetch");
});

watch(exercise, (newVal) => {
  addExerciseDto.value.duration = newVal?.duration;
});

function getDefaultDto(): AddExerciseDto {
  return {
    clientId: "",
    description: "",
    exerciseId: "",
  };
}
</script>

<style scoped></style>
