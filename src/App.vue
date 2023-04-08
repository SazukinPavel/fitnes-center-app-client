<template>
  <v-app>
    <app-main v-if="!isAuthorizeLoading">
      <router-view />
    </app-main>
  </v-app>
</template>

<script setup lang="ts">
import appMain from "@/components/layouts/main.vue";
import { computed, ComputedRef, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Role from "@/types/Role";

const store = useStore();
const router = useRouter();
const route = useRoute();

const isAuthorizeLoading = ref(true);

onMounted(async () => {
  try {
    await authorize();
  } catch {
    redirectToLogin();
  } finally {
    isAuthorizeLoading.value = false;
  }

  setupRouter();
});

const setupRouter = () => {
  if (
    route.matched.some((el: any) => !el.meta.isAdminRoute) &&
    role.value === "admin"
  ) {
    router.replace({ name: "Managers" });
  } else if (
    route.matched.some((el: any) => !el.meta.isManagerRoute) &&
    role.value === "manager"
  ) {
    router.replace({ name: "ManagerClients" });
  } else if (
    isLogedIn.value &&
    role.value === "client" &&
    route.matched.some((el: any) => !el.meta.isClientRoute)
  ) {
    router.replace({ name: "ClientInfo" });
  }
  router.beforeEach((to: any, from: any, next: any) => {
    if (!isLogedIn.value && to.path !== "/login") {
      redirectToLogin();
    } else if (
      (role.value === "admin" &&
        to.matched.some((el: any) => !el.meta.isAdminRoute)) ||
      (role.value === "manager" &&
        to.matched.some((el: any) => !el.meta.isManagerRoute)) ||
      (role.value === "client" &&
        to.matched.some((el: any) => !el.meta.isClientRoute))
    ) {
      next(from);
    } else {
      next();
    }
  });
  router.afterEach((to: any) => {
    setTitle(to.name);
  });
};
const setTitle = (value: string) => {
  document.title = `${value} | Fitness`;
};
const authorize = async () => {
  await store.dispatch("auth/init");
};
const redirectToLogin = () => {
  if (route.name !== "Login") {
    router.replace({ name: "Login" });
  }
};

const isLogedIn = computed(() => store.getters["auth/isLogedIn"]);
const role: ComputedRef<Role> = computed(() => store.getters["auth/role"]);

const redirectRouteName = computed<string>(() => {
  switch (role.value) {
    case "admin": {
      return "Managers";
    }
    case "manager": {
      return "ManagerClients";
    }
    case "client": {
      return "ClientInfo";
    }
    default: {
      return "Login";
    }
  }
});

watch(
  () => role.value,
  () => {
    if (!isAuthorizeLoading.value) {
      router.push({ name: redirectRouteName.value });
    }
  }
);
// const isLogedInPage = computed(() => route.name === "Login");
</script>
