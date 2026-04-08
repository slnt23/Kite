# Router 目录说明

这里负责整个项目的 `vue-router` 路由组织。

## 当前路由文件

- `index.js`
  创建路由实例并导出。

- `modules/front.routes.js`
  存放前台站点路由。

## 当前前台完整路由路径

- `/`
  前台首页，对应 `HomeView.vue`

- `/story`
  品牌故事页，对应 `StoryView.vue`

- `/capabilities`
  服务能力页，对应 `CapabilitiesView.vue`

- `/login`
  登录预留页，对应 `LoginView.vue`

## 当前路由结构说明

- 最外层布局使用 `FrontLayout.vue`
- 所有前台页面都挂在前台布局下面
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
