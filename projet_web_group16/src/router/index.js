import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Dejeuner from "../components/Dejeuner.vue";
import Login from "./../admin/Login.vue";
import Dashboard from "./../admin/DashBoard.vue";
import Commandes from "./../admin/Commandes.vue";
import Utilisateurs from "./../admin/Utilisateur.vue";
import Produits from "../admin/Produits.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/categories/:id",
    name: "Dejeuner",
    component: Dejeuner,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/commandes",
    name: "Commandes",
    component: Commandes,
  },
  {
    path: "/utilisateurs",
    name: "Utilisateurs",
    component: Utilisateurs,
  },
  {
    path: "/produits",
    name: "Produits",
    component: Produits,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
