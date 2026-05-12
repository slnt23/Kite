<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import logoImg from '@/assets/modules/PRICE.png'

// 搜索关键词
const keyword = ref('')
// 当前页码
const currentPage = ref(1)
// 每页显示数量
const pageSize = ref(10)
// 总数据量
const total = ref(0)
// 是否正在搜索
const loading = ref(false)

// 模拟搜索结果数据
const searchResults = ref<Array<{
    id: number
    name: string
    price: string
    store: string
    region: string
}>>([])

// 搜索执行
const handleSearch = async () => {

}

</script>

<template>
    <div class="price-search-page">
        <!-- 顶栏搜索框 -->
        <header class="search-header">
            <div class="search-container">
                <div class="logo-wrapper">
                    <img :src="logoImg" alt="Logo" class="logo-icon">
                </div>
                <el-input v-model="keyword" placeholder="输入物品关键词搜索" class="search-input" clearable
                    @keyup.enter="handleSearch">
                    <template #suffix>
                        <el-button type="primary" class="search-btn" @click="handleSearch" :loading="loading">
                            搜索
                        </el-button>
                    </template>
                </el-input>

                <div class="tag-wrapper">
                    <span class="search-tag">价格查询</span>
                </div>
            </div>
        </header>

        <!-- 主内容区域 -->
        <main class="main-content">
            <!-- 默认显示图片 -->


            <!-- 搜索结果列表 -->

        </main>
    </div>
</template>

<style scoped lang="scss">
.search-header {
    padding: 40px 0;
    background: #fff;
}

.search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
    gap: 24px;
}

.logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.logo-icon {
    width: 192px;
    height: 90px;
    object-fit: contain;
}

.search-input {
    flex: 1;
    max-width: 1000px;
    height: 64px;
    font-size: 18px;
}

.search-btn {
    min-width: 100px;
    height: 64px;
    font-size: 18px;
    padding: 0 24px;
}

.tag-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.search-tag {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    padding: 12px 24px;
    background: linear-gradient(135deg, #dadbe2 0%, #5f0faf 100%);
    color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(14, 46, 186, 0.4);
}
</style>