<template>
  <number-input
    :rules="[requiredRule, durationRule]"
    :value="props.value"
    :suffix="t('minuts')"
    :label="t('exerciseDuration')"
    @update:value="emit('update:value', $event)"
  />
</template>

<script setup lang="ts">
import NumberInput from "@/components/ui/NumberInput.vue";
import useValidators from "@/hooks/useValidators";
import { defineEmits, defineProps } from "vue";
import { useI18n } from "vue-i18n";

const { durationRule, requiredRule } = useValidators();
const { t } = useI18n();

const props = defineProps({
  value: { type: Date, default: null },
});
const emit = defineEmits(["update:value"]);
</script>

<style scoped></style>
