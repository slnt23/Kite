

/**
 * 设置侧栏图标 key，在 SettingsSidebar 内映射为 Element Plus 图标
 * */
export type IconKey =
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

// /**
//  * 个人中心内容区区块 id,
//  * profile中加一个区块，这里加一个选项，
//  * */
// export type ProfileSectionId =


/**
 * 状态栏控制中心内容区区块 id,
 * dashboard 中加一个区块，这里加一个选项，
 * */
export type DashboardSectionId =
    | 'overview'
    | 'content'
    | 'settings'
    | 'user'
    | 'role'
    | 'spotlight'
    | 'feature'
    | 'public'
    | 'account'
    | 'appearance'
    | 'accessibility'
    | 'notifications'
    | 'access-billing'

// Dashboard栏，
export interface NavSection {
    title?: string
    items?: NavItem[]
}

export interface NavItem {
    id: DashboardSectionId
    label: string
    icon: IconKey
    badge?: string
    expandable?: boolean
    /** 为 false 时仅展示，不更新当前选中项（占位或后续再接路由） */
    navigable?: boolean
    disabled?: boolean
}
