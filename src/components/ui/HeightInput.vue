<template>
  <number-input
    class="my-2"
    label="Рост"
    :rules="[requiredRule, heightRule]"
    :value="props.value"
    suffix="сантиметров"
    @update:value="emit('update:value', $event)"
  />
</template>

<script setup lang="ts">
import NumberInput from "@/components/ui/NumberInput.vue";
import { defineEmits, defineProps } from "vue";
import useValidators from "@/hooks/useValidators";

const { heightRule, requiredRule } = useValidators();

const props = defineProps({
  value: { type: Date, default: null },
});
const emit = defineEmits(["update:value"]);
</script>

<style scoped></style>
