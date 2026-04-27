<script setup>
import { computed, ref } from 'vue'
import SectionIntro from '../../components/site/SectionIntro.vue'
import FeatureGrid from '../../components/site/FeatureGrid.vue'
import CapabilityTable from '../../components/site/CapabilityTable.vue'

const keyword = ref('')
const selectedMarket = ref('全部区域')
const selectedCategory = ref('全部品类')

const featureItems = [
  {
    icon: 'P1',
    title: '价格面板',
    description: '用独立业务页承载价格筛选、趋势提示和数据明细，首页只负责导流。',
  },
  {
    icon: 'P2',
    title: '筛选结构',
    description: '按关键词、区域和品类筛选，后续可继续接供应商、日期和规格条件。',
  },
  {
    icon: 'P3',
    title: '趋势状态',
    description: '每一条数据同时展示价格、涨跌趋势和状态标签，便于快速查看。',
  },
  {
    icon: 'P4',
    title: '接口就绪',
    description: '当前先是静态数据版，后续只需替换数据源即可接入真实查询接口。',
  },
]

const priceRows = [
  {
    name: '高导电铜杆',
    market: '华东',
    category: '原材料',
    price: '68,200 元/吨',
    trend: '+2.4%',
    status: '实时更新',
  },
  {
    name: '铝合金护套',
    market: '华东',
    category: '原材料',
    price: '24,980 元/吨',
    trend: '+0.9%',
    status: '供需平稳',
  },
  {
    name: 'YJV 电缆',
    market: '华南',
    category: '成品线缆',
    price: '15.8 元/米',
    trend: '-1.2%',
    status: '可比价',
  },
  {
    name: '阻燃低烟线缆',
    market: '华北',
    category: '成品线缆',
    price: '19.4 元/米',
    trend: '+1.6%',
    status: '热度提升',
  },
]

const filteredRows = computed(() =>
  priceRows.filter((item) => {
    const term = keyword.value.trim()
    const matchesKeyword = term ? item.name.includes(term) : true
    const matchesMarket = selectedMarket.value === '全部区域' || item.market === selectedMarket.value
    const matchesCategory =
      selectedCategory.value === '全部品类' || item.category === selectedCategory.value

    return matchesKeyword && matchesMarket && matchesCategory
  }),
)

const capabilityRows = computed(() =>
  filteredRows.value.map((item) => ({
    name: item.name,
    scope: `${item.market} / ${item.category} / ${item.price}`,
    stage: `${item.trend} · ${item.status}`,
  })),
)
</script>

<template>
  <div class="price-page">
    <section class="price-hero glass-panel">
      <p class="eyebrow-label">Price Query</p>
      <h1>价格查询</h1>
      <p>
        这是独立的价格查询界面，结构参考原有“服务能力”这一类单页样式，但内容重心改为业务数据查询。
      </p>
    </section>

    <section class="content-section content-stack">
      <div class="price-filter-panel glass-panel">
        <div class="price-filter-panel__header">
          <div>
            <p class="eyebrow-label">Search Panel</p>
            <h2>按条件筛选价格结果</h2>
          </div>
          <span>{{ filteredRows.length }} 条结果</span>
        </div>

        <div class="price-filter-grid">
          <label>
            <span>关键词</span>
            <input v-model="keyword" type="text" placeholder="输入材料名或产品名" />
          </label>
          <label>
            <span>区域</span>
            <select v-model="selectedMarket">
              <option>全部区域</option>
              <option>华东</option>
              <option>华南</option>
              <option>华北</option>
            </select>
          </label>
          <label>
            <span>品类</span>
            <select v-model="selectedCategory">
              <option>全部品类</option>
              <option>原材料</option>
              <option>成品线缆</option>
            </select>
          </label>
        </div>
      </div>

      <SectionIntro
        eyebrow="Price Capability"
        title="价格查询作为独立页面存在，更适合承接具体业务。"
        description="首页只负责总览，这里则集中承载筛选、结果、趋势和后续接口扩展。"
      />

<!--      <FeatureGrid :items="featureItems" />-->
    </section>

    <section class="content-section content-stack">
      <SectionIntro
        eyebrow="Result List"
        title="查询结果会按独立业务页的节奏展开。"
        description="当前使用静态演示数据，后续接接口时可以继续沿用这套结果视图。"
      />

      <CapabilityTable :rows="capabilityRows" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.price-page {
  display: grid;
  gap: 28px;
  padding-top: 110px;
}

.price-hero,
.price-filter-panel {
  padding: 28px;
  border-radius: 30px;
}

.price-hero h1,
.price-filter-panel h2 {
  margin: 0 0 12px;
  color: var(--color-text);
}

.price-hero p:last-child,
.price-filter-grid span {
  color: var(--color-text-soft);
}

.price-filter-panel {
  display: grid;
  gap: 18px;
}

.price-filter-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.price-filter-panel__header span {
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
  color: var(--color-text);
}

.price-filter-grid {
  display: grid;
  grid-template-columns: 1.2fr repeat(2, minmax(0, 0.8fr));
  gap: 14px;
}

.price-filter-grid label {
  display: grid;
  gap: 8px;
}

.price-filter-grid input,
.price-filter-grid select {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.28);
  color: var(--color-text-deep);
  outline: none;
}

@media (max-width: 960px) {
  .price-filter-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .price-page {
    padding-top: 90px;
  }

  .price-hero,
  .price-filter-panel {
    padding: 20px;
  }

  .price-filter-panel__header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
