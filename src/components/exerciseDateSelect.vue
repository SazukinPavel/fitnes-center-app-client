<template>
  <v-row class="ml-3" style="max-width: 500px">
    <v-autocomplete
      label="Дата"
      class="mr-3"
      :model-value="modelValue"
      style="max-width: 250px; min-width: 250px"
      @update:model-value="emit('update:modelValue', $event)"
      :items="dates"
      filter-mode="some"
      density="comfortable"
    />
    <v-select
      style="max-width: 150px; min-width: 150px"
      density="comfortable"
      v-model="dateType"
      :items="dateTypeItems"
      item-title="text"
      item-value="value"
      label="Прошедшие даты"
    />
  </v-row>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, ref } from "vue";
import { PropType } from "vue";
import { Exercise } from "@/types/entitys/Exercise";
import useFormaters from "@/hooks/useFormaters";
import moment from "moment";

const props = defineProps({
  modelValue: { type: String, required: true },
  exercises: { type: Object as PropType<Exercise[]> },
});
const emit = defineEmits(["update:modelValue"]);

const dateTypeItems = ref([
  { text: "Скрыть", value: true },
  { text: "Показать", value: false },
]);
const dateType = ref(true);

const { formatDate } = useFormaters();

const dates = computed<string[]>(() => {
  const set = new Set(
    props.exercises
      ?.filter((d) => !dateType.value || moment(d.date).isAfter(moment()))
      .map((d) => formatDate(d.date))
  );
  const result: string[] = [];
  set.add(formatDate(new Date(Date.now())));
  set.forEach((v) => result.push(v));
  return result.sort((a, b) => moment.utc(a).diff(moment.utc(b)));
});

onMounted(() => {
  emit("update:modelValue", formatDate(new Date(Date.now())));
});
</script>

<style scoped></style>
