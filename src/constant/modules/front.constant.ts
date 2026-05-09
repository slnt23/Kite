import type { UserInfoParams } from '@/types'
import type { NavSection } from '@/types'
import type { MenuItem } from '@/types'
import type { SectionIntroData } from '@/types'
import menuImagePriceQuery from '@/assets/front/MENU_PRICE_SEARCH.png'
import menuImageView from '@/assets/front/MENU_VIEW.png'
import menuImageAiChat from '@/assets/front/MENU_AI_CHAT.png'
import menuImageBlog from '@/assets/front/MENU_BLOG.png'
import projectImageOne from '@/assets/example/default_avatar.png'



export const EXAMPLE_PUBLIC_PROFILE_DEFAULTS: UserInfoParams = {
    userName: '默认用户',           // 用户名（小写）
    nickName: '默认昵称',           // 昵称/显示名
    email: '1234567890@qq.com',      // 邮箱
    phone: '110',                   // 手机号（可选）
    remark: '默认备注',    // 备注/个人简介
    rawPhone: '000 000',                // 原始手机号（可选）
    role: '用户',            // 角色
    avatar: projectImageOne as string, // 头像URL
}

// GitHub 风格设置侧栏：
// 用户，首组来自 PROFILE_SECTION_ITEMS，其余为展示用分组（可再接路由）
export const PROFILE_SETTINGS_NAV_SECTIONS: NavSection[] = [
    {
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
        ],
    },
    {
        // 用来与退出登陆分隔
    }
]


/**
 * 前台菜单选项配置常量
 */
export const FRONT_MENU_ITEMS: MenuItem[] = [
    {
        title: '价格行情',
        subtitle: '查看最新价格与走势，趋势一览',
        path: '/price-query',
        image: menuImagePriceQuery,
        size: 'large',
    },
    {
        title: '沿途纪事',
        subtitle: '每一页，都是一段旅程',
        path: '/story',
        image: menuImageView,
        size: 'normal',
    },
    {
        title: 'AI伴聊',
        subtitle: ' 聊聊界面，试试手感',
        path: '/ai-ai',
        image: menuImageAiChat,
        size: 'small',
    },
    {
        title: '写点什么(博客)',
        subtitle: '记录日常与思考',
        path: '/blog',
        image: menuImageBlog,
        size: 'small',
    },
]


export const HOME_SECTION_INTROS: SectionIntroData[] = [
    {
        eyebrow: '内容精选',
        title: 'Curated Highlights',
        description: '值得浏览的内容与最新呈现',
    },
    {
        eyebrow: '探索发现',
        title: 'Creative Discoveries',
        description: '围绕兴趣、创作与体验的核心内容集合',
    },
]