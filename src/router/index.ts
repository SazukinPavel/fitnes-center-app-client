import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Client from "@/views/Client.vue";
import Manager from "@/views/Manager.vue";
import TrainerPage from "@/views/TrainerPage.vue";
import DietPage from "@/views/DietPage.vue";
import Diets from "@/views/Diets.vue";
import ExerciseTypes from "@/views/ExerciseTypes.vue";
import Trainers from "@/views/Trainers.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  {
    path: "/client",
    name: "Client",
    component: Client,
    meta: { isClientRoute: true },
  },
  {
    path: "/manager",
    name: "Manager",
    component: Manager,
    meta: { isManagerRoute: true },
  },
  {
    path: "/admin/trainers",
    name: "Trainers",
    component: Trainers,
    meta: { isAdminRoute: true },
  },
  {
    path: "/admin/exercises",
    name: "Exercise types",
    component: ExerciseTypes,
    meta: { isAdminRoute: true },
  },
  {
    path: "/admin/diets",
    name: "Diets",
    component: Diets,
    meta: { isAdminRoute: true },
  },
  {
    path: "/trainer",
    name: "Trainer page",
    component: TrainerPage,
    meta: { isClientRoute: true },
  },
  {
    path: "/diet",
    name: "Diet page",
    component: DietPage,
    meta: { isClientRoute: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
