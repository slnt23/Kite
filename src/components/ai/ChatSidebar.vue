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

    <div class="chat-sidebar__list u-scrollbar-hidden">
      <button v-for="item in conversations" :key="item.id" type="button" class="chat-sidebar__item"
        :class="{ 'chat-sidebar__item--active': item.id === activeConversationId }" @click="emit('select', item.id)">
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
  background: #ffffff;
}

.chat-sidebar__header {
  padding: 16px;
  /* {spacing.md} */
  border-bottom: 1px solid #e6dfd8;
  /* {colors.hairline} */
}

.chat-sidebar__new {
  width: 100%;
  padding: 12px 16px;
  /* {spacing.sm} */
  border: 1px solid #e6dfd8;
  /* {colors.hairline} */
  border-radius: 8px;
  /* {rounded.md} */
  background: #faf9f5;
  /* {colors.canvas} */
  color: #141413;
  /* {colors.ink} */
  font-family: 'StyreneB', 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  line-height: 1;
}

.chat-sidebar__new:hover {
  background: #f5f0e8;
  /* {colors.surface-soft} */
}

.chat-sidebar__list {
  display: grid;
  align-content: start;
  gap: 4px;
  /* {spacing.xxs} */
  padding: 8px;
  /* {spacing.xs} */
  overflow: auto;
}

.chat-sidebar__item {
  display: grid;
  gap: 4px;
  /* {spacing.xxs} */
  padding: 12px;
  /* {spacing.sm} */
  border: 1px solid transparent;
  border-radius: 8px;
  /* {rounded.md} */
  background: transparent;
  text-align: left;
}

.chat-sidebar__item:hover {
  background: #f5f0e8;
  /* {colors.surface-soft} */
}

.chat-sidebar__item--active {
  border-color: #e6dfd8;
  /* {colors.hairline} */
  background: #efe9de;
  /* {colors.surface-card} */
}

.chat-sidebar__item h3 {
  margin: 0;
  font-family: 'StyreneB', 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #141413;
  /* {colors.ink} */
  line-height: 1.4;
}

.chat-sidebar__item p {
  margin: 0;
  font-family: 'StyreneB', 'Inter', sans-serif;
  font-size: 13px;
  color: #6c6a64;
  /* {colors.muted} */
  line-height: 1.4;
}
</style>