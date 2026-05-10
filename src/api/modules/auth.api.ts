
import request from '../request/index'
import type { LoginOrRegisterParams, Result, SendCodeParams, UserInfoParams } from '@/types'


// 登录 API(邮箱登录)
export const loginMailApi = async (data: LoginOrRegisterParams): Promise<Result<string>> => {
  return request.post('/auth/login-email', data)
}

// 登录 API（密码登录）
export const loginPasswordApi = async (data: LoginOrRegisterParams): Promise<Result<string>> => {
  return request.post('/auth/login-password', data)
}

// 注册 API
export const registerApi = async (data: LoginOrRegisterParams): Promise<Result<string>> => {
  return request.post('/auth/register', data)
}

// 发送验证码 API
export const sendCodeApi = async (data: SendCodeParams): Promise<Result<string>> => {
  return request.post('/auth/send-verification', data)
}




// 获取用户信息 API
export const getUserInfoApi = async (): Promise<Result<UserInfoParams>> => {
  return request.get('/user/info')
}





// 普通接口返回 Result<T>
// export const getUserInfo = async (): Promise<Result<UserInfo>> => {
//   return request({ url: '/user/info' })
// }

// 分页接口返回 PageResult<T>
// export const getUserList = async (params: PageParams): Promise<PageResult<UserInfo>> => {
//   return request({
//     url: '/user/list',
//     method: 'get',
//     params
//   })
// }