// Router 相关类型定义

import type { RouteRecordRaw } from 'vue-router'

export interface RouteMeta {
  requiresAuth?: boolean
  requiresAdmin?: boolean
  publicOnly?: boolean
}

export interface AppRoute {
  path: string
  component?: any
  name?: string
  children?: AppRoute[]
  meta?: RouteMeta
}

export interface ModuleGroup {
  key: string
  title: string
  description: string
  modules: AppModule[]
}

export interface AppModule {
  key: string
  portal: 'front' | 'admin'
  title: string
  description: string
  scope: string
  nextStep: string
  status: 'online' | 'planning' | 'building'
  statusLabel: string
  group: {
    key: string
    title: string
    description: string
  }
}
