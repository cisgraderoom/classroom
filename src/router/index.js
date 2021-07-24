import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Index from "../views/Index.vue";
import Account from "../views/Account.vue";

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
    path: "/Account",
    name: "Account",
    component: Account,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
