
import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated, getCurrentUser } from '@/utils/auth.js'
import adminRoutes from './modules/admin.routes.js'
import frontRoutes from './modules/front.routes.js'


// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [...frontRoutes, ...adminRoutes],

  // 滚动行为：保存位置、锚点或回到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

// 全局前置守卫
router.beforeEach((to) => {
  const requiresAuth = to.matched.some(record => record.meta?.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta?.requiresAdmin)
  const publicOnly = to.matched.some(record => record.meta?.publicOnly)

  const authenticated = isAuthenticated()
  const currentUser = getCurrentUser()

  // 需要认证但未登录 → 跳转登录页
  if (requiresAuth && !authenticated) {
    return {
      name: 'front-login',
      query: { redirect: to.fullPath }
    }
  }

  // 需要管理员权限但不是管理员 → 跳转个人中心
  if (requiresAdmin && currentUser?.role !== 'admin') {
    return { name: 'front-profile' }
  }

  // 仅限未登录用户访问的页面，但用户已登录 → 自动跳转首页
  if (publicOnly && authenticated) {
    return {
      name: currentUser?.role === 'admin' ? 'admin-dashboard' : 'front-profile'
    }
  }

  return true
})

export default router
