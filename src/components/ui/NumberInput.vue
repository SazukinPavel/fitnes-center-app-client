<template>
  <v-text-field
    :prefix="prefix"
    :model-value="props.value"
    :label="label"
    :rules="rules"
    @keydown="isNumberKey"
    pattern="[0-9.]+"
    @input="emit('update:value', $event.target.value)"
  />
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  prefix: String,
  value: { type: Date, default: null },
  placeholder: { type: String, default: "" },
  rules: { type: Array, default: () => [] },
  label: { type: String },
});
const emit = defineEmits(["update:value"]);

function isNumberKey(evt: KeyboardEvent) {
  var e = evt || window.event;
  var key = e.keyCode || e.which;

  if (
    (!e.shiftKey &&
      !e.altKey &&
      !e.ctrlKey &&
      // numbers
      key >= 48 &&
      key <= 57) ||
    // Numeric keypad
    (key >= 96 && key <= 105) ||
    // Backspace and Tab and Enter
    key == 8 ||
    key == 9 ||
    key == 13 ||
    // Home and End
    key == 35 ||
    key == 36 ||
    // left and right arrows
    key == 37 ||
    key == 39 ||
    // Del and Ins
    key == 46 ||
    key == 45
  ) {
    // input is VALID
  } else {
    // input is INVALID
    e.returnValue = false;
    if (e.preventDefault) e.preventDefault();
  }
}
</script>

<style scoped></style>
