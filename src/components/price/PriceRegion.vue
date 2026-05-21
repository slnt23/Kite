<template>
  <div class="price-region">
    <div class="region-controls">
      <el-select v-model="query.itemId" placeholder="选择物品" clearable size="default">
        <el-option v-for="item in PRICE_ITEM_OPTIONS" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="query.locationId" placeholder="选择地区" clearable size="default">
        <el-option v-for="loc in PRICE_LOCATION_OPTIONS" :key="loc.value" :label="loc.label" :value="loc.value" />
      </el-select>
      <el-date-picker
        v-model="targetTime"
        type="datetime" placeholder="对比时间点"
        value-format="YYYY-MM-DDTHH:mm:ss" size="default"
      />
      <el-button type="primary" :loading="loading" @click="fetchCompare" size="default">查询</el-button>
    </div>

    <div class="region-card">
      <v-chart :option="chartOption" :autoresize="true" class="region-chart" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { priceApi } from '@/api/modules/price.api'
import { EXAMPLE_PRICE_COMPARE, PRICE_ITEM_OPTIONS, PRICE_LOCATION_OPTIONS } from '@/constant'
import type { PriceCompareVO } from '@/types/modules/price.type'

const loading = ref(false)
const compareData = ref<PriceCompareVO>(EXAMPLE_PRICE_COMPARE)
const query = ref({ itemId: undefined as number | undefined, locationId: undefined as number | undefined })
const targetTime = ref<string | null>(null)

async function fetchCompare() {
  loading.value = true
  try {
    const res = await priceApi.compareLocation({
      itemId: query.value.itemId,
      locationId: query.value.locationId,
      targetTime: targetTime.value ?? new Date().toISOString().slice(0, 19),
    })
    compareData.value = res.data
  } finally { loading.value = false }
}

const chartOption = computed(() => {
  const list = [...compareData.value.compareList].sort((a, b) => Number(b.price) - Number(a.price))
  const sources = list.map((s) => `${s.sourceName} (Lv${s.reliabilityLevel})`)
  const prices = list.map((s) => Number(s.price))
  const confidences = list.map((s) => s.confidence)

  return {
    title: {
      text: `${compareData.value.item.itemName} · ${compareData.value.locationName}`,
      subtext: '各来源价格对比',
      left: 'center',
      textStyle: { color: '#171717' },
    },
    tooltip: {
      trigger: 'axis' as const,
      axisPointer: { type: 'shadow' as const },
      formatter: (params: any[]) => {
        const i = params[0].dataIndex
        return `${sources[i]}<br/>价格: ¥${prices[i].toFixed(2)}<br/>可信度: ${confidences[i]}%`
      },
    },
    grid: { left: 155, right: 55, top: 60, bottom: 30 },
    xAxis: { type: 'value' as const, name: '价格 (¥)', axisLabel: { formatter: '¥{value}', color: '#888888' } },
    yAxis: { type: 'category' as const, data: sources },
    series: [{
      name: '价格', type: 'bar' as const,
      data: prices.map((price, i) => ({
        value: price,
        itemStyle: {
          color: confidences[i] >= 90 ? '#30d158' : confidences[i] >= 80 ? '#f5a623' : '#ee0000',
          borderRadius: [0, 4, 4, 0],
        },
      })),
      label: { show: true, position: 'right' as const, formatter: (p: any) => `¥${Number(p.value).toFixed(2)}` },
    }],
    toolbox: { feature: { saveAsImage: { title: '保存' } }, right: 10 },
  }
})
</script>

<style scoped lang="scss">
.price-region {
  padding: 32px;
}

.region-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;

  .el-select,
  .el-date-picker { width: 180px; }
}

.region-card {
  background: var(--vercel-canvas);
  border: 1px solid var(--vercel-hairline);
  border-radius: var(--vercel-rounded-lg);
  padding: 20px;
  box-shadow: var(--vercel-shadow-card);
}

.region-chart {
  width: 100%;
  height: 440px;
}

@media (max-width: 760px) {
  .price-region { padding: 20px; }
  .region-chart { height: 340px; }
}
</style>
