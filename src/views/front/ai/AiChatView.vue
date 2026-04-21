<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import ChatSidebar from '@/components/chat/ChatSidebar.vue'
import ChatStream from '@/components/chat/ChatStream.vue'
import ChatComposer from '@/components/chat/ChatComposer.vue'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  preview: string
  timestamp: Date
}

const inputValue = ref('')
const isTyping = ref(false)
const activeConversationId = ref('1')

const conversations = ref<Conversation[]>([
  {
    id: '1',
    title: 'AI 助手介绍',
    preview: '你好！我是 AI 助手，很高兴为您服务...',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    title: '编程问题咨询',
    preview: '关于 Vue 组件拆分和样式复用...',
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: '3',
    title: '报价沟通优化',
    preview: '把价格查询结果转换成客户可读摘要...',
    timestamp: new Date(Date.now() - 86400000),
  },
])

const messageMap = ref<Record<string, Message[]>>({
  '1': [
    {
      id: '1-a',
      role: 'assistant',
      content: '你好！我是 AI 助手，很高兴为您服务。请问有什么可以帮助您的吗？',
      timestamp: new Date(),
    },
  ],
  '2': [
    {
      id: '2-a',
      role: 'assistant',
      content: '你可以把 AI 页面拆成侧栏、消息流和输入框三个独立组件，后续接模型时会更好维护。',
      timestamp: new Date(),
    },
  ],
  '3': [
    {
      id: '3-a',
      role: 'assistant',
      content: '我可以把这批价格数据整理成一段客户沟通话术，保持专业但不生硬的语气。',
      timestamp: new Date(),
    },
  ],
})

const activeMessages = computed(() => messageMap.value[activeConversationId.value] || [])

const createConversation = () => {
  const id = String(Date.now())
  const item: Conversation = {
    id,
    title: '新会话',
    preview: '开始新的对话...',
    timestamp: new Date(),
  }

  conversations.value = [item, ...conversations.value]
  messageMap.value[id] = [
    {
      id: `${id}-init`,
      role: 'assistant',
      content: '新的会话已创建。你可以直接输入问题，我会根据上下文继续回答。',
      timestamp: new Date(),
    },
  ]
  activeConversationId.value = id
}

const buildMockReply = (content: string) => {
  const replies = [
    '收到，我先帮你抽取重点，再给出可执行建议。',
    '这个问题可以分三步处理：先澄清目标，再拆解结构，最后给出落地方案。',
    '我建议先给出一个最小可用版本，然后逐步补齐细节能力。',
    '这是一个典型的交互设计问题，建议从信息层级和输入反馈两方面同时优化。',
  ]
  return `${replies[Math.floor(Math.random() * replies.length)]}\n\n你刚刚提到的是：“${content}”。`
}

const sendMessage = () => {
  const text = inputValue.value.trim()
  if (!text || isTyping.value) return

  const conversationId = activeConversationId.value
  const userMessage: Message = {
    id: `${Date.now()}-u`,
    role: 'user',
    content: text,
    timestamp: new Date(),
  }

  messageMap.value[conversationId] = [...(messageMap.value[conversationId] || []), userMessage]
  conversations.value = conversations.value.map((item) =>
    item.id === conversationId
      ? {
          ...item,
          preview: text.length > 26 ? `${text.slice(0, 26)}...` : text,
          timestamp: new Date(),
        }
      : item,
  )

  inputValue.value = ''
  isTyping.value = true

  window.setTimeout(() => {
    const aiMessage: Message = {
      id: `${Date.now()}-a`,
      role: 'assistant',
      content: buildMockReply(text),
      timestamp: new Date(),
    }
    messageMap.value[conversationId] = [...(messageMap.value[conversationId] || []), aiMessage]
    isTyping.value = false
  }, 900)
}

onMounted(() => {
  document.body.classList.add('body-chat-lock')
})

onBeforeUnmount(() => {
  document.body.classList.remove('body-chat-lock')
})
</script>

<template>
  <div class="chat-page">
    <section class="chat-workspace">
      <ChatSidebar
        :conversations="conversations"
        :active-conversation-id="activeConversationId"
        @create="createConversation"
        @select="activeConversationId = $event"
      />

      <div class="chat-workspace__main">
        <div class="chat-workspace__title">
          {{ conversations.find((item) => item.id === activeConversationId)?.title || '新会话' }}
        </div>

        <div class="chat-workspace__messages">
          <ChatStream :messages="activeMessages" :is-typing="isTyping" />
        </div>

        <div class="chat-workspace__composer">
          <ChatComposer v-model="inputValue" :disabled="!inputValue.trim() || isTyping" @send="sendMessage" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.chat-page {
  height: 100vh;
  padding:
    calc(var(--site-header-offset) + var(--site-header-height) + var(--chat-nav-gap))
    var(--chat-edge-gap)
    var(--chat-edge-gap);
  overflow: hidden;
}

.chat-workspace {
  height: 100%;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  border: 1px solid #e5e5e5;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background: #ffffff;
  box-shadow: var(--shadow-soft);
}

.chat-workspace__main {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 0;
}

.chat-workspace__title {
  padding: 14px 18px;
  border-bottom: 1px solid #ececec;
  color: #141414;
  font-weight: 600;
}

.chat-workspace__messages {
  min-height: 0;
  overflow: auto;
  padding: 20px 22px;
}

.chat-workspace__composer {
  padding: 12px 16px 14px;
  border-top: 1px solid #ececec;
}

@media (max-width: 960px) {
  .chat-workspace {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .chat-page {
    padding-top: calc(var(--site-header-offset) + var(--site-header-height) + var(--chat-nav-gap));
  }

  .chat-workspace__messages {
    padding: 14px;
  }
}
</style>
