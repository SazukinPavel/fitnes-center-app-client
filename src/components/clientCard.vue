<template>
  <v-card class="ma-4">
    <v-card-actions class="d-flex justify-space-between">
      <v-avatar v-if="clientAvatar" :image="clientAvatar" />
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
      >{{ t("login") }}: {{ props.client.auth.login }}</v-card-title
    >
    <v-card-title class="text-wrap"
      >{{ t("fio") }}: {{ props.client.auth.fio }}</v-card-title
    >
    <v-card-title class="text-wrap">
      <div class="d-flex justify-space-between align-center">
        <span> {{ t("diet") }}: {{ props.client.diet?.name || "-" }} </span>
        <v-btn variant="outlined" size="x-small" icon>
          <v-icon size="small">mdi-pencil</v-icon>
          <v-dialog activator="parent" width="auto" v-model="setDietDialog">
            <v-card class="pa-15">
              <v-card-title class="text-wrap">{{ t("setDiet") }}</v-card-title>
              <v-form ref="dietForm">
                <v-select
                  variant="outlined"
                  color="primary"
                  :rules="[requiredRule]"
                  :label="t('diet')"
                  item-value="id"
                  item-title="name"
                  :items="diets"
                  v-model="setDietDto.dietId"
                />
              </v-form>
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  variant="outlined"
                  color="primary"
                  @click="setDietDialog = false"
                  >{{ t("close") }}</v-btn
                >
                <v-btn
                  variant="outlined"
                  class="mx-5"
                  color="primary"
                  :loading="isSetDietLoading"
                  @click="setDiet"
                  >{{ t("add") }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
      </div>
    </v-card-title>
    <v-expansion-panels>
      <v-expansion-panel :title="t('moreInfo')">
        <v-expansion-panel-text>
          <v-card variant="text">
            <v-card-title class="text-wrap"
              >{{ t("weight") }}: {{ props.client?.weight }}</v-card-title
            >
            <v-card-title class="text-wrap"
              >{{ t("height") }}: {{ props.client?.height }}</v-card-title
            >
            <v-card-title class="text-wrap"
              >{{ t("birthDate") }}:
              {{ formatDate(props.client.auth.birthDate) }}</v-card-title
            >
            <v-card-title class="text-wrap"
              >{{ t("telephoneNumber") }}:
              {{ props.client.auth.telephone || "-" }}</v-card-title
            >
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
  <v-divider />
</template>
<script setup lang="ts">
import Client from "@/types/entitys/Client";
import { PropType, defineProps, ref, computed } from "vue";
import { useStore } from "vuex";
import SetDietDto from "@/types/dto/clients/SetDietDto";
import api from "@/api";
import useValidators from "@/hooks/useValidators";
import useFormaters from "@/hooks/useFormaters";
import Diet from "@/types/entitys/Diet";
import useUserAvatar from "@/hooks/userAvatar";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();

const props = defineProps({
  client: { type: Object as PropType<Client>, required: true },
});

const { requiredRule } = useValidators();
const { formatDate } = useFormaters();
const clientAvatar = useUserAvatar(props.client);

const isDeleteLoading = ref(false);
const setDietDialog = ref(false);
const isSetDietLoading = ref(false);
const dietForm = ref<any | null>(null);

const setDietDto = ref<SetDietDto>({
  dietId: "",
  clientId: "",
});

const deleteClient = async () => {
  isDeleteLoading.value = true;
  try {
    await store.dispatch("clients/deleteClient", props.client?.id);
    store.commit("snackbar/showSnackbarSuccess", {
      message: `${t("client")} ${props.client?.auth?.fio} ${t(
        "deleteSuccessHe"
      )}`,
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `${t("errors.deleteClient")} ${props.client?.auth?.fio}`,
    });
  } finally {
    isDeleteLoading.value = false;
  }
};

const setDiet = async () => {
  if (!(await dietForm.value?.validate()).valid) {
    return;
  }
  isSetDietLoading.value = true;

  try {
    await api.clients.setDiet({
      ...setDietDto.value,
      clientId: props.client?.id || "",
    });

    store.commit("clients/setClientDiet", {
      id: props.client?.id,
      diet: diets.value.find((d) => d.id === setDietDto.value.dietId),
    });
    setDietDto.value = {
      dietId: "",
      clientId: "",
    };
    setDietDialog.value = false;
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: `${t("errors.setDiet")} ${props.client?.auth?.fio}`,
    });
  } finally {
    isSetDietLoading.value = false;
  }
};

const diets = computed<Diet[]>(() => store.getters["diets/diets"]);
</script>

<style scoped></style>
