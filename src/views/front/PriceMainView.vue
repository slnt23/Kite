<script setup lang="ts">
import { ref } from 'vue'
import PriceNavigator from '@/components/price/PriceNavigator.vue'
import PriceLatest from '@/components/price/PriceLatest.vue'
import PriceTrend from '@/components/price/PriceTrend.vue'
import PriceRegion from '@/components/price/PriceRegion.vue'
import PriceSource from '@/components/price/PriceSource.vue'

// 当前激活的导航索引
const activeNav = ref('1')

// 处理导航切换
const handleNavigate = (index: string) => {
    activeNav.value = index
}
</script>

<template>
    <div class="price-main-layout">
        <!-- 侧边栏导航 -->
        <aside class="sidebar">
            <PriceNavigator @navigate="handleNavigate" />
        </aside>

        <!-- 主内容区域 -->
        <main class="content-area">
            <!-- 根据导航选择显示不同内容 -->
            <PriceLatest v-if="activeNav === '1'" />
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
    overflow: hidden;
}

.sidebar {
    flex-shrink: 0;
    background: #fff;
    border-right: 1px solid #e4e7ed;
}

.content-area {
    flex: 1;
    overflow-y: auto;
    background: #f5f7fa;
}
</style>