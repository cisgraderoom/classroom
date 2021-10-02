import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Index from "../views/Index.vue";
import Editaccount from "../views/Editaccount.vue";
import Classroom from "../views/Classroom/Classroom.vue";
import Allproblem from "../views/Classroom/Allproblem.vue";
import Problem from "../views/Classroom/Problem.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/index",
    name: "Index",
    component: Index,
  },
  {
    path: "/editaccount",
    name: "Editaccount",
    component: Editaccount,
  },
  {
    path: "/classroom/:code",
    name: "Classroomcode",
    component: Classroom,
  },
  {
    path: "/classroom/:code/allproblem",
    name: "Allproblem",
    component: Allproblem,
  },
  {
    path: "/classroom/:code/problem/:problemid",
    name: "Problem",
    component: Problem,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
