import axios from 'axios'

// 创建 axios 实例，配置基础设置
const request = axios.create({
    baseURL: '/api', // API 基础 URL，所有请求都会以此为前缀
    timeout: 10000, // 请求超时时间，单位毫秒
    headers: {
        'Content-Type': 'application/json' // 默认请求头，指定内容类型为 JSON
    }
})

// 请求拦截器：在每次请求发送前执行
request.interceptors.request.use(config => {
    // 从本地存储获取 token
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// 响应拦截器：在每次响应返回后执行
request.interceptors.response.use(
    response => {
        const res = response.data
        // 检查响应代码，如果不是 200，表示请求失败
        if (res.code !== 200) {
            // 返回 Promise.reject，触发错误处理
            return Promise.reject(new Error(res.message || 'Error'))
        }
        return res
    },
    error => Promise.reject(error)
)

// 导出配置好的 axios 实例，供其他模块使用
export default request
