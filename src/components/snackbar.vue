<template>
  <v-snackbar :top="top" v-model="visibility" :timeout="timeout" :color="color">
    {{ message }}

    <template v-slot:actions>
      <v-btn :color="buttonColor" text @click="hideSnackbar">
        {{ $t("close") }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "snackbar-vue",
  computed: {
    ...mapGetters("snackbar", [
      "buttonColor",
      "color",
      "timeout",
      "message",
      "top",
    ]),
    visibility: {
      get() {
        return this.$store.getters["snackbar/visibility"];
      },
      set(newValue) {
        this.setVisibility(newValue);
      },
    },
  },
  methods: {
    ...mapMutations("snackbar", ["hideSnackbar", "setVisibility"]),
  },
};
</script>
