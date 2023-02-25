<template>
  <v-container class="ma-0 pa-0 ml-3" v-if="isLogoutButtonShow">
    <p
      style="width: 150px; cursor: pointer"
      class="mt-3 white--text text-sm-h6"
    >
      {{ "Logout" }}
      <v-icon color="white">mdi-logout</v-icon>
    </p>
  </v-container>
</template>

<script>
export default {
  name: "auth-header",
  computed: {
    isLogoutButtonShow() {
      return this.$store.getters["auth/isAuth"];
    },
  },
};
</script>
