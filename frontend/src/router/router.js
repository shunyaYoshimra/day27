import Vue from "vue";
import Router from "vue-router";
import axios from "axios";
import Users from "../components/Users.vue";
import User from "../components/User.vue";
import Signup from "../components/Signup.vue";
import Login from "../components/Login.vue";
import NewProfile from "../components/NewProfile.vue";

Vue.use(Router);

const routes = [
  { path: "/", component: Users },
  { path: "/user/:id", component: User },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
  { path: "/profiles/new", component: NewProfile }
]

const router = new Router({
  // mode: "history",
  routes
})

router.beforeEach((to, from, next) => {
  axios.get("/api/session_check").then((res) => {
    if (to.path == "/signup" || to.path == "/login") {
      if (res.data) {
        next("/");
      } else {
        next();
      }
    } else {
      if (res.data) {
        next();
      } else {
        next("/login");
      }
    }
  })
})

export default router;