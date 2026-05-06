
import type { UserInfoParams } from "@/types";
import { AUTH_STORAGE_KEY, TOKEN_STORAGE_KEY, AUTH_CHANGE_EVENT } from "@/constants";


/**
 * 登录鉴权工具模块 - 与后端API交互的真实认证系统
 */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}

// 检查当前环境是否为客户端（浏览器环境）
const isClient = () => typeof window !== 'undefined'


// 检查是否已认证（是否有有效的token）
export const isAuthenticated = (): boolean => {
  const token = getToken()
  return !!token && token.length > 0
}

// 用户登出函数,在实际项目中，可能需要调用后端登出API
export const logout = (): void => {
  if (isClient()) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
  }
  // 可选：调用后端登出API
  // logoutApi().catch(console.error)
}

// 获取当前用户信息，
export const getCurrentUser = (): UserInfoParams | null => {
  if (!isClient()) return null
  const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY)
  if (!rawSession) return null
  try {
    return JSON.parse(rawSession)
  } catch {
    // 如果解析失败，清除损坏的用户数据 
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

// 全局状态管理 - 用于控制登录弹窗
// export const globalAuthState = {
//   showLoginDialog: false,
//   pendingRoute: null as string | null,

//   openLoginDialog(routePath: string) {
//     this.showLoginDialog = true
//     this.pendingRoute = routePath
//   },

//   closeLoginDialog() {
//     this.showLoginDialog = false
//     this.pendingRoute = null
//   }
// }











/**
 * 注册认证状态变化监听器,用于在主页来监听认证状态变化（如登录/登出）并更新UI
 * @param callback 当认证状态变化时调用的回调函数
 * @returns 取消监听的函数
 */
export const onAuthChange = (callback: (user: UserInfoParams | null) => void): (() => void) => {
  if (!isClient() || typeof callback !== 'function') {
    return () => { } // 返回空函数
  }

  // 包装监听器：当事件触发时，读取最新的用户信息并传给回调
  const handler = () => {
    const user = getCurrentUser()
    callback(user)
  }

  window.addEventListener(AUTH_CHANGE_EVENT, handler)

  // 返回取消监听的函数
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, handler)
  }
}