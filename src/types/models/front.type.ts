// import type {IconKey, ProfileSectionId} from "@/types";


export interface MenuItem {
    title: string
    subtitle: string
    path: string
    image: string
    size?: 'large' | 'normal' | 'small'
}


export interface SpotlightItem {
    eyebrow?: string
    title: string
    description?: string
    imageUrl: string
    id: number  //是否唯一
    order: number  //排序
    link: string  //链接
    target: string  //打开方式
}

export interface FeatureItem {
    icon: string
    title: string
    description: string
}


export interface SectionIntroData {
    eyebrow: string
    title: string
    description: string
}


// 用户profile栏，
// export interface ProfileSettingsNavSection {
//     title?: string
//     items?: ProfileSettingsNavItem[]
// }
//
// export interface ProfileSettingsNavItem {
//     id: ProfileSectionId
//     label: string
//     icon: IconKey
//     badge?: string
//     expandable?: boolean
//     /** 为 false 时仅展示，不更新当前选中项（占位或后续再接路由） */
//     navigable?: boolean
//     disabled?: boolean
// }
