

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
    id: number  //
    order: number
    link: string
    target: string
}

export interface FeatureItem {
    icon: string
}