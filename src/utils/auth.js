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

// const AUTH_STORAGE_KEY = 'kite_front_auth_session'
// const AUTH_CHANGE_EVENT = 'kite-auth-change'
//
// export const AUTH_LOGIN_MODE = {
//   PASSWORD: 'password',
//   CODE: 'code',
// }
//
// const DEMO_CREDENTIALS = {
//   admin: {
//     role: 'admin',
//     roleLabel: '管理员',
//     displayName: '系统管理员',
//     password: 'admin@kite2026',
//     code: '880088',
//   },
//   user: {
//     role: 'user',
//     roleLabel: '普通用户',
//     displayName: '体验用户',
//     password: 'user@kite2026',
//     code: '202668',
//   },
// }
//
// // 判断是否在浏览器客户端环境
// const isClient = () => typeof window !== 'undefined'
//
// // 触发认证状态变更事件
// const emitAuthChange = () => {
//   if (isClient()) {
//     window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
//   }
// }
//
// // 从 localStorage 读取会话信息（带错误处理）
// const readSession = () => {
//   if (!isClient()) return null
//
//   const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY)
//   if (!rawSession) return null
//
//   try {
//     return JSON.parse(rawSession)
//   } catch {
//     window.localStorage.removeItem(AUTH_STORAGE_KEY)
//     return null
//   }
// }
//
// // ==================== 对外导出的 API ====================
//
// /** 获取当前完整登录会话信息 */
// export const getAuthSession = () => readSession()
//
// /** 获取当前用户信息（精简版，推荐在大多数组件中使用） */
// export const getCurrentUser = () => {
//   const session = readSession()
//   if (!session) return null
//
//   return {
//     token: session.token,
//     role: session.role,
//     roleLabel: session.roleLabel,
//     displayName: session.displayName,
//     loginMode: session.loginMode,
//     loginModeLabel: session.loginModeLabel,
//     loginAt: session.loginAt,
//   }
// }
//
// /** 判断用户是否已登录 */
// export const isAuthenticated = () => Boolean(readSession()?.token)
//
// /** 判断当前用户是否为管理员 */
// export const isAdminUser = () => readSession()?.role === 'admin'
//
// /** 根据用户角色获取默认跳转路由 */
// export const getDefaultRouteForUser = (user) =>
//     user?.role === 'admin' ? '/admin' : '/profile'
//
// /** 获取演示账号凭证（供登录页面展示使用） */
// export const getDemoCredentials = () => ({
//   admin: {
//     roleLabel: DEMO_CREDENTIALS.admin.roleLabel,
//     displayName: DEMO_CREDENTIALS.admin.displayName,
//     password: DEMO_CREDENTIALS.admin.password,
//     code: DEMO_CREDENTIALS.admin.code,
//   },
//   user: {
//     roleLabel: DEMO_CREDENTIALS.user.roleLabel,
//     displayName: DEMO_CREDENTIALS.user.displayName,
//     password: DEMO_CREDENTIALS.user.password,
//     code: DEMO_CREDENTIALS.user.code,
//   },
// })
//
// /**
//  * 执行登录
//  * @param {Object} params - { role: 'admin'|'user', mode: 'password'|'code', secret: string }
//  */
// export const login = ({ role, mode, secret }) => {
//   const candidate = DEMO_CREDENTIALS[role]
//   const trimmedSecret = secret.trim()
//
//   if (!candidate) {
//     return { success: false, message: '请选择登录身份。' }
//   }
//
//   if (!trimmedSecret) {
//     return {
//       success: false,
//       message: mode === AUTH_LOGIN_MODE.PASSWORD
//           ? '请输入登录密码。'
//           : '请输入登录验证码。',
//     }
//   }
//
//   const expectedSecret =
//       mode === AUTH_LOGIN_MODE.PASSWORD
//           ? candidate.password
//           : mode === AUTH_LOGIN_MODE.CODE
//               ? candidate.code
//               : ''
//
//   if (!expectedSecret) {
//     return { success: false, message: '登录方式无效，请刷新页面后重试。' }
//   }
//
//   if (trimmedSecret !== expectedSecret) {
//     return {
//       success: false,
//       message: mode === AUTH_LOGIN_MODE.PASSWORD
//           ? '密码不正确，请检查后重试。'
//           : '验证码不正确，请检查后重试。',
//     }
//   }
//
//   // 登录成功，构造会话对象
//   const session = {
//     token: `kite-${role}-${Date.now()}`,
//     role: candidate.role,
//     roleLabel: candidate.roleLabel,
//     displayName: candidate.displayName,
//     loginMode: mode,
//     loginModeLabel: mode === AUTH_LOGIN_MODE.PASSWORD ? '密码登录' : '验证码登录',
//     loginAt: new Date().toISOString(),
//   }
//
//   if (isClient()) {
//     window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
//     emitAuthChange()
//   }
//
//   return { success: true, session }
// }
//
// /** 退出登录 */
// export const logout = () => {
//   if (isClient()) return
//   window.localStorage.removeItem(AUTH_STORAGE_KEY)
//   emitAuthChange()
// }
//
// /**
//  * 监听认证状态变化（登录、登出）
//  * @param {F
// src/utils/auth.session.js

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

export const getAuthSession = () => readSession()

export const getCurrentUser = () => {
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

export const isAuthenticated = () => Boolean(readSession()?.token)
export const isAdminUser = () => readSession()?.role === 'admin'

/** 根据用户角色获取默认路由名称（推荐返回 name 而非 path） */
export const getDefaultRouteForUser = (user) =>
    user?.role === 'admin' ? 'admin-dashboard' : 'front-profile'

export const getDemoCredentials = () => ({
    admin: { ...DEMO_CREDENTIALS.admin },
    user: { ...DEMO_CREDENTIALS.user },
})

export const login = ({ role, mode, secret }) => {
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

    return { success: true, session }
}

export const logout = () => {
    if (isClient()) {
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
        emitAuthChange()
    }
}

export const onAuthChange = (callback) => {
    if (typeof callback === 'function') {
        window.addEventListener(AUTH_CHANGE_EVENT, callback)
    }
}
