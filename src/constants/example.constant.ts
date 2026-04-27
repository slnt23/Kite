import type { FeatureItem, SpotlightItem } from "@/types";
import projectImageOne from '@/assets/front/pic01.jpg'
import projectImageTwo from '@/assets/front/pic02.jpg'
import projectImageThree from '@/assets/front/pic03.jpg'


export const SPOTLIGHT_ITEMS: SpotlightItem[] = [
    {
        id: 1,
        eyebrow: 'Brand System',
        title: '个人品牌与内容表达同时在线',
        description:
            '保留模板里强叙事的首屏和分段式内容节奏，把它转成更适合个人站点的品牌展示、内容输出与项目入口。',
        image: projectImageOne,
        order: 1,
        link: '/brand',
        target: '_self',
    },
    {
        id: 2,
        eyebrow: 'Project Layer',
        title: '每个兴趣项目都能自然接入',
        description:
            '站点会持续扩展新的兴趣模块，所以首页不只负责展示，也要承担导航与聚合能力，让访问者快速理解你的主线。',
        image: projectImageTwo,
        order: 2,
        link: '/projects',
        target: '_self',
    },
    {
        id: 3,
        eyebrow: 'Growth System',
        title: '从前台展示平滑过渡到后续后台运营',
        description:
            '现在先完成前台官网，后面接入管理后台时，可以继续沿用内容、项目和模块的整体结构，不需要推翻重做。',
        image: projectImageThree,
        order: 3,
        link: '/growth',
        target: '_self',
    },
]



export const FEATURE_ITEMS: FeatureItem[] = [
    {
        icon: '01',
        title: '全屏首屏叙事',
        description: '首页首屏改成全屏背景图，核心文案绝对居中，第一眼就建立网站气质。',
    },
    {
        icon: '02',
        title: '天蓝渐变系统',
        description: '主色改成天蓝、雾白和通透高光，让视觉从深海蓝切换到更轻盈的呼吸感。',
    },
    {
        icon: '03',
        title: '滚动状态切换',
        description: '首屏顶部保留右侧操作，向下滑动后再收口为左站名右操作的紧凑导航。',
    },
    {
        icon: '04',
        title: '宫格菜单入口',
        description: '点击 MENU 打开响应式瀑布流图片宫格，直接跳转到品牌故事、服务能力等子页面。',
    },
]