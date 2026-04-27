<script setup>
import { computed, ref } from 'vue'
import SectionIntro from '../../components/site/SectionIntro.vue'
import FeatureGrid from '../../components/site/FeatureGrid.vue'
import CapabilityTable from '../../components/site/CapabilityTable.vue'

const keyword = ref('')
// const selectedMarket = ref('全部区域')
// const selectedCategory = ref('全部品类')

// const featureItems = [
//   {
//     icon: 'P1',
//     title: '价格面板',
//     description: '用独立业务页承载价格筛选、趋势提示和数据明细，首页只负责导流。',
//   },
//   {
//     icon: 'P2',
//     title: '筛选结构',
//     description: '按关键词、区域和品类筛选，后续可继续接供应商、日期和规格条件。',
//   },
//   {
//     icon: 'P3',
//     title: '趋势状态',
//     description: '每一条数据同时展示价格、涨跌趋势和状态标签，便于快速查看。',
//   },
//   {
//     icon: 'P4',
//     title: '接口就绪',
//     description: '当前先是静态数据版，后续只需替换数据源即可接入真实查询接口。',
//   },
// ]
//
// const priceRows = [
//   {
//     name: '高导电铜杆',
//     market: '华东',
//     category: '原材料',
//     price: '68,200 元/吨',
//     trend: '+2.4%',
//     status: '实时更新',
//   },
//   {
//     name: '铝合金护套',
//     market: '华东',
//     category: '原材料',
//     price: '24,980 元/吨',
//     trend: '+0.9%',
//     status: '供需平稳',
//   },
//   {
//     name: 'YJV 电缆',
//     market: '华南',
//     category: '成品线缆',
//     price: '15.8 元/米',
//     trend: '-1.2%',
//     status: '可比价',
//   },
//   {
//     name: '阻燃低烟线缆',
//     market: '华北',
//     category: '成品线缆',
//     price: '19.4 元/米',
//     trend: '+1.6%',
//     status: '热度提升',
//   },
// ]
//
// const filteredRows = computed(() =>
//   priceRows.filter((item) => {
//     const term = keyword.value.trim()
//     const matchesKeyword = term ? item.name.includes(term) : true
//     const matchesMarket = selectedMarket.value === '全部区域' || item.market === selectedMarket.value
//     const matchesCategory =
//       selectedCategory.value === '全部品类' || item.category === selectedCategory.value
//
//     return matchesKeyword && matchesMarket && matchesCategory
//   }),
// )
//
// const capabilityRows = computed(() =>
//   filteredRows.value.map((item) => ({
//     name: item.name,
//     scope: `${item.market} / ${item.category} / ${item.price}`,
//     stage: `${item.trend} · ${item.status}`,
//   })),
// )
</script>

<template>
  <div class="price-page">
    <div class="search-container">
      <div class="search-bar">
        <input 
          v-model="keyword" 
          type="text" 
          placeholder="输入关键词进行搜索"
          class="search-input"
        />
        <div class="search-divider">|</div>
        <button class="search-button">
          搜索
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.price-page {
  display: grid;
  gap: 28px;
  //padding-top: 110px;
  //height: 100vh;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 60vh;
}

.search-bar {
  display: flex;
  align-items: center;
  width: 66.66%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.search-input {
  flex: 1;
  padding: 16px 20px;
  border: none;
  background: transparent;
  color: var(--color-text-deep);
  outline: none;
  font-size: 16px;
}

.search-input::placeholder {
  //color: var(--color-text-soft);
  color: #999999;
}

.search-divider {
  width: 1px;
  height: 28px;
  //background: rgba(255, 255, 255, 0.3);
}

.search-button {
  padding: 16px 24px;
  border: none;
  background: transparent;
  color: #007bff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
}

.search-button:hover {
  color: #0056b3;
}

@media (max-width: 960px) {
  .search-bar {
    width: 80%;
  }
}

@media (max-width: 760px) {
  .price-page {
    padding-top: 90px;
  }
  
  .search-bar {
    width: 90%;
    border-radius: 20px;
  }
  
  .search-input {
    padding: 14px 16px;
    font-size: 14px;
  }
  
  .search-button {
    padding: 14px 20px;
    font-size: 14px;
  }
}
</style>