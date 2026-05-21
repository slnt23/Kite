import request from '../request/index'
import type { ChatRequestDTO, ConversationVO, CreateConversationDTO, MessageVO } from '@/types'

/** 发送聊天消息 */
export const sendChatApi = (data: ChatRequestDTO) => {
  return request<string>({
    url: '/ai/chat',
    method: 'post',
    data,
  })
}

/** 新建会话 */
export const createConversationApi = (data?: CreateConversationDTO) => {
  return request<string>({
    url: '/ai/conversation',
    method: 'post',
    data,
  })
}

/** 获取会话历史列表 */
export const listConversationsApi = () => {
  return request<ConversationVO[]>({
    url: '/ai/conversation/list',
    method: 'get',
  })
}

/** 获取会话的历史消息 */
export const getMessagesApi = (conversationId: string) => {
  return request<MessageVO[]>({
    url: `/ai/conversation/${conversationId}/messages`,
    method: 'get',
  })
}

/** 删除会话 */
export const deleteConversationApi = (conversationId: string) => {
  return request<void>({
    url: `/ai/conversation/${conversationId}`,
    method: 'delete',
  })
}
