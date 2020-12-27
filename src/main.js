import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import VuePlyr from 'vue-plyr'

import VueAwesomeSwiper from 'vue-awesome-swiper'

import router from "./router";

// import style
import 'swiper/swiper.scss'
import 'vue-plyr/dist/vue-plyr.css'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";


Vue.use(VueAwesomeSwiper);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VuePlyr, {
  plyr: {}
})

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
