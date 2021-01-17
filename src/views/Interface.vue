<template>
  <div id="app">
    <img src="../../public/bg.png" alt="bg" class="bgImg" />

    <b-navbar fixed="top" toggleable="lg" type="light" class="bgblur shadow">
      <b-navbar-brand to="/"
        ><b-icon icon="star-fill"></b-icon> Mis Peliculas</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" exact-active-class="active">Inicio</b-nav-item>
          <b-nav-item to="/movies/all" exact-active-class="active"
            >Pelis</b-nav-item
          >
          <b-nav-item to="/tv/all" exact-active-class="active"
            >Series</b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              variant="transparent"
              class="mr-sm-2 bginput"
              size="sm"
              type="text"
              placeholder="Buscar.."
            ></b-form-input>
          </b-nav-form>
          <div v-if="!user" class="center">
            <vs-button shadow class="mr-1 ml-1" to="/auth/login">
              Iniciar Sesión
            </vs-button>
            <vs-button class="mr-1 ml-1" to="/auth/register">
              Registrarse
            </vs-button>
          </div>
          <b-nav-item-dropdown v-if="user" right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ user.name }}</em>
              <b-avatar
                src="https://avatars2.githubusercontent.com/u/31970428?s=460&u=3624f8864f2bcaefe925e1b14ec530412706d857&v=4"
                size="sm"
                class="ml-2 mr-2"
              ></b-avatar>
            </template>
            <b-dropdown-item @click="userLogout()">Salir</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view :key="$route.params.id" />

    <div class="footer font-small shadow-lg footer-copyright text-center py-3">
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
.center {
  display: flex;
}
.bginput {
  padding: 19px !important;
  border: none !important;
  backdrop-filter: saturate(180%);
  -webkit-backdrop-filter: saturate(180%);
  border-radius: 13px !important;
  background-color: rgba(236, 236, 236, 0.384) !important;
}
.bgImg {
  position: absolute;
  width: 100%;
  z-index: -1;
}
.bgblur {
  background-color: rgba(255, 255, 255, 0.541) !important;
  backdrop-filter: saturate(280%) blur(20px);
  -webkit-backdrop-filter: saturate(280%) blur(20px);
}
.footer {
  background-color: rgba(255, 255, 255, 0.2);
  margin-top: 34px;
}
</style>

