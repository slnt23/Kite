# Kite 项目架构说明

这是一个面向长期扩展的个人网站基础骨架，目标是先把个人网站、兴趣模块和后台管理的工程结构搭稳，再逐步补业务。

## 当前技术栈

- `Vue 3`
- `Vite`
- `Vue Router`
- `Axios`
- `Sass`

## 重构后的目录结构

```text
src
├─ api                     # axios 接口层
├─ app                     # 应用级配置与模块注册配置
│  ├─ modules              # 模块元信息配置，不放真实页面
│  ├─ app.config.js
│  └─ modules.js
├─ assets                  # 静态资源，例如图片、图标、插图
├─ components              # 项目通用组件
├─ composables             # 组合式逻辑复用
├─ constants               # 常量定义
├─ layouts                 # 前台/后台布局骨架
├─ router                  # vue-router 路由层
├─ stores                  # 状态管理
├─ utils                   # 工具函数
├─ views                   # 真实页面目录
├─ App.vue
├─ main.js
└─ style.css
```

## 为什么要这样精简

之前 `views` 和 `modules` 容易看起来像在放同一类东西，`shared/components` 也和根目录 `components` 重复。

现在职责改为：

- `views`
  只放真实页面，比如首页、博客页、后台控制台页。

- `app/modules`
  只放模块配置，比如标题、描述、状态、分组、展示信息。

- `components`
  只放可复用组件。

- `assets`
  只放静态资源。

- `router`
  只放页面路由。

- `api`
  只放接口请求。

## 当前目录职责

### `src/app`

- `app.config.js`
  放站点级配置。

- `modules.js`
  作为模块注册中心，统一聚合前台和后台模块配置。

- `modules/front`
  前台模块配置目录。

- `modules/admin`
  后台模块配置目录。

### `src/components`

这里放项目复用组件，例如：

- `OverviewPanel.vue`
- `ModuleGrid.vue`
- `ModuleCard.vue`

### `src/assets`

这里放静态资源，例如：

- logo
- 图标
- 插图
- 背景图

### `src/views`

这里用于放真实页面，建议后续继续拆成：

- `views/front`
- `views/admin`

### `src/router`

这里预留给 `vue-router`，后续建议增加：

- `index.js`
- `modules/front.routes.js`
- `modules/admin.routes.js`
- `guards.js`

### `src/api`

这里预留给 `axios`，后续建议增加：

- `request/http.js`
- `request/interceptors.js`
- `modules/article.api.js`
- `modules/project.api.js`

## 如何新增一个模块

1. 在 `src/app/modules/front` 或 `src/app/modules/admin` 新建模块配置文件。
2. 按当前模块对象结构补齐字段。
3. 在 `src/app/modules.js` 中注册该模块。
4. 如果开始做真实功能，再去 `src/views`、`src/api`、`src/stores` 补页面和业务代码。

## 当前阶段已完成

- 区分前台与后台
- 建立模块注册机制
- 将模块配置统一收口到 `src/app/modules`
- 将复用组件统一收口到 `src/components`
- 保留 `src/assets` 作为静态资源目录
- 预留 `router` 与 `api` 目录

## 启动项目

```bash
npm run dev
```
