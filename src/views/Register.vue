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
          title="Registro"
          sub-title="Todo empieza aquí"
        >
          <b-form class="mt-5" @submit="onSubmit" v-if="show">
            <b-form-group label="Nombre:">
              <b-form-input
                variant="transparent"
                class="lginput"
                v-model="form.name"
                :state="nameValidation"
                required
                placeholder="Introduce tu nombre"
              ></b-form-input>
              <b-form-invalid-feedback>
                Debe téner minímo 3 carácteres
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Apellido:">
              <b-form-input
                variant="transparent"
                class="lginput"
                v-model="form.surname"
                :state="surnameValidation"
                required
                placeholder="Introduce tu apellido"
              ></b-form-input>
              <b-form-invalid-feedback>
                Debe téner minímo 3 carácteres
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Correo electrónico:" label-for="input-1">
              <b-form-input
                variant="transparent"
                class="lginput"
                v-model="form.email"
                :state="emailstate"
                type="email"
                required
                placeholder="Introduce tu correo"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Contraseña:" label-for="input-2">
              <b-form-input
                variant="transparent"
                class="lginput"
                :state="passvalidation"
                v-model="form.pass"
                type="password"
                required
                placeholder="Introduce tu contraseña"
              ></b-form-input>
              <b-form-invalid-feedback>
                Debe contener mínimo 6 carácteres.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Confirmar contraseña:">
              <b-form-input
                variant="transparent"
                class="lginput"
                :state="confirmvalidation"
                v-model="form.confirmpass"
                type="password"
                required
                placeholder="Confirma tu contraseña"
              ></b-form-input>
              <b-form-invalid-feedback>
                Las contraseñas no coinciden.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox-group v-model="form.checked" required>
                <b-form-checkbox value="terms_accepted"
                  >Acepto los
                  <b-link v-b-modal.terms
                    >Términos de uso</b-link
                  ></b-form-checkbox
                >
              </b-form-checkbox-group>
            </b-form-group>
            <div class="container pt-4 pb-2">
              <div class="col-md-12 text-center">
                <b-button
                  v-if="!loading"
                  :disabled="disableButton"
                  type="submit"
                  class="text-center button-l"
                  variant="primary"
                >
                  Registrarse
                </b-button>
                <b-button
                  v-if="loading"
                  disabled
                  type="submit"
                  class="text-center button-l"
                  variant="primary"
                >
                  <b-spinner small variant="light" label="Loading"></b-spinner>
                </b-button>
              </div>
            </div>
          </b-form>
        </b-card>
      </div>
    </div>
    <terms></terms>
  </div>
</template>
<script>
import terms from "@/components/Terms.vue";
import auth from "@/logic/auth.js";

export default {
  components: { terms },
  data() {
    return {
      form: {
        name: "",
        surname: "",
        email: "",
        pass: "",
        confirmpass: "",
        checked: [],
      },
      emailstate: null,
      loading: false,
      show: true,
      error: false,
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
      this.emailstate = null;

      if (this.form.pass != this.form.confirmpass) {
        this.$bvToast.toast("Las constraseñas no coinciden", {
          variant: "danger",
          title: "Error",
          autoHideDelay: 10000,
          appendToast: true,
        });
        return;
      }

      auth
        .register(
          this.form.name,
          this.form.surname,
          this.form.email,
          this.form.pass
        )
        .then((res) => {
          this.$bvToast.toast(
            "Bienvenido a la familia " +
              this.form.name +
              " esperemos que disfrutes de tu pastel. 🍰🤩",
            {
              variant: "success",
              title: "Bienvenido",
              autoHideDelay: 800,
              appendToast: true,
            }
          );
          this.$bvToast.toast("Revisa tu bandeja de entrada 📥", {
            variant: "success",
            title: "Tienes un objeto nuevo 🔎",
            autoHideDelay: 800,
            appendToast: true,
          });
          this.emailstate = true;

          auth.setUserLogged(res.data.data.token);
          this.callUser();

          setTimeout(() => this.$router.push("/"), 1500);
        })
        .catch((err) => {
          const response = err.response.data.message;

          let responseMessage = "";
          switch (response) {
            case "email_registered":
              responseMessage = "El correo electónico ya está en uso.";
              this.emailstate = false;
              break;

            default:
              responseMessage = "Revisa tu correo electronico.";
              this.emailstate = false;
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

  computed: {
    confirmvalidation() {
      if (this.form.confirmpass != "") {
        return (
          this.form.pass == this.form.confirmpass && this.form.pass.length >= 6
        );
      } else {
        return null;
      }
    },
    passvalidation() {
      if (this.form.pass != "") {
        return this.form.pass.length >= 6;
      } else {
        return null;
      }
    },
    nameValidation() {
      if (this.form.name != "") {
        return this.form.name.length >= 3;
      } else {
        return null;
      }
    },
    surnameValidation() {
      if (this.form.surname != "") {
        return this.form.surname.length >= 3;
      } else {
        return null;
      }
    },
    disableButton() {
      if (
        this.form.confirmpass == "" ||
        this.form.pass == "" ||
        this.form.email == "" ||
        this.form.name == "" ||
        this.form.checked == "" ||
        this.form.pass.length < 6 ||
        this.form.name.length < 3 ||
        this.form.surname.length < 3
      ) {
        return true;
      } else if (this.form.confirmpass != this.form.pass) {
        return true;
      } else {
        return false;
      }
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
  width: 110px;
}
.loginCard .card {
  width: 395px;
  color: black;
  border-radius: 28px;
}
</style>