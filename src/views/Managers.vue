<template>
  <v-card class="ma-0 pa-0" variant="text" :loading="isManagerLoading">
    <div class="d-flex justify-space-between align-center">
      <search class="ml-5" v-model="searchParam" />
      <add-btn :to="{ name: 'AddManager' }" />
    </div>
    <div>
      <manager-card
        v-for="manager in filtredManagers"
        :manager="manager"
        :key="manager.id"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Manager from "@/types/entitys/Manager";
import ManagerCard from "@/components/managerCard.vue";
import Search from "@/components/search.vue";
import AddBtn from "@/components/ui/addBtn.vue";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();

const searchParam = ref("");
const isManagerLoading = ref(false);

onMounted(async () => {
  isManagerLoading.value = true;
  try {
    await store.dispatch("managers/fetch");
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: t("errors.fetchManagers"),
    });
  } finally {
    isManagerLoading.value = false;
  }
});

const managers = computed<Manager[]>(() => store.getters["managers/managers"]);
const filtredManagers = computed<Manager[]>(() => {
  if (!searchParam.value) {
    return managers.value;
  }

  return managers.value.filter(
    (m) =>
      m.auth?.login.toLowerCase().startsWith(searchParam.value.toLowerCase()) ||
      m.auth?.fio.startsWith(searchParam.value.toLowerCase()) ||
      m.id?.toLowerCase().startsWith(searchParam.value.toLowerCase())
  );
});
</script>
