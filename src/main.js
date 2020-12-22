import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import VueAwesomeSwiper from 'vue-awesome-swiper'
 
// import style
import 'swiper/swiper.scss'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";

Vue.use(VueAwesomeSwiper);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
