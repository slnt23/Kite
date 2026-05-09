import request from '../request/index'

// AI 聊天 API
export const aiChatApi = (data: any) => {
  return request({
    url: '/ai/chat',
    method: 'post',
    data
  })
}

// AI 建议 API
export const aiSuggestApi = (data: any) => {
  return request({
    url: '/ai/suggest',
    method: 'post',
    data
  })
}

// AI 分析 API
export const aiAnalyzeApi = (data: any) => {
  return request({
    url: '/ai/analyze',
    method: 'post',
    data
  })
}

// 获取 AI 历史记录 API
export const getAiHistoryApi = (params: any) => {
  return request({
    url: '/ai/history',
    method: 'get',
    params
  })
}
