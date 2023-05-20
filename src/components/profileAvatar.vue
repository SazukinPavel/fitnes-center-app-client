<template>
  <div class="d-flex flex-column align-center my-3">
    <v-avatar :image="previewImage || avatarUrl" size="200"></v-avatar>
    <v-file-input
      @update:model-value="updateFiles"
      accept="image/png, image/jpeg, image/bmp, image/jpg, img/svg"
      style="display: none"
      ref="uploadAvatar"
    />
    <div class="d-flex justify-end mt-5">
      <v-btn
        :disabled="!user.auth?.avatar?.id || !!previewImage || isSaveLoading"
        :loading="isDeleteLoading"
        icon
        class="mx-3"
        @click="deleteAvatar"
        ><v-icon>mdi-delete</v-icon></v-btn
      >
      <v-btn
        @click="resetPreview"
        :disabled="!newAvatar || isLoading"
        icon
        class="mx-3"
        ><v-icon>mdi-restore</v-icon></v-btn
      >
      <v-btn @click="openUpload" :disabled="isLoading" icon class="mx-3"
        ><v-icon>mdi-upload</v-icon></v-btn
      >
      <v-btn
        :loading="isSaveLoading"
        :disabled="!newAvatar || isDeleteLoading"
        icon
        class="mx-3"
        @click="saveAvatar"
        ><v-icon>mdi-content-save</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, toRefs, PropType } from "vue";
import api from "@/api";
import AvatarsService from "@/services/AvatarsService";
import { User } from "@/types/entitys/User";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const props = defineProps({
  user: { required: true, type: Object as PropType<User> },
});
const { user } = toRefs(props);

const store = useStore();
const { t } = useI18n();

const uploadAvatar = ref<any | null>(null);
const newAvatar = ref<any>(null);
const isSaveLoading = ref(false);
const isDeleteLoading = ref(false);

const openUpload = () => {
  uploadAvatar.value.click();
};

const saveAvatar = async () => {
  isSaveLoading.value = true;
  try {
    const res = await api.avatars.add({
      file: newAvatar.value,
      owner: user.value.auth?.id || "",
    });
    store.commit("auth/setUser", {
      ...user?.value,
      auth: { ...user?.value?.auth, avatar: res.data },
    });
  } catch {
    store.commit("snackbar/showSnackbarError", {
      message: t("errors.saveAvatar"),
    });
  } finally {
    resetPreview();
    isSaveLoading.value = false;
  }
};

const updateFiles = (files: File[]) => {
  if (files[0]) {
    newAvatar.value = files[0];
  }
};

const resetPreview = () => {
  newAvatar.value = null;
};

const deleteAvatar = async () => {
  isDeleteLoading.value = true;
  try {
    await api.avatars.drop(user?.value?.auth?.avatar.id || "");
    store.commit("auth/setUser", {
      ...user?.value,
      auth: { ...user?.value?.auth, avatar: null },
    });
  } catch (e) {
    console.log(e);
    store.commit("snackbar/showSnackbarError", {
      message: t("errors.deleteAvatar"),
    });
  } finally {
    isDeleteLoading.value = false;
  }
};

const previewImage = computed(() => {
  if (!newAvatar.value) {
    return;
  }
  return URL.createObjectURL(newAvatar.value);
});
const avatarUrl = computed(() => AvatarsService.getAvatarUrl(user.value));
const isLoading = computed(() => isDeleteLoading.value || isSaveLoading.value);
</script>

<style scoped></style>
