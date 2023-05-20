<template>
  <v-dialog
    v-model="modelValue"
    @change="emit('update:modelValue', $event)"
    persistent
    max-width="800"
    width="90%"
  >
    <v-form ref="cancellationForm">
      <v-card class="pa-5">
        <v-container>
          <v-row justify="center" class="mb-5">
            <v-card-title class="text-center">{{
              t("canceledReason")
            }}</v-card-title>
          </v-row>
          <v-textarea v-model="reason" :rules="[requiredRule]" />
          <v-row justify="end" class="mt-4">
            <v-btn
              @click="emit('update:modelValue', false)"
              class="mx-3"
              :disabled="isCancelLoading"
              >{{ t("close") }}</v-btn
            >
            <v-btn :loading="isCancelLoading" @click="add" class="mx-3">{{
              t("add")
            }}</v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import { toRefs, defineProps, defineEmits, ref, computed } from "vue";
import useValidators from "@/hooks/useValidators";
import { useStore } from "vuex";
import api from "@/api";
import { useI18n } from "vue-i18n";

const props = defineProps(["modelValue", "exerciseId"]);
const { modelValue, exerciseId } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

const { requiredRule } = useValidators();
const store = useStore();
const { t } = useI18n();

const reason = ref("");

const isCancelLoading = ref(false);

const cancellationForm = ref<any | null>(null);

const add = async () => {
  if (!(await cancellationForm.value?.validate()).valid) {
    return;
  }

  isCancelLoading.value = true;
  try {
    const res = await api.exercises.cancel({
      reason: reason.value,
      exerciseId: exerciseId?.value,
      by: byFio.value,
    });
    store.commit("exercises/replaceExercise", res.data);
    store.commit("snackbar/showSnackbarSuccess", {
      message: t("success.cancelExercise"),
    });
    emit("update:modelValue", false);
  } catch (e: any) {
    store.commit("snackbar/showSnackbarError", {
      message: t("errors.cancelExercise"),
    });
  } finally {
    isCancelLoading.value = false;
  }
};

const byFio = computed(() => store.getters["auth/user"].auth.fio);
</script>

<style scoped></style>
