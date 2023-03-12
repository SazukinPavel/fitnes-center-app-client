<template>
  <v-navigation-drawer
    v-if="isLogedIn"
    color="primary"
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      :title="user?.login"
      nav
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in items"
        :key="item.value"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        @click="router.push({ name: item.value })"
      />
      <v-list-item
        v-once
        @click="logout"
        prepend-icon="mdi-logout"
        title="logout"
        value="logout"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const drawer = ref(true);
const items = ref([
  { title: "Trainers", icon: "mdi-account-group-outline", value: "Trainers" },
  {
    title: "Exercises",
    icon: "mdi-dumbbell",
    value: "Exercise types",
  },
  { title: "Diets", icon: "mdi-food-fork-drink", value: "Diets" },
]);
const rail = ref(true);

const user = computed(() => store.getters["auth/user"]);
const isLogedIn = computed(() => store.getters["auth/isLogedIn"]);

const logout = () => {
  store.commit("auth/logout");
  sessionStorage.clear();
  store.reset();
};
</script>

<style scoped></style>
