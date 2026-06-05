import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { itemApi } from '@/api/modules/price.api'
import type { PriceItemVO } from '@/types'

const selectedItem = ref<PriceItemVO | null>(null)
const selectedLocationId = ref<number | undefined>(undefined)
const searchResults = ref<PriceItemVO[]>([])
const searchLoading = ref(false)                     // 搜索加载状态

/**
 * 物品状态管理组合式函数
 * 提供物品搜索、选择、清除等操作
 */
export function usePriceItemStore() {

    // 异步搜索物品
    async function searchItems(keyword: string) {
        const trimmed = keyword.trim()
        if (!trimmed) {                 // 空关键词直接返回
            searchResults.value = []
            return
        }
        searchLoading.value = true      // 开始加载
        try {
            // 调用 API 搜索
            const res = await itemApi.searchItems({ itemName: trimmed })
            searchResults.value = res.data?.records ?? []
            // console.log('搜索结果：', searchResults.value)
        } catch {
            ElMessage.error('搜索失败，请稍后再试')
        } finally {
            searchLoading.value = false  // 结束加载（无论成功失败）
        }
    }

    // 选中物品
    function selectItem(item: PriceItemVO) {
        selectedItem.value = item
        // console.log('选中物品：', item)
    }

    // 清除选中状态
    function clearSelection() {
        selectedItem.value = null
        searchResults.value = []
    }

    // 切换地区
    function selectLocation(id: number | undefined) {
        selectedLocationId.value = id
    }

    // 返回状态和方法（响应式）
    return {
        selectedItem,
        selectedLocationId,
        searchResults,
        searchLoading,
        searchItems,
        selectItem,
        selectLocation,
        clearSelection,
    }
}