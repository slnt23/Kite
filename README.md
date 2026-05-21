# Kite Studio

基于 Vue 3 + TypeScript 的个人网站平台，前后台双门户架构。

## 技术栈

Vue 3 · TypeScript · Vite · Vue Router · Pinia · Element Plus · Axios · ECharts · Sass

## 快速开始

```bash
npm install
npm run dev      # 开发服务器 (http://localhost:5173)
npm run build    # 生产构建
npm run preview  # 预览生产构建
```

## 目录结构

```
src/
├── api/               # Axios 接口层
│   ├── request/       # 请求实例与拦截器
│   └── modules/       # 按业务拆分的 API 模块
├── assets/            # 静态资源
├── components/        # Vue 组件（按域分组）
│   ├── ai/            # AI 聊天
│   ├── blog/          # 博客
│   ├── dashboard/     # 设置面板
│   ├── price/         # 价格行情
│   └── site/          # 通用站点组件
├── config/            # 应用配置与自动生成文件
│   ├── app.config.ts  # 站点元数据
│   ├── modules.ts     # 模块注册中心
│   ├── modules/       # 各模块元信息
│   └── auto/          # 构建工具自动生成
├── constant/          # 常量与示例数据
├── layouts/           # 布局骨架（Front / Admin）
├── router/            # Vue Router 路由
├── style/             # SCSS 样式
├── types/             # TypeScript 类型定义
├── utils/             # 工具函数
└── views/             # 页面视图
    ├── front/         # 前台页面（首页/博客/AI/价格/画廊/个人中心）
    └── admin/         # 后台页面（仪表盘）
```

## 路由

| 路径 | 页面 | 布局 |
|------|------|------|
| `/` | 首页 | FrontLayout |
| `/blog` | 博客 | FrontLayout |
| `/ai-ai` | AI 对话 | FrontLayout |
| `/price-query` | 价格行情 | FrontLayout |
| `/story` | 画廊 | FrontLayout |
| `/profile` | 个人中心 | FrontLayout |
| `/admin/dashboard` | 管理后台 | AdminLayout |

## 模块系统

项目通过 `src/config/modules.ts` 统一注册前台与后台的功能模块，支持 `online` / `building` / `planning` 三种状态。新增模块只需在 `src/config/modules/` 下添加配置文件并注册。

详见 [docs/PROJECT.md](docs/PROJECT.md)
