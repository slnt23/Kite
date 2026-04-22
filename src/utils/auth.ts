
import type { UserInfo } from "@/types";
import { getUserInfoApi } from "@/api/modules";
import { AUTH_STORAGE_KEY, TOKEN_STORAGE_KEY } from "@/constants";


/**
 * 登录鉴权工具模块 - 与后端API交互的真实认证系统
 */

/** 检查当前环境是否为客户端（浏览器环境） */
const isClient = () => typeof window !== 'undefined'


// 检查是否已认证（是否有有效的token）
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(TOKEN_STORAGE_KEY)
}


/** 
 * 获取当前用户信息 
 * @returns 用户信息对象或null（如果不存在或解析失败） 
 */
export const getCurrentUser = (): UserInfo | null => {
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

/**
 * 用户登出函数
 * 清除本地存储中的会话信息并触发认证状态更新
 * 在实际项目中，可能需要调用后端登出API
 */
export const logout = (): void => {
  if (isClient()) {
    // 清除所有认证相关的存储
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
    // emitAuthChange()
  }

  // 可选：调用后端登出API
  // logoutApi().catch(console.error)
}
