import Vue from "vue";
import VueRouter from "vue-router";
import Accueil from "../views/Accueil.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Accueil",
    component: Accueil,
  },
  {
    path: "/Gif-creation",
    name: "Gif",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Gif-creation.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
