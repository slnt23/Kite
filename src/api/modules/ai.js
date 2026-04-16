import request from '../request/index'

// AI 聊天 API
export const aiChatApi = (data) => {
  return request({
    url: '/api/ai/chat',
    method: 'post',
    data
  })
}

// AI 建议 API
export const aiSuggestApi = (data) => {
  return request({
    url: '/api/ai/suggest',
    method: 'post',
    data
  })
}

// AI 分析 API
export const aiAnalyzeApi = (data) => {
  return request({
    url: '/api/ai/analyze',
    method: 'post',
    data
  })
}

// 获取 AI 历史记录 API
export const getAiHistoryApi = (params) => {
  return request({
    url: '/api/ai/history',
    method: 'get',
    params
  })
}
