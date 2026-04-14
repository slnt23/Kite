import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../utils/auth.session.js'
import frontRoutes from './modules/front.routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [...frontRoutes],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const requiresAuth = to.matched.some((record) => record.meta?.requiresAuth)
  const publicOnly = to.matched.some((record) => record.meta?.publicOnly)
  const authenticated = isAuthenticated()

  if (requiresAuth && !authenticated) {
    return {
      name: 'front-login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (publicOnly && authenticated) {
    return {
      name: 'front-profile',
    }
  }

  return true
})

export default router
