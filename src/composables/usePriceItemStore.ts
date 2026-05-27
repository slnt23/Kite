import { ref } from 'vue'
import { priceApi } from '@/api/modules/price.api'
import { mockSearchItems } from '@/constant'
import type { PriceItemVO } from '@/types'

// 模块级单例状态（所有组件实例共享）
const selectedItem = ref<PriceItemVO | null>(null)
const searchResults = ref<PriceItemVO[]>([])
const searchLoading = ref(false)

export function usePriceItemStore() {

    async function searchItems(keyword: string) {
        const trimmed = keyword.trim()
        if (!trimmed) {
            searchResults.value = []
            return
        }
        searchLoading.value = true
        try {
            const res = await priceApi.searchItems({ keyword: trimmed })
            searchResults.value = res.data ?? []
        } catch {
            // API 不可用时降级到本地模拟搜索
            searchResults.value = mockSearchItems(trimmed)
        } finally {
            searchLoading.value = false
        }
    }

    function selectItem(item: PriceItemVO) {
        selectedItem.value = item
    }

    function clearSelection() {
        selectedItem.value = null
        searchResults.value = []
    }

    return {
        selectedItem,
        searchResults,
        searchLoading,
        searchItems,
        selectItem,
        clearSelection,
    }
}
