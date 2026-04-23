<script setup lang="ts">

import { SPOTLIGHT_ITEMS, FEATURE_ITEMS } from '@/constants'
import bannerImage from '@/assets/front/banner.jpg'
import FeatureGrid from '../../components/site/FeatureGrid.vue'
import SectionIntro from '../../components/site/SectionIntro.vue'
import SpotlightSection from '../../components/site/SpotlightSection.vue'

// 后续改为从后端获取信息，
const spotlightItems = SPOTLIGHT_ITEMS

const featureItems = FEATURE_ITEMS

</script>

<template>
  <div class="front-page">
    <section class="home-hero">
      <img class="home-hero__image" :src="bannerImage" alt="匆匆首屏背景图" />
      <div class="home-hero__overlay" />
      <div class="home-hero__glow" />

      <div class="home-hero__content">
        <p>Explore . Dream . Discover</p>
        <h1>《匆匆》</h1>
        <h2>兴趣，乃探索之首位引领者。</h2>
        <p class="home-hero__summary">
          首屏改为全屏大图、半透明深色蒙版与绝对居中的核心文案。向下滑动后，导航会切换到紧凑状态，左侧显示网站名，右侧保留 MENU 与登录按钮。
        </p>
      </div>

      <div class="home-hero__scroll">
        <span />
        <small>向下滑动</small>
      </div>
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
.front-page {
  display: grid;
  gap: 42px;
}

.home-hero {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow: hidden;
}

.home-hero__image,
.home-hero__overlay,
.home-hero__glow {
  position: absolute;
  inset: 0;
}

.home-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.02) brightness(0.9);
}

.home-hero__overlay {
  background:
    linear-gradient(180deg, rgba(10, 23, 35, 0.48), rgba(10, 23, 35, 0.62)),
    radial-gradient(circle at center, rgba(255, 255, 255, 0.12), transparent 46%);
}

.home-hero__glow {
  background: radial-gradient(circle at top, rgba(255, 255, 255, 0.22), transparent 34%);
}

.home-hero__content {
  position: relative;
  z-index: 1;
  width: min(1080px, calc(100% - 120px));
  text-align: center;
}

.home-hero__content>p:first-child {
  margin: 0 0 16px;
  color: rgba(246, 251, 255, 0.95);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.home-hero h1,
.home-hero h2 {
  color: #ffffff;
}

.home-hero h1 {
  margin: 0;
  font-size: clamp(3.4rem, 8vw, 7rem);
  line-height: 0.98;
  letter-spacing: 0.11em;
}

.home-hero h2 {
  max-width: 22ch;
  margin: 22px auto 0;
  font-size: clamp(1.5rem, 3.2vw, 2.4rem);
  line-height: 1.24;
  font-weight: 500;
}

.home-hero__summary {
  max-width: 64ch;
  margin: 30px auto 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
}

.home-hero__scroll {
  position: absolute;
  bottom: 34px;
  left: 50%;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 10px;
  transform: translateX(-50%);
}

.home-hero__scroll span {
  width: 1px;
  height: 62px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0));
}

.home-hero__scroll small {
  color: rgba(248, 253, 255, 0.93);
  letter-spacing: 0.2em;
}

@media (max-width: 760px) {
  .front-page {
    gap: 30px;
  }

  .home-hero__content {
    width: min(100% - 28px, 980px);
  }

  .home-hero h1 {
    font-size: clamp(3rem, 17vw, 4.8rem);
  }

  .home-hero h2 {
    font-size: clamp(1.3rem, 7vw, 2.1rem);
  }
}
</style>
