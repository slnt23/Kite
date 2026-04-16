// Store 相关类型定义

import type { UserInfo } from './api'

export interface UserStore {
  user: UserInfo | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (params: any) => Promise<void>
  logout: () => void
  setUser: (user: UserInfo | null) => void
}
