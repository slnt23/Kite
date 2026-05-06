import projectImageOne from '@/assets/login/default_avatar.png'
import type { UserInfoParams } from '@/types'



export const EXAMPLE_PUBLIC_PROFILE_DEFAULTS: UserInfoParams = {
    userName: 'queue',           // 用户名（小写）
    nickName: 'Queue',           // 昵称/显示名
    email: '123456@qq.com',      // 邮箱
    phone: '',                   // 手机号（可选）
    remark: 'Explore the Future,', // 备注/个人简介
    rawPhone: '',                // 原始手机号（可选）
    role: '个人账户',            // 角色
    avatar: projectImageOne as string, // 头像URL
}