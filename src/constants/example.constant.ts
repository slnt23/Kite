import type {
  AdminDashboardSectionId,
  AdminDashboardSectionMeta,
  FeatureItem,
  ProfileCardExample,
  ProfileInfoExample,
  ProfileSectionItem,
  ProfileSelectOption,
  PublicProfileFormExampleDefaults,
  SpotlightItem,
} from '@/types'
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

// export const EXAMPLE_PUBLIC_PROFILE_DEFAULTS: PublicProfileFormExampleDefaults = {
//   displayName: 'Queue',
//   publicEmail: '123456@qq.com',
//   bio: 'Explore the Future,',
//   pronouns: '',
//   websiteUrl: '',
//   avatarUrl: projectImageOne as string,
// }

export const EXAMPLE_PUBLIC_PROFILE_EMAIL_OPTIONS: ProfileSelectOption[] = [
  { value: '', label: '选择已验证邮箱以展示' },
  { value: 'verified@kite.local', label: 'verified@kite.local' },
]

export const EXAMPLE_PUBLIC_PROFILE_PRONOUNS_OPTIONS: ProfileSelectOption[] = [
  { value: '', label: '不指定' },
  { value: 'he/him', label: 'He/him' },
  { value: 'she/her', label: 'She/her' },
  { value: 'they/them', label: 'They/them' },
]

export const EXAMPLE_PUBLIC_PROFILE_HINTS = {
  displayName:
    '你的姓名可能会显示在站点中你参与协作或被提及的位置，可随时修改或清空。',
  publicEmail:
    '你已将邮箱设为私密。要调整展示方式，请到「邮箱设置」中取消勾选「对外隐藏邮箱」。',
  bio: '可以 @ 其他用户或组织，生成指向对方的链接。',
  pronouns: '',
  websiteUrl: '',
} as const

export const PROFILE_SECTION_ITEMS: ProfileSectionItem[] = [
  {
    id: 'public',
    label: '公开资料',
    heading: '公开资料',
    description: '管理个人资料页中展示的身份信息与公开链接。',
  },
  {
    id: 'account',
    label: '账户',
    heading: '账户',
    description: '查看当前账户详情、登录方式与核心联系信息。',
  },
  {
    id: 'appearance',
    label: '外观',
    heading: '外观',
    description: '调整工作区的视觉样式、界面密度与展示偏好。',
  },
  {
    id: 'accessibility',
    label: '无障碍',
    heading: '无障碍',
    description: '配置更易读的文字、更低动效与辅助浏览偏好。',
  },
  {
    id: 'notifications',
    label: '通知',
    heading: '通知',
    description: '管理账户动态、系统更新与 AI 助手相关提醒。',
  },
]

export const PROFILE_ACCOUNT_CARDS: ProfileInfoExample[] = [
  { label: '当前身份', value: '个人账户' },
  { label: '登录方式', value: '邮箱验证' },
  { label: '最近活动', value: '未记录' },
  { label: '主邮箱', value: 'guest@kite.local' },
]

export const PROFILE_APPEARANCE_CARDS: ProfileCardExample[] = [
  {
    title: '界面密度',
    description: '使用舒展且均衡的排版，让设置项更容易浏览与对比。',
  },
  {
    title: '圆角样式',
    description: '控件采用方形圆角外观，与参考图中的侧栏与面板风格保持一致。',
  },
  {
    title: '层级关系',
    description: '减少厚重边框与装饰，通过留白和浅色背景来划分信息层次。',
  },
]

export const PROFILE_ACCESSIBILITY_CARDS: ProfileCardExample[] = [
  {
    title: '易读排版',
    description: '在桌面端保持舒适阅读比例，同时让移动端布局更轻盈清爽。',
  },
  {
    title: '减少动效',
    description: '优先使用更轻的过渡效果，避免过强的面板动画带来视觉疲劳。',
  },
]

export const PROFILE_NOTIFICATION_CARDS: ProfileCardExample[] = [
  {
    title: '价格提醒',
    description: '按品类、地区或材料跟踪价格变化，并及时接收动态通知。',
  },
  {
    title: 'AI 助手动态',
    description: '当长会话、摘要或任务结果生成完成时，第一时间收到提醒。',
  },
  {
    title: '安全消息',
    description: '接收重要的账户访问提醒、会话变化通知与策略更新摘要。',
  },
]

/** 管理后台各 tab 文案（示例，后续接接口） */
export const ADMIN_DASHBOARD_SECTION_META: Record<AdminDashboardSectionId, AdminDashboardSectionMeta> = {
  overview: {
    eyebrow: '管理后台',
    heading: '控制台总览',
    description: '这里可接访问统计、模块状态和待办提醒；下方为能力占位，与原先控制台文案一致。',
  },
  content: {
    eyebrow: '管理后台',
    heading: '内容管理',
    description: '占位承接文章、价格数据、AI 预设和资源配置；卡片区域用于后续接入列表与编辑器。',
  },
  settings: {
    eyebrow: '管理后台',
    heading: '系统设置',
    description: '后续可接权限角色、菜单开关和日志记录；当前展示账户与后台环境说明。',
  },
}

export const ADMIN_OVERVIEW_QUICK_CARDS: ProfileCardExample[] = [
  {
    title: '控制台总览',
    description: '这里可接访问统计、模块状态和待办提醒。',
  },
  {
    title: '内容管理',
    description: '占位承接文章、价格数据、AI 预设和资源配置。',
  },
  {
    title: '系统设置',
    description: '后续可接权限角色、菜单开关和日志记录。',
  },
]

export const ADMIN_OVERVIEW_FEATURE_CARDS: ProfileCardExample[] = [
  {
    title: '数据看板',
    description: '编辑部风格主区块改造成后台概览看板。',
  },
  {
    title: '菜单管理',
    description: '预留给后台菜单、入口排序和模块开关管理。',
  },
  {
    title: '用户与权限',
    description: '后续可接角色、权限组和登录审计能力。',
  },
  {
    title: '运营内容',
    description: '占位给文章、图片、报价内容和配置项管理。',
  },
]

export const ADMIN_SETTINGS_INFO_FALLBACK: ProfileInfoExample[] = [
  { label: '当前角色', value: '未登录' },
  { label: '管理模式', value: '管理员后台界面已独立于前台导航显示。' },
  { label: '退出方式', value: '侧栏底部可退出登录并返回登录页。' },
]
