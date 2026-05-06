import type { ProfileSettingsNavSection } from '@/types'
import { PROFILE_SECTION_ITEMS } from './example.constant'

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