import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Client from "@/views/Client.vue";
import Manager from "@/views/Manager.vue";
import TrainerPage from "@/views/TrainerPage.vue";
import DietPage from "@/views/DietPage.vue";
import Diets from "@/views/Diets.vue";
import ExerciseTypes from "@/views/ExerciseTypes.vue";
import Trainers from "@/views/Trainers.vue";
import ManagerClients from "@/views/ManagerClients.vue";
import ManagerExercises from "@/views/ManagerExercises.vue";
import ClientsExercises from "@/views/ClientsExercises.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
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
    path: "/manager/clients",
    name: "ManagerClients",
    component: ManagerClients,
    meta: { isManagerRoute: true },
  },
  {
    path: "/manager/exercises",
    name: "ManagerExercises",
    component: ManagerExercises,
    meta: { isManagerRoute: true },
  },
  {
    path: "/client",
    name: "ClientInfo",
    component: Client,
    meta: { isClientRoute: true },
  },
  {
    path: "/client/exercises",
    name: "ClientExercises",
    component: ClientsExercises,
    meta: { isClientRoute: true },
  },
  {
    path: "/client/trainer",
    name: "TrainerPage",
    component: TrainerPage,
    meta: { isClientRoute: true },
  },
  {
    path: "/client/diet",
    name: "DietPage",
    component: DietPage,
    meta: { isClientRoute: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
