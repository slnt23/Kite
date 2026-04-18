<script setup lang="ts">
defineProps<{
  modelValue: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'send'): void
}>()

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    emit('send')
  }
}
</script>

<template>
  <form class="chat-composer" @submit.prevent="emit('send')">
    <textarea
      :value="modelValue"
      rows="1"
      placeholder="输入消息..."
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      @keydown="onKeydown"
    />
    <button type="submit" :disabled="disabled">发送</button>
  </form>
</template>

<style scoped lang="scss">
.chat-composer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: end;
}

.chat-composer textarea {
  min-height: 48px;
  max-height: 160px;
  padding: 12px 14px;
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  background: #ffffff;
  color: #111111;
  resize: vertical;
  outline: none;
}

.chat-composer textarea:focus {
  border-color: #9e9e9e;
}

.chat-composer button {
  min-width: 88px;
  height: 42px;
  padding: 0 16px;
  border-radius: 10px;
  background: #111111;
  color: #ffffff;
  font-weight: 600;
}

.chat-composer button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
