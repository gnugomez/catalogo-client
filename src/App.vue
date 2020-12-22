<template>
  <div id="app">
    <img
      v-show="
        $route.path === '/auth/register' || $route.path === '/auth/login'
          ? false
          : true
      "
      src="../public/bg.png"
      alt="bg"
      class="bgImg"
    />

    <b-navbar
      v-show="
        $route.path === '/auth/register' || $route.path === '/auth/login'
          ? false
          : true
      "
      fixed="top"
      toggleable="lg"
      type="light"
      class="bgblur"
    >
      <b-navbar-brand to="/"
        ><b-icon icon="star-fill"></b-icon> Mis Peliculas</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Inicio</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->

        <b-navbar-nav class="ml-auto">
          <div v-if="!user">
            <b-button class="mr-1 ml-1" to="/auth/login" variant="light"
              >Iniciar Sesión</b-button
            >
            <b-button class="mr-1 ml-1" to="/auth/register" variant="primary">
              Registrarse
            </b-button>
          </div>
        </b-navbar-nav>
        <div v-if="user">
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ user.name }}</em>
                <b-avatar
                  src="https://avatars2.githubusercontent.com/u/31970428?s=460&u=3624f8864f2bcaefe925e1b14ec530412706d857&v=4"
                  size="30px"
                  class="ml-2 mr-2"
                ></b-avatar>
              </template>
              <b-dropdown-item @click="userLogout()">Salir</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </div>
      </b-collapse>
    </b-navbar>

    <router-view />

    <div
      v-show="
        $route.path === '/auth/register' || $route.path === '/auth/login'
          ? false
          : true
      "
      class="footer font-small shadow-lg footer-copyright text-center py-3"
    >
      <b-container fluid>
        Made with ❤️ by
        <b-link target="_blank" href="https://github.com/gnugomez">
          gnugomez
        </b-link>
      </b-container>
    </div>
  </div>
</template>
<script>
import auth from "@/logic/auth";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      user: {
        name: "",
        surname: "",
        email: "",
        user: false,
      },
    };
  },
  async mounted() {
    if (auth.isLoggedIn()) {
      this.user = await auth.getUserData();
    } else {
      this.user = false;
    }
  },
  methods: {
    userLogout() {
      Cookies.remove("token");
      this.user = false;
    },
  },
};
</script>
<style lang="css">
.bgImg {
  position: absolute;
  width: 100%;
  z-index: -1;
}
.bgblur {
  background-color: rgba(255, 255, 255, 0.541) !important;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}
.footer {
  background-color: rgba(255, 255, 255, 0.2);
  margin-top: 34px;
}
</style>

