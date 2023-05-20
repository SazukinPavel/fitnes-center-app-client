<template>
  <v-row class="ml-3" style="max-width: 500px">
    <v-autocomplete
      :label="t('date')"
      class="mr-3"
      :model-value="modelValue"
      style="max-width: 250px; min-width: 250px"
      @update:model-value="emit('update:modelValue', $event)"
      :items="dates"
      item-title="date"
      item-value="date"
      filter-mode="some"
      density="comfortable"
    />
    <v-select
      style="max-width: 150px; min-width: 150px"
      density="comfortable"
      v-model="dateType"
      :items="dateTypeItems"
      item-title="text"
      item-value="value"
      :label="t('exDates')"
    />
  </v-row>
</template>

<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineProps,
  onMounted,
  ref,
  toRefs,
  watch,
} from "vue";
import { PropType } from "vue";
import { Exercise } from "@/types/entitys/Exercise";
import useFormaters from "@/hooks/useFormaters";
import moment from "moment";
import { useI18n } from "vue-i18n";

interface DateItem {
  isReal: boolean;
  date: string;
}

const props = defineProps({
  modelValue: { type: String, required: true },
  exercises: { type: Object as PropType<Exercise[]>, required: true },
});

const { exercises } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

const dateTypeItems = computed(() => [
  { text: t("dateTypeItems.hide"), value: true },
  { text: t("dateTypeItems.show"), value: false },
]);
const dateType = ref(true);

const { formatDate } = useFormaters();
const { t } = useI18n();

const dates = computed<DateItem[]>(() => {
  const set = new Set(
    props.exercises
      ?.filter((d) => !dateType.value || moment(d.date).isAfter(moment()))
      .map((d) => ({ isReal: true, date: formatDate(d.date) }))
  );
  const result: DateItem[] = [];
  set.add({ isReal: false, date: formatDate(new Date(Date.now())) });
  set.forEach((v) => result.push(v));
  return result.sort((a, b) => moment.utc(a.date).diff(moment.utc(b.date)));
});

const setDefaultDate = () => {
  emit(
    "update:modelValue",
    formatDate(
      moment.min(dates.value.filter((d) => d.isReal).map((d) => moment(d.date)))
    )
  );
};

onMounted(() => {
  setDefaultDate();
});

watch(exercises, () => {
  setDefaultDate();
});
</script>

<style scoped></style>
