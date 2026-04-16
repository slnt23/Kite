<script setup>
import { computed, ref } from 'vue'
import bannerImage from '../../../assets/front/banner.jpg'
import projectImageOne from '../../../assets/front/pic01.jpg'
import projectImageTwo from '../../../assets/front/pic02.jpg'
import projectImageThree from '../../../assets/front/pic03.jpg'
import SectionIntro from '../../../components/site/SectionIntro.vue'
import SpotlightSection from '../../../components/site/SpotlightSection.vue'

const keyword = ref('电缆')
const selectedMarket = ref('华东')
const selectedCategory = ref('材料')

const priceRows = [
  {
    name: '高导电铜杆',
    market: '华东',
    category: '材料',
    price: '68,200 元/吨',
    trend: '+2.4%',
    status: '实时更新',
  },
  {
    name: '铝合金护套',
    market: '华东',
    category: '材料',
    price: '24,980 元/吨',
    trend: '+0.9%',
    status: '供需平稳',
  },
  {
    name: 'YJV 电缆',
    market: '华南',
    category: '成品',
    price: '15.8 元/米',
    trend: '-1.2%',
    status: '可比价',
  },
  {
    name: '阻燃低烟线缆',
    market: '华北',
    category: '成品',
    price: '19.4 元/米',
    trend: '+1.6%',
    status: '热度提升',
  },
]

const highlights = [
  {
    eyebrow: 'Price Signal',
    title: '价格查询首页，直接聚焦核心业务入口',
    description:
      '菜单中的首页已改造成价格查询界面，首屏不再只是展示，而是承担业务入口、行情概览与筛选引导。',
    image: projectImageOne,
  },
  {
    eyebrow: 'Market Snapshot',
    title: '按区域、品类与关键词快速筛选',
    description:
      '这一版先用静态演示数据搭好界面结构，后续接接口时只需要替换数据源，不需要再推翻页面布局。',
    image: projectImageTwo,
  },
  {
    eyebrow: 'Action Ready',
    title: '查询结果和状态卡片可以继续扩展成报价流',
    description:
      '结果区已经预留了趋势、状态和重点指标，后续可以继续接入导出、对比、收藏与图表能力。',
    image: projectImageThree,
  },
]

const filteredRows = computed(() =>
  priceRows.filter((item) => {
    const term = keyword.value.trim()
    const matchesKeyword = term ? item.name.includes(term) : true
    const matchesMarket = selectedMarket.value ? item.market === selectedMarket.value : true
    const matchesCategory = selectedCategory.value ? item.category === selectedCategory.value : true

    return matchesKeyword && matchesMarket && matchesCategory
  }),
)
</script>

<template>
  <div class="front-page">
    <section class="price-hero">
      <img class="price-hero__image" :src="bannerImage" alt="价格查询首页背景图" />
      <div class="price-hero__overlay" />
      <div class="price-hero__content">
        <p>Price Search Center</p>
        <h1>价格查询</h1>
        <h2>让线缆与材料价格入口直接成为网站首页。</h2>
        <p class="price-hero__summary">
          首页菜单已经切换为价格查询界面，保留原项目的沉浸式首屏节奏，同时把重心放到真实业务入口与数据浏览。
        </p>
      </div>
    </section>

    <section class="content-section content-stack">
      <div class="price-panel glass-panel">
        <div class="price-panel__header">
          <div>
            <p class="eyebrow-label">Search Panel</p>
            <h3>筛选价格数据</h3>
          </div>
          <span class="price-panel__badge">{{ filteredRows.length }} 条结果</span>
        </div>

        <div class="price-filters">
          <label>
            <span>关键词</span>
            <input v-model="keyword" type="text" placeholder="输入材料名或产品名" />
          </label>
          <label>
            <span>区域</span>
            <select v-model="selectedMarket">
              <option value="华东">华东</option>
              <option value="华南">华南</option>
              <option value="华北">华北</option>
            </select>
          </label>
          <label>
            <span>品类</span>
            <select v-model="selectedCategory">
              <option value="材料">材料</option>
              <option value="成品">成品</option>
            </select>
          </label>
        </div>

        <div class="price-table">
          <div class="price-table__head">
            <span>名称</span>
            <span>区域</span>
            <span>价格</span>
            <span>趋势</span>
            <span>状态</span>
          </div>
          <div v-for="item in filteredRows" :key="`${item.name}-${item.market}`" class="price-table__row">
            <strong>{{ item.name }}</strong>
            <span>{{ item.market }}</span>
            <span>{{ item.price }}</span>
            <span :class="{ 'price-table__trend--down': item.trend.startsWith('-') }">{{ item.trend }}</span>
            <span>{{ item.status }}</span>
          </div>
        </div>
      </div>

      <div class="price-metrics">
        <article class="metric-card glass-panel">
          <p>今日重点监测</p>
          <strong>12 项</strong>
          <span>覆盖铜、铝、成缆、护套等关键价格带</span>
        </article>
        <article class="metric-card glass-panel">
          <p>异常波动提醒</p>
          <strong>3 条</strong>
          <span>支持后续接入自动推送与订阅通知</span>
        </article>
        <article class="metric-card glass-panel">
          <p>最近更新</p>
          <strong>10 分钟前</strong>
          <span>演示版使用静态数据，结构已可直接接 API</span>
        </article>
      </div>
    </section>

    <section class="content-section content-stack">
      <SectionIntro
        eyebrow="Price Experience"
        title="价格查询不再只是一个入口，而是首页主场景。"
        description="当前界面已经具备查询、概览、结果展示和状态卡片布局，后续继续接后台接口会比较顺。"
      />

      <SpotlightSection :items="highlights" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.front-page {
  display: grid;
  gap: 28px;
}

.price-hero {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 88vh;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow: hidden;
}

.price-hero__image,
.price-hero__overlay {
  position: absolute;
  inset: 0;
}

.price-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.74);
}

.price-hero__overlay {
  background:
    linear-gradient(180deg, rgba(4, 18, 41, 0.42), rgba(8, 30, 63, 0.82)),
    radial-gradient(circle at center, rgba(255, 255, 255, 0.08), transparent 34%);
}

.price-hero__content {
  position: relative;
  z-index: 1;
  width: min(980px, calc(100% - 24px));
  text-align: center;
}

.price-hero__content > p:first-child {
  margin: 0 0 14px;
  color: rgba(245, 251, 255, 0.86);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.price-hero__content h1,
.price-hero__content h2 {
  color: var(--color-text);
}

.price-hero__content h1 {
  margin: 0;
  font-size: clamp(3.8rem, 8vw, 6.8rem);
}

.price-hero__content h2 {
  max-width: 18ch;
  margin: 14px auto 0;
  font-size: clamp(1.8rem, 4vw, 3.2rem);
  line-height: 1.08;
}

.price-hero__summary {
  max-width: 62ch;
  margin: 18px auto 0;
  color: var(--color-text-soft);
}

.price-panel {
  display: grid;
  gap: 20px;
  padding: 28px;
  border-radius: 30px;
}

.price-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.price-panel__header h3 {
  margin: 0;
  color: var(--color-text);
}

.price-panel__badge {
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
}

.price-filters {
  display: grid;
  grid-template-columns: 1.2fr repeat(2, minmax(0, 0.7fr));
  gap: 14px;
}

.price-filters label {
  display: grid;
  gap: 8px;
}

.price-filters span {
  color: var(--color-text);
  font-weight: 600;
}

.price-filters input,
.price-filters select {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text);
  outline: none;
}

.price-table {
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.price-table__head,
.price-table__row {
  display: grid;
  grid-template-columns: minmax(160px, 1.2fr) repeat(4, minmax(0, 0.75fr));
  gap: 14px;
  padding: 16px 18px;
}

.price-table__head {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(245, 251, 255, 0.9);
  font-weight: 700;
}

.price-table__row {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--color-text-soft);
}

.price-table__row strong {
  color: var(--color-text);
}

.price-table__trend--down {
  color: #ffd0d0;
}

.price-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.metric-card {
  display: grid;
  gap: 8px;
  padding: 22px;
  border-radius: 28px;
}

.metric-card p,
.metric-card span {
  margin: 0;
  color: var(--color-text-soft);
}

.metric-card strong {
  color: var(--color-text);
  font-size: 2rem;
}

@media (max-width: 960px) {
  .price-filters,
  .price-metrics,
  .price-table__head,
  .price-table__row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .price-panel {
    padding: 20px;
  }

  .price-hero__content h1 {
    font-size: clamp(3rem, 16vw, 4.4rem);
  }
}
</style>
