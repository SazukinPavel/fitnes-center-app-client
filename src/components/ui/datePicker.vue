<template>
  <v-text-field
    :type="inputType"
    :model-value="props.value"
    @input="emit('update:value', $event.target.value)"
    :min="minDate"
    :label="label"
    :max="maxDate"
    :rules="rules"
    @keypress.prevent
  ></v-text-field>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import moment from "moment";

const props = defineProps({
  type: { String, required: true },
  value: { type: Date, default: null },
  placeholder: { type: String, default: "" },
  rules: { type: Array, default: () => [] },
  label: { type: String },
});
const emit = defineEmits(["update:value"]);

const momentDatePattern = "YYYY-MM-DD";
const momentDateTimePattern = "YYYY-MM-DDTHH:mm";

const inputType = computed(() => {
  return props.type == "BirthDate" ? "date" : "datetime-local";
});

const maxDate = computed<string>(() => {
  if (props.type == "Meeting") {
    return moment().add(1, "year").format(momentDateTimePattern);
  }

  return moment().subtract(18, "years").format(momentDatePattern);
});
const minDate = computed<string>(() => {
  if (props.type == "BirthDate") {
    return moment().subtract(100, "years").format(momentDatePattern);
  }
  return moment().format(momentDateTimePattern);
});
</script>

<style lang="scss"></style>
