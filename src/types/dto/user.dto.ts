// types/auth.ts

/**
 * 邮箱验证码登录/注册 请求参数（前端发送给后端）
 */
export interface EmailLoginOrRegisterParams {
    email: string;
    code: string;
    role?: number;
}

/**
 * 发送验证码
 */
export interface SendCodeParams {
    email: string;
}

/**
 * 用户登录
 */
export interface PasswordLoginParams {
    email: string;
    password?: string;
    role?: number;
}

/**
 * 用户信息接口（前端使用）
 * 对应后端 UserInfoDTO
 */
export interface UserInfo {
    userName: string;
    nickName: string;
    email: string;
    phone: string;
    remark?: string;
    rawPhone?: string;
}