<script setup lang="ts">

import { FRONT_MENU_ITEMS, HOME_SECTION_INTROS } from '@/constant'
import { EXAMPLE_HOME_STATS } from '@/constant'
import FeatureGrid from '@/components/site/FeatureGrid.vue'
import SectionIntro from '@/components/site/SectionIntro.vue'
import SpotlightSection from '@/components/site/SpotlightSection.vue'
import StatsSection from '@/components/site/StatsSection.vue'
import CTASection from '@/components/site/CTASection.vue'
import { onMounted, ref } from "vue";
import { featureApi, spotlightApi } from "@/api";
import type { SpotlightItem, FeatureItem } from "@/types";

const spotlightItems = ref<SpotlightItem[]>([])
const featureItems = ref<FeatureItem[]>([])

const loading = ref(true)

const fetchData = async () => {
  try {
    loading.value = true

    const [spotlightResponse, featureResponse] = await Promise.all([
      spotlightApi.list(),
      featureApi.list(),
    ])

    if (spotlightResponse.code === 200) {
      spotlightItems.value = spotlightResponse.data
    }

    if (featureResponse.code === 200) {
      featureItems.value = featureResponse.data
    }
  } catch (error) {
    console.error('获取焦点数据，特性数据失败', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

</script>

<template>
  <div class="front-page">
    <section>
      <HeroSection />
    </section>

    <StatsSection :items="EXAMPLE_HOME_STATS" />

    <section class="content-section content-stack">
      <SectionIntro v-bind="HOME_SECTION_INTROS[0]" />
      <SpotlightSection :items="spotlightItems" />
    </section>

    <section class="content-section content-stack">
      <SectionIntro v-bind="HOME_SECTION_INTROS[1]" />
      <FeatureGrid :items="featureItems" />
    </section>

    <section class="content-section content-stack">
      <SectionIntro v-bind="HOME_SECTION_INTROS[2]" />
      <CTASection :items="FRONT_MENU_ITEMS" />
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