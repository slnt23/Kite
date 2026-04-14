import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser, isAuthenticated } from '../utils/auth.session.js'
import adminRoutes from './modules/admin.routes.js'
import frontRoutes from './modules/front.routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [...frontRoutes, ...adminRoutes],
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
  const requiresAdmin = to.matched.some((record) => record.meta?.requiresAdmin)
  const publicOnly = to.matched.some((record) => record.meta?.publicOnly)
  const authenticated = isAuthenticated()
  const currentUser = getCurrentUser()

  if (requiresAuth && !authenticated) {
    return {
      name: 'front-login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (requiresAdmin && currentUser?.role !== 'admin') {
    return {
      name: 'front-profile',
    }
  }

  if (publicOnly && authenticated) {
    return {
      name: currentUser?.role === 'admin' ? 'admin-dashboard' : 'front-profile',
    }
  }

  return true
})

export default router
