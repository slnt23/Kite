<script setup>
import bannerImage from '../../assets/front/banner.jpg'
import projectImageOne from '../../assets/front/pic01.jpg'
import projectImageTwo from '../../assets/front/pic02.jpg'
import projectImageThree from '../../assets/front/pic03.jpg'
import FeatureGrid from '../../components/site/FeatureGrid.vue'
import SectionIntro from '../../components/site/SectionIntro.vue'
import SpotlightSection from '../../components/site/SpotlightSection.vue'

const spotlightItems = [
  {
    eyebrow: 'Brand System',
    title: '个人品牌与内容表达同时在线',
    description:
      '保留模板里强叙事的首屏和分段式内容节奏，把它转成更适合个人站点的品牌展示、内容输出与项目入口。',
    image: projectImageOne,
  },
  {
    eyebrow: 'Project Layer',
    title: '每个兴趣项目都能自然接入',
    description:
      '站点会持续扩展新的兴趣模块，所以首页不只负责展示，也要承担导航与聚合能力，让访问者快速理解你的主线。',
    image: projectImageTwo,
  },
  {
    eyebrow: 'Growth System',
    title: '从前台展示平滑过渡到后续后台运营',
    description:
      '现在先完成前台官网，后面接入管理后台时，可以继续沿用内容、项目和模块的整体结构，不需要推翻重做。',
    image: projectImageThree,
  },
]

const featureItems = [
  {
    icon: '01',
    title: '全屏首屏叙事',
    description: '首页首屏改成全屏背景图，核心文案绝对居中，第一眼就建立网站气质。',
  },
  {
    icon: '02',
    title: '天蓝渐变系统',
    description: '主色改成天蓝、雾白和通透高光，让视觉从深海蓝切换到更轻盈的呼吸感。',
  },
  {
    icon: '03',
    title: '滚动状态切换',
    description: '首屏顶部保留右侧操作，向下滑动后再收口为左站名右操作的紧凑导航。',
  },
  {
    icon: '04',
    title: '宫格菜单入口',
    description: '点击 MENU 打开响应式瀑布流图片宫格，直接跳转到品牌故事、服务能力等子页面。',
  },
]
</script>

<template>
  <div class="front-page">
    <section class="home-hero">
      <img class="home-hero__image" :src="bannerImage" alt="匆匆首屏背景图" />
      <div class="home-hero__overlay" />
      <div class="home-hero__glow" />

      <div class="home-hero__content">
        <p>Sky Blue Narrative Site</p>
        <h1>《匆匆》</h1>
        <h2>用天蓝与白色渐变，做一个带呼吸感的前台首页。</h2>
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
      <SectionIntro
        eyebrow="Template Translation"
        title="保留模板气质，但重建成更适合个人站点的结构。"
        description="首页依然保持清晰的章节推进方式，不过每个章节都围绕你的个人品牌、项目表达和长期扩展能力来设计。"
      />

      <SpotlightSection :items="spotlightItems" />
    </section>

    <section class="content-section content-stack">
      <SectionIntro
        eyebrow="Why This Works"
        title="这套前台更像一个可进化的展示系统。"
        description="它既可以承载现在的官网首页，也能继续长成博客、项目中心、实验室和更多兴趣模块的入口。"
      />

      <FeatureGrid :items="featureItems" />
    </section>
  </div>
</template>

<style scoped lang="scss">
/* 共用主题变量与可复用样式见 src/style.scss：content-stack */
.front-page {
  display: grid;
  gap: 28px;
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
  filter: saturate(1.06) brightness(0.78);
}

.home-hero__overlay {
  background:
    linear-gradient(180deg, rgba(3, 17, 39, 0.36), rgba(6, 24, 50, 0.72)),
    radial-gradient(circle at center, rgba(255, 255, 255, 0.08), transparent 44%);
}

.home-hero__glow {
  background:
    radial-gradient(circle at center, rgba(154, 226, 255, 0.26), transparent 34%),
    radial-gradient(circle at top, rgba(255, 255, 255, 0.18), transparent 28%);
}

.home-hero__content {
  position: relative;
  z-index: 1;
  width: min(980px, calc(100% - 24px));
  text-align: center;
}

.home-hero__content > p:first-child {
  margin: 0 0 14px;
  color: rgba(245, 251, 255, 0.86);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.home-hero h1,
.home-hero h2 {
  color: var(--color-text);
}

.home-hero h1 {
  margin: 0;
  font-size: clamp(4rem, 8vw, 7.4rem);
  line-height: 0.95;
  letter-spacing: 0.12em;
}

.home-hero h2 {
  max-width: 18ch;
  margin: 18px auto 0;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.06;
}

.home-hero__summary {
  max-width: 60ch;
  margin: 22px auto 0;
  color: var(--color-text-soft);
  font-size: 1.06rem;
}

.home-hero__scroll {
  position: absolute;
  bottom: 36px;
  left: 50%;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 12px;
  transform: translateX(-50%);
}

.home-hero__scroll span {
  width: 1px;
  height: 72px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0));
}

.home-hero__scroll small {
  color: rgba(248, 253, 255, 0.84);
  letter-spacing: 0.2em;
}

.content-section {
  padding: 0 0 8px;
}

@media (max-width: 760px) {
  .home-hero__content {
    width: min(100% - 20px, 980px);
  }

  .home-hero h1 {
    font-size: clamp(3.2rem, 18vw, 5rem);
  }

  .home-hero h2 {
    font-size: clamp(1.6rem, 8vw, 2.4rem);
  }
}
</style>
