import Vue from "vue";
import Router from "vue-router";
import axios from "axios";
import Signup from "../components/Signup.vue";
import Login from "../components/Login.vue";
import NewProfile from "../components/NewProfile.vue";
import Profile from "../components/Profile.vue";
import EditProfile from "../components/EditProfile.vue";
import NewContact from "../components/NewContact.vue";
import Start from "../components/Start.vue";
import NewQuestion from "../components/NewQuestion.vue";
import Questions from "../components/Questions.vue";
import Question from "../components/Question.vue";
import NewPost from "../components/NewPost.vue";
import Posts from "../components/Posts.vue";
import NewArticle from "../components/NewArticle.vue";
import Article from "../components/Article.vue";
import Articles from "../components/Articles.vue";
import AboutUs from "../components/AboutUs.vue";

Vue.use(Router);

const routes = [
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
  { path: "/profiles/new", component: NewProfile },
  { path: "/profile/:id", name: "profile", component: Profile },
  { path: "/profiles/edit", component: EditProfile },
  { path: "/contacts/new", component: NewContact },
  { path: "/start", component: Start },
  { path: "/questions/new", component: NewQuestion },
  { path: "/questions", component: Questions },
  { path: "/question/:id", name: "question", component: Question },
  { path: "/posts/new", component: NewPost },
  { path: "/posts", component: Posts },
  { path: "/articles/new", component: NewArticle },
  { path: "/article/:id", name: "article", component: Article },
  { path: "/articles", component: Articles },
  { path: "/about_us", component: AboutUs }
];

const router = new Router({
  // mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  axios.get("/api/session_check").then((res) => {
    if (to.path == "/signup" || to.path == "/login") {
      if (res.data) {
        next("/posts");
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
});

export default router;