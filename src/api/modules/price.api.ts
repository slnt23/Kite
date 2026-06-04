import request from '../request';
import type {
    PriceLatestVO,
    PriceTrendVO,
    PriceCompareVO,
    SourceCompareVO,
    PriceLatestQueryDTO,
    PriceTrendQueryDTO,
    PriceCompareLocationDTO,
    PriceCompareSourceDTO,
} from '@/types/modules/price.type';
import type { Result } from '@/types';

const PRICE_BASE_URL = '/price';

export const priceApi = {

    /**
     * 1. 查询最新价格
     */
    getLatest(data: PriceLatestQueryDTO): Promise<Result<PriceLatestVO>> {
        return request.post(`${PRICE_BASE_URL}/latest`, data);
    },

    /**
     * 2. 查询价格趋势
     */
    getTrend(data: PriceTrendQueryDTO): Promise<Result<PriceTrendVO[]>> {
        return request.post(`${PRICE_BASE_URL}/trend`, data);
    },

    /**
     * 3. 多地区对比
     */
    compareLocation(data: PriceCompareLocationDTO): Promise<Result<PriceCompareVO>> {
        return request.post(`${PRICE_BASE_URL}/compare/location`, data);
    },

    /**
     * 4. 多来源对比
     */
    compareSource(data: PriceCompareSourceDTO): Promise<Result<SourceCompareVO[]>> {
        return request.post(`${PRICE_BASE_URL}/compare/source`, data);
    },
};

// ==================== 物品查询 ====================

import type { ItemIntroDTO, ItemIntroVO } from '@/types/modules/price.type';
import type { PageResult } from '@/types';

export const itemApi = {

    /**
     * 搜索物品（分页查询，按名称模糊匹配）
     */
    searchItems(data: ItemIntroDTO): Promise<Result<PageResult<ItemIntroVO>>> {
        return request.post(`/item/page`, data);
    },
};