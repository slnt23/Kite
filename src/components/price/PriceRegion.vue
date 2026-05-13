<template>
    <div class="price-region">
        <h2>地区对比</h2>
        <div class="region-cards">
            <div v-for="region in regionData" :key="region.name" class="region-card">
                <div class="region-header">
                    <el-icon>
                        <Location />
                    </el-icon>
                    <span>{{ region.name }}</span>
                </div>
                <div class="region-prices">
                    <div v-for="item in region.prices" :key="item.commodity" class="price-item">
                        <span class="commodity">{{ item.commodity }}</span>
                        <span class="price">¥{{ item.price.toFixed(2) }}/{{ item.unit }}</span>
                    </div>
                </div>
                <div class="region-trend" :class="region.trend > 0 ? 'up' : 'down'">
                    <el-icon>{{ region.trend > 0 ? Location : Location }}</el-icon>
                    <span>{{ region.trend > 0 ? '+' : '' }}{{ region.trend }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Location, } from '@element-plus/icons-vue'

interface PriceItem {
    commodity: string
    price: number
    unit: string
}

interface Region {
    name: string
    prices: PriceItem[]
    trend: number
}

const regionData = ref<Region[]>([
    {
        name: '华北地区',
        prices: [
            { commodity: '生猪', price: 16.20, unit: '公斤' },
            { commodity: '玉米', price: 2.90, unit: '公斤' },
            { commodity: '豆粕', price: 3.25, unit: '公斤' },
        ],
        trend: 1.5,
    },
    {
        name: '华东地区',
        prices: [
            { commodity: '生猪', price: 15.80, unit: '公斤' },
            { commodity: '玉米', price: 2.85, unit: '公斤' },
            { commodity: '豆粕', price: 3.20, unit: '公斤' },
        ],
        trend: -0.8,
    },
    {
        name: '华南地区',
        prices: [
            { commodity: '生猪', price: 16.50, unit: '公斤' },
            { commodity: '玉米', price: 3.00, unit: '公斤' },
            { commodity: '豆粕', price: 3.30, unit: '公斤' },
        ],
        trend: 2.3,
    },
    {
        name: '西南地区',
        prices: [
            { commodity: '生猪', price: 15.50, unit: '公斤' },
            { commodity: '玉米', price: 2.75, unit: '公斤' },
            { commodity: '豆粕', price: 3.15, unit: '公斤' },
        ],
        trend: -1.2,
    },
])
</script>

<style scoped>
.price-region {
    padding: 20px;
}

h2 {
    margin-bottom: 20px;
    color: #303133;
}

.region-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

.region-card {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.region-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
}

.region-prices {
    margin-bottom: 15px;
}

.price-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f5f7fa;
}

.price-item:last-child {
    border-bottom: none;
}

.commodity {
    color: #606266;
}

.price {
    font-weight: 600;
    color: #303133;
}

.region-trend {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    font-size: 14px;
    font-weight: 500;
}

.region-trend.up {
    color: #f56c6c;
}

.region-trend.down {
    color: #67c23a;
}
</style>