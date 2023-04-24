<template>
  <number-input
    class="my-2"
    :rules="[requiredRule, weightRule]"
    label="Вес"
    :value="props.value"
    @update:value="emit('update:value', $event)"
    suffix="килограмм"
  />
</template>

<script setup lang="ts">
import NumberInput from "@/components/ui/NumberInput.vue";
import { defineEmits, defineProps } from "vue";
import useValidators from "@/hooks/useValidators";

const { weightRule, requiredRule } = useValidators();

const props = defineProps({
  value: { type: Date, default: null },
});
const emit = defineEmits(["update:value"]);
</script>

<style scoped></style>
