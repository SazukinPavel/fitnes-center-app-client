<template>
  <v-card variant="text">
    <v-card-title class="text-center text-wrap"
      >{{ t("trainer") }}:</v-card-title
    >
    <div class="d-flex justify-center align-center">
      <v-avatar v-if="avatarImage" :image="avatarImage" size="200"></v-avatar>
    </div>
    <v-card-title class="text-wrap">{{ manager?.auth.fio }}</v-card-title>
    <v-card-title class="text-wrap"
      >{{ t("age") }}: {{ managerAge }}</v-card-title
    >
    <v-card-title class="text-wrap"
      >{{ t("telephoneNumber") }}: {{ manager?.auth.telephone }}</v-card-title
    >
    <v-card-text>{{ manager?.description }}</v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import Client from "@/types/entitys/Client";
import moment from "moment";
import Manager from "@/types/entitys/Manager";
import useUserAvatar from "@/hooks/userAvatar";
import { useI18n } from "vue-i18n";

const store = useStore();
const { t } = useI18n();

const user = computed<Client>(() => store.getters["auth/user"]);
const manager = computed<Manager | undefined>(() => user.value?.owner);

const managerAge = computed(() => {
  return moment().diff(manager.value?.auth?.birthDate, "years");
});

const avatarImage = useUserAvatar(manager.value);
</script>

<style scoped></style>
