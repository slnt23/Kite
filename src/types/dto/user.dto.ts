

/**
 * 登录或者注册
 */
export interface LoginOrRegisterParams {
    email: string;
    code?: string;
    password?: string;
    role: number;
}

/**
 * 发送验证码
 */
export interface SendCodeParams {
    email: string;
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