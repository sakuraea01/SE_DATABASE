import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import dashboard from "../views/Dashboard.vue";
import adminchecklist from "../views/Admin_checklist.vue";
import login from "../views/login.vue";
import userchecklist from "../views/Myreq.vue";
import Course from "../views/Coures.vue";
import AAAA from "../views/testtype.vue";
import Getstart from "../views/Getstart.vue";
import App from "../App.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Getstart",
    component: Getstart,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
  },
  {
    path: "/AAAA",
    name: "AAAA",
    component: AAAA,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/admin",
    name: "adminchecklist",
    component: adminchecklist,
  },
  {
    path: "/course",
    name: "Course",
    component: Course,
  },
  {
    path: "/My_reservations",
    name: "userchecklist",
    component: userchecklist,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
export default router;
