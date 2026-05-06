# Kite 项目架构说明

这是一个面向长期扩展的个人网站基础骨架，目标是先把个人网站、兴趣模块和后台管理的工程结构搭稳，再逐步补业务。

## 项目概述

Kite 是一个基于 Vue 3 + TypeScript 的个人网站项目，采用现代化的前端技术栈构建。项目采用模块化架构设计，支持前台官网展示和后台管理系统的无缝集成。

## 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **路由管理**: Vue Router
- **状态管理**: Pinia
- **HTTP 客户端**: Axios
- **UI 组件库**: Element Plus
- **样式预处理器**: Sass
- **开发工具**: Unplugin Auto Import, Unplugin Vue Components

## 项目特色

- **TypeScript 全面支持**: 提供完整的类型安全
- **模块化架构**: 清晰的目录结构和职责分离
- **响应式设计**: 适配桌面端和移动端
- **渐进式开发**: 支持功能模块的逐步扩展
- **现代化工具链**: 集成最新的前端开发工具

---

# 详细目录说明

## 整体目录结构

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

## API 目录说明

这里预留给 `axios` 接口层使用，当前先只创建结构，不写具体请求代码。

### 建议拆分方式

- `request/`
  放 axios 实例、请求拦截器、响应拦截器、统一错误处理。

- `modules/`
  按业务模块拆分接口，比如文章、项目、用户、系统配置。

- `index.js`
  作为统一导出入口，方便页面层按模块引用。

### Request 目录说明

这里后续用于放置 axios 基础封装，例如：
- `http.js`
- `interceptors.js`
- `status-map.js`

### API Modules 目录说明

这里后续按业务模块拆分接口文件，例如：
- `article.api.js`
- `project.api.js`
- `user.api.js`
- `setting.api.js`

## Components 目录说明

此目录包含所有按用途和使用情况组织的 Vue 组件。

### 目录结构

```
src/
├── layouts/              ← 布局文件，如 FrontLayout.vue
├── components/
│   ├── site/             ← 网站专用组件（SiteHeader、SiteFooter、MenuPanel 等）
│   ├── common/           ← 通用可复用组件
│   ├── ui/               ← Element Plus 二次封装组件
│   ├── management/       ← 管理和编辑组件
│   ├── ModuleCard.vue    ← 模块卡片组件
│   ├── ModuleGrid.vue    ← 模块网格布局组件
│   └── OverviewPanel.vue ← 概览面板组件
├── views/
│   └── front/            ← 页面视图，如 LandingHomeView、LoginView
├── router/
└── utils/
```

### 组件描述

#### ui/
- **LoginDialog.vue**: 登录对话框组件，支持管理员和用户登录模式。包含邮箱验证码登录和密码登录选项，具有模式间的动画过渡。

#### site/
- **CapabilityTable.vue**: 表格组件，用于显示网站能力或服务功能。
- **FeatureGrid.vue**: 网格组件，用于展示产品特性和亮点。
- **HeroSection.vue**: 英雄区域组件，通常用于首页的突出展示和行动号召。
- **MenuPanel.vue**: 导航菜单面板组件，用于网站导航。
- **SectionIntro.vue**: 介绍章节组件，用于页面章节和内容介绍。
- **SiteFooter.vue**: 网站页脚组件，包含链接和信息。
- **SpotlightSection.vue**: 聚光灯区域组件，用于突出显示重要内容或功能。
- **StoryTimeline.vue**: 时间线组件，用于显示故事进展或历史事件。

#### management/
- **EditorialWorkspace.vue**: 编辑工作区组件，用于内容创建和编辑界面。

#### 根目录组件
- **ModuleCard.vue**: 卡片组件，用于显示单个模块信息和操作。
- **ModuleGrid.vue**: 网格布局组件，用于排列和显示多个模块。
- **OverviewPanel.vue**: 面板组件，用于显示概览统计和关键信息。

### 备注
- login-dialog 已完成，未适配接口。

## Router 目录说明

这里负责整个项目的 `vue-router` 路由组织。

### 当前路由文件

- `index.js`
  创建路由实例、滚动行为和前端路由守卫。

- `modules/front.routes.js`
  存放前台站点路由。

### 当前前台完整路由路径

- `/`
  前台首页，对应 `HomeView.vue`

- `/story`
  品牌故事页，对应 `StoryView.vue`
  当前已加前端路由守卫，未登录会先跳转到 `/login`

- `/capabilities`
  服务能力页，对应 `CapabilitiesView.vue`
  当前已加前端路由守卫，未登录会先跳转到 `/login`

- `/login`
  登录预留页，对应 `LoginView.vue`

### 当前路由结构说明

- 最外层布局使用 `FrontLayout.vue`
- 所有前台页面都挂在前台布局下面
- `StoryView.vue` 与 `CapabilitiesView.vue` 已标记为受保护页面
- 进入受保护页面前，路由守卫会检查本地登录态
- 当前登录页使用前端访问码演示，仅为方案 B 的前端骨架，不是最终安全方案
- 后续如果增加后台，可以继续新增：
  - `modules/admin.routes.js`
  - `AdminLayout.vue`
  - `views/admin/*`

### 后续扩展建议

后续如果继续扩展前台站点，建议在 `modules/front.routes.js` 中继续增加：
- `/projects`
- `/blog`
- `/contact`
- `/lab`

## Utils 目录说明

这里用于放公共工具函数，例如：
- 时间格式化
- 路径处理
- 树结构转换
- 本地缓存封装

当前仅预留目录。
- 登录鉴权，后续会放在 `auth` 目录下。

## Views 目录说明

这里预留给真实页面使用。

建议按前台和后台继续拆分：
- `front/`
  访客可访问页面。
- `admin/`
  管理后台页面。

当前仅预留目录。

## Stores 目录说明

这里预留给状态管理使用。

如果后续你接入 `Pinia`，建议在这里按领域拆分 store，例如：
- `app.store.js`
- `user.store.js`
- `content.store.js`
- `settings.store.js`

当前仅预留目录。

## TypeScript 重构说明

项目已全面重构为 TypeScript，提供更好的类型安全和开发体验：

### 类型定义结构

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

### `src/assets`

这里放静态资源，例如：图片、图标、插图等。

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