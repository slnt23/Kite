import { createRouter, createWebHistory } from 'vue-router'
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

export default router
