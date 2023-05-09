import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import DietPage from "@/views/DietPage.vue";
import Diets from "@/views/Diets.vue";
import ExerciseTypes from "@/views/ExerciseTypes.vue";
import ManagerClients from "@/views/ManagerClients.vue";
import ManagerExercises from "@/views/ManagerExercises.vue";
import ClientsExercises from "@/views/ClientsExercises.vue";
import Managers from "@/views/Managers.vue";
import ManagerPage from "@/views/ManagerPage.vue";
import ManagerProfile from "@/views/ManagerProfile.vue";
import ClientProfile from "@/views/ClientProfile.vue";
import ManagersExercisesTypes from "@/views/ManagersExercisesTypes.vue";
import ManagerDiets from "@/views/ManagerDiets.vue";
import AddClient from "@/views/AddClient.vue";
import AddManager from "@/views/AddManager.vue";
import AddExerciseInfo from "@/views/AddExerciseInfo.vue";
import AddDiet from "@/views/AddDiet.vue";
import AddExercise from "@/views/AddExercise.vue";
import ForgetPassword from "@/views/ForgetPassword.vue";
import NewPassword from "@/views/NewPassword.vue";

const routes = [
  { path: "/login", name: "Login", component: Login },
  {
    path: "/admin/trainers",
    name: "Managers",
    component: Managers,
    meta: { isAdminRoute: true, pageTitle: "Тренера" },
  },
  {
    path: "/admin/trainers/add",
    name: "AddManager",
    component: AddManager,
    meta: { isAdminRoute: true, pageTitle: "Добавление тренера" },
  },
  {
    path: "/admin/exercises-types",
    name: "ExerciseTypes",
    component: ExerciseTypes,
    meta: { isAdminRoute: true, pageTitle: "Типы занятий" },
  },
  {
    path: "/admin/exercises-types/add",
    name: "AddExerciseType",
    component: AddExerciseInfo,
    meta: { isAdminRoute: true, pageTitle: "Добавление типа занятий" },
  },
  {
    path: "/admin/diets",
    name: "Diets",
    component: Diets,
    meta: { isAdminRoute: true, pageTitle: "Диеты" },
  },
  {
    path: "/admin/diets/add",
    name: "AddDiet",
    component: AddDiet,
    meta: { isAdminRoute: true, pageTitle: "Добавление диеты" },
  },
  {
    path: "/trainers/profile",
    name: "ManagerProfile",
    component: ManagerProfile,
    meta: { isManagerRoute: true, pageTitle: "Мой профиль" },
  },
  {
    path: "/trainers/clients",
    name: "ManagerClients",
    component: ManagerClients,
    meta: { isManagerRoute: true, pageTitle: "Клиенты" },
  },
  {
    path: "/trainers/clients/add",
    name: "AddClient",
    component: AddClient,
    meta: { isManagerRoute: true, pageTitle: "Добавление клиента" },
  },
  {
    path: "/trainers/exercises",
    name: "ManagerExercises",
    component: ManagerExercises,
    meta: { isManagerRoute: true, pageTitle: "Занятия" },
  },
  {
    path: "/trainers/exercises/add",
    name: "AddExercise",
    component: AddExercise,
    meta: { isManagerRoute: true, pageTitle: "Добавление занятия" },
  },
  {
    path: "/trainers/exercise-infos",
    name: "ManagersExercisesTypes",
    component: ManagersExercisesTypes,
    meta: { isManagerRoute: true, pageTitle: "Типы занятий" },
  },
  {
    path: "/manager/diets",
    name: "ManagerDiets",
    component: ManagerDiets,
    meta: { isManagerRoute: true, pageTitle: "Диеты" },
  },
  {
    path: "/client/profile",
    name: "ClientProfile",
    component: ClientProfile,
    meta: { isClientRoute: true, pageTitle: "Мой профиль" },
  },
  {
    path: "/client/exercises",
    name: "ClientExercises",
    component: ClientsExercises,
    meta: { isClientRoute: true, pageTitle: "Занятия" },
  },
  {
    path: "/client/trainer",
    name: "ManagerPage",
    component: ManagerPage,
    meta: { isClientRoute: true, pageTitle: "Тренер" },
  },
  {
    path: "/client/diet",
    name: "DietPage",
    component: DietPage,
    meta: { isClientRoute: true, pageTitle: "Диета" },
  },
  {
    path: "/forget-password",
    name: "ForgetPassword",
    component: ForgetPassword,
    meta: { pageTitle: "Восстоновление пароля" },
  },
  {
    path: "/new-password",
    name: "NewPassword",
    meta: { noRedirect: true, pageTitle: "Восстоновление пароля" },
    component: NewPassword,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
