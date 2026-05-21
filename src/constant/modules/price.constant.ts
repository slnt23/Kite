import type {
  PriceLatestVO,
  PriceTrendVO,
  PriceCompareVO,
  SourceCompareVO,
  PriceItemVO,
} from '@/types'

// ==================== 通用选项 ====================

export const PRICE_ITEM_OPTIONS: { label: string; value: number }[] = [
  { label: '生猪', value: 1 },
  { label: '玉米', value: 2 },
  { label: '豆粕', value: 3 },
  { label: '鸡蛋', value: 4 },
]

export const PRICE_LOCATION_OPTIONS: { label: string; value: number }[] = [
  { label: '华北地区', value: 1 },
  { label: '华东地区', value: 2 },
  { label: '华南地区', value: 3 },
  { label: '西南地区', value: 4 },
]

// ==================== 物品基础信息 ====================

const ITEM_PIG: PriceItemVO = {
  itemId: 1,
  itemName: '生猪',
  unit: '公斤',
  specification: '外三元 110kg',
  categoryName: '畜牧',
}

const ITEM_CORN: PriceItemVO = {
  itemId: 2,
  itemName: '玉米',
  unit: '公斤',
  specification: '二等黄玉米',
  categoryName: '粮食',
}

const ITEM_SOYBEAN: PriceItemVO = {
  itemId: 3,
  itemName: '豆粕',
  unit: '公斤',
  specification: '43%蛋白',
  categoryName: '饲料',
}

const ITEM_EGG: PriceItemVO = {
  itemId: 4,
  itemName: '鸡蛋',
  unit: '公斤',
  specification: '褐壳 散装',
  categoryName: '禽蛋',
}

// ==================== 最新价格示例 ====================

export const EXAMPLE_PRICE_LATEST: PriceLatestVO = {
  item: ITEM_PIG,
  locationName: '华北地区',
  price: '15.80',
  currency: 'CNY',
  priceUnit: '元/公斤',
  sourceName: '国家统计局',
  reliabilityLevel: 4,
  effectiveTime: '2026-05-21T10:30:00',
  confidence: 95.0,
}

// ==================== 价格趋势示例 ====================

export const EXAMPLE_PRICE_TREND_LIST: PriceTrendVO[] = [
  {
    item: ITEM_PIG,
    locationName: '华北地区',
    trend: [
      { time: '2026-04-21T12:00:00', price: '15.60' },
      { time: '2026-04-24T12:00:00', price: '15.72' },
      { time: '2026-04-27T12:00:00', price: '15.45' },
      { time: '2026-04-30T12:00:00', price: '15.88' },
      { time: '2026-05-03T12:00:00', price: '16.10' },
      { time: '2026-05-06T12:00:00', price: '15.95' },
      { time: '2026-05-09T12:00:00', price: '15.70' },
      { time: '2026-05-12T12:00:00', price: '15.55' },
      { time: '2026-05-15T12:00:00', price: '15.80' },
      { time: '2026-05-18T12:00:00', price: '16.05' },
      { time: '2026-05-21T12:00:00', price: '15.80' },
    ],
  },
  {
    item: ITEM_CORN,
    locationName: '华北地区',
    trend: [
      { time: '2026-04-21T12:00:00', price: '2.90' },
      { time: '2026-04-24T12:00:00', price: '2.88' },
      { time: '2026-04-27T12:00:00', price: '2.82' },
      { time: '2026-04-30T12:00:00', price: '2.78' },
      { time: '2026-05-03T12:00:00', price: '2.75' },
      { time: '2026-05-06T12:00:00', price: '2.80' },
      { time: '2026-05-09T12:00:00', price: '2.83' },
      { time: '2026-05-12T12:00:00', price: '2.87' },
      { time: '2026-05-15T12:00:00', price: '2.85' },
      { time: '2026-05-18T12:00:00', price: '2.82' },
      { time: '2026-05-21T12:00:00', price: '2.85' },
    ],
  },
]

// ==================== 地区对比示例 ====================

export const EXAMPLE_PRICE_COMPARE: PriceCompareVO = {
  item: ITEM_PIG,
  locationName: '华北地区',
  compareList: [
    { sourceName: '国家统计局', price: '15.80', reliabilityLevel: 4, confidence: 95.0 },
    { sourceName: '农业农村部', price: '15.90', reliabilityLevel: 4, confidence: 92.0 },
    { sourceName: '批发市场A', price: '16.10', reliabilityLevel: 3, confidence: 85.0 },
    { sourceName: '电商平台', price: '15.70', reliabilityLevel: 2, confidence: 78.0 },
  ],
}

// ==================== 来源对比示例 ====================

export const EXAMPLE_PRICE_SOURCE_COMPARE: SourceCompareVO[] = [
  { sourceName: '国家统计局', price: '15.80', reliabilityLevel: 4, confidence: 95.0 },
  { sourceName: '农业农村部', price: '15.90', reliabilityLevel: 4, confidence: 92.0 },
  { sourceName: '国际期货', price: '16.05', reliabilityLevel: 3, confidence: 88.0 },
  { sourceName: '批发市场A', price: '16.10', reliabilityLevel: 3, confidence: 85.0 },
  { sourceName: '电商平台', price: '15.70', reliabilityLevel: 2, confidence: 78.0 },
  { sourceName: '产地直供', price: '15.55', reliabilityLevel: 2, confidence: 72.0 },
]
