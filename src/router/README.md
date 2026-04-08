# Router 目录说明

这里负责整个项目的 `vue-router` 路由组织。

## 当前路由文件

- `index.js`
  创建路由实例、滚动行为和前端路由守卫。

- `modules/front.routes.js`
  存放前台站点路由。

## 当前前台完整路由路径

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

## 当前路由结构说明

- 最外层布局使用 `FrontLayout.vue`
- 所有前台页面都挂在前台布局下面
- `StoryView.vue` 与 `CapabilitiesView.vue` 已标记为受保护页面
- 进入受保护页面前，路由守卫会检查本地登录态
- 当前登录页使用前端访问码演示，仅为方案 B 的前端骨架，不是最终安全方案
- 后续如果增加后台，可以继续新增：
  - `modules/admin.routes.js`
  - `AdminLayout.vue`
  - `views/admin/*`

## 后续扩展建议

后续如果继续扩展前台站点，建议在 `modules/front.routes.js` 中继续增加：

- `/projects`
- `/blog`
- `/contact`
- `/lab`
