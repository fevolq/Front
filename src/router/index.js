import { createRouter, createWebHistory } from 'vue-router'

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
  const token = localStorage.getItem('token')
  if (!token && to.path !== '/login' && to.path !== '/register') {
    next('/login')
  } else {
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
