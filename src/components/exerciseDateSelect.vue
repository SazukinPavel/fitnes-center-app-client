<template>
  <v-select
    :model-value="modelValue"
    class="mx-2"
    @update:model-value="emit('update:modelValue', $event)"
    :items="dates"
    variant="outlined"
  />
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted } from "vue";
import { PropType } from "vue";
import { Exercise } from "@/types/Exercise";
import useFormaters from "@/hooks/useFormaters";

const props = defineProps({
  modelValue: { type: String, required: true },
  exercises: { type: Object as PropType<Exercise[]> },
});

const emit = defineEmits(["update:modelValue"]);

const { formatDate } = useFormaters();

const dates = computed<string[]>(() => {
  const set = new Set(props.exercises?.map((d) => formatDate(d.date)));
  const result: string[] = [];
  set.add(formatDate(new Date(Date.now())));
  set.forEach((v) => result.push(v));
  return result;
});

onMounted(() => {
  emit("update:modelValue", formatDate(new Date(Date.now())));
});
</script>

<style scoped></style>
