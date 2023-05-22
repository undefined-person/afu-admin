import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CreateNews from '../views/CreateNews.vue'
import NewsPreview from '../views/NewsPreview.vue'
import ViewNews from '../views/ViewNews.vue'
import EditNews from '../views/EditNews.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register',
      requiresAuth: false,
    },
  },
  {
    path: '/create-news',
    name: 'CreateNews',
    component: CreateNews,
    meta: {
      title: 'Create News',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/news-preview',
    name: 'NewsPreview',
    component: NewsPreview,
    meta: {
      title: 'Preview News Post',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/view-news/:newsId',
    name: 'ViewNews',
    component: ViewNews,
    meta: {
      title: 'View Blog Post',
      requiresAuth: false,
    },
  },
  {
    path: '/edit-news/:newsId',
    name: 'EditNews',
    component: EditNews,
    meta: {
      title: 'Edit Blog Post',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
