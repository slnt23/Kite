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

        <section class="menu-panel__sheet glass-panel u-scrollbar-hidden">
          <div class="menu-panel__header">
            <div>
              <p class="eyebrow-label">Navigate</p>
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
/* 共用主题变量与可复用样式见 src/style/index.scss：glass-panel */
.menu-panel {
  position: fixed;
  inset: 0;
  z-index: 80;
}

.menu-panel__backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  background: rgba(10, 18, 28, 0.26);
  backdrop-filter: blur(14px);
}

.menu-panel__sheet {
  position: relative;
  z-index: 1;
  width: min(75vw, 1320px);
  height: 75vh;
  margin: 12.5vh auto;
  padding: 24px;
  overflow: auto;
  border-radius: 32px;
  background: #ffffff;
  backdrop-filter: blur(18px);
}

.menu-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}

.menu-panel__header h2 {
  margin: 0;
  color: var(--color-text-deep);
}

.menu-panel__close {
  min-width: 96px;
  padding: 10px 16px;
  border: 1px solid #b7b7b7;
  border-radius: 999px;
  background: #e3e3e3;
  color: #3f3f3f;
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
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 700;
}

.menu-panel__card-overlay span {
  color: rgba(255, 255, 255, 0.9);
}

:global(.menu-panel-enter-active),
:global(.menu-panel-leave-active) {
  transition: opacity 220ms ease;
}

:global(.menu-panel-enter-from),
:global(.menu-panel-leave-to) {
  opacity: 0;
}

:global(.menu-panel-enter-active .menu-panel__sheet),
:global(.menu-panel-leave-active .menu-panel__sheet) {
  transition:
    transform 240ms ease,
    opacity 220ms ease;
}

:global(.menu-panel-enter-from .menu-panel__sheet),
:global(.menu-panel-leave-to .menu-panel__sheet) {
  transform: translateY(14px) scale(0.97);
  opacity: 0;
}

@media (max-width: 960px) {
  .menu-panel__masonry {
    column-count: 2;
  }
}

@media (max-width: 760px) {
  .menu-panel__sheet {
    width: min(92vw, 1320px);
    height: 78vh;
    margin: 11vh auto;
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
