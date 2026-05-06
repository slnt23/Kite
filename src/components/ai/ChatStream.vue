<script setup lang="ts">
interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

defineProps<{
  messages: ChatMessage[]
  isTyping: boolean
}>()
</script>

<template>
  <div class="chat-stream">
    <article
      v-for="message in messages"
      :key="message.id"
      class="chat-stream__item"
      :class="{ 'chat-stream__item--user': message.role === 'user' }"
    >
      <div class="chat-stream__meta">{{ message.role === 'user' ? '你' : 'AI' }}</div>
      <div class="chat-stream__content">{{ message.content }}</div>
      <div class="chat-stream__time">
        {{
          message.timestamp.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
          })
        }}
      </div>
    </article>

    <article v-if="isTyping" class="chat-stream__item">
      <div class="chat-stream__meta">AI</div>
      <div class="chat-stream__typing">
        <span />
        <span />
        <span />
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.chat-stream {
  display: grid;
  gap: 16px;
}

.chat-stream__item {
  max-width: min(85%, 720px);
  display: grid;
  gap: 6px;
}

.chat-stream__item--user {
  justify-self: end;
  text-align: right;
}

.chat-stream__meta {
  color: #7a7a7a;
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.chat-stream__content {
  color: #141414;
  font-size: 0.96rem;
  line-height: 1.75;
  white-space: pre-wrap;
}

.chat-stream__time {
  color: #9a9a9a;
  font-size: 0.72rem;
}

.chat-stream__typing {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 20px;
}

.chat-stream__typing span {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #b8b8b8;
  animation: typing-bounce 900ms infinite ease-in-out;
}

.chat-stream__typing span:nth-child(2) {
  animation-delay: 120ms;
}

.chat-stream__typing span:nth-child(3) {
  animation-delay: 240ms;
}

@keyframes typing-bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.45;
  }
  40% {
    transform: translateY(-4px);
    opacity: 1;
  }
}
</style>
