/** 个人中心内容区区块 id */
export type ProfileSectionId =
  | 'public'
  | 'account'
  | 'appearance'
  | 'accessibility'
  | 'notifications'

export interface ProfileSectionItem {
  id: ProfileSectionId
  label: string
  heading: string
  description: string
}

/** 公开资料表单默认值（后续由接口数据替换） */
export interface PublicProfileFormExampleDefaults {
  displayName: string
  publicEmail: string
  bio: string
  pronouns: string
  websiteUrl: string
  avatarUrl: string
}

export interface ProfileSelectOption {
  value: string
  label: string
}

export interface ProfileInfoExample {
  label: string
  value: string
}

export interface ProfileCardExample {
  title: string
  description: string
}

/** 设置侧栏图标 key，在 ProfileSettingsSidebar 内映射为 Element Plus 图标 */
export type ProfileSettingsIconKey =
  | 'user'
  | 'setting'
  | 'brush'
  | 'view'
  | 'bell'
  | 'creditCard'
  | 'message'
  | 'lock'
  | 'monitor'
  | 'key'
  | 'officeBuilding'
  | 'compass'
  | 'chatWarning'
  | 'folder'
  | 'share'
  | 'box'

export interface ProfileSettingsNavItem {
  id: string
  label: string
  icon: ProfileSettingsIconKey
  badge?: string
  expandable?: boolean
  /** 为 false 时仅展示，不更新当前选中项（占位或后续再接路由） */
  navigable?: boolean
  disabled?: boolean
}

export interface ProfileSettingsNavSection {
  title?: string
  items: ProfileSettingsNavItem[]
}

export type AdminDashboardSectionId = 'overview' | 'content' | 'settings'

export interface AdminDashboardSectionMeta {
  eyebrow: string
  heading: string
  description: string
}

/** 个人中心「公开资料」表单可编辑快照 */
export interface EditablePublicProfile {
  userName: string
  phone: string
  displayName: string
  publicEmail: string
  bio: string
  pronouns: string
  websiteUrl: string
  avatarUrl: string
}
