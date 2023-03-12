<template>
  <v-main>
    <right-menu/>
    <v-layout>
      <v-row>
        <v-container class="mt-5">
          <slot></slot>
        </v-container>
      </v-row>
    </v-layout>
    <snackbar />
  </v-main>
</template>

<script lang="ts" setup>
import snackbar from "../snackbar.vue";
import rightMenu from "./menu/Menu.vue";
</script>
