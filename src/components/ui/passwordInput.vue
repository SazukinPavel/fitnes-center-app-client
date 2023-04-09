<template>
  <v-text-field
    @input="change"
    :append-icon="isShowed ? 'mdi-eye' : 'mdi-eye-off'"
    :type="isShowed ? 'text' : 'password'"
    :label="label || ''"
    :rules="rules"
    variant="outlined"
    validate-on="blur"
    :model-value="modelValue"
    class="input-group--focused"
    @click:append="isShowed = !isShowed"
  ></v-text-field>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, toRefs } from "vue";

const props = defineProps({
  hint: { type: Boolean, default: true },
  label: { type: String },
  modelValue: { type: String },
  rules: { type: Array, default: () => [] },
});

const { label, modelValue, rules } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

const isShowed = ref(false);

const change = (e: InputEvent) => {
  console.log(rules.value);
  emit("update:modelValue", e.target.value);
};
// const rules = ref({
//   required: (value: string) => !!value || "Required.",
//   min: (v: string) => v.length >= 8 || " 'Не менее 8 символов.'",
// });
</script>

<style scoped></style>
