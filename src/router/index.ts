import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create-task",
    name: "CreateTask",
    component: () => import("../views/CreateTask.vue"),
  },
  {
    path: "/task-details/:id",
    name: "TaskDetails",
    component: () => import("../views/TaskDetails.vue"),
  },
  {
    path: "/edit-task/:id",
    name: "EditTask",
    component: () => import("../views/EditTask.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
