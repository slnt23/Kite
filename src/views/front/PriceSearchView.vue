<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Coin,
  DataAnalysis,
  LocationInformation,
  Search,
  RefreshRight,
  Histogram,
  Wallet,
  CollectionTag,
  FolderOpened,
} from '@element-plus/icons-vue'

const categoryOptions = ['农产品', '食品饮料', '日用百货', '电子产品']
const regionOptions = ['北京', '上海', '广州', '成都', '武汉']
const hotKeywords = ['大米', '猪肉', '苹果', '手机', '92号汽油']
const rangeOptions = ['7天', '30天', '90天']

const selectedCategory = ref('农产品')
const selectedRegion = ref('北京')
const keyword = ref('')
const activeRange = ref('7天')

const latestPrice = {
  value: '¥ 12.50',
  item: '大米（东北大米 5kg）/ 北京',
  updatedAt: '2026-04-26 10:30',
}

const trendSummary = {
  average: '¥ 11.80',
  compareText: '较上周',
  compareValue: '▼ 3.21%',
}

const regionComparison = {
  high: '¥ 15.80',
  low: '¥ 10.20',
  spread: '¥ 5.60',
}

const sourceSummary = {
  count: '18',
  reliable: '12',
}

const trendValues = [12.5, 12.3, 13.2, 12.8, 12.4, 11.9, 11.6, 11.3]
const trendDates = ['04-19', '04-20', '04-21', '04-22', '04-23', '04-24', '04-25', '04-26']

const latestRows = [
  { name: '大米 东北大米 5kg', region: '北京', price: '¥ 12.50', time: '04-26 10:30' },
  { name: '大米 东北大米 5kg', region: '上海', price: '¥ 13.20', time: '04-26 10:28' },
  { name: '大米 东北大米 5kg', region: '广州', price: '¥ 11.80', time: '04-26 10:25' },
  { name: '大米 东北大米 5kg', region: '成都', price: '¥ 11.50', time: '04-26 10:22' },
  { name: '大米 东北大米 5kg', region: '武汉', price: '¥ 11.20', time: '04-26 10:20' },
]

const regionBars = [
  { name: '北京', value: 12.5, color: 'linear-gradient(180deg, #1f7bff 0%, #3aa6ff 100%)' },
  { name: '上海', value: 13.2, color: 'linear-gradient(180deg, #37c66e 0%, #6fe4a0 100%)' },
  { name: '广州', value: 11.8, color: 'linear-gradient(180deg, #ffb300 0%, #ffd46a 100%)' },
  { name: '成都', value: 11.5, color: 'linear-gradient(180deg, #855cf8 0%, #ba98ff 100%)' },
  { name: '武汉', value: 11.2, color: 'linear-gradient(180deg, #1ab2cc 0%, #74d9e8 100%)' },
]

const sourceRows = [
  { name: '京东商城', price: '12.50', stars: 5, reliability: '95.20%' },
  { name: '天猫超市', price: '12.30', stars: 4, reliability: '93.60%' },
  { name: '拼多多', price: '11.90', stars: 3, reliability: '88.40%' },
  { name: '盒马鲜生', price: '13.20', stars: 3, reliability: '91.30%' },
  { name: '本地超市', price: '12.00', stars: 2, reliability: '75.80%' },
]

const rawRecords = [
  {
    product: '大米',
    spec: '东北大米 5kg',
    region: '北京',
    price: '12.50',
    unit: '袋',
    source: '京东商城',
    stars: 5,
    reliability: '95.20%',
    effectiveAt: '2026-04-26 10:30:00',
    updatedAt: '2026-04-26 10:30:15',
  },
  {
    product: '大米',
    spec: '东北大米 5kg',
    region: '上海',
    price: '13.20',
    unit: '袋',
    source: '盒马鲜生',
    stars: 4,
    reliability: '92.10%',
    effectiveAt: '2026-04-26 10:28:00',
    updatedAt: '2026-04-26 10:28:18',
  },
]

const categoryTree = [
  {
    name: '农产品',
    expanded: true,
    children: [
      { name: '粮食', active: true },
      { name: '蔬菜' },
      { name: '水果' },
      { name: '肉类' },
    ],
  },
  { name: '食品饮料' },
  { name: '日用百货' },
  { name: '电子产品' },
]

const useKeyword = (word: string) => {
  keyword.value = word
}

const resetFilters = () => {
  selectedCategory.value = '农产品'
  selectedRegion.value = '北京'
  keyword.value = ''
}

const chartGeometry = computed(() => {
  const width = 560
  const height = 250
  const left = 32
  const bottom = 200
  const step = 70
  const max = Math.max(...trendValues)
  const min = Math.min(...trendValues)
  const range = max - min || 1

  const points = trendValues.map((value, index) => {
    const x = left + step * index
    const y = bottom - ((value - min) / range) * 120
    return { x, y, value }
  })

  const line = points.map((point) => `${point.x},${point.y}`).join(' ')
  const area = `${left},${bottom} ${line} ${points[points.length - 1].x},${bottom}`

  return { width, height, points, line, area }
})

const maxBarValue = Math.max(...regionBars.map((item) => item.value))

const barHeight = (value: number) => `${(value / maxBarValue) * 160}px`

const renderStars = (count: number) => `${'★'.repeat(count)}${'☆'.repeat(5 - count)}`
</script>

<template>
  <div class="price-dashboard">
    <section class="toolbar-card">
      <div class="toolbar-row">
        <el-select v-model="selectedCategory" placeholder="请选择物品分类" class="toolbar-field">
          <el-option v-for="item in categoryOptions" :key="item" :label="item" :value="item" />
        </el-select>

        <el-input v-model="keyword" placeholder="请输入物品名称" class="toolbar-field toolbar-field--keyword" clearable />

        <el-select v-model="selectedRegion" placeholder="请选择地点" class="toolbar-field">
          <el-option v-for="item in regionOptions" :key="item" :label="item" :value="item" />
        </el-select>

        <el-button type="primary" class="toolbar-button">
          <el-icon><Search /></el-icon>
          查询
        </el-button>

        <el-button class="toolbar-button toolbar-button--light" @click="resetFilters">
          <el-icon><RefreshRight /></el-icon>
          重置
        </el-button>
      </div>

      <div class="hot-keywords">
        <span class="hot-keywords__label">热门搜索：</span>
        <button
          v-for="word in hotKeywords"
          :key="word"
          type="button"
          class="hot-keywords__item"
          @click="useKeyword(word)"
        >
          {{ word }}
        </button>
      </div>
    </section>

    <section class="overview-grid">
      <article class="overview-card">
        <div class="overview-card__header">
          <div>
            <h3>最新价格</h3>
            <p>今日更新 1,258 条</p>
          </div>
          <span class="overview-icon overview-icon--blue">
            <el-icon><Coin /></el-icon>
          </span>
        </div>
        <strong class="overview-card__value overview-card__value--blue">{{ latestPrice.value }}</strong>
        <p class="overview-card__meta">{{ latestPrice.item }}</p>
        <small>更新时间：{{ latestPrice.updatedAt }}</small>
      </article>

      <article class="overview-card">
        <div class="overview-card__header">
          <div>
            <h3>价格趋势</h3>
            <p>近7日平均价格</p>
          </div>
          <span class="overview-icon overview-icon--green">
            <el-icon><DataAnalysis /></el-icon>
          </span>
        </div>
        <strong class="overview-card__value overview-card__value--green">{{ trendSummary.average }}</strong>
        <p class="overview-card__meta">
          {{ trendSummary.compareText }}
          <span class="trend-down">{{ trendSummary.compareValue }}</span>
        </p>
        <div class="sparkline">
          <span />
        </div>
      </article>

      <article class="overview-card">
        <div class="overview-card__header">
          <div>
            <h3>地区对比</h3>
            <p>最高价/最低价</p>
          </div>
          <span class="overview-icon overview-icon--orange">
            <el-icon><LocationInformation /></el-icon>
          </span>
        </div>
        <strong class="overview-card__value overview-card__value--orange">{{ regionComparison.high }} / {{ regionComparison.low }}</strong>
        <p class="overview-card__meta">价差： {{ regionComparison.spread }}</p>
      </article>

      <article class="overview-card">
        <div class="overview-card__header">
          <div>
            <h3>数据来源</h3>
            <p>接入来源总数</p>
          </div>
          <span class="overview-icon overview-icon--purple">
            <el-icon><Wallet /></el-icon>
          </span>
        </div>
        <strong class="overview-card__value overview-card__value--purple">{{ sourceSummary.count }}</strong>
        <p class="overview-card__meta">可靠来源 {{ sourceSummary.reliable }} 个</p>
      </article>
    </section>

    <section class="content-grid content-grid--main">
      <article class="panel panel--chart">
        <div class="panel__header">
          <div>
            <h3>价格趋势 <span>（大米 东北大米 5kg / 北京）</span></h3>
          </div>
          <div class="panel-tabs">
            <button
              v-for="item in rangeOptions"
              :key="item"
              type="button"
              :class="['panel-tab', { 'panel-tab--active': activeRange === item }]"
              @click="activeRange = item"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <div class="chart-shell">
          <div class="chart-axis-title">价格（元/袋）</div>
          <svg class="trend-chart" :viewBox="`0 0 ${chartGeometry.width} ${chartGeometry.height}`" aria-hidden="true">
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3a8cff" stop-opacity="0.28" />
                <stop offset="100%" stop-color="#3a8cff" stop-opacity="0.02" />
              </linearGradient>
            </defs>
            <line v-for="value in [10, 11, 12, 13, 14]" :key="value" :x1="24" :x2="540" :y1="205 - (value - 10) * 32" :y2="205 - (value - 10) * 32" class="grid-line" />
            <polygon :points="chartGeometry.area" fill="url(#trendFill)" />
            <polyline :points="chartGeometry.line" class="trend-line" />
            <g v-for="point in chartGeometry.points" :key="`${point.x}-${point.y}`">
              <circle :cx="point.x" :cy="point.y" r="4.5" class="trend-dot" />
              <text :x="point.x" :y="point.y - 12" class="trend-value">{{ point.value.toFixed(2) }}</text>
            </g>
          </svg>
          <div class="chart-scale">
            <span v-for="value in [14, 13, 12, 11, 10]" :key="value">{{ value.toFixed(2) }}</span>
          </div>
          <div class="chart-labels">
            <span v-for="date in trendDates" :key="date">{{ date }}</span>
          </div>
          <div class="chart-legend">
            <i />
            平均价格（元）
          </div>
        </div>
      </article>

      <article class="panel">
        <div class="panel__header">
          <h3>最新价格</h3>
          <button type="button" class="more-link">更多</button>
        </div>

        <div class="mini-table mini-table--header">
          <span>物品</span>
          <span>地点</span>
          <span>价格</span>
          <span>更新时间</span>
        </div>
        <div v-for="item in latestRows" :key="`${item.region}-${item.time}`" class="mini-table">
          <span>{{ item.name }}</span>
          <span>{{ item.region }}</span>
          <span>{{ item.price }}</span>
          <span>{{ item.time }}</span>
        </div>
      </article>
    </section>

    <section class="content-grid content-grid--secondary">
      <article class="panel">
        <div class="panel__header">
          <h3>多地区价格对比 <span>（大米 东北大米 5kg）</span></h3>
          <button type="button" class="more-link">更多</button>
        </div>

        <div class="bar-chart">
          <div class="bar-chart__grid" />
          <div v-for="item in regionBars" :key="item.name" class="bar-item">
            <span class="bar-item__value">{{ item.value.toFixed(2) }}</span>
            <div class="bar-item__column" :style="{ height: barHeight(item.value), background: item.color }" />
            <span class="bar-item__label">{{ item.name }}</span>
          </div>
        </div>
      </article>

      <article class="panel">
        <div class="panel__header">
          <h3>多来源价格对比 <span>（大米 东北大米 5kg / 北京）</span></h3>
          <button type="button" class="more-link">更多</button>
        </div>

        <div class="source-table source-table--header">
          <span>来源</span>
          <span>价格（元/袋）</span>
          <span>可靠等级</span>
          <span>可信度</span>
        </div>
        <div v-for="item in sourceRows" :key="item.name" class="source-table">
          <span>{{ item.name }}</span>
          <span>{{ item.price }}</span>
          <span class="stars">{{ renderStars(item.stars) }}</span>
          <span>{{ item.reliability }}</span>
        </div>
      </article>

      <article class="panel">
        <div class="panel__header">
          <h3>分类树</h3>
          <button type="button" class="more-link">更多</button>
        </div>

        <div class="tree-block">
          <div class="tree-row tree-row--root">
            <el-icon><CollectionTag /></el-icon>
            全部分类
          </div>

          <div v-for="node in categoryTree" :key="node.name" class="tree-group">
            <div class="tree-row tree-row--group">
              <el-icon><FolderOpened /></el-icon>
              {{ node.name }}
            </div>

            <div v-if="node.children" class="tree-children">
              <button
                v-for="child in node.children"
                :key="child.name"
                type="button"
                :class="['tree-row', 'tree-row--child', { 'tree-row--active': child.active }]"
              >
                {{ child.name }}
              </button>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="panel panel--records">
      <div class="panel__header">
        <h3>原始价格记录 <span>（最新 10 条）</span></h3>
        <button type="button" class="more-link">更多</button>
      </div>

      <div class="records-table records-table--header">
        <span>物品名称</span>
        <span>规格</span>
        <span>地点</span>
        <span>价格（元）</span>
        <span>计量单位</span>
        <span>来源</span>
        <span>可靠等级</span>
        <span>可信度</span>
        <span>生效时间</span>
        <span>更新时间</span>
      </div>

      <div v-for="item in rawRecords" :key="`${item.region}-${item.updatedAt}`" class="records-table">
        <span>{{ item.product }}</span>
        <span>{{ item.spec }}</span>
        <span>{{ item.region }}</span>
        <span>{{ item.price }}</span>
        <span>{{ item.unit }}</span>
        <span>{{ item.source }}</span>
        <span class="stars">{{ renderStars(item.stars) }}</span>
        <span>{{ item.reliability }}</span>
        <span>{{ item.effectiveAt }}</span>
        <span>{{ item.updatedAt }}</span>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.price-dashboard {
  display: grid;
  gap: 20px;
  padding: 28px 0 40px;
  color: #1f2937;
}

.toolbar-card,
.overview-card,
.panel {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(221, 232, 248, 0.9);
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(30, 64, 175, 0.08);
  backdrop-filter: blur(14px);
}

.toolbar-card {
  padding: 18px 18px 14px;
}

.toolbar-row {
  display: grid;
  grid-template-columns: 1.05fr 1.25fr 1.05fr auto auto;
  gap: 12px;
  align-items: center;
}

.toolbar-field {
  min-width: 0;
}

.toolbar-button {
  min-width: 110px;
  height: 46px;
  border-radius: 14px;
  font-weight: 600;
}

.toolbar-button--light {
  color: #475569;
  background: #fff;
  border-color: #dbe5f4;
}

.hot-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
  color: #94a3b8;
  font-size: 14px;
}

.hot-keywords__label {
  color: #94a3b8;
}

.hot-keywords__item {
  border: none;
  background: transparent;
  color: #475569;
  font-weight: 600;
  cursor: pointer;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.overview-card {
  padding: 22px 24px;
}

.overview-card__header,
.panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.overview-card__header h3,
.panel__header h3 {
  margin: 0;
  color: #111827;
  font-size: 26px;
  font-weight: 700;
}

.overview-card__header p,
.panel__header span {
  margin: 6px 0 0;
  color: #94a3b8;
  font-size: 14px;
  font-weight: 500;
}

.overview-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 22px;
}

.overview-icon--blue {
  color: #1d73ff;
  background: rgba(29, 115, 255, 0.12);
}

.overview-icon--green {
  color: #38b764;
  background: rgba(56, 183, 100, 0.13);
}

.overview-icon--orange {
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.14);
}

.overview-icon--purple {
  color: #8b5cf6;
  background: rgba(139, 92, 246, 0.13);
}

.overview-card__value {
  display: block;
  margin-top: 26px;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.overview-card__value--blue {
  color: #1d73ff;
}

.overview-card__value--green {
  color: #38b764;
}

.overview-card__value--orange {
  color: #fb8c00;
}

.overview-card__value--purple {
  color: #8b5cf6;
}

.overview-card__meta {
  margin: 16px 0 6px;
  color: #475569;
  font-size: 15px;
}

.overview-card small {
  color: #a1aebb;
}

.trend-down {
  color: #16a34a;
  font-weight: 700;
}

.sparkline {
  position: relative;
  height: 46px;
  margin-top: 10px;
  overflow: hidden;
}

.sparkline span {
  position: absolute;
  inset: 4px 0 0 auto;
  width: 120px;
  height: 54px;
  background:
    linear-gradient(180deg, rgba(56, 183, 100, 0.22), rgba(56, 183, 100, 0)),
    linear-gradient(135deg, transparent 8%, #77d68f 20%, #77d68f 36%, transparent 37%),
    linear-gradient(155deg, transparent 36%, #55c975 48%, #55c975 62%, transparent 63%),
    linear-gradient(145deg, transparent 62%, #3eb967 78%, #3eb967 88%, transparent 89%);
  border-bottom-right-radius: 18px;
}

.content-grid {
  display: grid;
  gap: 18px;
}

.content-grid--main {
  grid-template-columns: 1.45fr 1fr;
}

.content-grid--secondary {
  grid-template-columns: 1.15fr 1.25fr 0.9fr;
}

.panel {
  padding: 18px 20px 20px;
}

.panel--chart {
  padding-bottom: 14px;
}

.panel__header {
  margin-bottom: 16px;
}

.panel__header h3 {
  font-size: 18px;
}

.panel-tabs {
  display: inline-flex;
  gap: 10px;
}

.panel-tab {
  min-width: 50px;
  height: 32px;
  border: 1px solid #dbe5f4;
  border-radius: 10px;
  background: #fff;
  color: #64748b;
  cursor: pointer;
}

.panel-tab--active {
  border-color: #1d73ff;
  background: #1d73ff;
  color: #fff;
}

.more-link {
  border: none;
  background: transparent;
  color: #94a3b8;
  font-weight: 600;
  cursor: pointer;
}

.chart-shell {
  position: relative;
  padding: 10px 0 2px 38px;
}

.chart-axis-title {
  margin-bottom: 14px;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
}

.trend-chart {
  width: 100%;
  height: 280px;
}

.grid-line {
  stroke: #e7eef8;
  stroke-width: 1;
}

.trend-line {
  fill: none;
  stroke: #1f7bff;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.trend-dot {
  fill: #1f7bff;
  stroke: #fff;
  stroke-width: 2;
}

.trend-value {
  fill: #4b5563;
  font-size: 12px;
  text-anchor: middle;
}

.chart-scale {
  position: absolute;
  top: 56px;
  left: 0;
  display: grid;
  gap: 28px;
  color: #94a3b8;
  font-size: 13px;
}

.chart-labels {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  margin: -18px 0 0 12px;
  color: #64748b;
  font-size: 13px;
}

.chart-legend {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 14px 0 0 40%;
  color: #64748b;
  font-size: 13px;
}

.chart-legend i {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #1f7bff;
}

.mini-table,
.source-table,
.records-table {
  display: grid;
  align-items: center;
}

.mini-table {
  grid-template-columns: 2.1fr 0.9fr 0.9fr 1fr;
  gap: 16px;
  padding: 14px 4px;
  color: #334155;
  border-bottom: 1px solid #eff4fb;
}

.mini-table--header,
.source-table--header,
.records-table--header {
  padding-top: 4px;
  color: #94a3b8;
  font-size: 13px;
  font-weight: 700;
}

.bar-chart {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;
  align-items: end;
  min-height: 240px;
  padding: 26px 14px 10px;
}

.bar-chart__grid {
  position: absolute;
  inset: 30px 0 38px;
  background:
    repeating-linear-gradient(
      to top,
      rgba(226, 232, 240, 0.8) 0,
      rgba(226, 232, 240, 0.8) 1px,
      transparent 1px,
      transparent 40px
    );
}

.bar-item {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 8px;
}

.bar-item__value {
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
}

.bar-item__column {
  width: 34px;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 10px 24px rgba(59, 130, 246, 0.16);
}

.bar-item__label {
  color: #64748b;
  font-size: 13px;
}

.source-table {
  grid-template-columns: 1.5fr 1fr 1fr 0.9fr;
  gap: 10px;
  padding: 12px 2px;
  color: #334155;
  border-bottom: 1px solid #eff4fb;
}

.stars {
  color: #f59e0b;
  letter-spacing: 0.08em;
}

.tree-block {
  display: grid;
  gap: 10px;
}

.tree-group {
  display: grid;
  gap: 8px;
}

.tree-children {
  display: grid;
  gap: 6px;
  padding-left: 24px;
}

.tree-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 36px;
  padding: 0 10px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #475569;
  text-align: left;
}

.tree-row--root,
.tree-row--group {
  font-weight: 600;
}

.tree-row--active {
  background: rgba(29, 115, 255, 0.1);
  color: #1d4ed8;
}

.panel--records {
  overflow: hidden;
}

.records-table {
  grid-template-columns: 0.9fr 1.1fr 0.7fr 0.8fr 0.8fr 0.9fr 0.9fr 0.8fr 1.3fr 1.3fr;
  gap: 12px;
  padding: 14px 4px;
  color: #334155;
  font-size: 14px;
  border-bottom: 1px solid #eff4fb;
}

.records-table:last-child,
.mini-table:last-child,
.source-table:last-child {
  border-bottom: none;
}

:deep(.el-input__wrapper),
:deep(.el-select__wrapper) {
  min-height: 46px;
  border-radius: 14px;
  box-shadow: 0 0 0 1px #e1eaf6 inset;
}

:deep(.el-input__wrapper.is-focus),
:deep(.el-select__wrapper.is-focused) {
  box-shadow: 0 0 0 1px #1d73ff inset;
}

:deep(.el-button + .el-button) {
  margin-left: 0;
}

@media (max-width: 1400px) {
  .overview-grid,
  .content-grid--secondary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .content-grid--main {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) {
  .toolbar-row,
  .overview-grid,
  .content-grid--secondary,
  .records-table,
  .records-table--header {
    grid-template-columns: 1fr;
  }

  .toolbar-button {
    width: 100%;
  }

  .mini-table,
  .source-table {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .chart-shell {
    padding-left: 0;
  }

  .chart-scale {
    display: none;
  }

  .chart-labels {
    margin-left: 0;
  }

  .chart-legend {
    margin-left: 0;
  }
}

@media (max-width: 720px) {
  .price-dashboard {
    gap: 16px;
    padding-top: 18px;
  }

  .toolbar-card,
  .overview-card,
  .panel {
    border-radius: 18px;
  }

  .overview-card,
  .panel {
    padding: 16px;
  }

  .bar-chart {
    gap: 12px;
    padding-inline: 0;
  }

  .bar-item__column {
    width: 26px;
  }

  .mini-table,
  .source-table {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
</style>
