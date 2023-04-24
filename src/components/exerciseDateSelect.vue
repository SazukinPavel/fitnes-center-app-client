<template>
  <v-row>
    <v-col cols="8">
      <v-autocomplete
        :model-value="modelValue"
        class="mx-2"
        @update:model-value="emit('update:modelValue', $event)"
        :items="dates"
        filter-mode="some"
      />
    </v-col>
    <v-col cols="4">
      <v-select
        v-model="dateType"
        :items="dateTypeItems"
        item-title="text"
        item-value="value"
        label="Прошедшие даты"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, ref } from "vue";
import { PropType } from "vue";
import { Exercise } from "@/types/Exercise";
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
