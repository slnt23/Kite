<template>
  <div class="price-source">
    <div class="source-controls">
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
      <el-button type="primary" :loading="loading" @click="fetchSourceCompare" size="default">查询</el-button>
    </div>

    <div class="source-grid">
      <div class="source-panel">
        <v-chart :option="barOption" :autoresize="true" class="source-chart" />
      </div>
      <div class="source-panel">
        <v-chart :option="radarOption" :autoresize="true" class="source-chart" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { priceApi } from '@/api/modules/price.api'
import { EXAMPLE_PRICE_SOURCE_COMPARE, PRICE_ITEM_OPTIONS, PRICE_LOCATION_OPTIONS } from '@/constant'
import type { SourceCompareVO } from '@/types/modules/price.type'

const loading = ref(false)
const sourceData = ref<SourceCompareVO[]>(EXAMPLE_PRICE_SOURCE_COMPARE)
const query = ref({ itemId: undefined as number | undefined, locationId: undefined as number | undefined })
const targetTime = ref<string | null>(null)

async function fetchSourceCompare() {
  loading.value = true
  try {
    const res = await priceApi.compareSource({
      itemId: query.value.itemId,
      locationId: query.value.locationId,
      targetTime: targetTime.value ?? new Date().toISOString().slice(0, 19),
    })
    sourceData.value = res.data ?? []
  } finally { loading.value = false }
}

const barOption = computed(() => {
  const sorted = [...sourceData.value].sort((a, b) => Number(b.price) - Number(a.price))
  const names = sorted.map((s) => s.sourceName)
  const prices = sorted.map((s) => Number(s.price))
  const confidences = sorted.map((s) => s.confidence)
  const reliabilities = sorted.map((s) => s.reliabilityLevel)

  return {
    title: { text: '各来源价格对比', left: 'center', textStyle: { color: '#171717' } },
    tooltip: {
      trigger: 'axis' as const, axisPointer: { type: 'shadow' as const },
      formatter: (params: any[]) => {
        const i = params[0].dataIndex
        return `${names[i]}<br/>价格: ¥${prices[i].toFixed(2)}<br/>可靠等级: Lv${reliabilities[i]}<br/>可信度: ${confidences[i]}%`
      },
    },
    grid: { left: 130, right: 55, top: 40, bottom: 30 },
    xAxis: { type: 'value' as const, name: '价格 (¥)', axisLabel: { formatter: '¥{value}', color: '#888888' } },
    yAxis: { type: 'category' as const, data: names },
    series: [{
      type: 'bar' as const,
      data: prices.map((price, i) => ({
        value: price,
        itemStyle: {
          color: confidences[i] >= 90 ? '#30d158' : confidences[i] >= 80 ? '#f5a623' : '#ee0000',
          borderRadius: [0, 4, 4, 0],
        },
      })),
      label: { show: true, position: 'right' as const, formatter: (p: any) => `¥${Number(p.value).toFixed(2)}` },
      markLine: {
        silent: true,
        data: [{ type: 'average' as const, name: '均价' }],
        lineStyle: { type: 'dashed' as const, color: '#a1a1a1' },
        label: { formatter: '均价 ¥{c}' },
      },
    }],
    toolbox: { feature: { saveAsImage: { title: '保存' } }, right: 10 },
  }
})

const radarOption = computed(() => {
  const maxPrice = Math.max(...sourceData.value.map((s) => Number(s.price)))
  return {
    title: { text: '来源可信度雷达', left: 'center', textStyle: { color: '#171717' } },
    tooltip: {},
    legend: { bottom: 0, type: 'scroll' as const, textStyle: { color: '#4d4d4d' } },
    radar: {
      indicator: [
        { name: '价格指数', max: 100 },
        { name: '可信度', max: 100 },
        { name: '可靠等级', max: 5 },
      ],
      center: ['50%', '50%'], radius: '60%',
    },
    series: [{
      type: 'radar' as const,
      data: sourceData.value.map((s) => ({
        name: s.sourceName,
        value: [Math.round((Number(s.price) / maxPrice) * 100), s.confidence, s.reliabilityLevel],
      })),
    }],
  }
})
</script>

<style scoped lang="scss">
.price-source {
  padding: 32px;
}

.source-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;

  .el-select,
  .el-date-picker { width: 180px; }
}

.source-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.source-panel {
  background: var(--vercel-canvas);
  border: 1px solid var(--vercel-hairline);
  border-radius: var(--vercel-rounded-lg);
  padding: 20px;
  box-shadow: var(--vercel-shadow-card);
}

.source-chart {
  width: 100%;
  height: 400px;
}

@media (max-width: 900px) {
  .source-grid { grid-template-columns: 1fr; }
}

@media (max-width: 760px) {
  .price-source { padding: 20px; }
  .source-chart { height: 320px; }
}
</style>
