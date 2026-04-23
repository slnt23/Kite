
import type { MenuItem } from '@/types'

import menuImageHome from '../assets/front/banner.jpg'
import menuImagePriceQuery from '../assets/front/pic01.jpg'
import menuImageStory from '../assets/front/pic02.jpg'
import menuImageCapabilities from '../assets/front/pic03.jpg'
import menuImageAiChat from '../assets/front/pic04.jpg'



/**
 * 前台菜单选项配置常量
 */
export const FRONT_MENU_ITEMS: MenuItem[] = [
    {
        title: '首页',
        subtitle: '查看全屏滚动总览与模块入口',
        path: '/',
        image: menuImageHome,
        size: 'large',
    },
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
        path: '/ai-chat',
        image: menuImageAiChat,
    },
]
