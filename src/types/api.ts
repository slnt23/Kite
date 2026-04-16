// API 相关类型定义

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  code?: number
}

export interface LoginParams {
  role: 'admin' | 'user'
  mode: 'password' | 'code'
  secret: string
}

export interface LoginResult {
  success: boolean
  session?: UserSession
  message?: string
}

export interface UserSession {
  token: string
  role: 'admin' | 'user'
  roleLabel: string
  displayName: string
  loginMode: 'password' | 'code'
  loginModeLabel: string
  loginAt: string
}

export interface UserInfo {
  token: string
  role: 'admin' | 'user'
  roleLabel: string
  displayName: string
  loginMode: 'password' | 'code'
  loginModeLabel: string
  loginAt: string
}

export interface DemoCredentials {
  admin: {
    roleLabel: string
    displayName: string
    password: string
    code: string
  }
  user: {
    roleLabel: string
    displayName: string
    password: string
    code: string
  }
}
