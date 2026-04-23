

export interface MenuItem {
    title: string
    subtitle: string
    path: string
    image: string
    size?: 'large' | 'normal' | 'small'
}


export interface SpotlightItem {
    eyebrow: string
    title: string
    description: string
    image: string
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