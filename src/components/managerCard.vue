<template>
  <v-card>
    <v-card-actions class="d-flex justify-space-between">
      <v-avatar v-if="managerAvatar" :image="managerAvatar" />
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
    <v-card-title class="text-wrap"
      >{{ t("login") }}: {{ props.manager.auth.login }}</v-card-title
    >
    <v-card-title class="text-wrap"
      >{{ t("fio") }}: {{ props.manager.auth.fio }}</v-card-title
    >
    <v-expansion-panels>
      <v-expansion-panel :title="t('moreInfo')">
        <v-expansion-panel-text>
          <v-card variant="text">
            <v-card-title class="text-wrap"
              >{{ t("birthDate") }}:
              {{ formatDate(props.manager.auth.birthDate) }}</v-card-title
            >
            <v-card-title class="text-wrap"
              >{{ t("telephoneNumber") }}:
              {{ props.manager.auth.telephone }}</v-card-title
            >
            <v-card-title class="text-wrap"
              >{{ t("description") }}:</v-card-title
            >
            <v-card-text class="text-wrap">
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
import Manager from "@/types/entitys/Manager";
import useUserAvatar from "@/hooks/userAvatar";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();

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
      message: `${t("trainer")} ${props.manager?.auth?.fio} ${t(
        "deleteSuccessHe"
      )}`,
    });
  } catch {
    store.commit("snackbar/showSnackbarSuccess", {
      message: `${t("deleteTrainer")}${props.manager?.auth?.fio}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};

const managerAvatar = useUserAvatar(props.manager);
</script>

<style scoped></style>
