<template>
  <number-input
    class="my-2"
    :rules="[requiredRule, weightRule]"
    :label="t('weight')"
    :value="props.value"
    @update:value="emit('update:value', $event)"
    :suffix="t('kgs')"
  />
</template>

<script setup lang="ts">
import NumberInput from "@/components/ui/NumberInput.vue";
import { defineEmits, defineProps } from "vue";
import useValidators from "@/hooks/useValidators";
import { useI18n } from "vue-i18n";

const { weightRule, requiredRule } = useValidators();
const { t } = useI18n();

const props = defineProps({
  value: { type: Date, default: null },
});
const emit = defineEmits(["update:value"]);
</script>

<style scoped></style>
