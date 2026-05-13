<template>
    <div class="price-source">
        <h2>来源对比</h2>
        <div class="source-tabs">
            <el-tabs v-model="activeTab" type="border-card">
                <el-tab-pane label="生猪" name="pig">
                    <div class="source-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>来源渠道</th>
                                    <th>价格(元/公斤)</th>
                                    <th>更新时间</th>
                                    <th>可信度</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="source in pigSources" :key="source.id">
                                    <td>{{ source.name }}</td>
                                    <td :class="source.change > 0 ? 'up' : 'down'">
                                        ¥{{ source.price.toFixed(2) }}
                                    </td>
                                    <td>{{ source.updateTime }}</td>
                                    <td>
                                        <el-progress :percentage="source.reliability" :show-text="false" />
                                    </td>
                                    <td>
                                        <el-button size="small" type="primary">查看详情</el-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="玉米" name="corn">
                    <div class="source-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>来源渠道</th>
                                    <th>价格(元/公斤)</th>
                                    <th>更新时间</th>
                                    <th>可信度</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="source in cornSources" :key="source.id">
                                    <td>{{ source.name }}</td>
                                    <td :class="source.change > 0 ? 'up' : 'down'">
                                        ¥{{ source.price.toFixed(2) }}
                                    </td>
                                    <td>{{ source.updateTime }}</td>
                                    <td>
                                        <el-progress :percentage="source.reliability" :show-text="false" />
                                    </td>
                                    <td>
                                        <el-button size="small" type="primary">查看详情</el-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="豆粕" name="soybean">
                    <div class="source-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>来源渠道</th>
                                    <th>价格(元/公斤)</th>
                                    <th>更新时间</th>
                                    <th>可信度</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="source in soybeanSources" :key="source.id">
                                    <td>{{ source.name }}</td>
                                    <td :class="source.change > 0 ? 'up' : 'down'">
                                        ¥{{ source.price.toFixed(2) }}
                                    </td>
                                    <td>{{ source.updateTime }}</td>
                                    <td>
                                        <el-progress :percentage="source.reliability" :show-text="false" />
                                    </td>
                                    <td>
                                        <el-button size="small" type="primary">查看详情</el-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Source {
    id: number
    name: string
    price: number
    change: number
    updateTime: string
    reliability: number
}

const activeTab = ref('pig')

const pigSources = ref<Source[]>([
    { id: 1, name: '国家统计局', price: 15.80, change: 1.2, updateTime: '10分钟前', reliability: 95 },
    { id: 2, name: '农业农村部', price: 15.90, change: 0.8, updateTime: '25分钟前', reliability: 92 },
    { id: 3, name: '批发市场A', price: 16.10, change: 2.1, updateTime: '5分钟前', reliability: 85 },
    { id: 4, name: '电商平台', price: 15.70, change: -0.5, updateTime: '1小时前', reliability: 78 },
])

const cornSources = ref<Source[]>([
    { id: 1, name: '国家统计局', price: 2.85, change: -0.3, updateTime: '15分钟前', reliability: 95 },
    { id: 2, name: '粮食交易中心', price: 2.88, change: 0.5, updateTime: '30分钟前', reliability: 90 },
    { id: 3, name: '期货交易所', price: 2.90, change: 1.2, updateTime: '2分钟前', reliability: 98 },
    { id: 4, name: '产地直供', price: 2.78, change: -1.0, updateTime: '45分钟前', reliability: 82 },
])

const soybeanSources = ref<Source[]>([
    { id: 1, name: '国际期货', price: 3.25, change: 1.5, updateTime: '1分钟前', reliability: 96 },
    { id: 2, name: '进口贸易商', price: 3.22, change: 0.8, updateTime: '20分钟前', reliability: 88 },
    { id: 3, name: '国内油厂', price: 3.18, change: -0.5, updateTime: '1小时前', reliability: 85 },
    { id: 4, name: '批发市场', price: 3.20, change: 0.3, updateTime: '35分钟前', reliability: 80 },
])
</script>

<style scoped>
.price-source {
    padding: 20px;
}

h2 {
    margin-bottom: 20px;
    color: #303133;
}

.source-tabs {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.source-table {
    padding: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #f5f7fa;
}

th {
    background: #fafafa;
    font-weight: 600;
    color: #606266;
}

tbody tr:hover {
    background: #fafafa;
}

td.up {
    color: #f56c6c;
}

td.down {
    color: #67c23a;
}

.el-progress {
    width: 80px;
}
</style>