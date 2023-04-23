<template>
  <vue-date-picker
    :enable-time-picker="enableTimePicker"
    input-class-name="date-picker"
    teleport-center
    :placeholder="placeholder"
    :min-date="minDate"
    :max-date="maxDate"
    offset="20"
    position="right"
    :model-value="value"
    @input="emit('update:value', $event)"
    locale="ru-RU"
    ref="datepicker"
    :start-date="maxDate"
  >
    <template #input-icon>
      <v-icon>mdi-calendare</v-icon>
    </template>
  </vue-date-picker>
</template>

<script setup lang="ts">
import { defineProps, computed, onMounted, defineEmits, ref } from "vue";
import moment from "moment";
import { DatePickerInstance } from "@vuepic/vue-datepicker";

const props = defineProps({
  type: String,
  value: { type: Date, default: null },
  placeholder: { type: String, default: "" },
});
const emit = defineEmits(["update:value"]);

const datepicker = ref<DatePickerInstance>(null);

const maxDate = computed<Date | string>(() => {
  if (props.type == "Meeting") {
    return "";
  }

  return moment().subtract(18, "years").toDate();
});

const minDate = computed<Date | string>(() => {
  if (props.type == "BirthDate") {
    return "";
  }
  return moment().toDate();
});

const enableTimePicker = computed(() => {
  return props.type !== "BirthDate";
});

onMounted(() => {
  emit("update:value", null);

  if (datepicker.value) {
    datepicker.value.setMonthYear({
      month: moment(maxDate.value).month(),
      year: moment(maxDate.value).year(),
    });
  }
});
</script>

<style lang="scss">
.date-picker {
  text-align: center;
  margin-bottom: 25px;
  letter-spacing: 0.009375em;
  min-height: var(--v-input-control-height, 56px);
  width: 100%;
  border: 1px solid rgb(171, 171, 171) !important;
  &:focus,
  :hover,
  :active {
    border-color: #083ef3;
  }
}
:root {
  /*General*/
  --dp-font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto,
    oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  --dp-border-radius: 4px; /*Configurable border-radius*/
  --dp-cell-border-radius: 4px; /*Specific border radius for the calendar cell*/
}
</style>
