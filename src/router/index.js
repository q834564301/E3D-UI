import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/FileList'
  },
  {
    path: '/FileList',
    name: 'FileList',
    component: () => import(/* webpackChunkName: "about" */ '../views/FileList/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
