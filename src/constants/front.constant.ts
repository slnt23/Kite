import projectImageOne from '@/assets/login/default_avatar.png'
import type { UserInfoParams } from '@/types'
import type { ProfileSectionId, ProfileSettingsIconKey, ProfileSettingsNavSection } from '@/types'
import { PROFILE_SECTION_ITEMS } from './example.constant'


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



export const PROFILE_SECTION_SIDEBAR_ICON: Record<ProfileSectionId, ProfileSettingsIconKey> = {
    public: 'user',
    account: 'setting',
    appearance: 'brush',
    accessibility: 'view',
    notifications: 'bell',
}

// GitHub 风格设置侧栏：
// 用户，首组来自 PROFILE_SECTION_ITEMS，其余为展示用分组（可再接路由）
export const PROFILE_SETTINGS_NAV_SECTIONS: ProfileSettingsNavSection[] = [
    {
        items: PROFILE_SECTION_ITEMS.map((s) => ({
            id: s.id,
            label: s.label,
            icon: PROFILE_SECTION_SIDEBAR_ICON[s.id],
            navigable: true,
        })),
    },
    // {
    //   title: '访问',
    //   items: [
    //     {
    //       id: 'access-billing',
    //       label: '账单与许可',
    //       icon: 'creditCard',
    //       expandable: true,
    //       navigable: false,
    //     },
    //     { id: 'access-emails', label: '邮箱', icon: 'message', navigable: false },
    //     {
    //       id: 'access-password',
    //       label: '密码与身份验证',
    //       icon: 'lock',
    //       navigable: false,
    //     },
    //     { id: 'access-sessions', label: '会话', icon: 'monitor', navigable: false },
    //     { id: 'access-ssh', label: 'SSH 与 GPG 密钥', icon: 'key', navigable: false },
    //     { id: 'access-orgs', label: '组织', icon: 'officeBuilding', navigable: false },
    //     { id: 'access-enterprise', label: '企业', icon: 'compass', navigable: false },
    //     {
    //       id: 'access-moderation',
    //       label: '审核与风控',
    //       icon: 'chatWarning',
    //       expandable: true,
    //       navigable: false,
    //     },
    //   ],
    // },
    // {
    //   title: '代码、规划与自动化',
    //   items: [
    //     { id: 'code-repos', label: '仓库', icon: 'folder', navigable: false },
    //     { id: 'code-codespaces', label: '开发环境', icon: 'monitor', navigable: false },
    //     {
    //       id: 'code-models',
    //       label: '模型',
    //       icon: 'share',
    //       badge: '预览',
    //       navigable: false,
    //     },
    //     { id: 'code-packages', label: '软件包', icon: 'box', navigable: false },
    //   ],
    // },
]