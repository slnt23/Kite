<script lang="ts" setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { usePriceItemStore } from '@/composables/usePriceItemStore'

const {
  selectedItem,
  searchResults,
  searchLoading,
  searchItems,
  selectItem,
  clearSelection,
} = usePriceItemStore()

const keyword = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(
  () => keyword.value,
  (val) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    const trimmed = val.trim()
    if (!trimmed) {
      searchResults.value = []
      return
    }
    debounceTimer = setTimeout(() => {
      searchItems(trimmed)
    }, 400)
  },
)

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>

<template>
  <div class="price-item-query">
    <div class="query-search-area">
      <el-input
        v-model="keyword"
        placeholder="输入物品名称搜索"
        clearable
        size="default"
        :prefix-icon="'Search'"
      />
    </div>

    <div v-if="searchLoading" class="query-loading">
      <el-icon class="is-loading"><span>Loading</span></el-icon>
      <span>搜索中...</span>
    </div>

    <div
      v-if="searchResults.length > 0 && !searchLoading"
      class="query-results"
    >
      <div
        v-for="item in searchResults"
        :key="item.itemId"
        class="result-card"
        :class="{ 'result-card--active': selectedItem?.itemId === item.itemId }"
        @click="selectItem(item)"
      >
        <div class="result-card__header">
          <span class="result-card__name">{{ item.itemName }}</span>
          <el-tag size="small">{{ item.categoryName }}</el-tag>
        </div>
        <div class="result-card__meta">
          <span>{{ item.specification }}</span>
          <span class="result-card__unit">{{ item.unit }}</span>
        </div>
      </div>
    </div>

    <div
      v-if="!searchLoading && keyword.trim().length >= 2 && searchResults.length === 0"
      class="query-empty"
    >
      未找到匹配的物品
    </div>

    <div
      v-if="!searchLoading && searchResults.length === 0 && !keyword.trim()"
      class="query-hint"
    >
      输入物品名称进行搜索
    </div>

    <div v-if="selectedItem" class="selected-card">
      <div class="selected-card__header">
        <span class="selected-card__title">已选物品</span>
        <el-button text size="small" type="danger" @click="clearSelection">清除</el-button>
      </div>
      <div class="selected-card__body">
        <div class="selected-card__name">{{ selectedItem.itemName }}</div>
        <div class="selected-card__meta">
          <el-tag size="small" type="info">{{ selectedItem.categoryName }}</el-tag>
          <span>{{ selectedItem.specification }}</span>
          <span class="selected-card__unit">{{ selectedItem.unit }}</span>
        </div>
        <div class="selected-card__id">物品ID: {{ selectedItem.itemId }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.price-item-query {
  padding: 32px;
  max-width: 680px;
}

.query-search-area {
  margin-bottom: 20px;
}

.query-loading,
.query-empty,
.query-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 24px 0;
  color: var(--vercel-mute);
  font-size: 14px;
  justify-content: center;
}

.query-results {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.result-card {
  background: var(--vercel-canvas);
  border: 1px solid var(--vercel-hairline);
  border-radius: var(--vercel-rounded-lg);
  padding: 14px 18px;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    border-color: var(--vercel-ink);
    box-shadow: var(--vercel-shadow-card);
  }

  &--active {
    border-color: var(--vercel-ink);
    box-shadow: inset 0 0 0 1px var(--vercel-ink);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
  }

  &__name {
    font-size: 16px;
    font-weight: 600;
    color: var(--vercel-ink);
  }

  &__meta {
    font-size: 13px;
    color: var(--vercel-mute);
    display: flex;
    gap: 12px;
  }

  &__unit {
    color: var(--vercel-mute);
  }
}

.selected-card {
  background: var(--vercel-canvas);
  border: 1px solid var(--vercel-ink);
  border-radius: var(--vercel-rounded-lg);
  padding: 18px 22px;
  box-shadow: var(--vercel-shadow-card);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__title {
    font-size: 13px;
    font-weight: 600;
    color: var(--vercel-mute);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__name {
    font-family: 'Inter', 'Geist', system-ui, sans-serif;
    font-size: 22px;
    font-weight: 600;
    color: var(--vercel-ink);
    letter-spacing: -0.04em;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    color: var(--vercel-mute);
  }

  &__id {
    font-size: 12px;
    color: var(--vercel-mute);
  }
}

@media (max-width: 760px) {
  .price-item-query {
    padding: 20px;
  }
}
</style>
