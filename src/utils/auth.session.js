const AUTH_STORAGE_KEY = 'kite_front_auth_session'
const AUTH_CHANGE_EVENT = 'kite-auth-change'

const LOGIN_MODE_PASSWORD = 'password'
const LOGIN_MODE_CODE = 'code'

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
  if (!isClient()) {
    return
  }

  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
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

export const getAuthSession = () => readSession()

export const getCurrentUser = () => {
  const session = readSession()

  if (!session) {
    return null
  }

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

export const isAuthenticated = () => Boolean(readSession()?.token)

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
      message: mode === LOGIN_MODE_PASSWORD ? '请输入登录密码。' : '请输入登录验证码。',
    }
  }

  const expectedSecret =
    mode === LOGIN_MODE_PASSWORD ? candidate.password : mode === LOGIN_MODE_CODE ? candidate.code : ''

  if (!expectedSecret) {
    return {
      success: false,
      message: '登录方式无效，请刷新页面后重试。',
    }
  }

  if (trimmedSecret !== expectedSecret) {
    return {
      success: false,
      message: mode === LOGIN_MODE_PASSWORD ? '密码不正确，请检查后重试。' : '验证码不正确，请检查后重试。',
    }
  }

  const session = {
    token: `kite-${role}-${Date.now()}`,
    role: candidate.role,
    roleLabel: candidate.roleLabel,
    displayName: candidate.displayName,
    loginMode: mode,
    loginModeLabel: mode === LOGIN_MODE_PASSWORD ? '密码登录' : '验证码登录',
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

export const getDemoCredentials = () => ({
  admin: {
    roleLabel: DEMO_CREDENTIALS.admin.roleLabel,
    displayName: DEMO_CREDENTIALS.admin.displayName,
    password: DEMO_CREDENTIALS.admin.password,
    code: DEMO_CREDENTIALS.admin.code,
  },
  user: {
    roleLabel: DEMO_CREDENTIALS.user.roleLabel,
    displayName: DEMO_CREDENTIALS.user.displayName,
    password: DEMO_CREDENTIALS.user.password,
    code: DEMO_CREDENTIALS.user.code,
  },
})

export const AUTH_LOGIN_MODE = {
  PASSWORD: LOGIN_MODE_PASSWORD,
  CODE: LOGIN_MODE_CODE,
}
