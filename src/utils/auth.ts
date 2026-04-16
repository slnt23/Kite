//
// // 存储token
// const AUTH_STORAGE_KEY = 'kite_front_auth_token'
// // 访问码，假设
// const DEMO_ACCESS_CODE = 'cc-2026-kite'
//
// // 从浏览器本地存储中获取认证 Token。
// export const getAuthToken = () => localStorage.getItem(AUTH_STORAGE_KEY)
// // 判断用户当前是否已登录（是否已认证）。
// export const isAuthenticated = () => Boolean(getAuthToken())
//
// // 使用访问码进行登录验证（当前为演示模式）。
// export const loginWithAccessCode = (accessCode) => {
//   if (accessCode !== DEMO_ACCESS_CODE) {
//     return {
//       success: false,
//       message: '访问码不正确，请检查后重试。',
//     }
//   }
//
//   const token = `front-${Date.now()}`
//   localStorage.setItem(AUTH_STORAGE_KEY, token)
//
//   return {
//     success: true,
//     token,
//   }
// }
//
// // 退出登录，清除本地存储中的认证 Token。
// export const logout = () => {
//   localStorage.removeItem(AUTH_STORAGE_KEY)
// }
//

// auth.js   （推荐文件名）

import type { UserSession, UserInfo, LoginParams, LoginResult } from '@/types'

const AUTH_STORAGE_KEY = 'kite_front_auth_session'
const AUTH_CHANGE_EVENT = 'kite-auth-change'

export const AUTH_LOGIN_MODE = {
  PASSWORD: 'password',
  CODE: 'code',
} as const

type LoginMode = typeof AUTH_LOGIN_MODE[keyof typeof AUTH_LOGIN_MODE]

const DEMO_CREDENTIALS = {
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
}

const isClient = () => typeof window !== 'undefined'

const emitAuthChange = () => {
  if (isClient()) {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
  }
}

const readSession = (): UserSession | null => {
  if (!isClient()) return null
  const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY)
  if (!rawSession) return null
  try {
    return JSON.parse(rawSession)
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

// ==================== 对外导出的 API ====================

export const getAuthSession = (): UserSession | null => readSession()

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

export const isAuthenticated = (): boolean => Boolean(readSession()?.token)
export const isAdminUser = (): boolean => readSession()?.role === 'admin'

/** 根据用户角色获取默认路由名称（推荐返回 name 而非 path） */
export const getDefaultRouteForUser = (user: UserInfo | null): string =>
  user?.role === 'admin' ? 'admin-dashboard' : 'front-profile'

export const getDemoCredentials = () => ({
  admin: { ...DEMO_CREDENTIALS.admin },
  user: { ...DEMO_CREDENTIALS.user },
})

export const login = ({ role, mode, secret }: LoginParams): LoginResult => {
  const candidate = DEMO_CREDENTIALS[role]
  const trimmedSecret = secret.trim()

  if (!candidate) {
    return { success: false, message: '请选择登录身份。' }
  }

  if (!trimmedSecret) {
    return {
      success: false,
      message: mode === AUTH_LOGIN_MODE.PASSWORD
        ? '请输入登录密码。'
        : '请输入登录验证码。',
    }
  }

  const expectedSecret =
    mode === AUTH_LOGIN_MODE.PASSWORD
      ? candidate.password
      : mode === AUTH_LOGIN_MODE.CODE
        ? candidate.code
        : ''

  if (!expectedSecret) {
    return { success: false, message: '登录方式无效，请刷新页面后重试。' }
  }

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
    token: `kite-${role}-${Date.now()}`,
    role: candidate.role,
    roleLabel: candidate.roleLabel,
    displayName: candidate.displayName,
    loginMode: mode,
    loginModeLabel: mode === AUTH_LOGIN_MODE.PASSWORD ? '密码登录' : '验证码登录',
    loginAt: new Date().toISOString(),
  }

  if (isClient()) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
    emitAuthChange()
  }

  return { success: true, session }
}

export const logout = (): void => {
  if (isClient()) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    emitAuthChange()
  }
}

export const onAuthChange = (callback: () => void): void => {
  if (typeof callback === 'function') {
    window.addEventListener(AUTH_CHANGE_EVENT, callback)
  }
}
