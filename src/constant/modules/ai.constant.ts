/** AI 聊天 — UI 层消息 */
export interface AiMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

/** AI 聊天 — UI 层会话 */
export interface AiConversation {
  id: string
  title: string
  preview: string
  timestamp: Date
}

// /** 示例会话列表 */
// export const AI_MOCK_CONVERSATIONS: AiConversation[] = [
//   {
//     id: '1',
//     title: 'AI 助手介绍',
//     preview: '你好！我是 AI 助手，很高兴为您服务...',
//     timestamp: new Date(Date.now() - 3600000),
//   },
//   {
//     id: '2',
//     title: '编程问题咨询',
//     preview: '关于 Vue 组件拆分和样式复用...',
//     timestamp: new Date(Date.now() - 7200000),
//   },
//   {
//     id: '3',
//     title: '报价沟通优化',
//     preview: '把价格查询结果转换成客户可读摘要...',
//     timestamp: new Date(Date.now() - 86400000),
//   },
// ]

// /** 示例消息映射 */
// export const AI_MOCK_MESSAGE_MAP: Record<string, AiMessage[]> = {
//   '1': [
//     {
//       id: '1-a',
//       role: 'assistant',
//       content: '你好！我是 AI 助手，很高兴为您服务。请问有什么可以帮助您的吗？',
//       timestamp: new Date(),
//     },
//   ],
//   '2': [
//     {
//       id: '2-a',
//       role: 'assistant',
//       content: '你可以把 AI 页面拆成侧栏、消息流和输入框三个独立组件，后续接模型时会更好维护。',
//       timestamp: new Date(),
//     },
//   ],
//   '3': [
//     {
//       id: '3-a',
//       role: 'assistant',
//       content: '我可以把这批价格数据整理成一段客户沟通话术，保持专业但不生硬的语气。',
//       timestamp: new Date(),
//     },
//   ],
// }

// /** 新会话欢迎语 */
// export const AI_NEW_CONVERSATION_WELCOME = '新的会话已创建。你可以直接输入问题，我会根据上下文继续回答。'

// /** 模拟回复模板 */
// export const AI_MOCK_REPLY_TEMPLATES = [
//   '收到，我先帮你抽取重点，再给出可执行建议。',
//   '这个问题可以分三步处理：先澄清目标，再拆解结构，最后给出落地方案。',
//   '我建议先给出一个最小可用版本，然后逐步补齐细节能力。',
//   '这是一个典型的交互设计问题，建议从信息层级和输入反馈两方面同时优化。',
// ]

// /** 生成模拟回复 */
// export const buildMockReply = (content: string): string => {
//   const reply = AI_MOCK_REPLY_TEMPLATES[Math.floor(Math.random() * AI_MOCK_REPLY_TEMPLATES.length)]
//   return `${reply}\n\n你刚刚提到的是："${content}"。`
// }
