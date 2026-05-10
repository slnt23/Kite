


/**
 * 登录或者注册
 */
export interface LoginOrRegisterParams {
    email: string;
    code?: string;
    password?: string;
    role: string;  // 'USER' 或 'ADMIN' 这里用大写，数据库中用的枚举，后续前端也改成大写
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
export interface UserInfoParams {
    userName: string;
    nickName: string;
    email: string;
    phone?: string;
    remark?: string;
    rawPhone?: string;
    role: string;  // 'USER' 或 'ADMIN'
    avatarUrl: string;  // 头像URL

}