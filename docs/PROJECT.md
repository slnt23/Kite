# Kite Studio 项目架构

基于 Vue 3 + TypeScript 的个人网站平台，采用前后台双门户架构。前台面向访客展示内容，后台提供管理功能。

## 架构概览

```
src/
├── api/               # Axios 接口层（实例 + 5 个业务模块）
├── assets/            # 静态资源（图片/视频/SVG）
├── components/        # Vue 组件（5 个域，共 28 个组件）
├── config/            # 应用配置、模块注册、自动生成文件
├── constant/          # 常量与示例数据（5 个模块）
├── layouts/           # 布局骨架（FrontLayout / AdminLayout）
├── router/            # Vue Router（front + admin 路由表）
├── style/             # SCSS 设计系统（tokens / base / utilities / element-plus）
├── types/             # TypeScript 类型定义（6 个模块）
├── utils/             # 工具函数（auth）
└── views/             # 页面视图（7 个前台 + 1 个后台）
```

## 技术栈详情

| 层 | 技术 | 说明 |
|----|------|------|
| 框架 | Vue 3.5 + TypeScript 6 | Composition API |
| 构建 | Vite 7 | 含 unplugin 自动导入 |
| 路由 | Vue Router 5 | HTML5 History 模式 |
| 状态 | Pinia 3 | 已安装，stores 待建设 |
| UI | Element Plus 2.13 | 全局注册 + 主题覆盖 |
| 图表 | ECharts 6 + vue-echarts 8 | 按需注册组件 |
| HTTP | Axios 1.15 | Bearer token 拦截器 |
| 样式 | Sass | SCSS + CSS 自定义属性 |

## 双门户设计

### 前台 (Front Portal)

- 布局: `FrontLayout.vue` — 可折叠头部、全屏菜单、登录弹窗、页脚
- 路由前缀: `/`
- 页面: 首页、博客、AI 对话、价格行情、画廊、个人中心

### 后台 (Admin Portal)

- 布局: `AdminLayout.vue` — 最小化外壳
- 路由前缀: `/admin`
- 页面: 仪表盘（控制台总览）

## 模块注册系统

模块注册中心在 `src/config/modules.ts`，收集所有模块配置并按门户和状态分组。

### 已注册模块

| 模块 | 门户 | 状态 | 分组 |
|------|------|------|------|
| front-about | front | online | brand |
| front-blog | front | building | brand |
| front-projects | front | planning | brand |
| admin-dashboard | admin | online | ops |
| admin-content | admin | building | ops |
| admin-settings | admin | planning | ops |

### 新增模块步骤

1. 在 `src/config/modules/front/` 或 `src/config/modules/admin/` 新建 `.module.ts` 文件
2. 按 `AppModule` 类型补齐字段（key、portal、title、status、group 等）
3. 在 `src/config/modules.ts` 中 import 并加入 registry 数组
4. 去 `src/views/`、`src/api/` 补页面和接口

## 组件分层

组件按功能域分组，每个域自包含：

- **site/** — 全站通用：HeroSection、MenuPanel、LoginDialog、SiteFooter、FeatureGrid、SpotlightSection、StatsSection、CTASection、SectionIntro、GalleryLightbox
- **ai/** — AI 聊天：ChatSidebar、ChatStream、ChatComposer
- **blog/** — 博客：AboutSection、PostsSection、EducationSection、SkillsSection
- **dashboard/** — 设置：SettingsWorkspaceShell、SettingsSidebar + 5 个 ProfileSection
- **price/** — 价格：PriceNavigator、PriceLatest、PriceTrend、PriceRegion、PriceSource

## API 层

```
api/
├── request/index.ts    # Axios 实例（baseURL: /api, 10s 超时, Bearer token）
└── modules/
    ├── auth.api.ts     # 登录 / 注册 / 验证码
    ├── ai.api.ts       # AI 对话
    ├── admin.api.ts    # Spotlight / Feature CRUD
    ├── front.api.ts    # 前台公开接口
    └── price.api.ts    # 价格查询
```

响应拦截器统一检查 `res.code !== 200`，未认证时自动 reject。

## 认证

基于 localStorage 的 JWT 方案：
- `utils/auth.ts` 封装 token 存取与用户状态
- `AUTH_CHANGE_EVENT` 自定义事件用于跨组件通信
- 路由守卫 `router/index.ts` 检查 `requiresAuth` / `requiresAdmin` / `publicOnly`

## 样式系统

`src/style/` 下的分层 SCSS：

| 文件 | 职责 |
|------|------|
| `_tokens.scss` | CSS 自定义属性（颜色/圆角/阴影/间距/排版） |
| `_base.scss` | 全局重置 |
| `_utilities.scss` | 工具类（glass-panel、eyebrow-label 等） |
| `_element-plus.scss` | Element Plus 主题覆盖 |

设计参考 Vercel 品牌语言，详见 `skills/DESIGN.md`。

## 构建配置

- `vite.config.ts` — Vue 插件 + unplugin 自动导入 + `/api` 代理
- `tsconfig.json` — 继承 `@vue/tsconfig`，路径别名 `@/` → `src/`
- `.env.development` — 开发环境变量（API 代理目标）
- `.env.production` — 生产环境变量

## 路由守卫逻辑

```
未认证 → 访问 requiresAuth 页面 → 阻止并提示
已认证 → 访问 publicOnly 页面 → 重定向到 profile/dashboard
非管理员 → 访问 requiresAdmin 页面 → 重定向到 profile
```

## 开发命令

```bash
npm run dev           # 启动开发服务器
npm run build         # vue-tsc 检查 + vite 构建
npm run preview       # 预览构建产物
npm run type-check    # 仅 TypeScript 类型检查
```
