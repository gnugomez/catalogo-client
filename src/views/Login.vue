<template>
  <div>
    <div
      class="d-flex align-items-center justify-content-center"
      style="
        height: 100vh;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-image: url(https://images2.alphacoders.com/111/thumb-1920-1116537.png);
      "
    >
      <div class="loginCard">
        <b-card
          variant="transparent"
          class="shadow-lg bgblur p-3"
          title="Iniciar Sesión"
          sub-title="Introduce tus datos de acceso"
        >
          <b-form class="mt-5" @submit="onSubmit">
            <b-form-group label="Correo electrónico:" label-for="input-1">
              <b-form-input
                variant="transparent"
                class="lginput"
                :state="state"
                v-model="form.email"
                type="email"
                required
                placeholder="Introduce tu correo"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Contraseña:" label-for="input-2">
              <b-form-input
                variant="transparent"
                class="lginput"
                :state="state"
                v-model="form.pass"
                type="password"
                required
                placeholder="Introduce tu contraseña"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox-group v-model="form.remember">
                <b-form-checkbox value="remember">¿Recordar?</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
            <div class="container pt-4 pb-2">
              <div class="col-md-12 text-center">
                <b-button
                  v-if="!loading"
                  type="submit"
                  class="text-center button-l"
                  variant="warning"
                >
                  Entrar
                </b-button>
                <b-button
                  v-if="loading"
                  disabled
                  type="submit"
                  class="text-center button-l"
                  variant="warning"
                >
                  <b-spinner small variant="light" label="Loading"></b-spinner>
                </b-button>
              </div>
            </div>
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
import auth from "@/logic/auth.js";

export default {
  data() {
    return {
      form: {
        email: "",
        pass: "",
        remember: [],
      },
      loading: false,
      state: null,
    };
  },
  methods: {
    async callUser() {
      if (auth.isLoggedIn()) {
        this.$parent.user = await auth.getUserData();
      } else {
        this.$parent.user = false;
      }
    },
    onSubmit(evt) {
      evt.preventDefault();

      this.loading = true;

      auth
        .login(this.form.email, this.form.pass)
        .then((res) => {
          this.$bvToast.toast("Has iniciado sesión", {
            variant: "success",
            title: "Bienvenido de nuevo",
            autoHideDelay: 800,
            appendToast: true,
          });

          this.state = true;

          auth.setUserLogged(res.data.data.token);
          this.callUser();

          setTimeout(() => this.$router.push("/"), 1500);
        })
        .catch((err) => {
          const response = err.response.data.message;
          console.log(response);

          this.loading = false;

          let responseMessage = "";

          switch (response) {
            case "not_valid":
              responseMessage =
                "El correo electónico o la contraseña son incorrectos.";
              this.state = false;
              break;

            default:
              responseMessage = "Revisa tu correo electronico.";
              this.state = false;
              break;
          }

          this.$bvToast.toast(responseMessage, {
            variant: "danger",
            title: "Error 😕",
            autoHideDelay: 5000,
            appendToast: true,
          });

          this.loading = false;
        });
    },
  },
};
</script>
<style lang="css" scoped>
.lginput {
  padding: 23px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.384);
}
.button-l {
  width: 80px;
}
.loginCard,
.card {
  width: 395px;
  color: black;
  border-radius: 28px;
}
</style>