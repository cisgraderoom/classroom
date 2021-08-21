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
    path: "/Index",
    name: "Index",
    component: Index,
  },
  {
    path: "/Editaccount",
    name: "Editaccount",
    component: Editaccount,
  },
  {
    path: "/Classroom",
    name: "Classroom",
    component: Classroom,
  },
  {
    path: "/Classroom/Allproblem",
    name: "Allproblem",
    component: Allproblem,
  },
  {
    path: "/Classroom/Problem",
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
