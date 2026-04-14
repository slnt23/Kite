<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="menu-panel">
      <div v-if="open" class="menu-panel">
        <button
          class="menu-panel__backdrop"
          type="button"
          aria-label="关闭菜单"
          @click="emit('close')"
        />

        <section class="menu-panel__sheet glass-panel">
          <div class="menu-panel__header">
            <div>
              <p>Navigate</p>
              <h2>选择你要进入的功能入口</h2>
            </div>

            <button class="menu-panel__close" type="button" @click="emit('close')">
              关闭
            </button>
          </div>

          <div class="menu-panel__masonry">
            <RouterLink
              v-for="item in items"
              :key="item.path"
              :to="item.path"
              class="menu-panel__card"
              :class="{ 'menu-panel__card--large': item.size === 'large' }"
              @click="emit('close')"
            >
              <img :src="item.image" :alt="item.title" />
              <div class="menu-panel__card-overlay">
                <p>{{ item.title }}</p>
                <span>{{ item.subtitle }}</span>
              </div>
            </RouterLink>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
/* 共用主题变量与可复用样式见 src/style.scss：glass-panel */
.menu-panel {
  position: fixed;
  inset: 0;
  z-index: 80;
}

.menu-panel__backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  background: rgba(7, 20, 41, 0.58);
}

.menu-panel__sheet {
  position: relative;
  z-index: 1;
  width: var(--shell-width);
  max-height: calc(100vh - 20px);
  margin: 10px auto;
  padding: 24px;
  overflow: auto;
  border-radius: 32px;
}

.menu-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}

.menu-panel__header p {
  margin: 0 0 14px;
  color: rgba(245, 251, 255, 0.86);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.menu-panel__header h2 {
  margin: 0;
  color: var(--color-text);
}

.menu-panel__close {
  min-width: 96px;
  padding: 10px 16px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.menu-panel__masonry {
  column-count: 3;
  column-gap: 18px;
}

.menu-panel__card {
  position: relative;
  display: block;
  margin-bottom: 18px;
  overflow: hidden;
  border-radius: 24px;
  break-inside: avoid;
  min-height: 250px;
}

.menu-panel__card--large {
  min-height: 360px;
}

.menu-panel__card img {
  width: 100%;
  height: 100%;
  min-height: inherit;
  object-fit: cover;
  filter: saturate(1.08) brightness(0.84);
}

.menu-panel__card-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  background: linear-gradient(180deg, rgba(7, 20, 41, 0.06), rgba(7, 20, 41, 0.78));
}

.menu-panel__card-overlay p {
  margin: 0 0 8px;
  color: var(--color-text);
  font-size: 1.3rem;
  font-weight: 700;
}

.menu-panel__card-overlay span {
  color: var(--color-text-soft);
}

:global(.menu-panel-enter-active),
:global(.menu-panel-leave-active) {
  transition: opacity 180ms ease;
}

:global(.menu-panel-enter-from),
:global(.menu-panel-leave-to) {
  opacity: 0;
}

@media (max-width: 960px) {
  .menu-panel__masonry {
    column-count: 2;
  }
}

@media (max-width: 760px) {
  .menu-panel__sheet {
    width: var(--shell-width-mobile);
    max-height: calc(100vh - 20px);
    margin: 10px auto;
    padding: 20px;
  }

  .menu-panel__header {
    flex-direction: column;
  }

  .menu-panel__masonry {
    column-count: 1;
  }
}
</style>
