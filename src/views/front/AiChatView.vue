<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import ChatSidebar from '@/components/ai/ChatSidebar.vue'
import ChatStream from '@/components/ai/ChatStream.vue'
import ChatComposer from '@/components/ai/ChatComposer.vue'
import {
  type AiMessage,
  type AiConversation,
  AI_MOCK_CONVERSATIONS,
  AI_MOCK_MESSAGE_MAP,
  AI_NEW_CONVERSATION_WELCOME,
  buildMockReply,
} from '@/constant'

const inputValue = ref('')
const isTyping = ref(false)
const activeConversationId = ref('1')

const conversations = ref<AiConversation[]>([...AI_MOCK_CONVERSATIONS])

const messageMap = ref<Record<string, AiMessage[]>>({ ...AI_MOCK_MESSAGE_MAP })

const activeMessages = computed(() => messageMap.value[activeConversationId.value] || [])

const createConversation = () => {
  const id = String(Date.now())
  const item: AiConversation = {
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
      content: AI_NEW_CONVERSATION_WELCOME,
      timestamp: new Date(),
    },
  ]
  activeConversationId.value = id
}

const sendMessage = () => {
  const text = inputValue.value.trim()
  if (!text || isTyping.value) return

  const conversationId = activeConversationId.value
  const userMessage: AiMessage = {
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
    const aiMessage: AiMessage = {
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
  document.body.classList.add('body-ai-lock')
})

onBeforeUnmount(() => {
  document.body.classList.remove('body-ai-lock')
})
</script>

<template>
  <div class="chat-page">
    <section class="chat-workspace">
      <ChatSidebar :conversations="conversations" :active-conversation-id="activeConversationId"
        @create="createConversation" @select="activeConversationId = $event" />

      <div class="chat-workspace__main">
        <div class="chat-workspace__title">
          {{conversations.find((item) => item.id === activeConversationId)?.title || '新会话'}}
        </div>

        <div class="chat-workspace__messages u-scrollbar-hidden">
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
  padding: var(--chat-edge-gap);
  overflow: hidden;
  background-color: #faf9f5;
  /* {colors.canvas} */
}

.chat-workspace {
  height: 100%;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  border: 1px solid #e6dfd8;
  /* {colors.hairline} */
  border-radius: 12px;
  /* {rounded.lg} */
  overflow: hidden;
  background: #ffffff;
}

.chat-workspace__main {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 0;
  border-left: 1px solid #e6dfd8;
  /* {colors.hairline} */
}

.chat-workspace__title {
  padding: 14px 18px;
  border-bottom: 1px solid #e6dfd8;
  /* {colors.hairline} */
  color: #141413;
  /* {colors.ink} */
  font-family: 'StyreneB', 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
}

.chat-workspace__messages {
  min-height: 0;
  overflow: auto;
  padding: 24px;
  /* {spacing.lg} */
  background-color: #faf9f5;
  /* {colors.canvas} */
}

.chat-workspace__composer {
  padding: 16px;
  /* {spacing.md} */
  border-top: 1px solid #e6dfd8;
  /* {colors.hairline} */
  background-color: #ffffff;
}

@media (max-width: 1024px) {
  .chat-workspace {
    grid-template-columns: 220px minmax(0, 1fr);
  }
}

@media (max-width: 768px) {
  .chat-workspace {
    grid-template-columns: 1fr;
  }

  .chat-workspace__main {
    border-left: none;
    border-top: 1px solid #e6dfd8;
    /* {colors.hairline} */
  }

  .chat-page {
    padding-top: calc(var(--site-header-offset) + var(--site-header-height) + var(--chat-nav-gap));
  }

  .chat-workspace__messages {
    padding: 16px;
    /* {spacing.md} */
  }
}
</style>