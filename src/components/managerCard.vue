<template>
  <v-card>
    <v-card-actions class="d-flex justify-end">
      <v-btn
        color="primary"
        variant="outlined"
        size="x-small"
        append-icon="mdi-basket"
        @click="deleteClient"
        :loading="isDeleteLoading"
        icon
        ><v-icon size="small">mdi-delete</v-icon></v-btn
      >
    </v-card-actions>
    <v-card-title>Логин: {{ props.manager.auth.fio }}</v-card-title>
    <v-card-title>ФИО: {{ props.manager.auth.login }}</v-card-title>
    <v-expansion-panels>
      <v-expansion-panel title="Больше информации">
        <v-expansion-panel-text>
          <v-card variant="text">
            <v-card-title
              >Дата рождения:
              {{ formatDate(props.manager.auth.birthDate) }}</v-card-title
            >
            <v-card-title>Описание:</v-card-title>
            <v-card-text>
              {{ props.manager.description }}
            </v-card-text>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
  <v-divider />
</template>
<script setup lang="ts">
import { PropType, defineProps, ref } from "vue";
import { useStore } from "vuex";
import useFormaters from "@/hooks/useFormaters";
import Manager from "@/types/Manager";

const store = useStore();

const props = defineProps({
  manager: { type: Object as PropType<Manager>, required: true },
});

const { formatDate } = useFormaters();

const isDeleteLoading = ref(false);

const deleteClient = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch("managers/delete", props.manager?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: `Тренер ${props.manager?.auth?.fio} успешно удалён`,
    });
  } catch {
    store.commit("snackbar/showSnackbarSuccess", {
      message: `Произошла ошибка при удалении тренера ${props.manager?.auth?.fio}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};
</script>

<style scoped></style>
