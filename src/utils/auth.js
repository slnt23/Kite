const AUTH_STORAGE_KEY = 'kite_front_auth_token'
const DEMO_ACCESS_CODE = 'cc-2026-kite'

export const getAuthToken = () => localStorage.getItem(AUTH_STORAGE_KEY)

export const isAuthenticated = () => Boolean(getAuthToken())

export const loginWithAccessCode = (accessCode) => {
  if (accessCode !== DEMO_ACCESS_CODE) {
    return {
      success: false,
      message: '访问码不正确，请检查后重试。',
    }
  }

  const token = `front-${Date.now()}`
  localStorage.setItem(AUTH_STORAGE_KEY, token)

  return {
    success: true,
    token,
  }
}

export const logout = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
