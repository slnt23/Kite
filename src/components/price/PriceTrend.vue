<template>
    <div class="price-trend">
        <h2>价格趋势</h2>
        <div class="chart-container">
            <div class="chart-header">
                <el-select v-model="selectedCommodity" placeholder="选择商品">
                    <el-option v-for="item in commodities" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="timeRange" placeholder="时间范围">
                    <el-option label="近7天" value="7d" />
                    <el-option label="近30天" value="30d" />
                    <el-option label="近90天" value="90d" />
                </el-select>
            </div>
            <div class="chart-area">
                <div class="y-axis">
                    <span v-for="(label, index) in yAxisLabels" :key="index">{{ label }}</span>
                </div>
                <div class="chart-content">
                    <svg class="trend-chart" viewBox="0 0 800 300" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stop-color="rgba(144, 185, 255, 0.3)" />
                                <stop offset="100%" stop-color="rgba(144, 185, 255, 0)" />
                            </linearGradient>
                        </defs>
                        <path :d="areaPath" fill="url(#chartGradient)" />
                        <path :d="linePath" fill="none" stroke="#409EFF" stroke-width="2" />
                        <circle v-for="(point, index) in chartPoints" :key="index" :cx="point.x" :cy="point.y" r="4"
                            fill="#409EFF" class="chart-point" />
                    </svg>
                    <div class="x-axis">
                        <span v-for="(label, index) in xAxisLabels" :key="index">{{ label }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const selectedCommodity = ref('pig')
const timeRange = ref('7d')

const commodities = [
    { label: '生猪', value: 'pig' },
    { label: '玉米', value: 'corn' },
    { label: '豆粕', value: 'soybean' },
]

const generateMockData = () => {
    const data: number[] = []
    const days = parseInt(timeRange.value)
    let basePrice = 15

    for (let i = 0; i < days; i++) {
        const variation = (Math.random() - 0.5) * 2
        basePrice = Math.max(10, Math.min(20, basePrice + variation))
        data.push(basePrice)
    }
    return data
}

const chartData = computed(() => generateMockData())

const yAxisLabels = computed(() => {
    const data = chartData.value
    const min = Math.floor(Math.min(...data)) - 1
    const max = Math.ceil(Math.max(...data)) + 1
    const step = (max - min) / 4
    return Array.from({ length: 5 }, (_, i) => (max - i * step).toFixed(1))
})

const xAxisLabels = computed(() => {
    const days = parseInt(timeRange.value)
    const step = Math.floor(days / 6)
    return Array.from({ length: 7 }, (_, i) => `${days - i * step}天前`)
})

const chartPoints = computed(() => {
    const data = chartData.value
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    return data.map((value, index) => ({
        x: (index / (data.length - 1)) * 800,
        y: 300 - ((value - min) / range) * 280 - 10,
    }))
})

const linePath = computed(() => {
    const points = chartPoints.value
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
})

const areaPath = computed(() => {
    const points = chartPoints.value
    const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
    return `${line} L 800 300 L 0 300 Z`
})
</script>

<style scoped>
.price-trend {
    padding: 20px;
}

h2 {
    margin-bottom: 20px;
    color: #303133;
}

.chart-container {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.chart-header {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.chart-area {
    display: flex;
    height: 350px;
}

.y-axis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 10px;
    font-size: 12px;
    color: #909399;
}

.chart-content {
    flex: 1;
    position: relative;
}

.trend-chart {
    width: 100%;
    height: 300px;
}

.chart-point {
    opacity: 0;
    transition: opacity 0.3s;
}

.trend-chart:hover .chart-point {
    opacity: 1;
}

.x-axis {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    font-size: 12px;
    color: #909399;
}
</style>