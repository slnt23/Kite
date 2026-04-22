
/**
 * 登录鉴权工具模块 - 与后端API交互的真实认证系统
 * 提供用户登录、登出、会话管理等功能
 */

import type { UserSession, UserInfo, LoginResult } from '@/types'
import { loginApi, getUserInfoApi } from '@/api/modules/auth.api.ts'

// ==================== 常量定义 ====================

/** 本地存储中用于保存认证会话的键名 */
const AUTH_STORAGE_KEY = 'kite_front_auth_session'

/** 本地存储中用于保存用户token的键名 */
const TOKEN_STORAGE_KEY = 'kite_front_token'

/** 认证状态变化时触发的事件名称 */
const AUTH_CHANGE_EVENT = 'kite-auth-change'

/** 登录方式枚举 */
export const AUTH_LOGIN_MODE = {
  PASSWORD: 'password',    // 密码登录
  CODE: 'code',            // 验证码登录
} as const

/** 登录方式类型定义 */
type LoginMode = typeof AUTH_LOGIN_MODE[keyof typeof AUTH_LOGIN_MODE]

// ==================== 内部工具函数 ====================

/** 检查当前环境是否为客户端（浏览器环境） */
const isClient = () => typeof window !== 'undefined'

/** 触发认证状态变化事件，通知其他组件认证状态已更新 */
const emitAuthChange = () => {
  if (isClient()) {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
  }
}

/**
 * 从本地存储读取用户会话信息
 * @returns 用户会话对象或null（如果不存在或解析失败）
 */
const readSession = (): UserSession | null => {
  if (!isClient()) return null
  const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY)
  if (!rawSession) return null
  try {
    return JSON.parse(rawSession)
  } catch {
    // 如果解析失败，清除损坏的会话数据
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

// ==================== 对外导出的 API ====================

/**
 * 获取完整的认证会话信息
 * @returns 完整的用户会话对象或null
 */
export const getAuthSession = (): UserSession | null => readSession()

/**
 * 获取当前用户的基本信息（不包含敏感信息）
 * @returns 用户基本信息对象或null
 */
export const getCurrentUser = (): UserInfo | null => {
  const session = readSession()
  if (!session) return null
  return {
    token: session.token,
    role: session.role,
    roleLabel: session.roleLabel,
    displayName: session.displayName,
    loginMode: session.loginMode,
    loginModeLabel: session.loginModeLabel,
    loginAt: session.loginAt,
  }
}

/**
 * 检查用户是否已认证（是否有有效的token）
 * @returns 是否已认证
 */
export const isAuthenticated = (): boolean => {
  const token = isClient() ? window.localStorage.getItem(TOKEN_STORAGE_KEY) : null
  return Boolean(token)
}

/**
 * 检查当前用户是否为管理员
 * @returns 是否为管理员
 */
export const isAdminUser = (): boolean => readSession()?.role === 'admin'

/**
 * 根据用户角色获取默认路由名称
 * @param user 用户信息对象
 * @returns 默认路由的名称
 */
export const getDefaultRouteForUser = (user: UserInfo | null): string =>
  user?.role === 'admin' ? 'admin-dashboard' : 'front-profile'

/**
 * 获取用户信息 - 从后端API获取当前用户信息
 * @returns 用户信息对象或null
 */
/* export const fetchUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await getUserInfoApi()
    
    // 假设后端返回格式：{ success: true, data: { ...userInfo } }
    if (response.success) {
      const user = response.data
      
      // 更新本地存储的用户信息
      const session = readSession()
      if (session && isClient()) {
        const updatedSession: UserSession = {
          ...session,
          ...user,
          roleLabel: user.role === 'admin' ? '管理员' : '普通用户'
        }
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedSession))
        emitAuthChange()
        
        return {
          token: updatedSession.token,
          role: updatedSession.role,
          roleLabel: updatedSession.roleLabel,
          displayName: updatedSession.displayName,
          loginMode: updatedSession.loginMode,
          loginModeLabel: updatedSession.loginModeLabel,
          loginAt: updatedSession.loginAt,
        }
      }
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
  
  return null
} */

/**
 * 获取演示用的用户凭据（用于登录界面显示）
 * 保留此函数以保持与现有组件的兼容性
 * @returns 空的凭据对象（实际项目中应从后端获取）
 */
export const getDemoCredentials = () => ({
  admin: { 
    role: 'admin' as const,
    roleLabel: '管理员',
    displayName: '系统管理员',
    password: 'admin@kite2026',
    code: '880088',
  },
  user: { 
    role: 'user' as const,
    roleLabel: '普通用户',
    displayName: '体验用户',
    password: 'user@kite2026',
    code: '202668',
  },
})

/**
 * 用户登录函数 - 与后端API交互
 * @param loginData 登录参数对象，包含用户名、密码等
 * @returns 登录结果对象，包含成功状态、消息和会话信息
 */
/* export const login = async (loginData: any): Promise<LoginResult> => {
  try {
    // 调用后端登录API
    const response = await loginApi(loginData)
    
    // 假设后端返回格式：{ success: true, data: { token: 'xxx', user: {...} } }
    if (response.success) {
      const { token, user } = response.data
      
      // 保存token到本地存储
      if (isClient()) {
        window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
        
        // 构造会话对象
        const session: UserSession = {
          token: token,
          role: user.role || 'user',
          roleLabel: user.role === 'admin' ? '管理员' : '普通用户',
          displayName: user.username || user.displayName || '用户',
          loginMode: AUTH_LOGIN_MODE.PASSWORD, // 后端登录默认为密码登录
          loginModeLabel: '密码登录',
          loginAt: new Date().toISOString(),
          ...user // 包含后端返回的其他用户信息
        }
        
        // 保存完整会话信息
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
        emitAuthChange()
        
        return { success: true, session }
      }
    } else {
      // 登录失败，返回错误信息
      return { 
        success: false, 
        message: response.message || '登录失败，请检查用户名和密码' 
      }
    }
  } catch (error: any) {
    // 网络错误或API调用失败
    console.error('登录请求失败:', error)
    return { 
      success: false, 
      message: error.response?.data?.message || '网络错误，请稍后重试' 
    }
  }
  
  return { success: false, message: '未知错误' }
} */

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
    emitAuthChange()
  }
  
  // 可选：调用后端登出API
  // logoutApi().catch(console.error)
}

/**
 * 注册认证状态变化监听器
 * @param callback 当认证状态变化时调用的回调函数
 */
export const onAuthChange = (callback: () => void): void => {
  if (typeof callback === 'function') {
    window.addEventListener(AUTH_CHANGE_EVENT, callback)
  }
}