import { createRouter, createWebHistory } from 'vue-router'

import { useInstanceStore } from '../stores/instance.js'
import { useUserStore } from '../stores/user.js'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: { title: '注册' },
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        alias: '/dashboard',
        name: 'Dashboard',
        meta: { title: '首页' },
        component: () => import('../views/Dashboard.vue'),
      },
      {
        path: '/userHome',
        name: 'UserHome',
        meta: { title: '个人主页' },
        component: () => import('../views/UserHome.vue')
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    meta: { title: '无权限' },
    component: () => import('../views/403.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404' },
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  document.title = `Front - ${to.meta.title}`
  const store = useInstanceStore()
  const userStore = useUserStore()
  // console.log('token: ', store.token, 'user: ', userStore.user.UID, 'path', to.path);
  if (!store.token && to.path !== '/login' && to.path !== '/register') {
    next('/login')
  } else {
    if (!userStore.user.UID && to.path !== '/login' && to.path !== '/register') {
      userStore.loadUser()
    }
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.name === null || to.name === undefined) {
    next('/404')
  } else {
    next()
  }
})

export default router
