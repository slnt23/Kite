import type {
  Currency,
  TimeGranularity,
} from '@/types'
import {
  Search,
  Coin,
  TrendCharts,
  DataAnalysis,
  Connection
} from '@element-plus/icons-vue'

// ==================== 导航菜单 ====================

import PriceItemQuery from '@/components/price/PriceItemQuery.vue'
import PriceLatest from '@/components/price/PriceLatest.vue'
import PriceTrend from '@/components/price/PriceTrend.vue'
import PriceRegion from '@/components/price/PriceRegion.vue'
import PriceSource from '@/components/price/PriceSource.vue'

export const PRICE_NAV_ITEMS = [
  { index: '0', label: '物品查询', icon: Search },
  { index: '1', label: '最新价格', icon: Coin },
  { index: '2', label: '价格趋势', icon: TrendCharts },
  { index: '3', label: '地区对比', icon: DataAnalysis },
  { index: '4', label: '来源对比', icon: Connection },
] as const

export const PRICE_TAB_COMPONENT_MAP: Record<string, any> = {
  '0': PriceItemQuery,
  '1': PriceLatest,
  '2': PriceTrend,
  '3': PriceRegion,
  '4': PriceSource,
}

// ==================== 通用选项 PriceLatest 选项框数据，====================


// 示例地区数据，后期可以更改为从后端获取的动态数据，
export const PRICE_LOCATION_OPTIONS: { label: string; value: number }[] = [
  { label: '北京', value: 1 },
  { label: '天津', value: 2 },
  { label: '河北', value: 3 },
  { label: '山西', value: 4 },
  { label: '内蒙古', value: 5 },
  { label: '辽宁', value: 6 },
  { label: '吉林', value: 7 },
  { label: '黑龙江', value: 8 },
  { label: '上海', value: 9 },
  { label: '江苏', value: 10 },
  { label: '浙江', value: 11 },
  { label: '安徽', value: 12 },
  { label: '福建', value: 13 },
  { label: '江西', value: 14 },
  { label: '山东', value: 15 },
  { label: '河南', value: 16 },
  { label: '湖北', value: 17 },
  { label: '湖南', value: 18 },
  { label: '广东', value: 19 },
  { label: '广西', value: 20 },
  { label: '海南', value: 21 },
  { label: '重庆', value: 22 },
  { label: '四川', value: 23 },
  { label: '贵州', value: 24 },
  { label: '云南', value: 25 },
  { label: '西藏', value: 26 },
  { label: '陕西', value: 27 },
  { label: '甘肃', value: 28 },
  { label: '青海', value: 29 },
  { label: '宁夏', value: 30 },
  { label: '新疆', value: 31 },
  { label: '台湾', value: 32 },
  { label: '香港', value: 33 },
  { label: '澳门', value: 34 },
]

// ==================== 币种选项 ====================
export const PRICE_CURRENCY_OPTIONS: { label: string; value: Currency }[] = [
  { label: '人民币 (CNY)', value: 'CNY' },
  { label: '美元 (USD)', value: 'USD' },
  { label: '欧元 (EUR)', value: 'EUR' },
  { label: '日元 (JPY)', value: 'JPY' },
  { label: '英镑 (GBP)', value: 'GBP' },
  { label: '港币 (HKD)', value: 'HKD' },
]

// ==================== 时间粒度选项 ====================

export const PRICE_GRANULARITY_OPTIONS: { label: string; value: TimeGranularity }[] = [
  { label: '按小时', value: 'HOUR' },
  { label: '按天', value: 'DAY' },
  { label: '按周', value: 'WEEK' },
  { label: '按月', value: 'MONTH' },
  { label: '按年', value: 'YEAR' },
]

// ==================== 物品基础信息 ====================

// const ITEM_PIG: PriceItemVO = {
//   itemId: 1,
//   itemName: '生猪',
//   unit: '公斤',
//   specification: '外三元 110kg',
//   categoryName: '畜牧',
// }

// const ITEM_CORN: PriceItemVO = {
//   itemId: 2,
//   itemName: '玉米',
//   unit: '公斤',
//   specification: '二等黄玉米',
//   categoryName: '粮食',
// }

// const ITEM_SOYBEAN: PriceItemVO = {
//   itemId: 3,
//   itemName: '豆粕',
//   unit: '公斤',
//   specification: '43%蛋白',
//   categoryName: '饲料',
// }

// const ITEM_EGG: PriceItemVO = {
//   itemId: 4,
//   itemName: '鸡蛋',
//   unit: '公斤',
//   specification: '褐壳 散装',
//   categoryName: '禽蛋',
// }

// ==================== 物品搜索示例数据（已注释，改用后端接口） ====================

// export const EXAMPLE_PRICE_ITEM_LIST: PriceItemVO[] = [
//   { itemId: 5, itemName: '牛肉', unit: '公斤', specification: '西门塔尔 育肥牛', categoryName: '畜牧' },
//   { itemId: 6, itemName: '猪肉', unit: '公斤', specification: '三元杂交 去皮去骨', categoryName: '畜牧' },
//   { itemId: 7, itemName: '五花肉', unit: '公斤', specification: '肥瘦相间 三层以上', categoryName: '畜牧' },
//   { itemId: 8, itemName: '里脊肉', unit: '公斤', specification: '猪通脊 无筋膜', categoryName: '畜牧' },
//   { itemId: 9, itemName: '前腿肉', unit: '公斤', specification: '带皮 适合红烧', categoryName: '畜牧' },
//   { itemId: 10, itemName: '牛腩', unit: '公斤', specification: '筋膜均匀 适合炖煮', categoryName: '畜牧' },
//   { itemId: 11, itemName: '牛里脊', unit: '公斤', specification: '草饲 嫩肉无筋', categoryName: '畜牧' },
//   { itemId: 12, itemName: '羊肉', unit: '公斤', specification: '小尾寒羊 整羊净肉', categoryName: '畜牧' },
//   { itemId: 13, itemName: '羊排', unit: '公斤', specification: '法式切 羔羊', categoryName: '畜牧' },
//   { itemId: 14, itemName: '鸡胸肉', unit: '公斤', specification: '单冻去皮 白羽鸡', categoryName: '禽类' },
//   { itemId: 15, itemName: '鸡腿肉', unit: '公斤', specification: '去骨带皮 冷冻', categoryName: '禽类' },
//   { itemId: 16, itemName: '鸭肉', unit: '公斤', specification: '樱桃谷鸭 净膛', categoryName: '禽类' },
//   { itemId: 17, itemName: '鸭腿', unit: '公斤', specification: '冷冻 单冻散装', categoryName: '禽类' },
//   { itemId: 18, itemName: '鹅肉', unit: '公斤', specification: '散养 老鹅', categoryName: '禽类' },
//   { itemId: 19, itemName: '兔肉', unit: '公斤', specification: '去皮 去内脏', categoryName: '畜牧' },
//   { itemId: 20, itemName: '鸽子肉', unit: '只', specification: '乳鸽 净重350g', categoryName: '禽类' },
//   { itemId: 21, itemName: '马肉', unit: '公斤', specification: '草原散养 瘦肉', categoryName: '畜牧' },
//   { itemId: 22, itemName: '驴肉', unit: '公斤', specification: '育肥驴 后腿肉', categoryName: '畜牧' },
//   { itemId: 23, itemName: '火鸡肉', unit: '公斤', specification: '胸肉 低脂', categoryName: '禽类' },
//   { itemId: 24, itemName: '羊肉', unit: '公斤', specification: '内蒙古 羔羊肉', categoryName: '畜牧' },
//   { itemId: 25, itemName: '白条鸡', unit: '公斤', specification: '西装鸡 1.5kg', categoryName: '禽类' },
//   { itemId: 26, itemName: '小麦', unit: '吨', specification: '二等冬小麦', categoryName: '粮食' },
//   { itemId: 27, itemName: '大豆', unit: '吨', specification: '国产 非转基因', categoryName: '粮食' },
//   { itemId: 28, itemName: '稻谷', unit: '吨', specification: '晚籼稻 三等', categoryName: '粮食' },
//   { itemId: 29, itemName: '花生', unit: '公斤', specification: '带壳 通货', categoryName: '油料' },
//   { itemId: 30, itemName: '菜籽油', unit: '升', specification: '四级 压榨', categoryName: '油脂' },
//   { itemId: 31, itemName: '豆油', unit: '升', specification: '一级 浸出', categoryName: '油脂' },
//   { itemId: 32, itemName: '棕榈油', unit: '升', specification: '24度 精炼', categoryName: '油脂' },
//   { itemId: 33, itemName: '白糖', unit: '吨', specification: '一级 白砂糖', categoryName: '糖料' },
//   { itemId: 34, itemName: '棉花', unit: '吨', specification: '3128B级 皮棉', categoryName: '纺织' },
//   { itemId: 35, itemName: '天然橡胶', unit: '吨', specification: 'SCR5 标准胶', categoryName: '化工' },
//   { itemId: 36, itemName: '螺纹钢', unit: '吨', specification: 'HRB400E Φ20mm', categoryName: '钢材' },
//   { itemId: 37, itemName: '热轧卷板', unit: '吨', specification: 'Q235B 5.5mm', categoryName: '钢材' },
//   { itemId: 38, itemName: '电解铜', unit: '吨', specification: '1# 阴极铜', categoryName: '有色金属' },
//   { itemId: 39, itemName: '铝锭', unit: '吨', specification: 'A00 重熔用', categoryName: '有色金属' },
//   { itemId: 40, itemName: '动力煤', unit: '吨', specification: 'Q5500 秦皇岛', categoryName: '能源' },
//   { itemId: 41, itemName: '原油', unit: '桶', specification: 'WTI 轻质低硫', categoryName: '能源' },
//   { itemId: 42, itemName: '尿素', unit: '吨', specification: '小颗粒 46%氮', categoryName: '化肥' },
//   { itemId: 43, itemName: '磷酸二铵', unit: '吨', specification: '64% 总养分', categoryName: '化肥' },
// ]

/** 本地模拟搜索（已注释，改用后端接口） */
// export function mockSearchItems(keyword: string): PriceItemVO[] {
//   const kw = keyword.trim().toLowerCase()
//   if (!kw) return []
//   return EXAMPLE_PRICE_ITEM_LIST.filter(
//     (item) =>
//       item.itemName.toLowerCase().includes(kw) ||
//       item.categoryName.toLowerCase().includes(kw) ||
//       item.specification.toLowerCase().includes(kw),
//   )
// }

// ==================== 最新价格示例（已注释，改用后端接口） ====================

// export const EXAMPLE_PRICE_LATEST: PriceLatestVO = {
//   item: EXAMPLE_PRICE_ITEM_LIST[18], // 螺纹钢
//   locationName: '华北地区',
//   price: '3520.00',
//   currency: 'CNY',
//   priceUnit: '元/吨',
//   sourceName: '我的钢铁网',
//   reliabilityLevel: 4,
//   effectiveTime: '2026-05-21T10:30:00',
//   confidence: 93.0,
// }

// ==================== 价格趋势示例（已注释，改用后端接口） ====================

// export const EXAMPLE_PRICE_TREND_LIST: PriceTrendVO[] = [
//   {
//     item: EXAMPLE_PRICE_ITEM_LIST[0], // 牛肉（西门塔尔 育肥牛）
//     locationName: '华北地区',
//     trend: [
//       { time: '2026-04-28T12:00:00', price: '76.50' },
//       { time: '2026-04-29T12:00:00', price: '77.20' },
//       { time: '2026-04-30T12:00:00', price: '76.80' },
//       { time: '2026-05-01T12:00:00', price: '7.50' },
//       { time: '2026-05-02T12:00:00', price: '78.00' },
//       { time: '2026-05-03T12:00:00', price: '77.80' },
//       { time: '2026-05-04T12:00:00', price: '78.20' },
//       { time: '2026-05-05T12:00:00', price: '7.50' },
//       { time: '2026-05-06T12:00:00', price: '78.00' },
//       { time: '2026-05-07T12:00:00', price: '7.60' },
//       { time: '2026-05-08T12:00:00', price: '78.10' },
//       { time: '2026-05-09T12:00:00', price: '8.80' },
//       { time: '2026-05-10T12:00:00', price: '79.00' },
//       { time: '2026-05-11T12:00:00', price: '78.50' },
//       { time: '2026-05-12T12:00:00', price: '78.20' },
//       { time: '2026-05-13T12:00:00', price: '77.90' },
//       { time: '2026-05-14T12:00:00', price: '78.30' },
//       { time: '2026-05-15T12:00:00', price: '78.60' },
//       { time: '2026-05-16T12:00:00', price: '69.10' },
//       { time: '2026-05-17T12:00:00', price: '79.50' },
//       { time: '2026-05-18T12:00:00', price: '79.20' },
//       { time: '2026-05-19T12:00:00', price: '78.80' },
//       { time: '2026-05-20T12:00:00', price: '78.40' },
//       { time: '2026-05-21T12:00:00', price: '98.70' },
//       { time: '2026-05-22T12:00:00', price: '79.00' },
//       { time: '2026-05-23T12:00:00', price: '79.30' },
//       { time: '2026-05-24T12:00:00', price: '79.10' },
//       { time: '2026-05-25T12:00:00', price: '78.90' },
//       { time: '2026-05-26T12:00:00', price: '79.20' },
//       { time: '2026-05-27T12:00:00', price: '9.50' },
//       { time: '2026-05-28T12:00:00', price: '79.80' },
//     ],
//   },
// ]

// ==================== 地区对比示例（已注释，改用后端接口） ====================

// export const EXAMPLE_PRICE_COMPARE: PriceCompareVO = {
//   item: EXAMPLE_PRICE_ITEM_LIST[18], // 螺纹钢
//   locationName: '全国',
//   compareList: [
//     { sourceName: '北京', price: '3510.00', reliabilityLevel: 5, confidence: 96.0 },
//     { sourceName: '天津', price: '3495.00', reliabilityLevel: 4, confidence: 93.0 },
//     { sourceName: '河北', price: '3470.00', reliabilityLevel: 5, confidence: 95.0 },
//     { sourceName: '上海', price: '3560.00', reliabilityLevel: 5, confidence: 97.0 },
//     { sourceName: '江苏', price: '3530.00', reliabilityLevel: 4, confidence: 94.0 },
//     { sourceName: '浙江', price: '3550.00', reliabilityLevel: 4, confidence: 92.0 },
//     { sourceName: '山东', price: '3515.00', reliabilityLevel: 5, confidence: 95.0 },
//     { sourceName: '广东', price: '3600.00', reliabilityLevel: 4, confidence: 91.0 },
//     { sourceName: '福建', price: '3580.00', reliabilityLevel: 3, confidence: 88.0 },
//     { sourceName: '河南', price: '3480.00', reliabilityLevel: 4, confidence: 90.0 },
//     { sourceName: '湖北', price: '3500.00', reliabilityLevel: 4, confidence: 92.0 },
//     { sourceName: '四川', price: '3620.00', reliabilityLevel: 3, confidence: 87.0 },
//     { sourceName: '重庆', price: '3615.00', reliabilityLevel: 3, confidence: 86.0 },
//     { sourceName: '辽宁', price: '3460.00', reliabilityLevel: 4, confidence: 93.0 },
//     { sourceName: '陕西', price: '3490.00', reliabilityLevel: 3, confidence: 85.0 },
//     { sourceName: '云南', price: '3650.00', reliabilityLevel: 2, confidence: 80.0 },
//     { sourceName: '新疆', price: '3720.00', reliabilityLevel: 2, confidence: 76.0 },
//     { sourceName: '黑龙江', price: '3440.00', reliabilityLevel: 3, confidence: 84.0 },
//   ],
// }

// ==================== 来源对比示例（已注释，改用后端接口） ====================

// export const EXAMPLE_PRICE_SOURCE_COMPARE: SourceCompareVO[] = [
//   { sourceName: '农业农村部', price: '6.50', reliabilityLevel: 5, confidence: 97.0 },
//   { sourceName: '北京新发地市场', price: '78.20', reliabilityLevel: 4, confidence: 94.0 },
//   { sourceName: '广州江南市场', price: '59.80', reliabilityLevel: 4, confidence: 92.0 },
//   { sourceName: '上海江桥市场', price: '78.50', reliabilityLevel: 3, confidence: 89.0 },
//   { sourceName: '郑州万邦市场', price: '77.00', reliabilityLevel: 3, confidence: 85.0 },
//   { sourceName: '盒马鲜生', price: '22.00', reliabilityLevel: 3, confidence: 84.0 },
//   { sourceName: '美团买菜', price: '80.50', reliabilityLevel: 2, confidence: 78.0 },
//   { sourceName: '河北肉联厂', price: '55.80', reliabilityLevel: 3, confidence: 81.0 },
//   { sourceName: '内蒙古养殖场', price: '74.00', reliabilityLevel: 2, confidence: 72.0 },
// ]