<script setup lang="ts">

import { SPOTLIGHT_ITEMS, FEATURE_ITEMS } from '@/constant'
import bannerImage from '@/assets/example/banner.jpg'
import FeatureGrid from '../../components/site/FeatureGrid.vue'
import SectionIntro from '../../components/site/SectionIntro.vue'
import SpotlightSection from '../../components/site/SpotlightSection.vue'
import { onMounted, reactive, ref } from "vue";
import { featureApi, spotlightApi } from "@/api";
import type { SpotlightItem, FeatureItem } from "@/types";

// 后续改为从后端获取信息，
// const spotlightItems = ref<SpotlightItem[]>([])
// const featureItems = ref<FeatureItem[]>([])

const spotlightItems = SPOTLIGHT_ITEMS
const featureItems = FEATURE_ITEMS

// const loading = ref(true)
//
// const fetchData = async () => {
//   try {
//     loading.value = true
//
//     const [spotlightResponse, featureResponse] = await Promise.all([
//       spotlightApi.list(),
//       featureApi.list(),
//     ])
//
//     if (spotlightResponse.data.code === 200) {
//       spotlightItems.value = spotlightResponse.data.data
//     }
//
//     if (featureResponse.data.code === 200) {
//       featureItems.value = featureResponse.data.data
//     }
//   } catch (error) {
//     console.error('获取焦点数据，特性数据失败', error)
//   } finally {
//     loading.value = false
//   }
// }
//
// // 页面加载完成，就请求数据
// onMounted(()=> {
//   fetchData()
// })

</script>

<template>
  <div class="front-page">
    <section>
      <HeroSection />
    </section>

    <section class="content-section content-stack">
      <SectionIntro eyebrow="Template Translation" title="保留模板气质，但重建成更适合个人站点的结构。"
        description="首页依然保持清晰的章节推进方式，不过每个章节都围绕你的个人品牌、项目表达和长期扩展能力来设计。" />
      <SpotlightSection :items="spotlightItems" />
    </section>

    <section class="content-section content-stack">
      <SectionIntro eyebrow="Why This Works" title="这套前台更像一个可进化的展示系统。"
        description="它既可以承载现在的官网首页，也能继续长成博客、项目中心、实验室和更多兴趣模块的入口。" />
      <FeatureGrid :items="featureItems" />
    </section>
  </div>
</template>

<style scoped lang="scss">
// 基础布局
.front-page {
  display: grid;
  gap: 42px;
  background: #ffffff;
}
</style>