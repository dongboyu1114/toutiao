import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login')
}, {
  path: '/',
  // name: 'layout', 如果副路由有默认子路由，那么他的name没有意义
  component: () => import('@/views/layout'),
  children: [{
    path: '/qa', // 默认子路由
    name: 'qa',
    component: () => import('@/views/qa')
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('@/views/video')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my')
  },
  {
    path: '',
    name: 'home',
    component: () => import('@/views/home')
  }]
}]
const router = new VueRouter({
  routes
})
export default router
