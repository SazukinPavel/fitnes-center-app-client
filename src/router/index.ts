import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Client from "@/views/Client.vue";
import Manager from "@/views/Manager.vue";
import Admin from "@/views/Admin.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/client", name: "Client", component: Client },
  {
    path: "/manager",
    name: "Manager",
    component: Manager,
    meta: { isManagerRoute: true },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { isAdminRoute: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
