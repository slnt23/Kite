import type {
  PriceLatestVO,
  PriceTrendVO,
  PriceCompareVO,
  SourceCompareVO,
  PriceItemVO,
  Currency,
} from '@/types'
import { Search, Coin, TrendCharts, DataAnalysis, Connection } from '@element-plus/icons-vue'

// ==================== 导航菜单 ====================

export const PRICE_NAV_ITEMS = [
  { index: '0', label: '物品查询', icon: Search },
  { index: '1', label: '最新价格', icon: Coin },
  { index: '2', label: '价格趋势', icon: TrendCharts },
  { index: '3', label: '地区对比', icon: DataAnalysis },
  { index: '4', label: '来源对比', icon: Connection },
] as const

// ==================== 通用选项 PriceLatest 选项框数据，====================

// export const PRICE_ITEM_OPTIONS: { label: string; value: number }[] = [
//   { label: '生猪', value: 1 },
//   { label: '玉米', value: 2 },
//   { label: '豆粕', value: 3 },
//   { label: '鸡蛋', value: 4 },
// ]

export const PRICE_LOCATION_OPTIONS: { label: string; value: number }[] = [
  { label: '华北地区', value: 1 },
  { label: '华东地区', value: 2 },
  { label: '华南地区', value: 3 },
  { label: '西南地区', value: 4 },
]

export const PRICE_CURRENCY_OPTIONS: { label: string; value: Currency }[] = [
  { label: '人民币 (CNY)', value: 'CNY' },
  { label: '美元 (USD)', value: 'USD' },
  { label: '欧元 (EUR)', value: 'EUR' },
  { label: '日元 (JPY)', value: 'JPY' },
  { label: '英镑 (GBP)', value: 'GBP' },
  { label: '港币 (HKD)', value: 'HKD' },
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

// ==================== 物品搜索示例数据 ====================

export const EXAMPLE_PRICE_ITEM_LIST: PriceItemVO[] = [
  ITEM_PIG,
  ITEM_CORN,
  ITEM_SOYBEAN,
  ITEM_EGG,
  { itemId: 5, itemName: '牛肉', unit: '公斤', specification: '西门塔尔 育肥牛', categoryName: '畜牧' },
  { itemId: 6, itemName: '羊肉', unit: '公斤', specification: '内蒙古 羔羊肉', categoryName: '畜牧' },
  { itemId: 7, itemName: '白条鸡', unit: '公斤', specification: '西装鸡 1.5kg', categoryName: '禽类' },
  { itemId: 8, itemName: '鸭肉', unit: '公斤', specification: '樱桃谷鸭 冷冻', categoryName: '禽类' },
  { itemId: 9, itemName: '小麦', unit: '吨', specification: '二等冬小麦', categoryName: '粮食' },
  { itemId: 10, itemName: '大豆', unit: '吨', specification: '国产 非转基因', categoryName: '粮食' },
  { itemId: 11, itemName: '稻谷', unit: '吨', specification: '晚籼稻 三等', categoryName: '粮食' },
  { itemId: 12, itemName: '花生', unit: '公斤', specification: '带壳 通货', categoryName: '油料' },
  { itemId: 13, itemName: '菜籽油', unit: '升', specification: '四级 压榨', categoryName: '油脂' },
  { itemId: 14, itemName: '豆油', unit: '升', specification: '一级 浸出', categoryName: '油脂' },
  { itemId: 15, itemName: '棕榈油', unit: '升', specification: '24度 精炼', categoryName: '油脂' },
  { itemId: 16, itemName: '白糖', unit: '吨', specification: '一级 白砂糖', categoryName: '糖料' },
  { itemId: 17, itemName: '棉花', unit: '吨', specification: '3128B级 皮棉', categoryName: '纺织' },
  { itemId: 18, itemName: '天然橡胶', unit: '吨', specification: 'SCR5 标准胶', categoryName: '化工' },
  { itemId: 19, itemName: '螺纹钢', unit: '吨', specification: 'HRB400E Φ20mm', categoryName: '钢材' },
  { itemId: 20, itemName: '热轧卷板', unit: '吨', specification: 'Q235B 5.5mm', categoryName: '钢材' },
  { itemId: 21, itemName: '电解铜', unit: '吨', specification: '1# 阴极铜', categoryName: '有色金属' },
  { itemId: 22, itemName: '铝锭', unit: '吨', specification: 'A00 重熔用', categoryName: '有色金属' },
  { itemId: 23, itemName: '动力煤', unit: '吨', specification: 'Q5500 秦皇岛', categoryName: '能源' },
  { itemId: 24, itemName: '原油', unit: '桶', specification: 'WTI 轻质低硫', categoryName: '能源' },
  { itemId: 25, itemName: '尿素', unit: '吨', specification: '小颗粒 46%氮', categoryName: '化肥' },
  { itemId: 26, itemName: '磷酸二铵', unit: '吨', specification: '64% 总养分', categoryName: '化肥' },
]

/** 本地模拟搜索，按名称模糊匹配（用于开发调试或 API 不可用时降级） */
export function mockSearchItems(keyword: string): PriceItemVO[] {
  const kw = keyword.trim().toLowerCase()
  if (!kw) return []
  return EXAMPLE_PRICE_ITEM_LIST.filter(
    (item) =>
      item.itemName.toLowerCase().includes(kw) ||
      item.categoryName.toLowerCase().includes(kw) ||
      item.specification.toLowerCase().includes(kw),
  )
}

// ==================== 最新价格示例 ====================

export const EXAMPLE_PRICE_LATEST: PriceLatestVO = {
  item: EXAMPLE_PRICE_ITEM_LIST[18], // 螺纹钢
  locationName: '华北地区',
  price: '3520.00',
  currency: 'CNY',
  priceUnit: '元/吨',
  sourceName: '我的钢铁网',
  reliabilityLevel: 4,
  effectiveTime: '2026-05-21T10:30:00',
  confidence: 93.0,
}

// ==================== 价格趋势示例 ====================

export const EXAMPLE_PRICE_TREND_LIST: PriceTrendVO[] = [
  {
    item: EXAMPLE_PRICE_ITEM_LIST[18], // 螺纹钢
    locationName: '华北地区',
    trend: [
      { time: '2026-04-21T12:00:00', price: '3480' },
      { time: '2026-04-24T12:00:00', price: '3510' },
      { time: '2026-04-27T12:00:00', price: '3495' },
      { time: '2026-04-30T12:00:00', price: '3530' },
      { time: '2026-05-03T12:00:00', price: '3555' },
      { time: '2026-05-06T12:00:00', price: '3540' },
      { time: '2026-05-09T12:00:00', price: '3515' },
      { time: '2026-05-12T12:00:00', price: '3490' },
      { time: '2026-05-15T12:00:00', price: '3525' },
      { time: '2026-05-18T12:00:00', price: '3500' },
      { time: '2026-05-21T12:00:00', price: '3520' },
    ],
  },
  {
    item: EXAMPLE_PRICE_ITEM_LIST[20], // 电解铜
    locationName: '华东地区',
    trend: [
      { time: '2026-04-21T12:00:00', price: '69500' },
      { time: '2026-04-24T12:00:00', price: '70200' },
      { time: '2026-04-27T12:00:00', price: '69800' },
      { time: '2026-04-30T12:00:00', price: '71200' },
      { time: '2026-05-03T12:00:00', price: '72000' },
      { time: '2026-05-06T12:00:00', price: '71500' },
      { time: '2026-05-09T12:00:00', price: '70800' },
      { time: '2026-05-12T12:00:00', price: '70300' },
      { time: '2026-05-15T12:00:00', price: '71000' },
      { time: '2026-05-18T12:00:00', price: '70500' },
      { time: '2026-05-21T12:00:00', price: '70800' },
    ],
  },
  {
    item: EXAMPLE_PRICE_ITEM_LIST[22], // 动力煤
    locationName: '华北地区',
    trend: [
      { time: '2026-04-21T12:00:00', price: '845' },
      { time: '2026-04-24T12:00:00', price: '838' },
      { time: '2026-04-27T12:00:00', price: '852' },
      { time: '2026-04-30T12:00:00', price: '860' },
      { time: '2026-05-03T12:00:00', price: '870' },
      { time: '2026-05-06T12:00:00', price: '865' },
      { time: '2026-05-09T12:00:00', price: '855' },
      { time: '2026-05-12T12:00:00', price: '848' },
      { time: '2026-05-15T12:00:00', price: '858' },
      { time: '2026-05-18T12:00:00', price: '850' },
      { time: '2026-05-21T12:00:00', price: '845' },
    ],
  },
]

// ==================== 地区对比示例 ====================

export const EXAMPLE_PRICE_COMPARE: PriceCompareVO = {
  item: EXAMPLE_PRICE_ITEM_LIST[18], // 螺纹钢
  locationName: '华北地区',
  compareList: [
    { sourceName: '华北市场', price: '3520.00', reliabilityLevel: 4, confidence: 93.0 },
    { sourceName: '华东市场', price: '3545.00', reliabilityLevel: 4, confidence: 91.0 },
    { sourceName: '华南市场', price: '3580.00', reliabilityLevel: 3, confidence: 87.0 },
    { sourceName: '西南市场', price: '3610.00', reliabilityLevel: 3, confidence: 84.0 },
  ],
}

// ==================== 来源对比示例 ====================

export const EXAMPLE_PRICE_SOURCE_COMPARE: SourceCompareVO[] = [
  { sourceName: '我的钢铁网', price: '3520.00', reliabilityLevel: 4, confidence: 93.0 },
  { sourceName: '国家统计局', price: '3510.00', reliabilityLevel: 5, confidence: 96.0 },
  { sourceName: '期货市场(SHFE)', price: '3545.00', reliabilityLevel: 3, confidence: 88.0 },
  { sourceName: '兰格钢铁', price: '3505.00', reliabilityLevel: 3, confidence: 85.0 },
  { sourceName: '找钢网', price: '3530.00', reliabilityLevel: 2, confidence: 80.0 },
  { sourceName: '中钢网', price: '3495.00', reliabilityLevel: 2, confidence: 74.0 },
]