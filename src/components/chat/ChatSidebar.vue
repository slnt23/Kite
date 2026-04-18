<script setup lang="ts">
interface ConversationItem {
  id: string
  title: string
  preview: string
  timestamp: Date
}

defineProps<{
  conversations: ConversationItem[]
  activeConversationId: string
}>()

const emit = defineEmits<{
  (e: 'create'): void
  (e: 'select', id: string): void
}>()
</script>

<template>
  <aside class="chat-sidebar">
    <div class="chat-sidebar__header">
      <button type="button" class="chat-sidebar__new" @click="emit('create')">新建会话</button>
    </div>

    <div class="chat-sidebar__list">
      <button
        v-for="item in conversations"
        :key="item.id"
        type="button"
        class="chat-sidebar__item"
        :class="{ 'chat-sidebar__item--active': item.id === activeConversationId }"
        @click="emit('select', item.id)"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.preview }}</p>
      </button>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.chat-sidebar {
  display: grid;
  grid-template-rows: auto 1fr;
  border-right: 1px solid #ececec;
  background: #ffffff;
}

.chat-sidebar__header {
  padding: 14px;
  border-bottom: 1px solid #ececec;
}

.chat-sidebar__new {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  background: #ffffff;
  color: #111111;
  text-align: left;
}

.chat-sidebar__list {
  display: grid;
  align-content: start;
  gap: 6px;
  padding: 10px;
  overflow: auto;
}

.chat-sidebar__item {
  display: grid;
  gap: 4px;
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: #ffffff;
  text-align: left;
}

.chat-sidebar__item:hover {
  background: #f7f7f7;
}

.chat-sidebar__item--active {
  border-color: #e1e1e1;
  background: #f3f3f3;
}

.chat-sidebar__item h3 {
  margin: 0;
  font-size: 0.9rem;
  color: #111111;
}

.chat-sidebar__item p {
  margin: 0;
  color: #6a6a6a;
  font-size: 0.78rem;
}
</style>
