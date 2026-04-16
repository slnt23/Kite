# 组件

此目录包含所有按用途和使用情况组织的 Vue 组件。

## 目录结构

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

## 组件描述

### ui/
- **LoginDialog.vue**: 登录对话框组件，支持管理员和用户登录模式。包含邮箱验证码登录和密码登录选项，具有模式间的动画过渡。

### site/
- **CapabilityTable.vue**: 表格组件，用于显示网站能力或服务功能。
- **FeatureGrid.vue**: 网格组件，用于展示产品特性和亮点。
- **HeroSection.vue**: 英雄区域组件，通常用于首页的突出展示和行动号召。
- **MenuPanel.vue**: 导航菜单面板组件，用于网站导航。
- **SectionIntro.vue**: 介绍章节组件，用于页面章节和内容介绍。
- **SiteFooter.vue**: 网站页脚组件，包含链接和信息。
- **SpotlightSection.vue**: 聚光灯区域组件，用于突出显示重要内容或功能。
- **StoryTimeline.vue**: 时间线组件，用于显示故事进展或历史事件。

### management/
- **EditorialWorkspace.vue**: 编辑工作区组件，用于内容创建和编辑界面。

### 根目录组件
- **ModuleCard.vue**: 卡片组件，用于显示单个模块信息和操作。
- **ModuleGrid.vue**: 网格布局组件，用于排列和显示多个模块。
- **OverviewPanel.vue**: 面板组件，用于显示概览统计和关键信息。

# 备注
- login-dialog 已完成，未适配接口。
