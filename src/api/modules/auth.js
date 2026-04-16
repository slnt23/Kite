import request from '../request/index'

// 登录 API
export const loginApi = (data) => {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

// 注册 API
export const registerApi = (data) => {
  return request({
    url: '/api/register',
    method: 'post',
    data
  })
}

// 发送验证码 API
export const sendCodeApi = (data) => {
  return request({
    url: '/api/send-code',
    method: 'post',
    data
  })
}

// 获取用户信息 API
export const getUserInfoApi = () => {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}
