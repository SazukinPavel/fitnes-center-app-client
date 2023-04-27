<template>
  <number-input
    :rules="[requiredRule, durationRule]"
    :value="props.value"
    suffix="минут"
    label="Длительность тренировки"
    @update:value="emit('update:value', $event)"
  />
</template>

<script setup lang="ts">
import NumberInput from "@/components/ui/NumberInput.vue";
import useValidators from "@/hooks/useValidators";
import { defineEmits, defineProps } from "vue";

const { durationRule, requiredRule } = useValidators();

const props = defineProps({
  value: { type: Date, default: null },
});
const emit = defineEmits(["update:value"]);
</script>

<style scoped></style>
