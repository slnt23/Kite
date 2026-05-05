/**
 * Element Plus 相关：侧栏图标映射、带图标 key 的导航结构（在组件内映射为 @element-plus/icons-vue）
 */
import type { ProfileSectionId, ProfileSettingsIconKey, ProfileSettingsNavSection } from '@/types'

import { PROFILE_SECTION_ITEMS } from './example.constant'

export const PROFILE_SECTION_SIDEBAR_ICON: Record<ProfileSectionId, ProfileSettingsIconKey> = {
  public: 'user',
  account: 'setting',
  appearance: 'brush',
  accessibility: 'view',
  notifications: 'bell',
}

/** GitHub 风格设置侧栏：首组来自 PROFILE_SECTION_ITEMS，其余为展示用分组（可再接路由） */
export const PROFILE_SETTINGS_NAV_SECTIONS: ProfileSettingsNavSection[] = [
  {
    items: PROFILE_SECTION_ITEMS.map((s) => ({
      id: s.id,
      label: s.label,
      icon: PROFILE_SECTION_SIDEBAR_ICON[s.id],
      navigable: true,
    })),
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
      { id: 'access-emails', label: '邮箱', icon: 'message', navigable: false },
      {
        id: 'access-password',
        label: '密码与身份验证',
        icon: 'lock',
        navigable: false,
      },
      { id: 'access-sessions', label: '会话', icon: 'monitor', navigable: false },
      { id: 'access-ssh', label: 'SSH 与 GPG 密钥', icon: 'key', navigable: false },
      { id: 'access-orgs', label: '组织', icon: 'officeBuilding', navigable: false },
      { id: 'access-enterprise', label: '企业', icon: 'compass', navigable: false },
      {
        id: 'access-moderation',
        label: '审核与风控',
        icon: 'chatWarning',
        expandable: true,
        navigable: false,
      },
    ],
  },
  {
    title: '代码、规划与自动化',
    items: [
      { id: 'code-repos', label: '仓库', icon: 'folder', navigable: false },
      { id: 'code-codespaces', label: '开发环境', icon: 'monitor', navigable: false },
      {
        id: 'code-models',
        label: '模型',
        icon: 'share',
        badge: '预览',
        navigable: false,
      },
      { id: 'code-packages', label: '软件包', icon: 'box', navigable: false },
    ],
  },
]

/** 管理后台侧栏导航（图标由 Element Plus 映射解析） */
export const ADMIN_DASHBOARD_NAV_SECTIONS: ProfileSettingsNavSection[] = [
  {
    items: [
      { id: 'overview', label: '控制台总览', icon: 'monitor', navigable: true },
      { id: 'content', label: '内容管理', icon: 'folder', navigable: true },
      { id: 'settings', label: '系统设置', icon: 'setting', navigable: true },
    ],
  },
]
