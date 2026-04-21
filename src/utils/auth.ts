
/**
 * 登录鉴权工具模块，提供用户登录、登出、会话管理等功能
 */

import type { UserSession, UserInfo, LoginParams, LoginResult } from '@/types'

// ==================== 常量定义 ====================

/** 本地存储中用于保存认证会话的键名 */
const AUTH_STORAGE_KEY = 'kite_front_auth_session'

/** 认证状态变化时触发的事件名称 */
const AUTH_CHANGE_EVENT = 'kite-auth-change'

/** 登录方式枚举 */
export const AUTH_LOGIN_MODE = {
  PASSWORD: 'password',    // 密码登录
  CODE: 'code',            // 验证码登录
} as const

/** 登录方式类型定义 */
type LoginMode = typeof AUTH_LOGIN_MODE[keyof typeof AUTH_LOGIN_MODE]

// ==================== 演示数据 ====================

/**
 * 演示用的用户凭据数据
 * 在实际项目中，这些数据应该从后端API获取
 */
const DEMO_CREDENTIALS = {
  admin: {
    role: 'admin' as const,        // 管理员角色
    roleLabel: '管理员',           // 角色显示名称
    displayName: '系统管理员',      // 用户显示名称
    password: 'admin@kite2026',    // 管理员密码
    code: '880088',                // 管理员验证码
  },
  user: {
    role: 'user' as const,         // 普通用户角色
    roleLabel: '普通用户',         // 角色显示名称
    displayName: '体验用户',       // 用户显示名称
    password: 'user@kite2026',     // 用户密码
    code: '202668',                // 用户验证码
  },
}

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
export const isAuthenticated = (): boolean => Boolean(readSession()?.token)

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
 * 获取演示用的用户凭据（用于登录界面显示）
 * @returns 演示凭据对象的副本
 */
export const getDemoCredentials = () => ({
  admin: { ...DEMO_CREDENTIALS.admin },
  user: { ...DEMO_CREDENTIALS.user },
})

/**
 * 用户登录函数
 * @param params 登录参数对象，包含角色、登录方式和密码/验证码
 * @returns 登录结果对象，包含成功状态、消息和会话信息
 */
export const login = ({ role, mode, secret }: LoginParams): LoginResult => {
  // 根据角色获取对应的凭据信息
  const candidate = DEMO_CREDENTIALS[role]
  const trimmedSecret = secret.trim()

  // 验证角色选择
  if (!candidate) {
    return { success: false, message: '请选择登录身份。' }
  }

  // 验证密码/验证码是否为空
  if (!trimmedSecret) {
    return {
      success: false,
      message: mode === AUTH_LOGIN_MODE.PASSWORD
        ? '请输入登录密码。'
        : '请输入登录验证码。',
    }
  }

  // 根据登录方式获取预期的密码/验证码
  const expectedSecret =
    mode === AUTH_LOGIN_MODE.PASSWORD
      ? candidate.password
      : mode === AUTH_LOGIN_MODE.CODE
        ? candidate.code
        : ''

  // 验证登录方式是否有效
  if (!expectedSecret) {
    return { success: false, message: '登录方式无效，请刷新页面后重试。' }
  }

  // 验证密码/验证码是否正确
  if (trimmedSecret !== expectedSecret) {
    return {
      success: false,
      message: mode === AUTH_LOGIN_MODE.PASSWORD
        ? '密码不正确，请检查后重试。'
        : '验证码不正确，请检查后重试。',
    }
  }

  // 登录成功，构造会话对象
  const session: UserSession = {
    token: `kite-${role}-${Date.now()}`,  // 生成模拟token
    role: candidate.role,
    roleLabel: candidate.roleLabel,
    displayName: candidate.displayName,
    loginMode: mode,
    loginModeLabel: mode === AUTH_LOGIN_MODE.PASSWORD ? '密码登录' : '验证码登录',
    loginAt: new Date().toISOString(),  // 记录登录时间
  }

  // 保存会话到本地存储并触发状态更新
  if (isClient()) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
    emitAuthChange()
  }

  return { success: true, session }
}

/**
 * 用户登出函数
 * 清除本地存储中的会话信息并触发认证状态更新
 */
export const logout = (): void => {
  if (isClient()) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    emitAuthChange()
  }
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