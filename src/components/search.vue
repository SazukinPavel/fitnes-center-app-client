<template>
  <v-text-field
    variant="underlined"
    :label="t('search')"
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  ></v-text-field>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({ modelValue: { type: String, required: true } });
const emit = defineEmits(["update:modelValue"]);

const { t } = useI18n();
</script>

<style scoped></style>
