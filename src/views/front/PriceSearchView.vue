<script setup lang="ts">
import { ref } from 'vue'
import { Search, Coin, DataAnalysis, LocationInformation, Wallet } from '@element-plus/icons-vue'

const keyword = ref('')

const options = [
    { key: 'latest', icon: Coin, title: '最新价格' },
    { key: 'trend', icon: DataAnalysis, title: '价格趋势' },
    { key: 'region', icon: LocationInformation, title: '地区对比' },
    { key: 'source', icon: Wallet, title: '数据来源' },
]

const useOption = (key: string) => {
    // 占位：此处可触发导航或筛选逻辑
    console.log('选中悬浮选项：', key)
}
</script>

<template>
    <div class="price-search-page">
        <div class="search-center">
            <el-input v-model="keyword" placeholder="输入商品或关键词，回车搜索" class="search-input" clearable
                @keyup.enter="() => console.log('搜索：', keyword)">
                <template #suffix>
                    <el-button type="primary" class="search-btn">
                        <el-icon>
                            <Search />
                        </el-icon>
                    </el-button>
                </template>
            </el-input>
        </div>

        <nav class="floating-bar" aria-label="悬浮选项栏">
            <ul class="fab-list">
                <li v-for="opt in options" :key="opt.key" class="fab-item" @click="useOption(opt.key)">
                    <el-button type="text" class="fab-icon">
                        <el-icon>
                            <component :is="opt.icon" />
                        </el-icon>
                    </el-button>
                    <span class="fab-title">{{ opt.title }}</span>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped lang="scss">
.price-search-page {
    min-height: calc(100vh - 0px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: transparent;
}

.search-center {
    width: 100%;
    max-width: 720px;
    padding: 24px;
}

.search-input ::v-deep(.el-input__inner) {
    height: 64px;
    border-radius: 40px;
    padding-right: 12px;
    font-size: 18px;
    box-shadow: 0 10px 30px rgba(17, 24, 39, 0.06);
}

.search-btn {
    height: 44px;
    border-radius: 32px;
    padding: 0 14px;
}

.floating-bar {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 24px;
    z-index: 60;
    background: rgba(255, 255, 255, 0.98);
    border-radius: 999px;
    box-shadow: 0 12px 30px rgba(2, 6, 23, 0.12);
    padding: 8px 18px;
    display: flex;
    align-items: center;
    gap: 6px;
    max-width: 92%;
}

.fab-list {
    display: flex;
    gap: 8px;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
}

.fab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 4px 6px;
}

.fab-icon {
    border-radius: 999px;
    padding: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(243, 246, 255, 0.9);
}

.fab-icon ::v-deep(.el-icon) {
    width: 44px;
    height: 44px;
    color: #1f2937;
}

.fab-title {
    font-size: 11px;
    color: #94a3b8;
    line-height: 1;
}

@media (max-width: 720px) {
    .search-center {
        padding: 12px;
    }

    .floating-bar {
        bottom: 12px;
        padding: 6px 10px;
    }

    .fab-icon ::v-deep(.el-icon) {
        width: 40px;
        height: 40px;
    }

    .fab-title {
        font-size: 10px;
    }
}

@media (max-width: 420px) {
    .fab-title {
        display: none;
    }

    .floating-bar {
        padding: 6px 8px;
    }
}
</style>
