import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Film from "../views/Film.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import auth from "@/logic/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) next(from);
      else next();
    },
  },
  {
    path: "/auth/register",
    name: "Register",
    component: Register,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn()) next(from);
      else next();
    },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/film",
    name: "Film",
    component: Film,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
