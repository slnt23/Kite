<template>
    <div class="price-latest">
        <h2>最新价格</h2>
        <div class="price-cards">
            <div v-for="item in priceList" :key="item.id" class="price-card">
                <div class="price-header">
                    <span class="commodity-name">{{ item.name }}</span>
                    <span :class="['price-change', item.change > 0 ? 'up' : 'down']">
                        {{ item.change > 0 ? '+' : '' }}{{ item.change }}%
                    </span>
                </div>
                <div class="price-value">¥{{ item.price.toFixed(2) }}</div>
                <div class="price-info">
                    <span>单位: {{ item.unit }}</span>
                    <span>更新: {{ item.updateTime }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface PriceItem {
    id: number
    name: string
    price: number
    change: number
    unit: string
    updateTime: string
}

const priceList = ref<PriceItem[]>([
    { id: 1, name: '生猪', price: 15.80, change: 2.3, unit: '元/公斤', updateTime: '2分钟前' },
    { id: 2, name: '玉米', price: 2.85, change: -0.5, unit: '元/公斤', updateTime: '5分钟前' },
    { id: 3, name: '豆粕', price: 3.20, change: 1.8, unit: '元/公斤', updateTime: '8分钟前' },
    { id: 4, name: '鸡蛋', price: 9.20, change: -1.2, unit: '元/公斤', updateTime: '3分钟前' },
])
</script>

<style scoped>
.price-latest {
    padding: 20px;
}

h2 {
    margin-bottom: 20px;
    color: #303133;
}

.price-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.price-card {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.price-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.commodity-name {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
}

.price-change {
    font-size: 14px;
    font-weight: 500;
}

.price-change.up {
    color: #f56c6c;
}

.price-change.down {
    color: #67c23a;
}

.price-value {
    font-size: 28px;
    font-weight: bold;
    color: #303133;
    margin-bottom: 10px;
}

.price-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #909399;
}
</style>