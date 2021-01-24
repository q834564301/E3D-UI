import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决重复访问路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/FileList'
  },
  {
    path: '/FileList',
    name: 'FileList',
    component: () => import(/* webpackChunkName: "FileList" */ '../views/FileList/index.vue'),
    meta: {
      title: '文件管理'
    }
  }
]

const router = new VueRouter({
  routes
})

//  页面标题改变 -> meta.title
router.beforeEach((to, from, next) => {
  to.meta && (document.title = to.meta.title)
  next()
})

export default router
