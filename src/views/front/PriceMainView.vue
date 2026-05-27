<script setup lang="ts">
import { ref } from 'vue'
import { usePriceItemStore } from '@/composables/usePriceItemStore'
import PriceNavigator from '@/components/price/PriceNavigator.vue'
import PriceItemQuery from '@/components/price/PriceItemQuery.vue'
import PriceLatest from '@/components/price/PriceLatest.vue'
import PriceTrend from '@/components/price/PriceTrend.vue'
import PriceRegion from '@/components/price/PriceRegion.vue'
import PriceSource from '@/components/price/PriceSource.vue'

const activeNav = ref('0')
const handleNavigate = (index: string) => { activeNav.value = index }

// 确保 singleton composable 在父级初始化
usePriceItemStore()
</script>

<template>
  <div class="price-main-layout">
    <aside class="price-sidebar">
      <PriceNavigator @navigate="handleNavigate" />
    </aside>
    <main class="price-content">
      <PriceItemQuery v-if="activeNav === '0'" />
      <PriceLatest v-else-if="activeNav === '1'" />
      <PriceTrend v-else-if="activeNav === '2'" />
      <PriceRegion v-else-if="activeNav === '3'" />
      <PriceSource v-else-if="activeNav === '4'" />
    </main>
  </div>
</template>

<style scoped lang="scss">
.price-main-layout {
  display: flex;
  height: 100vh;
  background: var(--vercel-canvas-soft);
}

.price-sidebar {
  flex-shrink: 0;
  display: flex;
  background: var(--vercel-canvas);
}

.price-content {
  flex: 1;
  overflow-y: auto;
  background: var(--vercel-canvas-soft);
}

@media (max-width: 760px) {
  .price-main-layout {
    flex-direction: column;
  }

  .price-sidebar {
    position: sticky;
    top: var(--site-header-height, 54px);
    z-index: 10;
  }
}
</style>
