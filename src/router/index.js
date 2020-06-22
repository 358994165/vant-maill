import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home.vue')
const Detail = () => import('@/views/detail/Detail')
const Category = () => import('@/views/category/Category')
const Car = () => import('@/views/car/Car')
const Profile = () => import('@/views/profile/Profile')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/car',
    component: Car
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
