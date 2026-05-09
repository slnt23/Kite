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
        <section class="menu-panel__sheet glass-panel u-scrollbar-hidden">
          <div class="menu-panel__header">
            <div>
              <p class="eyebrow-label">Navigate</p>

              <h2>选择你要进入的功能入口</h2>
            </div>

            <button class="ui-close-button ui-close-button--corner" type="button" @click="emit('close')">
              关闭
            </button>
          </div>

          <div class="menu-panel__masonry">
            <RouterLink v-for="item in items" :key="item.path" :to="item.path" class="menu-panel__card"
              :class="`menu-panel__card--${item.size || 'normal'}`" @click="emit('close')">
              <img :src="item.image" :alt="item.title" />

              <div class="menu-panel__card-overlay">
                <p>{{ item.title }}</p>

                <span>
                  {{ item.subtitle }}
                </span>
              </div>
            </RouterLink>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.menu-panel {
  position: fixed;
  inset: 0;

  z-index: 80;

  background: rgba(10, 18, 28, 0.18);
  backdrop-filter: blur(12px);
}

.menu-panel__sheet {
  position: relative;

  width: min(78vw, 1380px);
  height: 80vh;

  margin: 10vh auto;
  padding: 28px;

  overflow-y: auto;

  border-radius: 36px;

  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(18px);
}

.menu-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 24px;

  margin-bottom: 34px;
  padding-right: 110px;
}

.menu-panel__header h2 {
  margin: 10px 0 0;

  color: var(--color-text-deep);

  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.05;
  letter-spacing: -0.05em;
}

.menu-panel__masonry {
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 120px;

  gap: 18px;
}

/* 卡片基础 */
.menu-panel__card {
  position: relative;

  overflow: hidden;
  border-radius: 30px;

  background: #f4f4f4;

  transition:
    transform 260ms ease,
    opacity 260ms ease,
    box-shadow 260ms ease;

  isolation: isolate;
}

/* hover */
.menu-panel__card:hover {
  transform: translateY(-4px);

  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.08);
}

/* 大 */
.menu-panel__card--large {
  grid-row: span 4;
}

/* 中 */
.menu-panel__card--normal {
  grid-row: span 3;
}

/* 小 */
.menu-panel__card--small {
  grid-row: span 2;
}

/* 图片 */
.menu-panel__card img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  filter:
    saturate(1.04) brightness(0.82);

  transition:
    transform 700ms ease,
    filter 300ms ease;
}

.menu-panel__card:hover img {
  transform: scale(1.04);

  filter:
    saturate(1.08) brightness(0.9);
}

/* 遮罩 */
.menu-panel__card-overlay {
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  padding: 24px;

  background:
    linear-gradient(180deg,
      rgba(7, 20, 41, 0.04),
      rgba(7, 20, 41, 0.72));
}

/* 标题 */
.menu-panel__card-overlay p {
  margin: 0 0 8px;

  color: #ffffff;

  font-size: 1.35rem;
  font-weight: 700;

  letter-spacing: -0.03em;
}

/* 描述 */
.menu-panel__card-overlay span {
  color: rgba(255, 255, 255, 0.86);

  line-height: 1.7;
  font-size: 0.95rem;
}

/* 动画 */
:global(.menu-panel-enter-active),
:global(.menu-panel-leave-active) {
  transition: opacity 240ms ease;
}

:global(.menu-panel-enter-from),
:global(.menu-panel-leave-to) {
  opacity: 0;
}

:global(.menu-panel-enter-active .menu-panel__sheet),
:global(.menu-panel-leave-active .menu-panel__sheet) {
  transition:
    transform 260ms ease,
    opacity 240ms ease;
}

:global(.menu-panel-enter-from .menu-panel__sheet),
:global(.menu-panel-leave-to .menu-panel__sheet) {
  transform:
    translateY(16px) scale(0.975);

  opacity: 0;
}

/* 平板 */
@media (max-width: 960px) {
  .menu-panel__sheet {
    width: min(92vw, 1380px);
  }

  .menu-panel__masonry {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* 手机 */
@media (max-width: 760px) {
  .menu-panel__sheet {
    height: 84vh;

    margin: 8vh auto;

    padding: 22px;
  }

  .menu-panel__header {
    flex-direction: column;

    padding-right: 0;
  }

  .menu-panel__masonry {
    grid-template-columns: 1fr;

    grid-auto-rows: 110px;
  }

  .menu-panel__card--large {
    grid-row: span 4;
  }

  .menu-panel__card--normal {
    grid-row: span 3;
  }

  .menu-panel__card--small {
    grid-row: span 2;
  }
}
</style>