/**
 * 时间字符串
 * 格式：
 * 2026-05-12T18:30:00
 */
export type DateTimeString = string

/**
 * 时间粒度
 */
export type TimeGranularity =
    | 'HOUR'
    | 'DAY'
    | 'WEEK'
    | 'MONTH'
    | 'YEAR'

/**
 * 币种
 */
export type Currency =
    | 'CNY'
    | 'USD'
    | 'EUR'
    | 'JPY'
    | 'GBP'
    | 'HKD'


/**
 * 价格查询基础参数
 */
export interface BasePriceQueryDTO {

    // ==================== 物品 ====================

    /**
     * 单个物品ID
     */
    itemId?: number

    /**
     * 多个物品ID
     */
    itemIds?: number[]

    /**
     * 物品编码
     */
    itemCode?: string

    // ==================== 地点 ====================

    /**
     * 单个地点ID
     */
    locationId?: number

    /**
     * 多个地点ID
     */
    locationIds?: number[]

    // ==================== 来源 ====================

    /**
     * 来源ID列表
     */
    sourceIds?: number[]

    /**
     * 最低可靠等级
     * 1 ~ 5
     */
    minReliability?: number

    // ==================== 通用 ====================

    /**
     * 币种
     */
    currency?: Currency

    /**
     * 最低可信度
     * 0 ~ 100
     */
    minConfidence?: number
}

export interface PriceLatestQueryDTO
    extends BasePriceQueryDTO {

}

export interface PriceTrendQueryDTO
    extends BasePriceQueryDTO {

    /**
     * 开始时间
     */
    startTime: DateTimeString

    /**
     * 结束时间
     */
    endTime: DateTimeString

    /**
     * 聚合粒度
     */
    granularity: TimeGranularity
}

export interface PriceCompareLocationDTO
    extends BasePriceQueryDTO {

    /**
     * 对比时间点
     */
    targetTime: DateTimeString
}


export interface PriceCompareSourceDTO
    extends BasePriceQueryDTO {

    /**
     * 对比时间点
     */
    targetTime: DateTimeString
}