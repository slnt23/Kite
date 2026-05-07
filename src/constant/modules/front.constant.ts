import type {UserInfoParams} from '@/types'
import type {NavSection} from '@/types'
import type {MenuItem} from '@/types'
import menuImagePriceQuery from '../../assets/front/pic01.jpg'
import menuImageStory from '../../assets/front/pic02.jpg'
import menuImageCapabilities from '../../assets/front/pic03.jpg'
import menuImageAiChat from '../../assets/front/pic04.jpg'
import projectImageOne from '@/assets/front/default_avatar.png'


export const EXAMPLE_PUBLIC_PROFILE_DEFAULTS: UserInfoParams = {
    userName: '默认用户',           // 用户名（小写）
    nickName: '默认昵称',           // 昵称/显示名
    email: '1234567890@qq.com',      // 邮箱
    phone: '110',                   // 手机号（可选）
    remark: '默认备注',    // 备注/个人简介
    rawPhone: '000',                // 原始手机号（可选）
    role: '用户',            // 角色
    avatar: projectImageOne as string, // 头像URL
}


// export const PROFILE_SECTION_SIDEBAR_ICON: Record<ProfileSectionId, ProfileSettingsIconKey> = {
//     public: 'user',
//     account: 'setting',
//     appearance: 'brush',
//     accessibility: 'view',
//     notifications: 'bell',
// }

// GitHub 风格设置侧栏：
// 用户，首组来自 PROFILE_SECTION_ITEMS，其余为展示用分组（可再接路由）
export const PROFILE_SETTINGS_NAV_SECTIONS: NavSection[] = [
    {
        // title: 'Profile',
        // items: PROFILE_SECTION_ITEMS.map((s) => ({
        //     id: s.id,
        //     label: s.label,
        //     icon: PROFILE_SECTION_SIDEBAR_ICON[s.id],
        //     navigable: true,
        // })),
        items: [

            {
                id: 'public',
                label: '公开资料',
                icon: 'user',
                navigable: true,
            },
            {
                id: 'account',
                label: '账户',
                icon: 'setting',
                navigable: true,
            },
            {
                id: 'appearance',
                label: '外观',
                icon: 'brush',
                navigable: true,
            },
            {
                id: 'accessibility',
                label: '无障碍',
                icon: 'view',
                navigable: true,
            },
            {
                id: 'notifications',
                label: '通知',
                icon: 'bell',
                navigable: true,
            },]
    },
    {
        title: '访问',
        items: [
            {
                id: 'access-billing',
                label: '账单与许可',
                icon: 'creditCard',
                expandable: true,
                navigable: false,
            },
            // {id: 'access-emails', label: '邮箱', icon: 'message', navigable: false},
            // {
            //     id: 'access-password',
            //     label: '密码与身份验证',
            //     icon: 'lock',
            //     navigable: false,
            // },
            // {id: 'access-sessions', label: '会话', icon: 'monitor', navigable: false},
            // {id: 'access-ssh', label: 'SSH 与 GPG 密钥', icon: 'key', navigable: false},
            // {id: 'access-orgs', label: '组织', icon: 'officeBuilding', navigable: false},
            // {id: 'access-enterprise', label: '企业', icon: 'compass', navigable: false},
            // {
            //     id: 'access-moderation',
            //     label: '审核与风控',
            //     icon: 'chatWarning',
            //     expandable: true,
            //     navigable: false,
            // },
        ],
    },
    {
        // 用来与退出登陆分隔
    }
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


/**
 * 前台菜单选项配置常量
 */
export const FRONT_MENU_ITEMS: MenuItem[] = [
    // {
    //     title: '首页',
    //     subtitle: '查看全屏滚动总览与模块入口',
    //     path: '/',
    //     image: menuImageHome,
    //     size: 'large',
    // },
    {
        title: '价格查询',
        subtitle: '进入独立查询界面，查看价格与趋势',
        path: '/price-query',
        image: menuImagePriceQuery,
    },
    {
        title: '品牌故事',
        subtitle: '查看当前项目的设计方向与页面叙事',
        path: '/story',
        image: menuImageStory,
    },
    {
        title: '服务能力',
        subtitle: '浏览前台项目的结构与能力范围',
        path: '/capabilities',
        image: menuImageCapabilities,
    },
    {
        title: 'AI聊天',
        subtitle: '进入聊天界面入口，查看对话交互样式',
        path: '/ai-ai',
        image: menuImageAiChat,
    },
]
