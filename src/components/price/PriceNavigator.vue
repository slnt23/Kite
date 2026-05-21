<script lang="ts" setup>
import { ref } from 'vue'
import { Coin, TrendCharts, DataAnalysis, Connection } from '@element-plus/icons-vue'

const emit = defineEmits<{ (e: 'navigate', index: string): void }>()

const activeIndex = ref('1')

const navItems = [
  { index: '1', label: '最新价格', icon: Coin },
  { index: '2', label: '价格趋势', icon: TrendCharts },
  { index: '3', label: '地区对比', icon: DataAnalysis },
  { index: '4', label: '来源对比', icon: Connection },
]

const handleSelect = (index: string) => {
  activeIndex.value = index
  emit('navigate', index)
}
</script>

<template>
  <nav class="price-nav">
    <div class="price-nav__header">
      <span class="price-nav__brand">价格行情</span>
    </div>
    <button
      v-for="item in navItems"
      :key="item.index"
      class="price-nav__item"
      :class="{ 'price-nav__item--active': activeIndex === item.index }"
      @click="handleSelect(item.index)"
    >
      <el-icon class="price-nav__icon"><component :is="item.icon" /></el-icon>
      <span class="price-nav__label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<style scoped lang="scss">
.price-nav {
  display: flex;
  flex-direction: column;
  width: 220px;
  padding: 20px 0;
  background: var(--vercel-canvas);
  border-right: 1px solid var(--vercel-hairline);
}

.price-nav__header {
  padding: 0 16px 16px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--vercel-hairline);
}

.price-nav__brand {
  font-family: 'Inter', 'Geist', system-ui, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--vercel-ink);
  letter-spacing: -0.03em;
}

.price-nav__item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 14px;
  margin: 2px 8px;
  border: none;
  border-radius: var(--vercel-rounded-sm);
  background: transparent;
  color: var(--vercel-body);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.02em;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  text-align: left;

  &:hover {
    background: var(--vercel-canvas-soft);
    color: var(--vercel-ink);
  }

  &--active {
    color: var(--vercel-ink);
    background: rgba(0, 0, 0, 0.04);
    box-shadow: inset 3px 0 0 var(--vercel-ink);
  }
}

.price-nav__icon {
  font-size: 16px;
  flex-shrink: 0;
}

.price-nav__label {
  white-space: nowrap;
}

@media (max-width: 760px) {
  .price-nav {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    padding: 10px 12px;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid var(--vercel-hairline);
    gap: 4px;
  }

  .price-nav__header {
    display: none;
  }

  .price-nav__item {
    width: auto;
    margin: 0;
    padding: 6px 12px;
    white-space: nowrap;

    &--active {
      box-shadow: inset 0 -2px 0 var(--vercel-ink);
    }
  }
}
</style>
