<template>
  <right-menu v-if="isLogedIn" />
  <main :class="isLogedIn && 'logedIn'">
    <slot></slot>
  </main>
  <snackbar />
</template>

<script lang="ts" setup>
import snackbar from "../snackbar.vue";
import RightMenu from "./menu.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const isLogedIn = computed(() => store.getters["auth/isLogedIn"]);
</script>

<style scoped lang="scss">
.logedIn {
  margin-left: 60px;
}
</style>
