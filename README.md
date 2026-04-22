# Kite 项目架构说明

这是一个面向长期扩展的个人网站基础骨架，目标是先把个人网站、兴趣模块和后台管理的工程结构搭稳，再逐步补业务。

## 当前技术栈

移动- `Vue 3` + `TypeScript`
- `Vite`
- `Vue Router`
- `Pinia` (状态管理)
- `Axios`
- `Element Plus` (UI组件库)
- `Sass`
- `Unplugin Auto Import` (自动导入)
- `Unplugin Vue Components` (组件自动导入)

## 重构后的目录结构

```text
src
├─ api                     # axios 接口层
│  ├─ modules              # API 模块
│  └─ request              # 请求配置
├─ app                     # 应用级配置与模块注册配置
│  ├─ modules              # 模块元信息配置，不放真实页面
│  ├─ app.config.ts
│  └─ modules.ts
├─ assets                  # 静态资源，例如图片、图标、插图
├─ components              # 项目通用组件
│  ├─ site                 # 站点相关组件
│  ├─ ui                   # UI组件
│  └─ management           # 管理组件
├─ composables             # 组合式逻辑复用
├─ constants               # 常量定义
├─ layouts                 # 前台/后台布局骨架
├─ router                  # vue-router 路由层
│  ├─ index.ts
│  └─ modules              # 路由模块
├─ stores                  # Pinia 状态管理
├─ types                   # TypeScript 类型定义
│  ├─ api.ts               # API 相关类型
│  ├─ store.ts             # Store 相关类型
│  ├─ router.ts            # 路由和模块配置类型
│  ├─ auto-imports.d.ts    # 自动导入声明
│  ├─ components.d.ts      # 组件声明
│  ├─ index.ts             # 类型导出
│  └─ dto                  # 数据传输对象
├─ utils                   # 工具函数
├─ views                   # 真实页面目录
│  ├─ front                # 前台页面
│  └─ admin                # 后台页面
├─ App.vue
├─ main.ts
└─ style.scss
```

## TypeScript 重构说明

项目已全面重构为 TypeScript，提供更好的类型安全和开发体验：

### 类型定义结构

- **API 类型** (`types/api.ts`): 接口请求/响应类型定义
- **Store 类型** (`types/store.ts`): 状态管理相关类型
- **路由类型** (`types/router.ts`): 路由和模块配置类型
- **自动生成类型**: `auto-imports.d.ts` 和 `components.d.ts` 由构建工具自动生成

### 主要改进

1. **类型安全**: 为所有组件、函数和数据结构添加类型注解
2. **更好的 IDE 支持**: 智能提示、重构和错误检测
3. **维护性**: 明确的接口契约，减少运行时错误
4. **渐进式迁移**: 可以逐步完善类型定义


## 当前目录职责

### `src/app`

- `app.config.ts`
  放站点级配置。

- `modules.ts`
  作为模块注册中心，统一聚合前台和后台模块配置。

- `modules/front`
  前台模块配置目录。

- `modules/admin`
  后台模块配置目录。

### `src/components`

这里放项目复用组件，例如：

- `site/`: 站点相关组件 (FeatureGrid, SectionIntro 等)
- `ui/`: UI组件 (LoginDialog 等)
- `management/`: 管理组件

### `src/assets`

这里放静态资源，例如：

- logo
- 图标
- 插图
- 背景图

### `src/views`

这里用于放真实页面，已按功能拆分：

- `views/front`: 前台页面
- `views/admin`: 后台页面

### `src/router`

这里用于 `vue-router` 配置：

- `index.ts`: 主路由配置
- `modules/`: 路由模块配置
- 包含路由守卫和权限控制

### `src/api`

这里用于 `axios` 接口：

- `request/`: 请求配置和拦截器
- `modules/`: API 模块

### `src/types`

TypeScript 类型定义目录：

- `api.ts`: API 相关类型
- `store.ts`: Store 相关类型
- `router.ts`: 路由和模块类型
- `auto-imports.d.ts`: 自动导入声明
- `components.d.ts`: 组件声明

## 如何新增一个模块

1. 在 `src/app/modules/front` 或 `src/app/modules/admin` 新建模块配置文件 (`.ts`)。
2. 按当前模块对象结构补齐字段，注意使用 `as const` 断言。
3. 在 `src/app/modules.ts` 中注册该模块。
4. 如果开始做真实功能，再去 `src/views`、`src/api`、`src/stores` 补页面和业务代码。
5. 为新功能添加相应的 TypeScript 类型定义。

## 当前阶段已完成

- ✅ 区分前台与后台
- ✅ 建立模块注册机制
- ✅ 将模块配置统一收口到 `src/app/modules`
- ✅ 将复用组件统一收口到 `src/components`
- ✅ 保留 `src/assets` 作为静态资源目录
- ✅ 预留 `router` 与 `api` 目录
- ✅ **全面重构为 TypeScript**
- ✅ 建立完整的类型定义体系
- ✅ 配置自动导入和组件注册

## 开发命令

```bash
# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# TypeScript 类型检查
npm run type-check
```

## 项目特色

- **模块化架构**: 清晰的目录结构和职责分离
- **TypeScript 支持**: 完整的类型安全保障
- **现代化工具链**: Vite + Vue 3 + Pinia
- **组件自动导入**: 无需手动导入常用组件
- **响应式设计**: 支持移动端和桌面端
- **可扩展性**: 易于添加新功能和模块
