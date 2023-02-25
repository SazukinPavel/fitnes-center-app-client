<template>
  <v-toolbar max-height="60px" class="px-5 align-center" color="primary">
    <v-btn v-if="isBackButtonShow" color="background" @click="back">back</v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items class="mr-5">
      <based-header />
      <authorizedHeader v-if="isLogedIn" />
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import authorizedHeader from "./authorizedHeader.vue";
import basedHeader from "./basedHeader.vue";

export default {
  name: "app-header",
  components: { authorizedHeader, basedHeader },
  computed: {
    isLogedIn() {
      return false;
    },
    isBackButtonShow() {
      return this.$store.getters["app/isBackButtonShow"];
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
