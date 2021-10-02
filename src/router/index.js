import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import IndexPage from "../views/IndexPage.vue";
import EditaccountPage from "../views/EditaccountPage.vue";
import NotificationPage from "../views/NotificationPage.vue";
import ClassroomPage from "../views/Classroom/ClassroomPage.vue";
import AllproblemPage from "../views/Classroom/AllproblemPage.vue";
import ProblemPage from "../views/Classroom/ProblemPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/index",
    name: "Index",
    component: IndexPage,
  },
  {
    path: "/editaccount",
    name: "Editaccount",
    component: EditaccountPage,
  },
  {
    path: "/notifiacation",
    name: "Notifiacation",
    component: NotificationPage,
  },
  {
    path: "/classroom/:code",
    name: "Classroomcode",
    component: ClassroomPage,
  },
  {
    path: "/classroom/:code/allproblem",
    name: "Allproblem",
    component: AllproblemPage,
  },
  {
    path: "/classroom/:code/problem/:problemid",
    name: "Problem",
    component: ProblemPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
