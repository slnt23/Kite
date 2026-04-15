<script setup>
import { computed, ref } from 'vue'

const prompt = ref('')
const selectedPrompt = ref('帮我总结今天铜价波动的原因')
const quickPrompts = [
  '帮我总结今天铜价波动的原因',
  '整理一份线缆报价沟通模板',
  '把价格查询结果转换成客户可读摘要',
]

const messages = computed(() => [
  {
    role: 'assistant',
    title: 'Kite AI',
    content:
      '你好，这里是 AI 聊天入口演示页。当前界面先展示聊天布局、快捷提问和多轮消息样式，后续可以直接接入真实模型接口。',
  },
  {
    role: 'user',
    title: '当前问题',
    content: prompt.value || selectedPrompt.value,
  },
  {
    role: 'assistant',
    title: 'AI 回复',
    content:
      '如果接入真实接口，这里可以根据价格查询结果生成分析摘要、报价建议、客户沟通话术，或者继续展开多轮上下文问答。',
  },
])

const sendPrompt = () => {
  if (prompt.value.trim()) {
    selectedPrompt.value = prompt.value.trim()
    prompt.value = ''
  }
}
</script>

<template>
  <div class="chat-page">
    <section class="chat-hero glass-panel">
      <p class="eyebrow-label">AI Workspace</p>
      <h1>AI 聊天入口</h1>
      <p>
        菜单中的“登录入口”已经替换成 AI 聊天入口，这里先用静态消息流搭出聊天工作台，后续接模型时可以直接延用。
      </p>
    </section>

    <section class="chat-layout">
      <aside class="chat-side glass-panel">
        <h2>快捷问题</h2>
        <button
          v-for="item in quickPrompts"
          :key="item"
          class="chat-side__prompt"
          type="button"
          @click="selectedPrompt = item"
        >
          {{ item }}
        </button>
      </aside>

      <div class="chat-main glass-panel">
        <div class="chat-stream">
          <article
            v-for="message in messages"
            :key="`${message.role}-${message.title}`"
            class="chat-bubble"
            :class="{ 'chat-bubble--user': message.role === 'user' }"
          >
            <span>{{ message.title }}</span>
            <p>{{ message.content }}</p>
          </article>
        </div>

        <form class="chat-composer" @submit.prevent="sendPrompt">
          <textarea
            v-model="prompt"
            rows="4"
            placeholder="输入你的问题，例如：根据今天价格给我一段发给客户的报价说明"
          />
          <button type="submit">发送问题</button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.chat-page {
  display: grid;
  gap: 22px;
  padding-top: 110px;
}

.chat-hero,
.chat-side,
.chat-main {
  border-radius: 30px;
}

.chat-hero {
  padding: 28px;
}

.chat-hero h1,
.chat-side h2 {
  margin: 0 0 12px;
  color: var(--color-text);
}

.chat-hero p {
  margin: 0;
  color: var(--color-text-soft);
}

.chat-layout {
  display: grid;
  grid-template-columns: minmax(240px, 0.38fr) minmax(0, 1fr);
  gap: 20px;
}

.chat-side,
.chat-main {
  padding: 22px;
}

.chat-side__prompt {
  width: 100%;
  margin-top: 12px;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.06);
  text-align: left;
  color: var(--color-text);
}

.chat-stream {
  display: grid;
  gap: 14px;
}

.chat-bubble {
  max-width: min(82%, 720px);
  padding: 18px;
  border-radius: 24px 24px 24px 8px;
  background: rgba(255, 255, 255, 0.08);
}

.chat-bubble--user {
  justify-self: end;
  border-radius: 24px 24px 8px 24px;
  background: rgba(122, 209, 255, 0.16);
}

.chat-bubble span {
  display: inline-block;
  margin-bottom: 8px;
  color: rgba(245, 251, 255, 0.9);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.chat-bubble p {
  margin: 0;
  color: var(--color-text);
}

.chat-composer {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.chat-composer textarea {
  width: 100%;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--color-text);
  resize: vertical;
}

.chat-composer button {
  justify-self: start;
  min-width: 138px;
  padding: 12px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(156, 221, 255, 0.76));
  color: var(--color-text-deep);
  font-weight: 700;
}

@media (max-width: 960px) {
  .chat-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .chat-page {
    padding-top: 90px;
  }

  .chat-hero,
  .chat-side,
  .chat-main {
    padding: 20px;
  }

  .chat-bubble {
    max-width: 100%;
  }
}
</style>
