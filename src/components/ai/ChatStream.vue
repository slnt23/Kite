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
    <article v-for="message in messages" :key="message.id" class="chat-stream__item"
      :class="{ 'chat-stream__item--user': message.role === 'user' }">
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
  gap: 24px;
  /* {spacing.lg} */
}

.chat-stream__item {
  max-width: min(85%, 720px);
  display: grid;
  gap: 8px;
  /* {spacing.xs} */
}

.chat-stream__item--user {
  justify-self: end;
  text-align: right;
}

.chat-stream__item--user .chat-stream__content {
  background: #cc785c;
  /* {colors.primary} */
  color: #ffffff;
  /* {colors.on-primary} */
}

.chat-stream__meta {
  color: #6c6a64;
  /* {colors.muted} */
  font-family: 'StyreneB', 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 1.4;
}

.chat-stream__content {
  padding: 16px 20px;
  /* {spacing.md} */
  border-radius: 12px;
  /* {rounded.lg} */
  background: #efe9de;
  /* {colors.surface-card} */
  color: #141413;
  /* {colors.ink} */
  font-family: 'StyreneB', 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.55;
}

.chat-stream__time {
  color: #8e8b82;
  /* {colors.muted-soft} */
  font-family: 'StyreneB', 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.4;
}

.chat-stream__typing {
  display: flex;
  align-items: center;
  gap: 8px;
  /* {spacing.xs} */
  min-height: 44px;
  padding: 12px 20px;
  /* {spacing.sm} */
  border-radius: 12px;
  /* {rounded.lg} */
  background: #efe9de;
  /* {colors.surface-card} */
}

.chat-stream__typing span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6c6a64;
  /* {colors.muted} */
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