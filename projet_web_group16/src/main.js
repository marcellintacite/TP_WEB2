import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "../src/app.css";
import Notifications from "vue-notification";
import VueEllipseProgress from "vue-ellipse-progress";

Vue.use(VueEllipseProgress);
Vue.config.productionTip = false;
Vue.use(Notifications);
new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
