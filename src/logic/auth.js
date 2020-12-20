import axios from "axios";
import Cookies from "js-cookie";

const AUTH_ENDPOINT_PATH = "http://localhost:4000/api/auth/";

export default {
  setUserLogged(token) {
    Cookies.set("token", token);
  },
  getUserLogged() {
    return Cookies.get("token");
  },
  register(name, surname, email, password) {
    const user = {
      name: name,
      surname: surname,
      email: email,
      password: password,
    };
    return axios.post(AUTH_ENDPOINT_PATH + "register", user);
  },
  login(email, password) {
    const user = {
      email: email,
      password: password,
    };
    return axios.post(AUTH_ENDPOINT_PATH + "login", user);
  },
  isLoggedIn() {
    if (this.getUserLogged()) {
      axios.defaults.headers.common["auth-token"] = this.getUserLogged();
      return true;
    } else {
      return false;
    }
  },
  async getUserData() {
    const apiPath = "http://localhost:4000/api/user";

    try {
      let user = await axios.get(`${apiPath}/me`);
      user = user.data.data;
      return user;
    } catch {
      Cookies.remove("token");
      return false;
    }
  },
};
