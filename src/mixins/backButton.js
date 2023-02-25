const backButton = {
  mounted() {
    this.$store.commit("app/setIsBackButtonShow", true);
  },
  destroyed() {
    this.$store.commit("app/setIsBackButtonShow", false);
  },
};

export default backButton;
