import Vue from "vue";
import VueRouter from "vue-router";

// Views
import Interface from "../views/Interface.vue";
import Home from "../views/Home.vue";
import MovieInfo from "../views/MovieInfo.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

//Componentes
import Teaser from "@/components/Teaser";
import FilmImages from "@/components/FilmImages";
import FilmVideos from "@/components/FilmVideos";

//Logic
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
    component: Interface,
    children: [{
      path: "",
      component: Home
    }]
  },
  {
    path: "/movie/:id/info",
    component: Interface,
    children: [{
      path: "",
      component: MovieInfo,
      children: [
        {
          path: "", name: "teaser", component: Teaser
        },
        {
          path: "", name: "images", component: FilmImages
        },
        {
          path: "", name: "videos", component: FilmVideos
        }
      ]
    }]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
