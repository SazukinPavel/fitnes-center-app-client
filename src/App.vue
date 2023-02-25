<template>
  <v-app>
    <app-header />
    <app-main>
      <router-view />
    </app-main>
  </v-app>
</template>

<script>
import appHeader from "@/components/layouts/header/header.vue";
import appMain from "@/components/layouts/main.vue";
export default {
  name: "App",
  components: { appHeader, appMain },
};
</script>
