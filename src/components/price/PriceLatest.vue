<template>
  <div class="price-latest">
    <div class="latest-controls">
      <el-select v-model="query.itemId" placeholder="选择物品" clearable size="default">
        <el-option v-for="item in PRICE_ITEM_OPTIONS" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="query.locationId" placeholder="选择地区" clearable size="default">
        <el-option v-for="loc in PRICE_LOCATION_OPTIONS" :key="loc.value" :label="loc.label" :value="loc.value" />
      </el-select>
      <el-select v-model="query.currency" placeholder="币种" size="default">
        <el-option label="人民币 (CNY)" value="CNY" />
        <el-option label="美元 (USD)" value="USD" />
      </el-select>
      <el-button type="primary" :loading="loading" @click="fetchLatest" size="default">查询</el-button>
    </div>

    <div class="latest-card">
      <div class="latest-card__left">
        <div class="latest-card__title">{{ latestItem.item.itemName }}</div>
        <div class="latest-card__meta">
          <el-tag size="small">{{ latestItem.item.categoryName }}</el-tag>
          <span>{{ latestItem.item.specification }}</span>
        </div>
        <div class="latest-card__price">
          <span class="price-value">¥{{ Number(latestItem.price).toFixed(2) }}</span>
          <span class="price-unit">/ {{ latestItem.priceUnit || latestItem.item.unit }}</span>
        </div>
        <div class="latest-card__info">
          <span>来源: {{ latestItem.sourceName }}</span>
          <span>地区: {{ latestItem.locationName }}</span>
          <span>更新: {{ latestItem.effectiveTime }}</span>
        </div>
      </div>
      <div class="latest-card__gauge">
        <v-chart :option="gaugeOption" :autoresize="true" class="gauge-chart" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { priceApi } from '@/api/modules/price.api'
import { EXAMPLE_PRICE_LATEST, PRICE_ITEM_OPTIONS, PRICE_LOCATION_OPTIONS } from '@/constant'
import type { PriceLatestVO, Currency } from '@/types/modules/price.type'

const loading = ref(false)
const latestItem = ref<PriceLatestVO>(EXAMPLE_PRICE_LATEST)

const query = ref({
  itemId: undefined as number | undefined,
  locationId: undefined as number | undefined,
  currency: 'CNY' as Currency | undefined,
})

async function fetchLatest() {
  loading.value = true
  try {
    const res = await priceApi.getLatest({ ...query.value })
    latestItem.value = res.data
  } finally { loading.value = false }
}

const gaugeOption = computed(() => {
  const c = latestItem.value.confidence
  return {
    series: [
      {
        type: 'pie' as const, radius: ['58%', '78%'], center: ['50%', '50%'], silent: true,
        label: {
          show: true, position: 'center' as const,
          formatter: () => `{big|${c.toFixed(1)}%}\n{small|可信度}`,
          rich: {
            big: { fontSize: 22, fontWeight: 600, color: 'var(--vercel-ink)', lineHeight: 28 },
            small: { fontSize: 12, color: 'var(--vercel-mute)', lineHeight: 20 },
          },
        },
        data: [
          { value: c, name: '可信度', itemStyle: { color: c >= 90 ? '#30d158' : c >= 80 ? '#f5a623' : '#ee0000' } },
          { value: 100 - c, name: '', itemStyle: { color: 'var(--vercel-hairline)' }, label: { show: false } },
        ],
      },
      {
        type: 'pie' as const, radius: ['52%', '55%'], center: ['50%', '50%'], silent: true,
        label: { show: false },
        data: Array.from({ length: 40 }, (_, i) => ({
          value: 1,
          itemStyle: {
            color: i < latestItem.value.reliabilityLevel * 8 ? 'var(--vercel-ink)' : 'var(--vercel-hairline)',
            borderColor: 'var(--vercel-canvas)',
            borderWidth: 1,
          },
        })),
      },
    ],
  }
})
</script>

<style scoped lang="scss">
.price-latest {
  padding: 32px;
}

.latest-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;

  .el-select { width: 170px; }
}

.latest-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  background: var(--vercel-canvas);
  border: 1px solid var(--vercel-hairline);
  border-radius: var(--vercel-rounded-lg);
  padding: 28px 32px;
  box-shadow: var(--vercel-shadow-card);

  &__left { flex: 1; }

  &__title {
    font-family: 'Inter', 'Geist', system-ui, sans-serif;
    font-size: 22px;
    font-weight: 600;
    color: var(--vercel-ink);
    letter-spacing: -0.04em;
    margin-bottom: 8px;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    font-size: 13px;
    color: var(--vercel-mute);
  }

  &__price {
    margin-bottom: 16px;
    .price-value {
      font-family: 'Inter', 'Geist', system-ui, sans-serif;
      font-size: 42px;
      font-weight: 700;
      color: var(--vercel-ink);
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.04em;
    }
    .price-unit {
      font-size: 16px;
      color: var(--vercel-mute);
      margin-left: 4px;
    }
  }

  &__info {
    display: flex;
    gap: 20px;
    font-size: 13px;
    color: var(--vercel-mute);
  }

  &__gauge {
    flex-shrink: 0;
    width: 170px;
    height: 170px;
  }
}

.gauge-chart {
  width: 100%;
  height: 100%;
}

@media (max-width: 760px) {
  .price-latest {
    padding: 20px;
  }

  .latest-card {
    flex-direction: column;
    padding: 20px;

    &__title { font-size: 18px; }
    &__price .price-value { font-size: 32px; }
    &__info { flex-wrap: wrap; gap: 12px; }
  }
}
</style>
