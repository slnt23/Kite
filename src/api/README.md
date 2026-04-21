# API 目录说明

这里预留给 `axios` 接口层使用，当前先只创建结构，不写具体请求代码。

建议后续拆分方式：

- `request/`
  放 axios 实例、请求拦截器、响应拦截器、统一错误处理。

- `modules/`
  按业务模块拆分接口，比如文章、项目、用户、系统配置。

- `index.js`
  作为统一导出入口，方便页面层按模块引用。
  
# Request 目录说明

这里后续用于放置 axios 基础封装，例如：

- `http.js`
- `interceptors.js`
- `status-map.js`

当前仅预留目录。

# API Modules 目录说明

这里后续按业务模块拆分接口文件，例如：

- `article.api.js`
- `project.api.js`
- `user.api.js`
- `setting.api.js`

当前仅预留目录。
