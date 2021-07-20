import Vue from "vue";
import VueRouter from "vue-router";
import Accueil from "../views/Accueil.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Accueil",
    component: Accueil, 
    meta: {
      auth: true
    }
  },
  {
    path: "/gif-creation",
    name: "Gif",
    meta: {
      auth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Gif-creation.vue"),
  },
  {
    path: "/profil",
    name: "Profil",
    meta: {
      auth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profil.vue"),
  },
  {
    path: "/inscription",
    name: "Inscription",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Inscription.vue"),
  },
  {
    path: "/connexion",
    name: "Connexion",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Connexion.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(function(to, from, next) {
  if (!(to.meta && to.meta.auth)) {
    return next()
  } 
  if(!localStorage.getItem("token")) {
    return  next({
      path:"/connexion"
    })
  } return next()
})

export default router;
