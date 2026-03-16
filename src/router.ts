import { createRouter, createWebHistory } from 'vue-router'

import { ROUTES } from './constants/routes.js'
import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import { useAuthStore } from './stores/auth.js'

export { ROUTES }

const routes = [
  {
    path: ROUTES.HOME,
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: ROUTES.LOGIN,
    component: LoginPage,
    meta: { requiresGuest: true },
  },
  {
    path: ROUTES.REGISTER,
    component: RegisterPage,
    meta: { requiresGuest: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: ROUTES.LOGIN }
  }

  if (to.meta.requiresGuest && auth.isAuthenticated) {
    return { path: ROUTES.HOME }
  }

  return true
})

export default router
