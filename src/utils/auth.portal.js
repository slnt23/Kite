const AUTH_STORAGE_KEY = 'kite_front_auth_session'
const AUTH_CHANGE_EVENT = 'kite-auth-change'

export const AUTH_LOGIN_MODE = {
  PASSWORD: 'password',
  CODE: 'code',
}

const DEMO_CREDENTIALS = {
  admin: {
    role: 'admin',
    roleLabel: '管理员',
    displayName: '系统管理员',
    password: 'admin@kite2026',
    code: '880088',
  },
  user: {
    role: 'user',
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

const readSession = () => {
  if (!isClient()) {
    return null
  }

  const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY)

  if (!rawSession) {
    return null
  }

  try {
    return JSON.parse(rawSession)
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export const getCurrentUser = () => readSession()

export const isAuthenticated = () => Boolean(readSession()?.token)

export const isAdminUser = () => readSession()?.role === 'admin'

export const getDefaultRouteForUser = (user) => (user?.role === 'admin' ? '/admin' : '/profile')

export const getDemoCredentials = () => ({
  admin: { ...DEMO_CREDENTIALS.admin },
  user: { ...DEMO_CREDENTIALS.user },
})

export const login = ({ role, mode, secret }) => {
  const candidate = DEMO_CREDENTIALS[role]
  const trimmedSecret = secret.trim()

  if (!candidate) {
    return {
      success: false,
      message: '请选择登录身份。',
    }
  }

  if (!trimmedSecret) {
    return {
      success: false,
      message: mode === AUTH_LOGIN_MODE.PASSWORD ? '请输入登录密码。' : '请输入登录验证码。',
    }
  }

  const expectedSecret =
    mode === AUTH_LOGIN_MODE.PASSWORD
      ? candidate.password
      : mode === AUTH_LOGIN_MODE.CODE
        ? candidate.code
        : ''

  if (!expectedSecret) {
    return {
      success: false,
      message: '登录方式无效，请刷新页面后重试。',
    }
  }

  if (trimmedSecret !== expectedSecret) {
    return {
      success: false,
      message:
        mode === AUTH_LOGIN_MODE.PASSWORD
          ? '密码不正确，请检查后重试。'
          : '验证码不正确，请检查后重试。',
    }
  }

  const session = {
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

  return {
    success: true,
    session,
  }
}

export const logout = () => {
  if (!isClient()) {
    return
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY)
  emitAuthChange()
}

export const onAuthChange = (callback) => {
  if (!isClient()) {
    return () => {}
  }

  const handler = () => callback(getCurrentUser())
  window.addEventListener(AUTH_CHANGE_EVENT, handler)
  window.addEventListener('storage', handler)

  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}
