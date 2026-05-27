<template>
  <div class="price-trend">
    <div class="trend-controls">
      <el-tag v-if="selectedItem" type="info" size="default">当前物品: {{ selectedItem.itemName }}</el-tag>
      <el-select v-model="query.granularity" placeholder="时间粒度" size="default">
        <el-option label="按小时" value="HOUR" />
        <el-option label="按天" value="DAY" />
        <el-option label="按周" value="WEEK" />
        <el-option label="按月" value="MONTH" />
      </el-select>
      <el-date-picker
        v-model="dateRange"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="YYYY-MM-DDTHH:mm:ss"
        size="default"
      />
      <el-button type="primary" :loading="loading" @click="fetchTrend" size="default">查询</el-button>
    </div>

    <div class="trend-card" v-if="selectedItem">
      <v-chart :option="chartOption" :autoresize="true" class="trend-chart" />
    </div>

    <div v-if="!selectedItem" class="empty-hint">
      请先在「物品查询」中选择一个物品
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { priceApi } from '@/api/modules/price.api'
import { EXAMPLE_PRICE_TREND_LIST } from '@/constant'
import { usePriceItemStore } from '@/composables/usePriceItemStore'
import type { PriceTrendVO, PriceTrendQueryDTO } from '@/types/modules/price.type'

const loading = ref(false)
const trendData = ref<PriceTrendVO[]>(EXAMPLE_PRICE_TREND_LIST)
const dateRange = ref<[string, string] | null>(null)

const query = ref<Omit<PriceTrendQueryDTO, 'startTime' | 'endTime'>>({
  itemId: undefined,
  granularity: 'DAY',
})

const { selectedItem } = usePriceItemStore()

watch(selectedItem, (item) => {
  if (item) {
    query.value.itemId = item.itemId
    if (dateRange.value) fetchTrend()
  }
})

async function fetchTrend() {
  if (!dateRange.value) return
  loading.value = true
  try {
    const res = await priceApi.getTrend({
      ...query.value,
      startTime: dateRange.value[0],
      endTime: dateRange.value[1],
    })
    trendData.value = res.data ?? []
  } finally { loading.value = false }
}

const chartOption = computed(() => {
  const seriesList = trendData.value.map((vo) => ({
    name: `${vo.item.itemName} · ${vo.locationName}`,
    type: 'line' as const,
    smooth: true,
    symbol: 'circle', symbolSize: 4,
    data: vo.trend.map((p) => [p.time, Number(p.price)]),
    markLine: {
      silent: true,
      data: [{ type: 'average' as const, name: '均价' }],
      lineStyle: { type: 'dashed' as const, color: '#a1a1a1' },
      label: { formatter: '均价 {c}' },
    },
    markPoint: {
      data: [
        { type: 'max' as const, name: '最高' },
        { type: 'min' as const, name: '最低' },
      ],
    },
  }))

  return {
    tooltip: {
      trigger: 'axis' as const,
      formatter: (params: any[]) =>
        params.map((p) => `${p.marker} ${p.seriesName}<br/>时间: ${p.axisValue}<br/>价格: ¥${Number(p.value[1]).toFixed(2)}`).join('<br/>'),
    },
    legend: { top: 0, type: 'scroll' as const, textStyle: { color: '#4d4d4d' } },
    grid: { left: 55, right: 25, top: 40, bottom: 60 },
    xAxis: {
      type: 'time' as const, name: '时间',
      axisLabel: { formatter: '{yyyy}-{MM}-{dd}\n{HH}:{mm}', color: '#888888' },
    },
    yAxis: {
      type: 'value' as const, name: '价格 (¥)',
      axisLabel: { formatter: '¥{value}', color: '#888888' },
    },
    dataZoom: [
      { type: 'slider' as const, bottom: 20, height: 24 },
      { type: 'inside' as const },
    ],
    toolbox: { feature: { saveAsImage: { title: '保存' } }, right: 10 },
    series: seriesList,
  }
})
</script>

<style scoped lang="scss">
.price-trend {
  padding: 32px;
}

.trend-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;

  .el-select,
  .el-date-picker { width: 190px; }
}

.trend-card {
  background: var(--vercel-canvas);
  border: 1px solid var(--vercel-hairline);
  border-radius: var(--vercel-rounded-lg);
  padding: 20px;
  box-shadow: var(--vercel-shadow-card);
}

.trend-chart {
  width: 100%;
  height: 440px;
}

.empty-hint {
  text-align: center;
  color: var(--vercel-mute);
  font-size: 14px;
  padding: 48px 0;
}

@media (max-width: 760px) {
  .price-trend { padding: 20px; }
  .trend-chart { height: 340px; }
}
</style>
