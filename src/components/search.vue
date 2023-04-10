<template>
  <v-text-field
    variant="underlined"
    label="поиск..."
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  ></v-text-field>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({ modelValue: { type: String, required: true } });
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
